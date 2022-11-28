import express from "express"
import oracledb from "oracledb"
import * as http from 'http'
import cors from "cors"
import { nanoid } from "nanoid"
const app = express()
const httpServer = http.createServer(app)
app.use(cors())

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

app.post('/generate', async (req, res) => {
    console.log('entrou no post')
    const saveTicketSql = `INSERT INTO BILHETESS (ID, NUMERO_BILHETE) values (SQ_BILHETES.nextval, :0)`
    const getTicketSql = `SELECT NUMERO_BILHETE, DATA_CRIACAO FROM BILHETESS WHERE NUMERO_BILHETE = :0`

    try {
        const number = "ascd123"
        // this.bd = bd;
        // const conexao = await this.bd.getConexao();
        await simpleExecute(saveTicketSql, [number], {autoCommit: true})
            .then((result) => {
                // console.log(JSON.stringify(result))
                console.log("resultado number ", number)
            })
            .catch((err) => {
                // console.log(err)
                console.log('erro 1')
            })
        const resultSelect = (await simpleExecute(getTicketSql, [number]))["rows"][0]
        res.status(201).send(JSON.stringify(resultSelect))
    } catch (err) {
        // console.log(err)
        console.log('erro 2')
        res.status(500).send("Erro interno")
    }
});


function Recargas(bd) 
{
    this.bd = bd;
    console.log("rodando")

    this.incluaRE = async function (recarga) { console.log("incluaRE recarga:", recarga)
        try {
            const conexao = await this.bd.getConexao();

            const insercao = "INSERT INTO RECARGAS (ID_BILHETE, ID_TIPO) VALUES (:0, :tipo)";

            const dados = [recarga.number, recarga.tipo];

            await conexao.execute(insercao, dados);

            const commit = "COMMIT";
            await conexao.execute(commit);

        }
        catch (erro) {
            console.log("erro");
        }
    }
}

function Recarga(number, tipo, data) {
    this.number = number;
    this.tipo = tipo;
    this.data = data;
}

function Comunicado(number, tipo, mensagem) {
    this.number = number;
    this.tipo = tipo;
    this.mensagem = mensagem;
}

async function inclusaoRE(req, res) {
    console.log("inclusãoRE:", req.body)
    const recarga = new Recarga(req.body.number, req.body.tipo);

    try {
        const mensg = await global.recargas.incluaRE(recarga);

        const sucesso = new Comunicado(
            'Recarga gerada com sucesso',

        );

        console.log(mensg);
        return res.status(201).json(sucesso);
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            ',l,,'
        );

        return res.status(409).json(erro2);
    }
}


app.post('/recarga', inclusaoRE);




httpServer.listen(3000, () => {
    console.log("Aplicação rodando")
});

async function simpleExecute(statement, binds = [], options = {}) {
    let connection;
    let result = [];

    options.outFormat = oracledb.OUT_FORMAT_OBJECT;

    const connectionParams = {
        user: "ebd1es971",
        password: "Awkyv7",
        connectString: "CEATUDB02:1521/XE"
    }

    try {
        connection = await oracledb.getConnection(connectionParams);
        console.log('aquiiiiii')
        result = await connection.execute(statement, binds, options);
        return (result);
    } catch (err) {
        console.error(err);
        throw (err);
    } finally {
        if (connection) { 
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

