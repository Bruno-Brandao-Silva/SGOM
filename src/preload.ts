import { contextBridge } from "electron";
import Cliente from "./models/cliente";
import Endereco from "./models/endereco";
import Veiculo from "./models/veiculo";
import Ordem_Servico from "./models/ordem_servico";
import Servico from "./models/servico";
import { ipcRenderer } from "electron";

// const { remote } = require('electron')
// const { remote } = require('@electron/remote')
// const dialog = remote.dialog

// let WIN = remote.getCurrentWindow()

// const dia = () => {
//     let options: any = {}
//     options.buttons = ["&Yes", "&No", "&Cancel"]
//     options.message = "Do you really want to quit?"

//     dialog.showMessageBox(WIN, options, (res: any, checked: any) => {
//         console.log(res)
//         console.log(checked)
//     })
// }
// dia();

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
        getAllByCliente: (id_cliente: number) => new Endereco().getAllByCliente(id_cliente),
        insert: (endereco: Endereco) => new Endereco().insertEndereco(endereco),
        update: (endereco: Endereco) => new Endereco().updateEndereco(endereco),
        delete: (endereco: Endereco) => new Endereco().deleteEndereco(endereco)
    },
    Veiculo: {
        veiculo: (placa?: string, id_cliente?: number, marca?: string, modelo?: string, cor?: string,
            ano?: number, km?: number) =>
            new Veiculo(placa, id_cliente, marca, modelo, cor, ano, km),
        getAllByCliente: (id_cliente: number): Veiculo[] => new Veiculo().getAllByCliente(id_cliente),
        get: (placa: string) => new Veiculo(placa).getVeiculo(),
        getAll: new Veiculo().getAllVeiculo,
        insert: (veiculo: Veiculo) => new Veiculo().insertVeiculo(veiculo),
        update: (veiculo: Veiculo) => new Veiculo().updateVeiculo(veiculo),
        delete: (veiculo: Veiculo) => new Veiculo().deleteVeiculo(veiculo)
    },
    Ordem_Servico: {
        ordem_servico: (id?: number, placa?: string, km?: number, id_cliente?: number, data?: string) =>
            new Ordem_Servico(id, placa, km, id_cliente, data),
        get: (id: number) => new Ordem_Servico(id).getOrdem_Servico(),
        getAll: new Ordem_Servico().getAllOrdem_Servico,
        getByPlaca: (placa: string) => new Ordem_Servico().getByPlaca(placa),
        insert: (ordem_servico: Ordem_Servico) => new Ordem_Servico().insertOrdem_Servico(ordem_servico),
        update: (ordem_servico: Ordem_Servico) => new Ordem_Servico().updateOrdem_Servico(ordem_servico),
        delete: (ordem_servico: Ordem_Servico) => new Ordem_Servico().deleteOrdem_Servico(ordem_servico)
    },
    Servico: {
        servico: (id?: number, id_servico?: number, servico?: string, detalhes?: string,
            quantidade?: number, precoUnitario?: number) =>
            new Servico(id, id_servico, servico, detalhes, quantidade, precoUnitario),
        get: (id: number) => new Servico(id).getServico(),
        getAll: new Servico().getAll,
        getAllByOrdem_Servico: (id_servico: number) => new Servico().getAllByOrdem_Servico(id_servico),
        insert: (servico: Servico) => new Servico().insertServico(servico),
        update: (servico: Servico) => new Servico().updateServico(servico),
        delete: (servico: Servico) => new Servico().deleteServico(servico)
    },
    Dialog: {
        showMessageBox: async (options: any) => await ipcRenderer.invoke("newDialog", options),
    }
})