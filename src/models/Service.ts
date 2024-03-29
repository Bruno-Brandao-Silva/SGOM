import { ipcRenderer } from "electron";

export default class Service {
    id?: number | bigint;
    id_plate: string;
    cpf_cnpj: string;
    date: string;
    description: string;
    price: number;
    km: number;
    warranty: number;

    insert = (service = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO SERVICE (id_plate, cpf_cnpj, date, description, price, km, warranty) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [service.id_plate, service.cpf_cnpj, service.date, service.description, service.price, service.km, service.warranty]
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
    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Service[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM SERVICE WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByPlate = (id_plate = this.id_plate): Promise<Service[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM SERVICE WHERE id_plate = ?',
                params: [id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getById = (id = this.id): Promise<Service> => {
        if (!id) throw new Error('id not defined');
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM SERVICE WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (service = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE SERVICE SET date = ?, description = ?, price = ?, km = ?, warranty = ? WHERE id = ?',
                params: [service.date, service.description, service.price, service.km, service.warranty, service.id]
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
                query: 'DELETE FROM SERVICE WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}