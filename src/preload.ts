// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";
import Cliente from "./models/cliente";

contextBridge.exposeInMainWorld('api', {
    Cliente: {
        cliente: (id?: number, nome?: string, email?: string, contato_1?: string, contato_2?: string) =>
            new Cliente(id, nome, email, contato_1, contato_2),
        getAll: new Cliente().getAllCliente,
        get: (id: number) => new Cliente(id).getCliente(),
        insert: (cliente: Cliente) => new Cliente().insertCliente(cliente),
        update: (cliente: Cliente) => new Cliente().updateCliente(cliente),
        delete: (cliente: Cliente) => new Cliente().deleteCliente(cliente)
    },
})