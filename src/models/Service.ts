import { ipcRenderer } from "electron";

export default class Service {
    id?: number;
    id_plate: string;
    cpf_cnpj: string;
    date: Date;
    service: string;
    price: number;

    insert = (service = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO SERVICE (ID_PLATE, CPF_CNPJ, DATE, SERVICE, PRICE) VALUES (?, ?, ?, ?, ?)',
                params: [service.id_plate, service.cpf_cnpj, service.date, service.service, service.price]
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
                query: 'SELECT * FROM SERVICE WHERE CPF_CNPJ = ?',
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
                query: 'SELECT * FROM SERVICE WHERE ID_PLATE = ?',
                params: [id_plate]
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

    update = (service = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE SERVICE SET DATE = ?, SERVICE = ?, PRICE = ? WHERE ID = ?',
                params: [service.date, service.service, service.price, service.id]
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
                query: 'DELETE FROM SERVICE WHERE ID = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}