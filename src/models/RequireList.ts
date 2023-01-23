import { ipcRenderer } from "electron";

export default class RequireList {
    id_service: number;
    id_product: number;
    amount: number;

    insert = (RequireList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO REQUIRE_LIST (id_service, id_product, amount) VALUES (?, ?, ?)',
                params: [RequireList.id_service, RequireList.id_product, RequireList.amount]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    getByServiceId = (id_service = this.id_service): Promise<RequireList[]> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'all',
                query: 'SELECT * FROM REQUIRE_LIST WHERE id_service = ?',
                params: [id_service]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (RequireList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE REQUIRE_LIST SET amount = ? WHERE id_service = ? AND id_product = ?',
                params: [RequireList.amount, RequireList.id_service, RequireList.id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    delete = (id_service = this.id_service, id_product = this.id_product): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM REQUIRE_LIST WHERE id_service = ? AND id_product = ?',
                params: [id_service, id_product]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    deleteAllByServiceId = (id_service = this.id_service): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM REQUIRE_LIST WHERE id_service = ?',
                params: [id_service]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
}