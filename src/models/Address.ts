
export default class Address {
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    number: string;
    complement?: string;

    constructor({ cep, street, district, city, state, number, complement }: { cep: string, street: string, district: string, city: string, state: string, number: string, complement?: string }) {
        this.cep = cep;
        this.street = street;
        this.district = district;
        this.city = city;
        this.state = state;
        this.number = number;
        this.complement = complement;
    }
}
