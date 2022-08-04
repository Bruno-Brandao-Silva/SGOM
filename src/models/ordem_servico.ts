
import database from './database'

export default class Ordem_Servico {
    id?: number;
    placa?: string;
    km?: number;
    id_cliente?: number;
    data?: string;

    constructor(id?: number, placa?: string, km?: number, id_cliente?: number, data?: string) {
        this.id = id;
        this.placa = placa;
        this.km = km;
        this.id_cliente = id_cliente;
        this.data = data;
    }

    insertOrdem_Servico(ordem_servico = this) {
        const db = database();
        const statement = db.prepare(`INSERT INTO ordem_servico (placa,km, id_cliente, data) VALUES (?, ?, ?, ?)`)
        const info = statement.run(ordem_servico.placa, ordem_servico.km, ordem_servico.id_cliente, ordem_servico.data)
        db.close();
        return info;
    }

    getOrdem_Servico(ordem_servico = this): Ordem_Servico {
        const db = database();
        const statement = db.prepare(`SELECT * FROM ordem_servico WHERE id = ?`)
        const info = statement.all(ordem_servico.id)[0]
        db.close();
        return info;
    }
    getAllOrdem_Servico(): Ordem_Servico[] {
        const db = database();
        const statement = db.prepare(`SELECT * FROM ordem_servico`)
        const info = statement.all()
        db.close();
        return info;
    }
    getByPlaca(placa: string): Ordem_Servico[] {
        const db = database();
        const statement = db.prepare(`SELECT * FROM ordem_servico WHERE placa = ?`)
        const info = statement.all(placa)
        db.close();
        return info;
    }
    updateOrdem_Servico(ordem_servico = this) {
        const db = database();
        const statement = db.prepare(`UPDATE ordem_servico SET placa = ?, km = ?, id_cliente= ?, data = ? WHERE id = ?`)
        const info = statement.run(ordem_servico.placa, ordem_servico.km, ordem_servico.id_cliente, ordem_servico.data, ordem_servico.id)
        db.close();
        return info;
    }

    deleteOrdem_Servico(ordem_servico = this) {
        const db = database();
        const statement = db.prepare(`DELETE FROM ordem_servico WHERE id = ?`)
        const info = statement.run(ordem_servico.id)
        db.close();
        return info;
    }
}
