
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

}
