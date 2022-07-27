
import database from './database'

export default class Servico {
    id?: number;
    id_servico?: number;
    servico?: string;
    detalhes?: string;
    quantidade?: number;
    precoUnitario?: number;
    precoTotal?: number;
    constructor(id?: number, id_servico?: number, servico?: string, detalhes?: string, quantidade?: number, precoUnitario?: number) {
        this.id = id;
        this.id_servico = id_servico;
        this.servico = servico;
        this.detalhes = detalhes;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = this.precoUnitario * this.quantidade;
    }

    insertServico(servico = this) {
        const db = database();
        const statement = db.prepare(`INSERT INTO servico (id_servico, servico, detalhes, quantidade, precoUnitario)
         VALUES (?, ?, ?, ?, ?)`)
        const info = statement.run(servico.id_servico, servico.servico, servico.detalhes, servico.quantidade,
            servico.precoUnitario)
        db.close();
        return info;
    }

    getServico(servico = this) {
        const db = database();
        const statement = db.prepare(`SELECT * FROM servico WHERE id = ?`)
        const info = statement.all(servico.id)[0]
        db.close();
        return info;
    }

    updateServico(servico = this) {
        const db = database();
        const statement = db.prepare(`UPDATE servico SET id_cliente= ?, cep = ?, logradouro = ?, bairro = ?,
             cidade = ?, estado = ?, numero = ?, complemento = ? WHERE id = ?`)
        const info = statement.run(servico.id_servico, servico.servico, servico.detalhes, servico.quantidade,
            servico.precoUnitario, servico.id)
        db.close();
        return info;
    }

    deleteServico(servico = this) {
        const db = database();
        const statement = db.prepare(`DELETE FROM servico WHERE id = ?`)
        const info = statement.run(servico.id)
        db.close();
        return info;
    }
}
