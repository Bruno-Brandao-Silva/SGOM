import { ipcRenderer } from "electron";

export default class PurchaseList {
    id_purchase: number | bigint;
    id_product: number | bigint;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    image?: string;


    insert = (PurchaseList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PURCHASE_LIST (id_purchase, id_product, name, price, quantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [PurchaseList.id_purchase, PurchaseList.id_product, PurchaseList.name, PurchaseList.price, PurchaseList.quantity, PurchaseList.description, PurchaseList.image]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByPurchaseId = (id_purchase = this.id_purchase): Promise<PurchaseList[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PURCHASE_LIST WHERE id_purchase = ?',
                params: [id_purchase]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (PurchaseList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE PURCHASE_LIST SET name = ?, price = ?, quantity = ?, description = ?, image = ? WHERE id_purchase = ? AND id_product = ?',
                params: [PurchaseList.name, PurchaseList.price, PurchaseList.quantity, PurchaseList.description, PurchaseList.image, PurchaseList.id_purchase, PurchaseList.id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    delete = (id_product = this.id_product, id_purchase = this.id_purchase): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM PURCHASE_LIST WHERE id_purchase = ? AND id_product = ?',
                params: [id_purchase, id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    deleteAllByPurchaseId = (id_purchase = this.id_purchase): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM PURCHASE_LIST WHERE id_purchase = ?',
                params: [id_purchase]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
