import { contextBridge } from "electron";
import Cliente from "./models/cliente";
import Endereco from "./models/endereco";
import Veiculo from "./models/veiculo";
import Ordem_Servico from "./models/ordem_servico";
import Servico from "./models/servico";

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
    },
    Veiculo: {
        veiculo: (placa?: string, id_cliente?: number, marca?: string, modelo?: string, cor?: string,
            ano?: number, km?: number) =>
            new Veiculo(placa, id_cliente, marca, modelo, cor, ano, km),
        get: (placa: string) => new Veiculo(placa).getVeiculo(),
        insert: (veiculo: Veiculo) => new Veiculo().insertVeiculo(veiculo),
        update: (veiculo: Veiculo) => new Veiculo().updateVeiculo(veiculo),
        delete: (veiculo: Veiculo) => new Veiculo().deleteVeiculo(veiculo)
    },
    Ordem_Servico: {
        ordem_servico: (id?: number, placa?: string, id_cliente?: number, data?: string) =>
            new Ordem_Servico(id, placa, id_cliente, data),
        get: (id: number) => new Ordem_Servico(id).getOrdem_Servico(),
        insert: (ordem_servico: Ordem_Servico) => new Ordem_Servico().insertOrdem_Servico(ordem_servico),
        update: (ordem_servico: Ordem_Servico) => new Ordem_Servico().updateOrdem_Servico(ordem_servico),
        delete: (ordem_servico: Ordem_Servico) => new Ordem_Servico().deleteOrdem_Servico(ordem_servico)
    },
    Servico: {
        servico: (id?: number, id_servico?: number, servico?: string, detalhes?: string, quantidade?: number, precoUnitario?: number) =>
            new Servico(id, id_servico, servico, detalhes, quantidade, precoUnitario),
        get: (id: number) => new Servico(id).getServico(),
        insert: (servico: Servico) => new Servico().insertServico(servico),
        update: (servico: Servico) => new Servico().updateServico(servico),
        delete: (servico: Servico) => new Servico().deleteServico(servico)
    }
})