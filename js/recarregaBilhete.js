//AJUDA

const ajuda = document.getElementById("containerAjuda"); // Pegar ajuda/botão


const botao = document.getElementById("botaoAjuda"); // Pegar o botão para abrir


const span = document.getElementsByClassName("fechar")[0]; // Visualizar o X

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

//CONFIRMAÇÃO RECARGA
 function confirma() {
   var id = document.getElementById("idBilhete").value;

   let lerID =  document.getElementById("idBilhete");

  if(id!=null)
  { 
  alert("Recarga efetuada com sucesso!");

   if (this.value == 'Bilhete Único') {

    axios.post("http.localhost:3002/recarga", {number:lerID, tipo:"1"}).then((res) => 
    {console.log("Resposta recarga", res)})

    }
    
    else if (this.value == 'Bilhete Duplo') {
      
    }
    
    else if (this.value == 'Bilhete Semanal') {
      
  }
  
  else if (this.value == 'Bilhete Mensal') {
    
  }
}
  if(id!=null) 
    alert("Recarga efetuada com sucesso!");
}


// Lista com tipos de recarga
const tipos = ['Bilhete Único', 'Bilhete Duplo', 'Bilhete Semanal', 'Bilhete Mensal'];

  // gerar grupo de radio       
const group = document.querySelector("#group");
group.innerHTML = tipos.map((tipo) => `<div>
          <label for="${tipo}"><input type="radio" name="tipo" value="${tipo}" id="${tipo}">&nbsp;${tipo}</label>
    </div>`).join(' ');

  // funcao para escutar mudança de radio
const radioButtons = document.querySelectorAll('input[name="tipo"]');
for(const radioButton of radioButtons){
    radioButton.addEventListener('change', showSelected);
}        

function showSelected(e) {
    console.log(e);
    if (this.value == 'Bilhete Único') {
        document.querySelector('#preco').innerText = `R$ 4,00`;
        document.querySelector('#explicacao').innerText = ' Bilhete unico pode ser usado quantas vezes você desejar durante um período de 40 minutos que começa a ser contado a partir da primeira utilização do Bilhete.';
    }

    else if (this.value == 'Bilhete Duplo') {
      document.querySelector('#preco').innerText = 'R$ 7,50';
      document.querySelector('#explicacao').innerText = 'O Bilhete duplo pode ser usado em quantos transportes você desejar, durante um período de 40 minutos, iniciando a contagem a partir da primeira utilização. Você pode repetir o uso mais uma vez, com as mesmas regras. ';
    }

    else if (this.value == 'Bilhete Semanal') {
      document.querySelector('#preco').innerText = 'R$ 25,70';
      document.querySelector('#explicacao').innerText = 'O Bilhete semanal pode ser utilizado em quantos transportes você desejar durante um período de 7 dias. A contagem inicia a partir do horário do primeiro uso.';
    }

    else if (this.value == 'Bilhete Mensal') {
      document.querySelector('#preco').innerText = 'R$ 90,00';
      document.querySelector('#explicacao').innerText = 'O Bilhete mensal pode ser utilizado em quantos transportes você desejar durante um período de 30 dias. A contagem inicia a partir do horário do primeiro uso.';
    }
}


//mostrar formulario

id = document.getElementById('idBilhete').value;

// if (email_box.value == '') {
//   alert ("Campo vazio");
// } else {
//   alert("Redirecionando")
// }


btnVerifica = document.getElementById('verificaId');

if (!id)
  btnVerifica.disabled = false;
else
  btnVerifica.disabled = true;

btnVerifica.addEventListener("click", function() {
  formulario = document.getElementById('formulario');

  formulario.classList.toggle ('hide');

  document.getElementById("verificaId").disabled = true;
});