//pegar id

function utilizar(){
    console.log('entrou no utilizar pt1')

    document.getElementById('texto').innerHTML = 'Tempo Inicial: '

    document.getElementById('texto2').innerHTML = 'Tempo Final: '

    alert("Bilhete pronto para uso! O tempo irá ser contado a partir de agora. Clique em 'OK' para sair. ");
}


document.getElementById('utilizar').addEventListener('click', pegarDados);

function pegarDados(){

    localStorage.getItem("codigo", new Date().getTime());

    var codigo = localStorage.getItem("codigo");
    document.getElementById('utilizar').innerHTML = codigo;

    //criou uma variavel para data
    const data = new Date();
    
    data.toString();// Fri Dec 02 2022 14:48:39 GMT-0300 (Horário Padrão de Brasília)
    document.getElementById('data').value = data.toString(); //data inicial

    data.setMinutes(data.getMinutes() + 40);
    console.log(data.getMinutes());
    document.getElementById('dataFinal').value = data.toString();//pegando o id do front e passando data.toString()
    localStorage.setItem('data', data);
    console.log('pegou a data certinho')
    console.log(data)

    const tipo = localStorage.getItem("tipo");
    
    if (tipo.value == 'Bilhete Único') {
        console.log('entrou bilhe unico')

        data.setMinutes(data.getMinutes() + 40);
        console.log(data.getMinutes());
        document.getElementById('dataFinal').value = data.toString();
    }

    else if (tipo.value == 'Bilhete Duplo') {
        data.setMinutes(data.getMinutes() + 40);
        console.log(data.getMinutes());
        document.getElementById('dataFinal').value = data.toString();
    }

    else if (tipo.value == 'Bilhete Semanal') {
        data.setDate(data.getDate() + 7);
        console.log(data.getDate());
        document.getElementById('dataFinal').value = data.toString();
    }

    else if (tipo.value == 'Bilhete Mensal') {
        data.setDate(data.getDate() + 30);
        console.log(data.getDate());
        document.getElementById('dataFinal').value = data.toString();
    }

    

    

    /*let objBilhete = { codigo: parseInt(codigo), data: data };
    let url = `http://localhost:3000/gerarBilhete`

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
        }*/
}


/*function tipo(duration, display) {
    console.log("passou por aqui");
    if (tipo.value == 'Bilhete Único') {

        var duration = 60 * 40; //conversao para segundos
        var display = document.querySelector("#timer");//elemento para exibir o timer

        comecarContar(duration,display);//inicia a funcao
    }

    else if (tipo.value == 'Bilhete Duplo') {
        var duration = 60 * 40; //conversao para segundos
        var display = document.querySelector("#timer");//elemento para exibir o timer
    
        comecarContar(duration,display);//inicia a funcao
    }

    else if (tipo.value == 'Bilhete Semanal') {
        var duration = 60 * 40; //conversao para segundos
        var display = document.querySelector("#timer");//elemento para exibir o timer
    
        comecarContar(duration,display);//inicia a funcao
    }

    else if (tipo.value == 'Bilhete Mensal') {
        var duration = 60 * 40; //conversao para segundos
        var display = document.querySelector("#timer");//elemento para exibir o timer
    
        comecarContar(duration,display);//inicia a funcao
    }
}*/

/*const botao = document.getElementById('utilizar');
const code = document.getElementById('number-code');

function utilizar() {
        console.log("entrou aqui");

        //var id = getElementById('number-code').value;
       
        var today = new Date();
        var id = getAttribute('id');

        localStorage.setItem("data", today);
        localStorage.setItem("codigo", code.value);

        if (id === 'utilizar') localStorage.setItem("data_utilizacao", "DD-MM-YYY HH24.MI.SS");

        let objUso = { codigo: parseInt(codigo), data: data };
        let url = `http://localhost:3000/utilizacao`;

        let res = axios.post(url, objUso)
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
};

document.getElementById('utilizar').addEventListener('click', gerar);

function gerar() {

    var today = new Intl.DateTimeFormat('pt-BR', {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(today);


    localStorage.setItem("data", today);
    
    let data = today;

    let codigo = localStorage.getItem("number-code");
    let objBilhete = {codigo: parseInt(codigo)};
    let url = `http://localhost:3000/utilizacao`


    let res = axios.post(url, objBilhete)

        .then(response => {
            if (response.data) {
                const msg = new Comunicado(
                    response.data.codigo,
                    response.data.data
                );

                alert(msg.get());
            }
        })
        .catch(error => {

            if (error.response) {
                const msg = new Comunicado(
                    error.response.data.codigo,
                    error.response.data.data
                );

                alert(msg.get());
            }
        })

    function Comunicado(codigo, data) {
        this.codigo = codigo;
        this.data = data;

        this.get = function () {
            return (
                this.codigo + " \n " +
                this.data
            );
        }
    }


}*/

