import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class Product {
    id?: number;
    name: string;
    price: number;
    description: string;

    insert = (): Promise<RunResult> => {
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

    getAll = (): Promise<Product[]> => {
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

    getById = (): Promise<Product> => {
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

    getByName = (): Promise<Product[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PRODUCT WHERE NAME = ?',
                params: [this.name]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (): Promise<RunResult> => {
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

    delete = (): Promise<RunResult> => {
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