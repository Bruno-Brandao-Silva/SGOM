import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class Purchase {
    id?: number;
    cpf_cnpj: string;
    date: Date;

    insert = (): Promise<RunResult> => {
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

    getByCpfCnpj = (): Promise<Purchase[]> => {
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

    getById = (): Promise<Purchase> => {
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

    update = (): Promise<RunResult> => {
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

    delete = (): Promise<RunResult> => {
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
