//AJUDA

var ajuda = document.getElementById("containerAjuda"); // Pegar ajuda/botão


var botao = document.getElementById("botaoAjuda"); // Pegar o botão para abrir


var span = document.getElementsByClassName("fechar")[0]; // Visualizar o X

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

//SELECIONAR TIPO RECARGA

var unico = document.getElementById("unico");
var duplo = document.getElementById("duplo");
var semanal = document.getElementById("semanal");
var mensal = document.getElementById("mensal");

if(unico.checked==true) {
  document.getElementById('preco').innerHTML = 'R$ 4,00';
  document.getElementById('frase').innerHTML = 'O Bilhete unico pode ser usado quantas vezes você desejar durante um período de 40 minutos que começa a ser contado a partir da primeira utilização do Bilhete.';
}
else if (duplo.checked==true) {
  document.getElementById('preco').innerHTML = 'R$ 7,50';
  document.getElementById('frase').innerHTML = 'O Bilhete duplo pode ser usado em quantos transportes você desejar, durante um período de 40 minutos, iniciando a contagem a partir da primeira utilização. Você pode repetir o uso mais uma vez, com as mesmas regras. ';
}
else if (semanal.checked==true) {
  document.getElementById('preco').innerHTML = 'R$ 25,70';
  document.getElementById('frase').innerHTML = 'O Bilhete semanal pode ser utilizado em quantos transportes você desejar durante um período de 7 dias. A contagem inicia a partir do horário do primeiro uso.';
}
else if (mensal.checked==true) {
  document.getElementById('preco').innerHTML = 'R$ 90,00';
  document.getElementById('frase').innerHTML = 'O Bilhete mensal pode ser utilizado em quantos transportes você desejar durante um período de 30 dias. A contagem inicia a partir do horário do primeiro uso.';
}

//CONFIRMAÇÃO RECARGA
function confirma() {
  var id = document.getElementById("idBilhete").value;

  if(id!=null) 
    alert("Recarga efetuada com sucesso!");

}