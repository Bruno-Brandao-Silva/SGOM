import { ipcRenderer } from "electron";

export default class Contact {
    id?: number;
    type: string;
    value: string;
    cpf_cnpj: string;

    insert = (contact = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO CONTACT (type, value, cpf_cnpj) VALUES (?, ?, ?)',
                params: [contact.type, contact.value, contact.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Contact[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM CONTACT WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (contact = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE CONTACT SET type = ?, value = ? WHERE id = ?',
                params: [contact.type, contact.value, contact.id]
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
                query: 'DELETE FROM CONTACT WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}