import express from "express"
import oracledb from "oracledb"
import * as http from 'http'
import { nanoid } from "nanoid"
const app = express()
const httpServer = http.createServer(app)

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

app.post('/generate', async (req, res) => {
    console.log('entrou no post')
    const saveTicketSql = `INSERT INTO BILHETES (ID, NUMERO_BILHETE) values (SQ_BILHETES.nextval, :0)`
    const getTicketSql = `SELECT NUMERO_BILHETE, DATA_CRIACAO FROM BILHETES WHERE NUMERO_BILHETE = :0`

    try {
        const number = nanoid(9)
        await simpleExecute(saveTicketSql, [number], {autoCommit: true})
            .then((result) => {
                console.log(JSON.stringify(result))
            })
            .catch((err) => {
                console.log(err)
            })
        const resultSelect = (await simpleExecute(getTicketSql, [number]))["rows"][0]
        res.status(201).send(JSON.stringify(resultSelect))
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro interno")
    }
});

httpServer.listen(3001, () => {
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