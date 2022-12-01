function banco_de_dados() {
    process.env.ORA_SDTZ = "UTC-3";

    this.getConexao = async function () {
        if (global.conexao) return global.conexao;

        const oracledb = require('oracledb');
        const dbConfig = require('./dbconfig.js');

        try {
            global.conexao = await oracledb.getConnection({
                user: "ebd1es971",
                password: "Awkyv7",
                connectionString: "CEATUDB02"
            });
        }
        catch (err) {
            console.log("Falha na conexão com o Oracle DB");
            process.exit(1);
        }

        console.log("Oracle DB conectado");

        return global.conexao;
    }

    this.estrutureSe = async function () {
        try {
            const conexao = await this.getConexao();


            const bdBilhetes = 'CREATE TABLE BILHETESS (NUMERO_BILHETE INTEGER NOT NULL PRIMARY KEY, DATA_CRIACAO varchar(100) NOT NULL)';
            const bdRecarga = 'CREATE TABLE RECARGAS (ID_RECARGA NUMBER NOT NULL PRIMARY KEY, NUMERO_BILHETE INTEGER NOT NULL, TIPO VARCHAR(50) NOT NULL,' +
                'DATA_RECARGA VARCHAR2 (100) NOT NULL, CONSTRAINT FK_RECARGAS_BILHETESS FOREIGN KEY (NUMERO_BILHETE) REFERENCES BILHETESS(NUMERO_BILHETE))';
            const bdUtilizacao = 'CREATE TABLE UTILIZAÇÃO (ID_UTILIZACAO INTEGER NOT NULL PRIMARY KEY, NUMERO_BILHETE NOT NULL, DATA_UTILIZACAO VARCHAR(100) NOT NULL,' +
                'CONSTRAINT FK_UTILIZACAO_BILHETESS FOREIGN KEY (NUMERO_BILHETE) REFERENCES BILHETESS(NUMERO_BILHETE))';


            await conexao.execute(bdBilhetes);
            await conexao.execute(bdRecarga);
            await conexao.execute(bdUtilizacao);

        }
        catch (erro) { console.log("Tabela já existe"); } // se a já existe, ignora e toca em frente
    }

}

function Bilhetes(bd) {
    this.bd = bd;

    this.inclua = async function (bilhete) {
        try {
            const conexao = await this.bd.getConexao();

            const insercao = "INSERT INTO BILHETESS (NUMERO_BILHETE, DATA_CRIACAO) VALUES (:0, :1)";

            const dados = [bilhete.codigo, bilhete.data];

            await conexao.execute(insercao, dados);

            const commit = "COMMIT";
            await conexao.execute(commit);

        }
        catch (erro) {
            console.log("Erro ao tentar executar o insert na tabela BilhetesS");
        }
    }

    this.recarga = async function (bilhete) {
        try {
            const conexao = await this.bd.getConexao();
            console.log(bilhete.codigo);
            const insercao = "INSERT INTO RECARGAS (ID_RECARGA, NUMERO_BILHETE, TIPO) VALUES (ID_RECARGA_S.nextval,:0, :1)";

            const dados = [bilhete.codigo, bilhete.tipo];

            await conexao.execute(insercao, dados, { autoCommit: true });
        }
        catch (erro) {
            console.log(erro)
            console.log("Erro ao tentar executar o insert na tabela recarga");
        }
    }

    this.selectUm = async function (codigo) {
        const conexao = await this.bd.getConexao();

        const sql = "SELECT NUMERO_BILHETE FROM BILHETESS WHERE NUMERO_BILHETE=:0";
        const dados = [codigo];
        ret = await conexao.execute(sql, dados, { autoCommit: true });

        return ret;
    }

    this.utilizacao = async function (bilhete) {
        try {
            const conexao = await this.bd.getConexao();
            console.log(bilhete.codigo);
            const insercao = "INSERT INTO UTILIZACAO (ID_UTILIZACAO, NUMERO_BILHETE) VALUES (ID_UTILIAZCAO_S.nextval,:0)";

            const dados = [bilhete.codigo];

            await conexao.execute(insercao, dados, { autoCommit: true });
        }
        catch (erro) {
            console.log(erro)
            console.log("Erro ao tentar executar o insert na tabela utilização");
        }
    }
}

function Bilhete(codigo, tipo, data) {
    this.codigo = codigo;
    this.tipo = tipo;
    this.data = data;
}

function Comunicado(codigo, tipo, mensagem) {
    this.codigo = codigo;
    this.tipo = tipo;
    this.mensagem = mensagem;
}

function middleWareGlobal(req, res, next) {
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: ' + req.method + '; URL: ' + req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}

async function recarregar(req, res) {
    try {
        const bilhete = new Bilhete(req.body.codigo, req.body.tipo, req.body.data);

        console.log(bilhete.codigo);

        ret = await global.bilhetes.selectUm(bilhete.codigo);

        console.log(ret.rows);

        await global.bilhetes.recarga(bilhete);
        const sucesso = new Comunicado(
            'Número do bilhete: ' + bilhete.codigo,
            'Tipo do Bilhete: ' + bilhete.tipo,
            'O bilhete foi gerado com sucesso',
            //mensg
        );
        return res.status(201).json(sucesso);

    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'LJE',
            'Bilhete inexistente',
            'Não há bilhete cadastrado'
        );

        return res.status(409).json(erro2);
    }
}


async function inclusao(req, res) {
    const bilhete = new Bilhete(req.body.codigo, req.body.tipo, req.body.data);

    try {
        const mensg = await global.bilhetes.inclua(bilhete);

        const sucesso = new Comunicado(
            'Bilhete gerado com sucesso',

        );

        console.log(mensg);
        return res.status(201).json(sucesso);
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'Bilhete em uso'
        );

        return res.status(409).json(erro2);
    }
}

async function utilizar(req, res) {
    const bilhete = new Bilhete(req.body.codigo, req.body.tipo, req.body.data);

    try {
        const mensg = await global.bilhetes.utilizacao(bilhete);
        console.log("acionando utilização");

        const sucesso = new Comunicado(
            'Bilhete ativado com sucesso',

        );
        

        console.log(mensg);
        return res.status(201).json(sucesso);
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'Bilhete em uso'
        );

        return res.status(409).json(erro2);
    }
}

async function ativarServidor() {
    const bodyParser = require("body-parser");
    const express = require("express");
    const app = express();
    const path = require("path");
    const cors = require("cors");
    const { threadId } = require("worker_threads");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    app.use(cors());
    app.use(express.json());
    app.use("/Front", express.static(path.join(__dirname, "Front")));

    const bd = new banco_de_dados();
    await bd.estrutureSe();

    global.bilhetes = new Bilhetes(bd);


    app.use(middleWareGlobal);


    app.get("/", function (req, res) {
        console.log(__dirname);
        res.render(__dirname + "Front/index.html");
    });

    app.get("/bilhete.html", function (req, res) {
        res.render(__dirname + "/gerarBilhete.html");
    });

    app.get("/gerarBilhete", function (req, res) {
        res.render(__dirname + "/gerarBilhete.html");
    });

    app.get("/recargaGet", function (req, res) {
        res.render(__dirname + "/recarga.html");
    });

   



    app.post('/gerarBilhete', inclusao);

    app.post('/recarga', recarregar);

    app.post('/utilizacao', utilizar);

    app.listen(3000, function () {
        console.log("Servidor rodando na porta 3000");
    });
}

ativarServidor();