const script = `
--
-- File generated with SQLiteStudio v3.3.3 on dom jul 31 00:00:41 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: cliente
CREATE TABLE cliente (
    id        INTEGER PRIMARY KEY AUTOINCREMENT
                      NOT NULL,
    cpf       STRING  NOT NULL,
    nome      STRING  NOT NULL,
    email     STRING,
    contato_1 STRING,
    contato_2 STRING
);


-- Table: endereco
CREATE TABLE endereco (
    cep         STRING (9) NOT NULL,
    logradouro  STRING     NOT NULL,
    bairro      STRING     NOT NULL,
    cidade      STRING     NOT NULL,
    estado      STRING     NOT NULL,
    numero      STRING     NOT NULL,
    complemento STRING,
    id          INTEGER    PRIMARY KEY AUTOINCREMENT
                           NOT NULL,
    id_cliente  INTEGER    REFERENCES cliente (id) 
                           NOT NULL
);


-- Table: ordem_servico
CREATE TABLE ordem_servico (
    id         INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL,
    placa      STRING  REFERENCES veiculo (placa) 
                       NOT NULL,
    id_cliente INTEGER REFERENCES cliente (id) 
                       NOT NULL,
    data       DATE    NOT NULL,
    km         DOUBLE
);


-- Table: servico
CREATE TABLE servico (
    id            INTEGER PRIMARY KEY AUTOINCREMENT
                          NOT NULL,
    id_servico    INTEGER REFERENCES ordem_servico (id) 
                          NOT NULL,
    servico       STRING  NOT NULL,
    detalhes      STRING  NOT NULL,
    precoUnitario NUMERIC NOT NULL,
    quantidade    NUMERIC NOT NULL
);


-- Table: veiculo
CREATE TABLE veiculo (
    placa      STRING  PRIMARY KEY
                       UNIQUE
                       NOT NULL,
    marca      STRING,
    modelo     STRING,
    cor        STRING,
    ano        INTEGER,
    km         DOUBLE,
    id_cliente INTEGER REFERENCES cliente (id) 
                       NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

`
export default script;

