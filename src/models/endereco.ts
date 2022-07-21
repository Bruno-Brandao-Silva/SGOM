
import database from './database'

export default class Endereco {
    id?: number;
    cep?: string;
    logradouro?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    numero?: string;
    complemento?: string;
    id_cliente?: number;

    constructor(id?: number, id_cliente?: number, cep?: string, logradouro?: string, bairro?: string, cidade?: string,
        estado?: string, numero?: string, complemento?: string) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.numero = numero;
        this.complemento = complemento;
    }

    insertEndereco(endereco = this) {
        const db = database();
        const statement = db.prepare(`INSERT INTO endereco (id_cliente, cep, logradouro, bairro, cidade,
                 estado, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        const info = statement.run(endereco.id_cliente, endereco.cep, endereco.logradouro, endereco.bairro,
            endereco.cidade, endereco.estado, endereco.numero, endereco.complemento)
        db.close();
        return info;
    }

    getEndereco(endereco = this) {
        const db = database();
        const statement = db.prepare(`SELECT * FROM endereco WHERE id = ?`)
        const info = statement.all(endereco.id)[0]
        db.close();
        return info;
    }

    updateEndereco(endereco = this) {
        const db = database();
        const statement = db.prepare(`UPDATE endereco SET id_cliente= ?, cep = ?, logradouro = ?, bairro = ?,
             cidade = ?, estado = ?, numero = ?, complemento = ? WHERE id = ?`)
        const info = statement.run(endereco.id_cliente, endereco.cep, endereco.logradouro, endereco.bairro, endereco.cidade,
            endereco.estado, endereco.numero, endereco.complemento, endereco.id)
        db.close();
        return info;
    }

    deleteEndereco(endereco = this) {
        const db = database();
        const statement = db.prepare(`DELETE FROM endereco WHERE id = ?`)
        const info = statement.run(endereco.id)
        db.close();
        return info;
    }
}
