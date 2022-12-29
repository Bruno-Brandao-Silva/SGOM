
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
        this.precoTotal = Number(this.precoUnitario) * Number(this.quantidade);
    }

}
