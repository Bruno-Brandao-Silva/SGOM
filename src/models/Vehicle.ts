
export default class Vehicle {
    id_plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    km: number;
    cpf_cnpj: string;

    constructor({ id_plate, brand, model, year, color, km, cpf_cnpj }: Vehicle) {
        this.id_plate = id_plate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.km = km;
        this.cpf_cnpj = cpf_cnpj;
    }
}