import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class Address {
    id?: number;
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    number: string;
    complement?: string;
    cpf_cnpj: string;

    insert = (): Promise<RunResult> => {
        try {
            if (this.complement) {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'INSERT INTO ADDRESS (CEP, STREET, DISTRICT, CITY, STATE, NUMBER, COMPLEMENT, CPF_CNPJ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    params: [this.cep, this.street, this.district, this.city, this.state, this.number, this.complement, this.cpf_cnpj]
                });
                return response;
            } else {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'INSERT INTO ADDRESS (CEP, STREET, DISTRICT, CITY, STATE, NUMBER, CPF_CNPJ) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    params: [this.cep, this.street, this.district, this.city, this.state, this.number, this.cpf_cnpj]
                });
                return response;
            }
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Address[]> => {
        if (!cpf_cnpj) throw new Error('CPF/CNPJ not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM ADDRESS WHERE CPF_CNPJ = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (): Promise<RunResult> => {
        try {
            if (this.complement) {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'UPDATE ADDRESS SET CEP = ?, STREET = ?, DISTRICT = ?, CITY = ?, STATE = ?, NUMBER = ?, COMPLEMENT = ? WHERE ID = ?',
                    params: [this.cep, this.street, this.district, this.city, this.state, this.number, this.complement, this.id]
                });
                return response;
            } else {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'UPDATE ADDRESS SET CEP = ?, STREET = ?, DISTRICT = ?, CITY = ?, STATE = ?, NUMBER = ? WHERE ID = ?',
                    params: [this.cep, this.street, this.district, this.city, this.state, this.number, this.id]
                });
                return response;
            }
        } catch (e) {
            throw e
        }
    }

    delete = (): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM ADDRESS WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
