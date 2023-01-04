import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class Contact {
    id?: number;
    type: string;
    contact: string;
    cpf_cnpj: string;

    insert = (): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO CONTACT (TYPE, CONTACT, CPF_CNPJ) VALUES (?, ?, ?)',
                params: [this.type, this.contact, this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = (): Promise<Contact[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM CONTACT WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
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
                query: 'UPDATE CONTACT SET TYPE = ?, CONTACT = ? WHERE ID = ?',
                params: [this.type, this.contact, this.id]
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
                query: 'DELETE FROM CONTACT WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}