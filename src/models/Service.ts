export default class Service {
    id?: number;
    id_plate: string;
    cpf_cnpj: string;
    date: Date;
    service: string;
    price: number;

    constructor({ id, id_plate, cpf_cnpj, date, service, price }: Service) {
        this.id = id;
        this.id_plate = id_plate;
        this.cpf_cnpj = cpf_cnpj;
        this.date = date;
        this.service = service;
        this.price = price;
    }
}