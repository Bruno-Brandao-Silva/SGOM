import { ipcRenderer } from "electron";

export default class Purchase {
    id?: number;
    cpf_cnpj: string;
    date: Date;

    constructor({ id, cpf_cnpj, date }: Purchase) {
        this.id = id;
        this.cpf_cnpj = cpf_cnpj;
        this.date = date;
    }

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PURCHASE (CPF_CNPJ, DATE) VALUES (?, ?)',
                params: [this.cpf_cnpj, this.date]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PURCHASE WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getById = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM PURCHASE WHERE ID = ?',
                params: [this.id]
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
                query: 'UPDATE PURCHASE SET DATE = ? WHERE ID = ?',
                params: [this.date, this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    delete = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM PURCHASE WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
