function onClick() {
    window.open(
        "mailto:hukarijake@gmail.com", "_blank");
  }
  function onClick2() {
    window.open(
        "https://github.com/Krypt0c", "_blank");
  }
    function onClick3() {
            var copyText = document.getElementById("copyMe");
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
            alert("Copied the text: " + copyText.value);
      }
  function onClick4() {
    window.open(
        "contact.html", "_blank");
  }