import { ipcRenderer } from "electron";

export default class RequireList {
    id_service: number;
    id_product: number;
    amount: number;

    constructor({ id_service, id_product, amount }: RequireList) {
        this.id_service = id_service;
        this.id_product = id_product;
        this.amount = amount;
    }

    insert = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO REQUIRE_LIST (ID_SERVICE, ID_PRODUCT, AMOUNT) VALUES (?, ?, ?)',
                params: [this.id_service, this.id_product, this.amount]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByServiceId = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM REQUIRE_LIST WHERE ID_SERVICE = ?',
                params: [this.id_service]
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
                query: 'UPDATE REQUIRE_LIST SET AMOUNT = ? WHERE ID_SERVICE = ? AND ID_PRODUCT = ?',
                params: [this.amount, this.id_service, this.id_product]
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
                query: 'DELETE FROM REQUIRE_LIST WHERE ID_SERVICE = ? AND ID_PRODUCT = ?',
                params: [this.id_service, this.id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    deleteAllByServiceId = () => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM REQUIRE_LIST WHERE ID_SERVICE = ?',
                params: [this.id_service]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}