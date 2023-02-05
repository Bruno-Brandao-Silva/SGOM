import { ipcRenderer } from "electron";

export default class Product {
    id?: number | bigint;
    name: string;
    price: number;
    description?: string;
    image?: string;
    amount?: number;

    insert = (product = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PRODUCT (name, price, description, image, amount) VALUES (?, ?, ?, ?, ?)',
                params: [product.name, product.price, product.description, product.image, product.amount]
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
                query: 'SELECT * FROM PRODUCT WHERE id = ?',
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
                query: 'SELECT * FROM PRODUCT WHERE name = ?',
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
                query: 'UPDATE PRODUCT SET name = ?, price = ?, description = ?, image = ?, amount = ? WHERE id = ?',
                params: [product.name, product.price, product.description, product.image, product.amount, product.id]
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
                query: 'DELETE FROM PRODUCT WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}