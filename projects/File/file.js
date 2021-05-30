function onLoad() {
	updateClock();
}

function updateClock() {
	if(document.getElementById('clock')) {
		document.getElementById('clock').src = '/index/image/clock/' + (Math.random() + Math.random())
		setTimeout('updateClock()', 60 * 1000);
	}
}