import { ipcRenderer } from "electron";

export default class Address {
    id?: number | bigint;
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    number: string;
    complement?: string;
    cpf_cnpj: string;

    insert = (address = this): Promise<RunResult> => {
        try {
            if (address.complement) {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'INSERT INTO ADDRESS (cep, street, district, city, state, number, complement, cpf_cnpj) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    params: [address.cep, address.street, address.district, address.city, address.state, address.number, address.complement, address.cpf_cnpj]
                });
                return response;
            } else {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'INSERT INTO ADDRESS (cep, street, district, city, state, number, cpf_cnpj) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    params: [address.cep, address.street, address.district, address.city, address.state, address.number, address.cpf_cnpj]
                });
                return response;
            }
        } catch (e) {
            throw e
        }
    }

    getById = (id = this.id): Promise<Address> => {
        if (!id) throw new Error('ID not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM ADDRESS WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Address[]> => {
        if (!cpf_cnpj) throw new Error('CPF/CNPJ not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM ADDRESS WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (address = this): Promise<RunResult> => {
        try {
            if (address.complement) {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'UPDATE ADDRESS SET cep = ?, street = ?, district = ?, city = ?, state = ?, number = ?, complement = ? WHERE id = ?',
                    params: [address.cep, address.street, address.district, address.city, address.state, address.number, address.complement, address.id]
                });
                return response;
            } else {
                const response = ipcRenderer.invoke('database', {
                    method: 'run',
                    query: 'UPDATE ADDRESS SET cep = ?, street = ?, district = ?, city = ?, state = ?, number = ? WHERE id = ?',
                    params: [address.cep, address.street, address.district, address.city, address.state, address.number, address.id]
                });
                return response;
            }
        } catch (e) {
            throw e
        }
    }

    delete = (id = this.id): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM ADDRESS WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
