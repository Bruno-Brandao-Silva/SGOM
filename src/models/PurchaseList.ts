import { ipcRenderer } from "electron";

export default class PurchaseList {
    id_purchase: number;
    id_product: number;
    amount: number;

    insert = (PurchaseList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO PURCHASE_LIST (ID_PURCHASE, ID_PRODUCT, AMOUNT) VALUES (?, ?, ?)',
                params: [PurchaseList.id_purchase, PurchaseList.id_product, PurchaseList.amount]
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
                query: 'SELECT * FROM PURCHASE_LIST WHERE ID_PURCHASE = ?',
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
                query: 'UPDATE PURCHASE_LIST SET AMOUNT = ? WHERE ID_PURCHASE = ? AND ID_PRODUCT = ?',
                params: [PurchaseList.amount, PurchaseList.id_purchase, PurchaseList.id_product]
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
                query: 'DELETE FROM PURCHASE_LIST WHERE ID_PURCHASE = ? AND ID_PRODUCT = ?',
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
                query: 'DELETE FROM PURCHASE_LIST WHERE ID_PURCHASE = ?',
                params: [id_purchase]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}
