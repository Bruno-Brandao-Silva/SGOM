import { ipcRenderer } from "electron";

export default class Vehicle {
    id_plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    km: number;
    cpf_cnpj: string;

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO VEHICLE (ID_PLATE, BRAND, MODEL, YEAR, COLOR, KM, CPF_CNPJ) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [this.id_plate, this.brand, this.model, this.year, this.color, this.km, this.cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getByPlate = (id_plate = this.id_plate): Promise<Vehicle> => {
        if (!id_plate) {
            throw new Error('Plate not defined');
        }
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM VEHICLE WHERE ID_PLATE = ?',
                params: [this.id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj) => {
        if (!cpf_cnpj) {
            throw new Error('CPF/CNPJ not defined');
        }
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM VEHICLE WHERE CPF_CNPJ = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getAll = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM VEHICLE'
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE VEHICLE SET BRAND = ?, MODEL = ?, YEAR = ?, COLOR = ?, KM = ?, CPF_CNPJ = ? WHERE ID_PLATE = ?',
                params: [this.brand, this.model, this.year, this.color, this.km, this.cpf_cnpj, this.id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    delete = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM VEHICLE WHERE ID_PLATE = ?',
                params: [this.id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}