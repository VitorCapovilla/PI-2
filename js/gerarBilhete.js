function UnicoEscolhido() {
  document.getElementById("imgB").innerHTML = "<img src='img/Unico.png' width='250'>";
}

function gerar()
{
  var resp = document.getElementById('resp');
  resp.innerHTML = 10 * (Math.random()) + 1;
}