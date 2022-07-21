// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";
import Cliente from "./models/cliente";
import Endereco from "./models/endereco";

contextBridge.exposeInMainWorld('api', {
    Cliente: {
        cliente: (id?: number, cpf?: string, nome?: string, email?: string, contato_1?: string, contato_2?: string) =>
            new Cliente(id, cpf, nome, email, contato_1, contato_2),
        getAll: new Cliente().getAllCliente,
        get: (id: number) => new Cliente(id).getCliente(),
        insert: (cliente: Cliente) => new Cliente().insertCliente(cliente),
        update: (cliente: Cliente) => new Cliente().updateCliente(cliente),
        delete: (cliente: Cliente) => new Cliente().deleteCliente(cliente)
    },
    Endereco: {
        endereco: (id?: number, id_cliente?: number, cep?: string, logradouro?: string, bairro?: string, cidade?: string,
            estado?: string, numero?: string, complemento?: string) =>
            new Endereco(id, id_cliente, cep, logradouro, bairro, cidade, estado, numero, complemento),
        get: (id: number) => new Endereco(id).getEndereco(),
        insert: (endereco: Endereco) => new Endereco().insertEndereco(endereco),
        update: (endereco: Endereco) => new Endereco().updateEndereco(endereco),
        delete: (endereco: Endereco) => new Endereco().deleteEndereco(endereco)
    }
})