import { ipcRenderer } from "electron";

export default class Info {
    id?: number | bigint;
    name: string;
    line_1: string;
    line_2: string;
    line_3: string;
    line_4: string;
    line_5: string;

    get = (): Promise<Info> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'get',
                query: 'SELECT * FROM INFO WHERE id = ?',
                params: [1]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    insert = (info = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'INSERT INTO INFO (id, name, line_1, line_2, line_3, line_4, line_5) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params: [1, info.name, info.line_1, info.line_2, info.line_3, info.line_4, info.line_5]
            });
            return response;
        } catch (e) {
            throw e
        }
    }
    update = (info = this): Promise<RunResult> => {
        try {
            const response = ipcRenderer.invoke('database', {
                method: 'run',
                query: 'UPDATE INFO SET name = ?, line_1 = ?, line_2 = ?, line_3 = ?, line_4 = ?, line_5 = ? WHERE id = ?',
                params: [info.name, info.line_1, info.line_2, info.line_3, info.line_4, info.line_5, 1]
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
                query: 'DELETE FROM INFO WHERE id = ?',
                params: [1]
            });
            return response;
        } catch (e) {
            throw e
        }
    }

}