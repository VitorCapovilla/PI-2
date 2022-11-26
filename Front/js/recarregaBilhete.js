//AJUDA
var ajuda = document.getElementById("containerAjuda"); // Pegar ajuda/botão


var botaoAjuda = document.getElementById("botaoAjuda"); // Pegar o botão para abrir


var span = document.getElementsByClassName("fechar")[0]; // Visualizar o X

// Abrir ajuda, quando clicar no botão
botaoAjuda.onclick = function() {
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

//mostrar opçoes
id = document.getElementById('number-code').value;


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


//salva recarga no bd
const botao = document.querySelectorAll('.botao-recarga');
const code = document.getElementById('number-code');
console.log(botao);

botao.forEach(element => {
    element.addEventListener('click', (e) => {
        var id = e.target.getAttribute('id');

        localStorage.setItem("codigo", code.value);

        if (id === 'botao-unico-recarga') localStorage.setItem("tipo", "Bilhete Único");
        else if (id === 'botao-duplo-recarga') localStorage.setItem("tipo", "Bilhete Duplo");
        else if (id === 'botao-semanal-recarga') localStorage.setItem("tipo", "Bilhete Semanal");
        else {                                   localStorage.setItem("tipo", "Bilhete Mensal");
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        var hours = String(today.getHours()).padStart(2, '0');
        var minutes = String(today.getMinutes()).padStart(2, '0');
        var seconds = String(today.getSeconds()).padStart(2, '0');

        today = dd + '/' + mm + '/' + yyyy + ' - ' + hours + ':' + minutes + ':' + seconds;

        localStorage.setItem("data", today);

        let codigo = localStorage.getItem("codigo");
        let tipo = localStorage.getItem("tipo");
        let data = today;

        let objBilhete = { codigo: parseInt(codigo), tipo: tipo, data: data };
        let url = `http://localhost:3000/recarga`

        let res = axios.post(url, objBilhete)
            .then(response => {
                if (response.data) {
                    const msg = new Comunicado(
                        response.data.codigo,
                        response.data.tipo,
                        response.data.data
                    );

                    alert(msg.get());
                }
            })
            .catch(error => {

                if (error.response) {
                    const msg = new Comunicado(
                        error.response.data.codigo,
                        error.response.data.tipo,
                        error.response.data.data
                    );

                    alert(msg.get());
                }
            })

        function Comunicado(codigo, tipo, data) {
            this.codigo = codigo;
            this.tipo = tipo;
            this.data = data;

            this.get = function () {
                return (
                    this.codigo + " \n " +
                    this.tipo + " \n " +
                    this.data
                );
            }
        }
    });


});

/*
function unico() {
let condigounico = document.getElementById('botao-unico').value
console.log('respostarecargaBilhete', condigounico)

axios.post("http://localhost:3000/recargaBilhete", {codigo: condigounico,tipo:"unico"}).then(( res) => {console.log("resposta do res do relatorio: ", res)})

}
*/