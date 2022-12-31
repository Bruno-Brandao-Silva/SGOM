import Address from "./Address";
import Contact from "./Contact";
import Vehicle from "./Vehicle";
import { ipcRenderer } from "electron";

export default class Client {
    id?: number;
    cpf_cnpj?: string;
    name?: string;
    addresses?: Address[];
    contacts?: Contact[];
    vehicles?: Vehicle[];

    constructor({ id, cpf_cnpj, name, addresses, contacts, vehicles }:
        { id?: number, cpf_cnpj?: string, name?: string, addresses?: Address[], contacts?: Contact[], vehicles?: Vehicle[] }) {
        this.id = id;
        this.cpf_cnpj = cpf_cnpj;
        this.name = name;
        this.addresses = addresses;
        this.contacts = contacts;
    }
    insert = async () => {
        try {
            const response = await ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO CLIENT (CPF_CNPJ, NAME) VALUES (?, ?)',
                params: [this.cpf_cnpj, this.name]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
