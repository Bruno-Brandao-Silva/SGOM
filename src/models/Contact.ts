export default class Contact {
    id?: number;
    type: string;
    contact: string;
    cpf_cnpj: string;

    constructor({ id, type, contact, cpf_cnpj }: Contact) {
        this.id = id;
        this.type = type;
        this.contact = contact;
        this.cpf_cnpj = cpf_cnpj;
    }
}