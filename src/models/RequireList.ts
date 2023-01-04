import { RunResult } from "better-sqlite3";
import { ipcRenderer } from "electron";

export default class RequireList {
    id_service: number;
    id_product: number;
    amount: number;

    insert = (): Promise<RunResult> => {
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

    getByServiceId = (): Promise<RequireList[]> => {
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

    update = (): Promise<RunResult> => {
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

    delete = (): Promise<RunResult> => {
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

    deleteAllByServiceId = (): Promise<RunResult> => {
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