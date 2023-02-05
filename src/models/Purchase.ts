import { ipcRenderer } from "electron";

export default class Purchase {
    id?: number | bigint;
    cpf_cnpj: string;
    date: Date;

    insert = (purchase = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PURCHASE (cpf_cnpj, date) VALUES (?, ?)',
                params: [purchase.cpf_cnpj, purchase.date]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Purchase[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PURCHASE WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getById = (id = this.id): Promise<Purchase> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM PURCHASE WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (purchase = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE PURCHASE SET date = ? WHERE id = ?',
                params: [purchase.date, purchase.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    delete = (id = this.id): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM PURCHASE WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
