import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class PurchaseList {
    id_purchase: number;
    id_product: number;
    amount: number;

    insert = (): Promise<RunResult> => {
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

    getByPurchaseId = (): Promise<PurchaseList[]> => {
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

    update = (): Promise<RunResult> => {
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

    delete = (): Promise<RunResult> => {
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

    deleteAllByPurchaseId = (): Promise<RunResult> => {
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
