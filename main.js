window.onload = sendMessage;

function onClick() {
    window.open(
      window.location.replace("about.html")}

function onClick2() {
  window.open(
    window.location.replace("contact.html")}
function onClick3() {
  window.open(
    window.location.replace("hire.html")
}
function Home() {
  window.open(
    window.location.replace("index.html")
}
function sendMessage() {
  var request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/835027613834805268/gFEgtAJkiIb-rdpoUFVPUL4Y3-oZSLp4gI262SHUI6_1gSLryfbpxAsqG-Fn0rSlMAhQ");

  request.setRequestHeader('Content-type', 'application/json');

  var params = {
    username: "Site Bot",
    avatar_url: "",
    content: "Somone has visited your site"
  }

  request.send(JSON.stringify(params));
}