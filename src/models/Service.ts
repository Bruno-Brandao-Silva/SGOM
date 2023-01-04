import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class Service {
    id?: number;
    id_plate: string;
    cpf_cnpj: string;
    date: Date;
    service: string;
    price: number;

    insert = (): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO SERVICE (ID_PLATE, CPF_CNPJ, DATE, SERVICE, PRICE) VALUES (?, ?, ?, ?, ?)',
                params: [this.id_plate, this.cpf_cnpj, this.date, this.service, this.price]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getAll = (): Promise<Service[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM SERVICE',
                params: []
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getByCpfCnpj = (): Promise<Service[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM SERVICE WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByPlate = (): Promise<Service[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM SERVICE WHERE ID_PLATE = ?',
                params: [this.id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getById = (id = this.id): Promise<Service> => {
        if (!id) throw new Error('ID not defined');
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM SERVICE WHERE ID = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE SERVICE SET DATE = ?, SERVICE = ?, PRICE = ? WHERE ID = ?',
                params: [this.date, this.service, this.price, this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    delete = (): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM SERVICE WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}