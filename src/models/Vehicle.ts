import { ipcRenderer } from "electron";

export default class Vehicle {
    id_plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    km: number;
    cpf_cnpj: string;

    constructor({ id_plate, brand, model, year, color, km, cpf_cnpj }: Vehicle) {
        this.id_plate = id_plate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.km = km;
        this.cpf_cnpj = cpf_cnpj;
    }
    insere = () => {
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
    getByPlate = () => {
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
    getByCpfCnpj = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM VEHICLE WHERE CPF_CNPJ = ?',
                params: [this.cpf_cnpj]
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