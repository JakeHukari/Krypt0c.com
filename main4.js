window.onload = sendMessage;

function onClick() {
    window.open("mailto:hukarijake@gmail.com", "_blank");
  }
  function onClick2() {
    window.open(
        "https://github.com/Krypt0c", "_blank");
  }
  function onClick3() {
    window.open(
        "https://twitter.com/Krypt0c", "_blank");
  }
  function Home() {
    window.open(
      window.location.replace("index.html")
  }
  /*
  function sendMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/835027613834805268/gFEgtAJkiIb-rdpoUFVPUL4Y3-oZSLp4gI262SHUI6_1gSLryfbpxAsqG-Fn0rSlMAhQ");

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
      username: "Site Bot",
      avatar_url: "",
      content: "Somone has visited your hiring page"
    }

    request.send(JSON.stringify(params));
  }
  */