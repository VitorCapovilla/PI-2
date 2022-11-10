import express from "express"
import oracledb from "oracledb"
import * as http from 'http'
import { nanoid } from "nanoid"
import { hrPool } from '../config/database.js';

if (process.platform === 'darwin') {
    oracledb.initOracleClient({libDir: process.env.HOME + '/Downloads/instantclient_21_7'});
} else if (process.platform === 'win32') {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_7'});
}


const app = express()
const httpServer = http.createServer(app)

app.get('/generate', async (req, res) => {
    const saveTicketSql = `INSERT INTO BILHETES (ID, NUMERO_BILHETE) values (SQ_BILHETES.nextval, :0)`
    const getTicketSql = `SELECT NUMERO_BILHETE FROM BILHETES WHERE NUMERO_BILHETE = :0`

    try {
        const number = nanoid(9)
        await simpleExecute(saveTicketSql, [number], {autoCommit: true})
            .then((result) => {
                console.log(JSON.stringify(result))
            })
            .catch((err) => {
                console.log(err)
            })
        const resultSelect = (await simpleExecute(getTicketSql, [number],{autoCommit: true}))["rows"][0]
        console.log(resultSelect)
        res.status(201).send(resultSelect)
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro interno")
    }
})

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



// llllllll

// export async function initialize() {
//     await oracledb.createPool(hrPool);
// }

// export async function close() {
//     await oracledb.getPool().close(0);
// }

// export async function simpleExecute(statement, binds = [], options = {}) {
//     let connection;
//     let result = [];

//     options.outFormat = oracledb.OUT_FORMAT_OBJECT;

//     try {
//         connection = await oracledb.getConnection();
//         result = await connection.execute(statement, binds, options);
//         return (result);
//     } catch (err) {
//         console.error(err);
//         throw (err);
//     } finally {
//         if (connection) { // conn assignment worked, need to close
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }