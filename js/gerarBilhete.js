function gerar()
{
  document.getElementById('frase').innerHTML = 'O ID do seu Bilhete é: ';
  document.getElementById('resp').innerHTML = 10 * (Math.random()) + 1;

  //desabilitar botao após primeiro click
    document.getElementById("id-consultar").disabled = true;
}

document.getElementById("id-consultar").disabled = true; //Desabilitado

var select = document.getElementById("bilhetes");

document.getElementById("bilhetes").addEventListener("change", function(event){

  var conteudo = select.options[select.selectedIndex].value;

  if (conteudo == ("selecione")) {
    document.getElementById("id-consultar").disabled = true; //Habilitado
  }else{
    document.getElementById("id-consultar").disabled = false;
  }
});

