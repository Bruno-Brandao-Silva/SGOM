
export default class Address {
    id?: number;
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    number: string;
    complement?: string;
    cpf_cnpj: string;

    constructor({ id, cep, street, district, city, state, number, complement, cpf_cnpj }: Address) {
        this.id = id;
        this.cep = cep;
        this.street = street;
        this.district = district;
        this.city = city;
        this.state = state;
        this.number = number;
        this.complement = complement;
        this.cpf_cnpj = cpf_cnpj;
    }
}
