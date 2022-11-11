function gerar() {
        
  //desabilitar botao após primeiro click
  document.getElementById("id-consultar").disabled = true;
  document.getElementById('frase').innerHTML = 'O ID do seu Bilhete é: '

  setTimeout(function() {
    var http = new XMLHttpRequest()
    http.open("POST", "http://localhost.com:3001/generate")
  
    http.onreadystatechange = function () {
      console.log('entrou nesta bosta')
      if (http.readyState == 4) {
  
        console.log('4');
        console.log(http);
        console.log(http.status);
        if (http.status == 201) {
          let resposta = JSON.parse(http.response)
          console.log(resposta);
          document.getElementById('resp').innerHTML = resposta["NUMERO_BILHETE"]
        
          alert("Bilhete gerado com sucesso! Clique em 'OK' para verifficar seu ID. ");
        } else {
          //mostrar mensagem de erro
        }
      }
    }
    http.send()
  }, 1000);
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
