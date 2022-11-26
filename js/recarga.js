function unico ()
{
    let lerID =  document.getElementById("idBilhete");

    axios.post("http.localhost:3002/recarga", {number:lerID, tipo:"Bilhete Unico"}).then((res) => 
    {console.log("Resposta recarga", res)})
}