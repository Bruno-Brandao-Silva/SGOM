import { ipcRenderer } from "electron";

export default class Client {
    cpf_cnpj?: string;
    name?: string;

    constructor({ cpf_cnpj, name }: Client) {
        this.cpf_cnpj = cpf_cnpj;
        this.name = name;
    }

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
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
