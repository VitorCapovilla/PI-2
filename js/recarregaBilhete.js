// Pegar ajuda/botão
var ajuda = document.getElementById("containerAjuda");

// Pegar o botão para abrir
var botao = document.getElementById("botaoAjuda");

// Visualizar o X
var span = document.getElementsByClassName("fechar")[0];

// Abrir ajuda, quando clicar no botão
botao.onclick = function() {
  ajuda.style.display = "block";
}

// Fechar ajuda ao clicar no X
span.onclick = function() {
  ajuda.style.display = "none";
}

// Fechar ajuda se clicar fora
window.onclick = function(event) {
  if (event.target == ajuda) {
    ajuda.style.display = "none";
  }
}