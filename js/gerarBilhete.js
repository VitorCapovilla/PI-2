function gerar() {
  console.log('entrou aqui')
  //desabilitar botao após primeiro click
  document.getElementById("id-consultar").disabled = true;

  var xhttp = new XMLHttpRequest()
  xhttp.open("POST", "http://localhost:3002/generate");
  xhttp.onreadystatechange = function () {
    console.log('entrou');
    console.log(xhttp);
    console.log(xhttp.status);
    if (xhttp.readyState == 4 && xhttp.status == 201) {
      console.log(xhttp.response)
      let resposta = JSON.parse(xhttp.response)
      console.log(resposta);
      document.getElementById('frase').innerHTML = 'O ID do seu Bilhete é: '
      document.getElementById('resp').innerHTML = resposta["NUMERO_BILHETE"]
    
      alert("Bilhete gerado com sucesso! Clique em 'OK' para verifficar seu ID. ");
    } else {
      console.log('Erro')
    }
  }
  xhttp.send()
}

document.getElementById("id-consultar").disabled = true; //Desabilitado

var select = document.getElementById("bilhetes");

document.getElementById("bilhetes").addEventListener("change", function (event) {

  var conteudo = select.options[select.selectedIndex].value;

  if (conteudo == ("selecione")) {
    document.getElementById("id-consultar").disabled = true; //Desabilitado
  } else {
    document.getElementById("id-consultar").disabled = false; //Habilitado
  }
});
