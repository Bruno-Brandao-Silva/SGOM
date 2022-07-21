const script = `
--
-- File generated with SQLiteStudio v3.3.3 on sex jul 8 02:00:57 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: cliente
DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cpf STRING NOT NULL,nome STRING NOT NULL, email, contato_1 STRING, contato_2 STRING);

-- Table: endereco
DROP TABLE IF EXISTS endereco;
CREATE TABLE endereco (cep STRING (9) NOT NULL, logradouro STRING NOT NULL, bairro STRING NOT NULL, cidade STRING NOT NULL, estado STRING NOT NULL, numero STRING NOT NULL, complemento STRING, id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_cliente REFERENCES cliente (id) NOT NULL);

-- Table: ordem_servico
DROP TABLE IF EXISTS ordem_servico;
CREATE TABLE ordem_servico (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, placa REFERENCES veiculo (placa) NOT NULL, id_cliente REFERENCES cliente (id) NOT NULL, data DATE NOT NULL);

-- Table: servico
DROP TABLE IF EXISTS servico;
CREATE TABLE servico (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_servico REFERENCES ordem_servico (id) NOT NULL, detalhes STRING NOT NULL, preco STRING NOT NULL, quantidade INTEGER NOT NULL);

-- Table: veiculo
DROP TABLE IF EXISTS veiculo;
CREATE TABLE veiculo (placa STRING PRIMARY KEY UNIQUE NOT NULL, marca STRING, modelo STRING, cor STRING, ano INTEGER, km DOUBLE, id_cliente REFERENCES cliente (id) NOT NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

`
export default script;

