export default class Purchase {
    id?: number;
    cpf_cnpj: string;
    date: Date;

    constructor({ id, cpf_cnpj, date }: Purchase) {
        this.id = id;
        this.cpf_cnpj = cpf_cnpj;
        this.date = date;
    }
}
