const botao = document.querySelectorAll('.utilizar');
const code = document.getElementById('number-code');

botao.forEach(element => {
    element.addEventListener('click', (e) => {
        var id = e.target.getAttribute('id');

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
        let data = today;

        let objUso = { codigo: parseInt(codigo), data: data };
        let url = `http://localhost:3000/utilizacao`;

        let res = axios.post(url, objUso)
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
    });


});