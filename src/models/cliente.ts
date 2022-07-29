
import database from './database'

export default class Cliente {
    id?: number;
    cpf: string;
    nome?: string;
    email?: string;
    contato_1?: string;
    contato_2?: string;

    constructor(id?: number, cpf?: string, nome?: string, email?: string, contato_1?: string, contato_2?: string) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.contato_1 = contato_1;
        this.contato_2 = contato_2;
        return this
    }

    insertCliente(cliente = this) {
        console.log(cliente)
        const db = database();
        const statement = db.prepare(`INSERT INTO cliente (cpf, nome, email, contato_1, contato_2) VALUES (?, ?, ?, ?, ?)`)
        const info = statement.run(cliente.cpf, cliente.nome, cliente.email, cliente.contato_1, cliente.contato_2)
        db.close();
        return info;
    }

    getCliente(cliente = this): Cliente {
        const db = database();
        const statement = db.prepare(`SELECT * FROM cliente WHERE id = ?`)
        const info = statement.all([cliente.id])[0]
        db.close();
        return info;
    }

    getAllCliente(): Cliente[] {
        const db = database();
        const statement = db.prepare(`SELECT * FROM cliente`)
        const info = statement.all()
        db.close();
        return info;
    }

    updateCliente(cliente = this) {
        const db = database();
        const statement = db.prepare(`UPDATE cliente SET cpf = ?, nome = ?, email = ?, contato_1 = ?, contato_2 = ? WHERE id = ?`)
        const info = statement.run(cliente.cpf, cliente.nome, cliente.email, cliente.contato_1, cliente.contato_2, cliente.id)
        db.close();
        return info;
    }

    deleteCliente(cliente = this) {
        const db = database();
        const statement = db.prepare(`DELETE FROM cliente WHERE id = ?`)
        const info = statement.run([cliente.id])
        db.close();
        return info;
    }
}
