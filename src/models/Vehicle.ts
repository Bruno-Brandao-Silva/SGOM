
export default class Vehicle {
    placa: string;
    marca?: string;
    modelo?: string;
    cor?: string;
    ano?: number;
    km?: number;

    constructor({ placa, marca, modelo, cor, ano, km }: { placa: string, marca?: string, modelo?: string, cor?: string, ano?: number, km?: number }) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.km = km;
    }

}
