const script = `--
-- Arquivo gerado com SQLiteStudio v3.4.1 em sex fev 10 20:13:59 2023
--
-- Codificação de texto usada: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabela: ADDRESS
DROP TABLE IF EXISTS ADDRESS;

CREATE TABLE IF NOT EXISTS ADDRESS (
    id         INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL
                       UNIQUE,
    cep        TEXT    NOT NULL,
    street     TEXT    NOT NULL,
    district   TEXT    NOT NULL,
    city       TEXT    NOT NULL,
    state      TEXT    NOT NULL,
    number     TEXT    NOT NULL,
    complement TEXT,
    cpf_cnpj   TEXT    REFERENCES CLIENT (cpf_cnpj) 
                       NOT NULL
);


-- Tabela: CLIENT
DROP TABLE IF EXISTS CLIENT;

CREATE TABLE IF NOT EXISTS CLIENT (
    cpf_cnpj TEXT PRIMARY KEY
                  NOT NULL
                  UNIQUE,
    name     TEXT NOT NULL
);


-- Tabela: CONTACT
DROP TABLE IF EXISTS CONTACT;

CREATE TABLE IF NOT EXISTS CONTACT (
    id       INTEGER PRIMARY KEY AUTOINCREMENT
                     NOT NULL
                     UNIQUE,
    type     TEXT    NOT NULL,
    value    TEXT    NOT NULL,
    cpf_cnpj TEXT    REFERENCES CLIENT (cpf_cnpj) 
                     NOT NULL
);


-- Tabela: INFO
DROP TABLE IF EXISTS INFO;

CREATE TABLE IF NOT EXISTS INFO (
    id     INTEGER PRIMARY KEY,
    name   TEXT,
    line_1 TEXT,
    line_2 TEXT,
    line_3 TEXT,
    line_4 TEXT,
    line_5 TEXT
);


-- Tabela: PRODUCT
DROP TABLE IF EXISTS PRODUCT;

CREATE TABLE IF NOT EXISTS PRODUCT (
    id          INTEGER PRIMARY KEY AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    name        TEXT    NOT NULL,
    price       NUMERIC NOT NULL,
    description TEXT,
    image       TEXT,
    amount      NUMERIC
);


-- Tabela: PURCHASE
DROP TABLE IF EXISTS PURCHASE;

CREATE TABLE IF NOT EXISTS PURCHASE (
    id       INTEGER PRIMARY KEY AUTOINCREMENT
                     NOT NULL
                     UNIQUE,
    cpf_cnpj TEXT    REFERENCES CLIENT (cpf_cnpj) 
                     NOT NULL,
    date     TEXT    NOT NULL
);


-- Tabela: PURCHASE_LIST
DROP TABLE IF EXISTS PURCHASE_LIST;

CREATE TABLE IF NOT EXISTS PURCHASE_LIST (
    id_purchase INTEGER REFERENCES PURCHASE (id) 
                        NOT NULL,
    id_product  INTEGER REFERENCES PRODUCT (id) 
                        NOT NULL,
    amount      INTEGER NOT NULL
);


-- Tabela: REQUIRE_LIST
DROP TABLE IF EXISTS REQUIRE_LIST;

CREATE TABLE IF NOT EXISTS REQUIRE_LIST (
    id          INTEGER PRIMARY KEY AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    id_service  INTEGER REFERENCES SERVICE (id) 
                        NOT NULL,
    id_product  INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    price       NUMERIC NOT NULL,
    quantity    INTEGER NOT NULL,
    description TEXT,
    image       TEXT
);


-- Tabela: SERVICE
DROP TABLE IF EXISTS SERVICE;

CREATE TABLE IF NOT EXISTS SERVICE (
    id          INTEGER PRIMARY KEY AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    id_plate    TEXT    REFERENCES VEHICLE (id_plate) 
                        NOT NULL,
    cpf_cnpj    TEXT    REFERENCES CLIENT (cpf_cnpj) 
                        NOT NULL,
    date        TEXT    NOT NULL,
    description TEXT    NOT NULL,
    price       NUMERIC NOT NULL,
    km          NUMERIC NOT NULL,
    warranty    NUMERIC NOT NULL
);


-- Tabela: VEHICLE
DROP TABLE IF EXISTS VEHICLE;

CREATE TABLE IF NOT EXISTS VEHICLE (
    id_plate TEXT    PRIMARY KEY
                     UNIQUE
                     NOT NULL,
    brand    TEXT    NOT NULL,
    model    TEXT    NOT NULL,
    color    TEXT    NOT NULL,
    year     INTEGER NOT NULL,
    km       NUMERIC NOT NULL,
    cpf_cnpj TEXT    REFERENCES CLIENT (cpf_cnpj) 
                     NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
`
export default script;