import Address from "./Address";
import Contact from "./Contact";
import Vehicle from "./Vehicle";

export default class Client {
    id?: number;
    cpf?: string;
    name?: string;
    addresses?: Address[];
    contacts?: Contact[];
    vehicles?: Vehicle[];
    
    constructor({ id, cpf, name, addresses, contacts, vehicles }:
        { id?: number, cpf?: string, name?: string, addresses?: Address[], contacts?: Contact[], vehicles?: Vehicle[] }) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.addresses = addresses;
        this.contacts = contacts;
    }
}
