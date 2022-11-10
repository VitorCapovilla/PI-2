function gerar()
{
  document.getElementById('frase').innerHTML = 'O ID do seu Bilhete é: ';

  var http = XMLHttpRequest()
  http.open("GET", "http://localhost.com:3000/generate")

  http.onreadystatechange = function(){
    if (http.readyState == 4){
      if (http.status == 201){
        let resposta = JSON.parse(http.response)
        document.getElementById('resp').innerHTML = resposta["NUMERO_BILHETE"]

      }else{
        //mostrar mensagem de erro
      }
    }
  }
  
  //desabilitar botao após primeiro click
  document.getElementById("id-consultar").disabled = true;

  alert("Bilhete gerado com sucesso! Clique em 'OK' para verifficar seu ID. ");
}

document.getElementById("id-consultar").disabled = true; //Desabilitado

var select = document.getElementById("bilhetes");

document.getElementById("bilhetes").addEventListener("change", function(event){
  
  var conteudo = select.options[select.selectedIndex].value;
  
  if (conteudo == ("selecione")) {
    document.getElementById("id-consultar").disabled = true; //Desabilitado
  }else{
    document.getElementById("id-consultar").disabled = false; //Habilitado
  }
});

