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
};*/

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


}

