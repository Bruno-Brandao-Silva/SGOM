import { ipcRenderer } from "electron";

export default class RequireList {
    id?: number | bigint;
    id_service: number | bigint;
    id_product: number | bigint;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    image?: string;

    getAllByService = (id_service = this.id_service): Promise<RequireList[]> => {
        if (!id_service) throw new Error('Service not defined');

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

    insert = (requireList = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO REQUIRE_LIST (id_service, id_product, name, price, quantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [requireList.id_service, requireList.id_product, requireList.name, requireList.price, requireList.quantity, requireList.description, requireList.image]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    update = (requireList = this): Promise<RunResult> => {
        if (!requireList.id) throw new Error('ID not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE REQUIRE_LIST SET id_service = ?, name = ?, price = ?, amount = ?, description = ?, image = ? WHERE id = ?',
                params: [requireList.id_service, requireList.name, requireList.price, requireList.quantity, requireList.description, requireList.image, requireList.id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    delete = (id = this.id): Promise<RunResult> => {
        if (!id) throw new Error('ID not defined');

        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'DELETE FROM REQUIRE_LIST WHERE id = ?',
                params: [id]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

    deleteAllByService = (id_service = this.id_service): Promise<RunResult> => {
        if (!id_service) throw new Error('Service not defined');

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