function sendMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/823660948270088222/SnN7fkfo_aT_S5xOVQ4PIzVjTliH97DHBky6BsaYT3mCNpHTSzu8JhLDQz76SWR0l-rn");
  
    request.setRequestHeader('Content-type', 'application/json');
  
    var params = {
      username: "Site Bot",
      avatar_url: "",
      content: "Somone has been got"
    }
  
    request.send(JSON.stringify(params));
  }