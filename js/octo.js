let CANVAS;
let CTX;

let PARTICLES=[];
let SEGMENTS=[];
let G={x:0,y:0.1};

let MONSTERS=[];
let SELECTED_PARTICLE=null

function main(){
	CANVAS=document.getElementById("myCanvas");
	CANVAS.width=window.innerWidth;
	CANVAS.height=window.innerHeight;
	CTX=CANVAS.getContext("2d");
	
	CANVAS.addEventListener("mousedown",onMouseDown);
	CANVAS.addEventListener("mousemove",onMouseMove);
	CANVAS.addEventListener("mouseup",onMouseUp);
	
	// Main Monst
	MONSTERS.push(new Monster({
		x:CANVAS.width*.1,
		y:CANVAS.height*0.4
	}))
	
	animate();
}

function onMouseDown(event){
	SELECTED_PARTICLE=getNearestParticle(event);
	SELECTED_PARTICLE.loc.x=event.x;
	SELECTED_PARTICLE.loc.y=event.y;
	SELECTED_PARTICLE.wasStatic=
		SELECTED_PARTICLE.isStatic;
	SELECTED_PARTICLE.isStatic=true;
}

function onMouseMove(event){
	if(SELECTED_PARTICLE!=null){
		SELECTED_PARTICLE.loc.x=event.x;
		SELECTED_PARTICLE.loc.y=event.y;
	}
}

function onMouseUp(event){
	SELECTED_PARTICLE.isStatic=
		SELECTED_PARTICLE.wasStatic;
	SELECTED_PARTICLE.oldLoc=
		SELECTED_PARTICLE.loc
	SELECTED_PARTICLE=null;
}

function getNearestParticle(loc){
	let minDist=Number.MAX_VALUE;
	let nearestParticle=null;
	
	for(let j=0;j<MONSTERS.length;j++){
		for(let i=0;i<MONSTERS[j].particles.length;i++){
			let dist=distance(loc,
				MONSTERS[j].particles[i].loc);
			if(dist<minDist){
				minDist=dist;
				nearestParticle=MONSTERS[j].particles[i];
			}
		}
	}
	return nearestParticle;
}

class Monster{
	constructor(loc){
		this.loc=loc;
		this.particles=[];
		this.segments=[];
		this.rigidity=30;
		// Leg thickness
		let seg=10;
		// Leg ammount
		let legs=8;
		
		let step=30; //dist between particles
		
		this.particles.push(
			new Particle(this.loc,true,true)
		)
		for(let i=1;i<seg;i++){
			for(let j=0;j<legs;j++){
				let radius=i*step;
				let angle=(j/legs)*Math.PI*0.5+
					Math.PI*0.25;
				let loc={
					x:this.loc.x+
						Math.cos(angle)*radius,
					y:this.loc.y+
						Math.sin(angle)*radius
				}
				let p=new Particle(loc);
				this.particles.push(p)
				
				let width=seg+1-i;
				if(i==1){
					this.segments.push(
						new Segment(
							p,this.particles[0],
							width
						)
					)
					if(this.particles.length>=3){
						this.segments.push(
							new Segment(
								p,
								this.particles[this.particles.length-2],
								width
							)
						)
					}
				}else{
					this.segments.push(
						new Segment(
							p,this.particles[
							this.particles.length-
							legs-1
							],width
						)
					)
				}
			}
		}
	}
	update(){
		for(let i=0;i<this.particles.length;i++){
			this.particles[i].move();
		}
		for(let i=0;i<this.particles.length;i++){
			if(this.particles[i].loc.y>CANVAS.height){
				this.particles[i].loc.y=CANVAS.height;
			}
		}
		
		for(let rep=0;rep<=this.rigidity;rep++){
			for(let i=0;i<this.segments.length;i++){
				this.segments[i].update();
			}
		}
	}
	draw(){
		for(let i=0;i<this.particles.length;i++){
			this.particles[i].draw();
		}
		for(let i=0;i<this.segments.length;i++){
			this.segments[i].draw();
		}
	}
}

function updateScene(){
	for(let i=0;i<MONSTERS.length;i++){
		MONSTERS[i].update();
	}
}

function drawScene(){
	CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
	
	for(let i=0;i<MONSTERS.length;i++){
		MONSTERS[i].draw();
	}
}

function animate(){
	updateScene();
	drawScene();
	window.requestAnimationFrame(animate);
}

/*

 O
 |        c
 |a
 |
 |________b_________O

c=Math.sqrt(a^2+b^2);
*/

function distance(A,B){
	let a=A.y-B.y;
	let b=A.x-B.x;
	let c=Math.sqrt(a*a+b*b);
	return c;
}

class Segment{
	constructor(particleA, particleB, width=1){
		this.particleA=particleA;
		this.particleB=particleB;
		this.width=width;
		this.len=distance(
			this.particleA.loc,
			this.particleB.loc
		);
	}
	
	update(){
		let curLength=distance(
			this.particleA.loc,
			this.particleB.loc
		);
		
		let dV=subtract(this.particleA.loc,
			this.particleB.loc);
		let diff=curLength-this.len; // scalar
		let normDV=normalize(dV);
		
		if(!this.particleA.isStatic){
			this.particleA.loc=add(
				this.particleA.loc,
				scale(normDV,-diff*0.5));
		}
		
		if(!this.particleB.isStatic){
			this.particleB.loc=add(
				this.particleB.loc,
				scale(normDV,+diff*0.5));
		}
	}
	
	draw(){
		CTX.lineWidth=this.width;
		CTX.beginPath();
		CTX.lineCap="round";
		CTX.strokeStyle="rgb(0,0,"+(90+Math.max(0,(7-this.width))*40)+")";
		CTX.moveTo(this.particleA.loc.x,
			this.particleA.loc.y);
		CTX.lineTo(this.particleB.loc.x,
			this.particleB.loc.y);
		CTX.stroke();		
	}
}


function add(v1,v2){
	return {
		x:v1.x+v2.x,
		y:v1.y+v2.y
	}
}

function subtract(v1,v2){
	return {
		x:v1.x-v2.x,
		y:v1.y-v2.y
	}
}

function normalize(v1){
	let mag=Math.sqrt(v1.x*v1.x+v1.y*v1.y);
	return {
		x:v1.x/mag,
		y:v1.y/mag
	}
}
function scale(v1,scalar){
	return {
		x:v1.x*scalar,
		y:v1.y*scalar
	}
}


class Particle{
	constructor(loc,isStatic=false,isHead=false){
		this.loc=loc;
		this.oldLoc=loc;
		this.rad=2;
		this.isStatic=isStatic;
		this.isHead=isHead;
	}
	move(){
		if(this.isStatic){
			return;
		}
		let vel=subtract(this.loc,this.oldLoc);
		let newLoc=add(this.loc,vel);
		newLoc=add(newLoc,G);
		let rand={
			x:(Math.random()-0.5)*this.rad*0.5,
			y:(Math.random()-0.5)*this.rad*0.5
		}
		newLoc=add(newLoc,rand);
		this.oldLoc=this.loc;
		this.loc=newLoc;
	}
	draw(){
		CTX.beginPath();
		let rad=this.rad;
		CTX.save();
		CTX.fillStyle="rgb(0,0,90)";
		CTX.translate(this.loc.x,this.loc.y)
		if(this.isHead){
			CTX.globalAlpha=1
			rad*=17;
			//CTX.scale(1,1.5);
		}
		CTX.arc( 
			0,
			0,
			rad,
			0,Math.PI*2);
		CTX.fill();
		CTX.globalAlpha=1
		
		CTX.restore();
	}
}

main();