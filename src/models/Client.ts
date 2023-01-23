import { ipcRenderer } from "electron";

export default class Client {
    cpf_cnpj: string;
    name: string;

    getByName = (name = this.name): Promise<Client[]> => {
        if (!name) throw new Error('Name not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM CLIENT WHERE name = ?',
                params: [name]
            });
            return response;
        } catch (e) {
            throw e
        }

    }
    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Client> => {
        if (!cpf_cnpj) throw new Error('CPF/CNPJ not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM CLIENT WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getAll = (): Promise<Client[]> => {
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
    insert = (client = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO CLIENT (cpf_cnpj, name) VALUES (?, ?)',
                params: [client.cpf_cnpj, client.name]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    update = (client = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE CLIENT SET name = ? WHERE cpf_cnpj = ?',
                params: [client.name, client.cpf_cnpj]
            }
            );
            return response;
        } catch (e) {
            throw e
        }
    }
    delete = (cpf_cnpj = this.cpf_cnpj): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM CLIENT WHERE cpf_cnpj = ?',
                params: [this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
