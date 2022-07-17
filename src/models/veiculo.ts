
import database from './database'

export default class Veiculo {
    placa?: string;
    marca?: string;
    modelo?: string;
    cor?: string;
    ano?: number;
    km?: number;
    id_cliente?: number;

    constructor(placa?: string, marca?: string, modelo?: string, cor?: string,
        ano?: number, km?: number, id_cliente?: number) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.km = km;
        this.id_cliente = id_cliente;
    }

    insertVeiculo(veiculo = this) {
        const db = database();
        const statement = db.prepare(`INSERT INTO veiculo (id_cliente, placa, marca, modelo, cor, ano, km) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        const info = statement.run(veiculo.id_cliente, veiculo.placa, veiculo.marca, veiculo.modelo,
            veiculo.cor, veiculo.ano, veiculo.km)
        db.close();
        return info;
    }

    getVeiculo(veiculo = this) {
        const db = database();
        const statement = db.prepare(`SELECT * FROM veiculo WHERE placa = ?`)
        const info = statement.all(veiculo.placa)
        db.close();
        return info;
    }

    updateVeiculo(veiculo = this) {
        const db = database();
        const statement = db.prepare(`UPDATE veiculo SET id_cliente= ?, marca = ?, modelo = ?, cor = ?, ano = ?, km = ? WHERE placa = ?`)
        const info = statement.run(veiculo.id_cliente, veiculo.marca, veiculo.modelo,
            veiculo.cor, veiculo.ano, veiculo.km, veiculo.placa)
        db.close();
        return info;
    }

    deleteVeiculo(veiculo = this) {
        const db = database();
        const statement = db.prepare(`DELETE FROM veiculo WHERE placa = ?`)
        const info = statement.run(veiculo.placa)
        db.close();
        return info;
    }
}
