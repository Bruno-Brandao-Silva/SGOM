import { ipcRenderer } from "electron";

export default class Product {
    id?: number;
    name: string;
    price: number;
    description: string;

    constructor({ id, name, price, description }: Product) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PRODUCT (NAME, PRICE, DESCRIPTION) VALUES (?, ?, ?)',
                params: [this.name, this.price, this.description]
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
                query: 'SELECT * FROM PRODUCT',
                params: []
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getById = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM PRODUCT WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByName = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM PRODUCT WHERE NAME = ?',
                params: [this.name]
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
                query: 'UPDATE PRODUCT SET NAME = ?, PRICE = ?, DESCRIPTION = ? WHERE ID = ?',
                params: [this.name, this.price, this.description, this.id]
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
                query: 'DELETE FROM PRODUCT WHERE ID = ?',
                params: [this.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}