import { ipcRenderer } from "electron";

export default class Client {
    cpf_cnpj: string;
    name: string;

    constructor({ cpf_cnpj, name }: Client) {
        this.cpf_cnpj = cpf_cnpj;
        this.name = name;
    }
    getByName = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM CLIENT WHERE NAME = ?',
                params: [this.name]
            });
            return response;
        } catch (e) {
            throw e
        }

    }
    getByCpfCnpj = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM CLIENT WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getAll = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM CLIENT',
                params: []
            });
            return response;
        } catch (e) {
            throw e
        }
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
    update = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE CLIENT SET NAME = ? WHERE CPF_CNPJ = ?',
                params: [this.name, this.cpf_cnpj]
            }
            );
            return response;
        } catch (e) {
            throw e
        }
    }
    delete = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM CLIENT WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
