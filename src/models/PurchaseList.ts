import { ipcRenderer } from "electron";

export default class PurchaseList {
    id_purchase: number;
    id_product: number;
    amount: number;

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PURCHASE_LIST (ID_PURCHASE, ID_PRODUCT, AMOUNT) VALUES (?, ?, ?)',
                params: [this.id_purchase, this.id_product, this.amount]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByPurchaseId = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM PURCHASE_LIST WHERE ID_PURCHASE = ?',
                params: [this.id_purchase]
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
                query: 'UPDATE PURCHASE_LIST SET AMOUNT = ? WHERE ID_PURCHASE = ? AND ID_PRODUCT = ?',
                params: [this.amount, this.id_purchase, this.id_product]
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
                query: 'DELETE FROM PURCHASE_LIST WHERE ID_PURCHASE = ? AND ID_PRODUCT = ?',
                params: [this.id_purchase, this.id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    deleteAllByPurchaseId = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM PURCHASE_LIST WHERE ID_PURCHASE = ?',
                params: [this.id_purchase]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
