function gerar()
{
  document.getElementById('frase').innerHTML = 'O ID do seu Bilhete é: ';
  let id = document.getElementById('resp').innerHTML = 10 * (Math.random()) + 1;
  
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



