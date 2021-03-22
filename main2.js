window.onload = sendMessage;

function onClick() {
    window.open(
        "mailto:hukarijake@gmail.com", "_blank");
  }
  function onClick2() {
    window.open(
        "https://github.com/Krypt0c", "_blank");
  }
  function onClick3() {
    window.open(
        "https://twitter.com/Krypt0c", "_blank");
  }
  function sendMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/823660948270088222/SnN7fkfo_aT_S5xOVQ4PIzVjTliH97DHBky6BsaYT3mCNpHTSzu8JhLDQz76SWR0l-rn");

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
      username: "Site Bot",
      avatar_url: "",
      content: "Somone has visited your contact page"
    }

    request.send(JSON.stringify(params));
  }