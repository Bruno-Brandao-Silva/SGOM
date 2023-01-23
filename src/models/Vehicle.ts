import { ipcRenderer } from "electron";

export default class Vehicle {
    id_plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    km: number;
    cpf_cnpj: string;

    insert = (vehicle = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO VEHICLE (id_plate, brand, model, year, color, km, cpf_cnpj) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [vehicle.id_plate, vehicle.brand, vehicle.model, vehicle.year, vehicle.color, vehicle.km, vehicle.cpf_cnpj]
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
                query: 'SELECT * FROM VEHICLE WHERE id_plate = ?',
                params: [id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getByCpfCnpj = (cpf_cnpj = this.cpf_cnpj): Promise<Vehicle[]> => {
        if (!cpf_cnpj) {
            throw new Error('CPF/CNPJ not defined');
        }
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM VEHICLE WHERE cpf_cnpj = ?',
                params: [cpf_cnpj]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    getAll = (): Promise<Vehicle[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM VEHICLE',
                params: []
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (vehicle = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE VEHICLE SET brand = ?, model = ?, year = ?, color = ?, km = ?, cpf_cnpj = ? WHERE id_plate = ?',
                params: [vehicle.brand, vehicle.model, vehicle.year, vehicle.color, vehicle.km, vehicle.cpf_cnpj, vehicle.id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    delete = (id_plate = this.id_plate): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM VEHICLE WHERE id_plate = ?',
                params: [id_plate]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}