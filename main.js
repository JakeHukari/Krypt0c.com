var clicks = 0;

function onClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  Cookies.set("clicks", values);
};