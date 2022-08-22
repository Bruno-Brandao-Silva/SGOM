import { contextBridge } from "electron";
import Cliente from "./models/cliente";
import Endereco from "./models/endereco";
import Veiculo from "./models/veiculo";
import Ordem_Servico from "./models/ordem_servico";
import Servico from "./models/servico";
import { ipcRenderer } from "electron";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path'
import utils from "./models/utils";
import { getPrinters, PrintOptions } from "pdf-to-printer";
const createPdf = (id: number) => {
    const ordem_servico = new Ordem_Servico(id).getOrdem_Servico();
    const cliente = new Cliente(ordem_servico.id_cliente).getCliente();
    const veiculo = new Veiculo(ordem_servico.placa).getVeiculo();
    const endereco = new Endereco().getAllByCliente(ordem_servico.id_cliente);
    const servicos = new Servico().getAllByOrdem_Servico(ordem_servico.id);
    let y = 0;
    let x = 0;
    const maxWidth = 595.28;
    const maxHeight = 841.89;
    let total = 0;
    servicos.forEach(s => { total += s.quantidade * s.precoUnitario })
    const doc = new PDFDocument({ size: 'A4' });
    const dir = './output';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
   
    doc.pipe(fs.createWriteStream(`${dir}/${id}.pdf`));

    doc.rect(5, 5, maxWidth - 10, maxHeight - 10).stroke()
    doc.image(path.resolve(__dirname, '../public/images/sedan.png'), 40, 10, { width: 75 })

    doc.fontSize(16)
        .text('NOME DA EMPRESA', 0, 25, { align: 'center', width: maxWidth });

    doc.fontSize(12)
        .text('Manutenção em geral\nReparo de câmbio, tração e diferencial\nInstalação de turbo e intercooler',
            0, 45, { align: 'center', width: maxWidth });

    doc.fontSize(12)
        .text('Adailton: (11) 9 6503-6465', 0, 95,
            { align: 'center', width: maxWidth });

    doc.fontSize(12)
        .text('RUA BEM-TE-VI, 515 - CEP: 06293-060 - VILA AYROSA - OSASCO - SP', 0, 110, { align: 'center', width: maxWidth })

    y = 140
    doc.fontSize(12)
        .text(`Ordem de serviço: Nº ${ordem_servico?.id}`, 43, y, { align: 'left' })
        .text(`Data: ${ordem_servico?.data.replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}`, maxWidth - 143, y, { align: 'right', width: 100 })
        .rect(40, doc.y - 25, maxWidth - 80, 25).stroke();

    y = y + 20
    doc.fontSize(6)
        .text('Cliente', 43, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, maxWidth - 80 - 140, 25).stroke()
        .text('CPF/CNPJ', maxWidth - 177, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, 140, 25).stroke()
    y = y + 10
    doc.fontSize(12)
        .text(`${cliente?.nome}`, 43, y, { align: 'left' })
        .text(`${cliente?.cpf}`, maxWidth - 180 + 3, y, { align: 'left' })

    y = y + 20
    doc.fontSize(6)
        .text('E-Mail', 43, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, maxWidth - 80 - 110 * 2, 25).stroke()
        .text('Contato 1', maxWidth - 147 - 110, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, 110, 25).stroke()
        .text('Contato 2', maxWidth - 147, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, 110, 25).stroke()

    y = y + 10
    doc.fontSize(12)
        .text(`${cliente?.email}`, 43, y, { align: 'left', width: maxWidth - 80 - 110 * 2 })
        .text(`${cliente?.contato_1}`, maxWidth - 150 - 110 + 3, y, { align: 'left', width: 110 })
        .text(`${cliente?.contato_2}`, maxWidth - 150 + 3, y, { align: 'left', width: 110 })

    y = y + 20
    doc.fontSize(6)
        .text('Endereço', 43, y, { align: 'left' })
        .rect(doc.x - 3, doc.y - 9, maxWidth - 80, 25).stroke()
    y = y + 10
    doc.fontSize(12)
        .text(`${endereco![0]!.logradouro!}, ${endereco![0]!.numero!}, ${endereco![0]!.complemento!} - ${endereco![0]!.bairro!} - ${endereco![0]!.cidade!} - ${endereco![0]!.estado} - CEP: ${endereco![0]!.cep!}`, 43, y, { align: 'left' })

    const carInfoWidth = (maxWidth - 80) / 6;
    y = y + 20
    doc.fontSize(6)
        .text('Marca', 43, y, { align: 'left', width: carInfoWidth + 30 })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth + 30, 25).stroke()
        .text('Modelo', doc.x + carInfoWidth + 30, y, { align: 'left', width: carInfoWidth + 30 })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth + 30, 25).stroke()
        .text('Cor', doc.x + carInfoWidth + 30, y, { align: 'left', width: carInfoWidth })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth, 25).stroke()
        .text(`Placa`, doc.x + carInfoWidth, y, { align: 'left', width: carInfoWidth - 15 })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth - 15, 25).stroke()
        .text('Ano', doc.x + carInfoWidth - 15, y, { align: 'left', width: carInfoWidth - 45 })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth - 45, 25).stroke()
        .text(`KM`, doc.x + carInfoWidth - 45, y, { align: 'left', width: carInfoWidth })
        .rect(doc.x - 3, doc.y - 10, carInfoWidth, 25).stroke()

    y = y + 10;
    doc.fontSize(12)
        .text(`${veiculo?.marca}`, 43, y, { align: 'left', width: carInfoWidth + 30 })
        .text(`${veiculo?.modelo}`, doc.x + carInfoWidth + 30, y, { align: 'left', width: carInfoWidth + 30 })
        .text(`${veiculo?.cor}`, doc.x + carInfoWidth + 30, y, { align: 'left', width: carInfoWidth })
        .text(`${veiculo?.placa}`, doc.x + carInfoWidth, y, { align: 'left', width: carInfoWidth - 15 })
        .text(`${veiculo?.ano}`, doc.x + carInfoWidth - 15, y, { align: 'left', width: carInfoWidth - 45 })
        .text(`${veiculo?.km}`, doc.x + carInfoWidth - 45, y, { align: 'left', width: carInfoWidth })


    y = y + 45
    const servicoWidth = 147.28;
    const descricaoWidth = 160;
    const qtdWidth = 45;
    const valorWidth = 78;
    const totalWidth = 85;
    doc.fontSize(12)
        .text('Serviço', 43, y, { align: 'left', width: servicoWidth })
        .rect(doc.x - 3, doc.y - 25, servicoWidth, 25).stroke()
        .text('Descrição', 43 + servicoWidth, y, { align: 'left', width: descricaoWidth })
        .rect(doc.x - 3, doc.y - 25, descricaoWidth, 25).stroke()
        .text('Qtd.', 43 + servicoWidth + descricaoWidth, y, { align: 'left', width: qtdWidth })
        .rect(doc.x - 3, doc.y - 25, qtdWidth, 25).stroke()
        .text('Valor Unitário', 43 + servicoWidth + descricaoWidth + qtdWidth, y, { align: 'left', width: valorWidth })
        .rect(doc.x - 3, doc.y - 25, valorWidth, 25).stroke()
        .text('Subtotal', 43 + servicoWidth + descricaoWidth + qtdWidth + valorWidth, y, { align: 'left', width: totalWidth })
        .rect(doc.x - 3, doc.y - 25, totalWidth, 25).stroke()
    y = y + 2
    for (let i = 0; i < servicos.length; i++) {
        y = y + 15
        doc.fontSize(10)
            .text(`${servicos[i]?.servico}`, 43, y, { align: 'left', width: servicoWidth, ellipsis: true, lineBreak: false, height: 15 })
            .rect(doc.x - 3, doc.y - 15, servicoWidth, 15).stroke()
            .text(`${servicos[i]?.detalhes}`, 43 + servicoWidth, y, { align: 'left', width: descricaoWidth, ellipsis: true, lineBreak: false, height: 15 })
            .rect(doc.x - 3, doc.y - 15, descricaoWidth, 15).stroke()
            .text(`${servicos[i]?.quantidade}`, 43 + servicoWidth + descricaoWidth, y, { align: 'left', width: qtdWidth, ellipsis: true, lineBreak: false, height: 15 })
            .rect(doc.x - 3, doc.y - 15, qtdWidth, 15).stroke()
            .text(`${utils.monetaryMask(servicos[i]?.precoUnitario)}`, 43 + servicoWidth + descricaoWidth + qtdWidth, y, { align: 'left', width: valorWidth, ellipsis: true, lineBreak: false, height: 15 })
            .rect(doc.x - 3, doc.y - 15, valorWidth, 15).stroke()
            .text(`${utils.monetaryMask(servicos[i]?.quantidade * servicos[i].precoUnitario)}`, 43 + servicoWidth + descricaoWidth + qtdWidth + valorWidth, y, { align: 'left', width: totalWidth, ellipsis: true, lineBreak: false, height: 15 })
            .rect(doc.x - 3, doc.y - 15, totalWidth, 15).stroke()
    }
    y = y + 45
    doc.fontSize(8)
        .text('Garantia do serviço ____ meses. Peças conforme fabricante', 43, y, { align: 'left', width: 352.28 })
        .rect(doc.x - 3, doc.y - 25, 352.28, 25).stroke()
    doc.fontSize(6)
        .text('Valor Total', 395.28, y - 13, { align: 'left', width: 80 })
    doc.fontSize(12)
        .text(`${utils.monetaryMask(total)}`, 395.28, y - 4.625, { align: 'left', width: 163 })
        .rect(doc.x - 3, doc.y - 25, 163, 25).stroke()
    y = y + 25
    doc.fontSize(12)
        .text('Assinatura do responsável:______________________________', 43, y, { align: 'left', width: 352.28 })
        .rect(doc.x - 3, doc.y - 25, 352.28, 25).stroke()
        .text('Obrigado pela preferência!', 395.28, y, { align: 'left', width: 163 })
        .rect(doc.x - 3, doc.y - 25, 163, 25).stroke()
    // Finalize PDF file
    doc.end();
}

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
    },
    Pdf: {
        create: createPdf,
    },
    Printer: {
        printer: async (path: string, options: PrintOptions) => await ipcRenderer.invoke("printer", { path, options }),
        getPrinter: async () => {
            const printers = await getPrinters()
            const devicesNames = printers.map(printer => printer.name)
            const options = { message: 'Selecione uma impressora', buttons: devicesNames }
            const { response } = await ipcRenderer.invoke("newDialog", options)
            return printers[response].deviceId;
        }
    },
})