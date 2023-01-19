import { ipcRenderer } from "electron";

export default class Contact {
    id?: number;
    type: string;
    contact: string;
    cpf_cnpj: string;

    insert = (contact = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO CONTACT (TYPE, CONTACT, CPF_CNPJ) VALUES (?, ?, ?)',
                params: [contact.type, contact.contact, contact.cpf_cnpj]
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
                query: 'SELECT * FROM CONTACT WHERE CPF_CNPJ = ?',
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
                query: 'UPDATE CONTACT SET TYPE = ?, CONTACT = ? WHERE ID = ?',
                params: [contact.type, contact.contact, contact.id]
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
                query: 'DELETE FROM CONTACT WHERE ID = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}