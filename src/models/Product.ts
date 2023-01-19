import { ipcRenderer } from "electron";

export default class Product {
    id?: number;
    name: string;
    price: number;
    description: string;

    insert = (product = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PRODUCT (NAME, PRICE, DESCRIPTION) VALUES (?, ?, ?)',
                params: [product.name, product.price, product.description]
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

    getById = (id = this.id): Promise<Product> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM PRODUCT WHERE ID = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByName = (name = this.name): Promise<Product[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PRODUCT WHERE NAME = ?',
                params: [name]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (product = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE PRODUCT SET NAME = ?, PRICE = ?, DESCRIPTION = ? WHERE ID = ?',
                params: [product.name, product.price, product.description, product.id]
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
                query: 'DELETE FROM PRODUCT WHERE ID = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}