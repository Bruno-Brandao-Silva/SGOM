import React, { useEffect, useState } from "react";
import { useNavigate, useParams, } from 'react-router-dom';
import utils from "../models/utils";
import Client from "../models/Client";
import Vehicle from "../models/Vehicle";
import Service from "../models/Service";

export default function FormCadServiço() {
    const navigate = useNavigate();
    const inputs = document.getElementsByTagName('input');

    const { cpf_cnpj, id } = useParams();

    // const service = window.api.Ordem_Servico.get(id) as any;
    // const editServico = window.api.Servico.getAllByOrdem_Servico(id) as any[];
    // const client = window.api.Cliente.get(service ? service.id_cliente : cpf_cnpj) as Client;
    // const vehicles = window.api.Veiculo.getAllByCliente(cpf_cnpj) as Vehicle[];
    // const vehicle = window.api.Veiculo.get(service?.placa) as Vehicle;

    const [client, setClient] = useState<Client>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [service, setService] = useState<Service>();

    useEffect(() => {
        window.api.Client().getByCpfCnpj(cpf_cnpj).then((client: Client) => {
            setClient(client);
        });
        window.api.Vehicle().getByCpfCnpj(cpf_cnpj).then((vehicles: Vehicle[]) => {
            setVehicles(vehicles);
        });
        window.api.Service().getById(+id).then((service: Service) => {
            setService(service);
            window.api.Vehicle().getByPlate(service.id_plate).then((vehicle: Vehicle) => {
                setVehicle(vehicle);
            });
        });
    }, []);


    const dataAtual = new Date().toLocaleDateString().replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')
    const [, setReact] = useState({});
    const [date, setDate] = useState(service?.date || dataAtual);
    const [brand, setBrand] = useState(vehicle?.brand || "");
    const [model, setModel] = useState(vehicle?.model || "");
    const [id_plate, setId_plate] = useState(vehicle?.id_plate || useParams().placa || "");
    const [color, setColor] = useState(vehicle?.color || "");
    const [year, setYear] = useState(vehicle?.year.toString() || "");
    // const [km, setKm] = useState(service?.km.toString() || "");

    const [servico, setServico] = useState<string[]>();
    const [detalhes, setDetalhes] = useState<string[]>();
    const [precoUnitario, setPrecoUnitario] = useState<string[]>();
    const [quantidade, setQuantidade] = useState<string[]>();
    useEffect(() => {
        setDetalhes(detalhes)
    }, [detalhes])
    const servicosForm: JSX.Element[] = []
    // if (servico && servico.length > 0) {
    //     for (let i = 0; i < quantidadeServicos; i++) {
    //         servicosForm.push(<div key={i} className="content-double-label">
    //             <label>
    //                 <span>SERVIÇO</span>
    //                 <input name="servico" list="servico" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={servico[i]} onChange={e => {
    //                     servico[i] = e.target.value;
    //                     setServico(servico)
    //                     setReact({})
    //                 }} required />
    //             </label>
    //             <label>
    //                 <span>DETALHES</span>
    //                 <input name="detalhes" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={detalhes[i]} onChange={e => {
    //                     detalhes[i] = e.target.value;
    //                     setDetalhes(detalhes)
    //                     setReact({})
    //                 }} required />
    //             </label>
    //             <label>
    //                 <span>QUANTIDADE</span>
    //                 <input name="quantidade" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={quantidade[i]} onChange={e => {
    //                     quantidade[i] = e.target.value;
    //                     setQuantidade(quantidade)
    //                     setReact({})
    //                 }} required />
    //             </label>
    //             <label>
    //                 <span>PREÇO UNITÁRIO</span>
    //                 <input name="precoUnitario" type="number" step='0.01' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={precoUnitario[i]} onChange={e => {
    //                     precoUnitario[i] = e.target.value;
    //                     setPrecoUnitario(precoUnitario)
    //                     setReact({})
    //                 }} required />
    //             </label>
    //         </div>)
    //     }
    // }
    // useEffect(() => {
    //     for (let i = 0; i < inputs.length; i++) {
    //         if (inputs[i].value != '') {
    //             utils.InputsHandleFocus({ target: inputs[i] });
    //         }
    //     }
    // }, [quantidadeServicos])
    return (<>
        <form id="formCadServico" >
            <div className="container-btn-top">
                <button className="btn-return" type="button" onClick={() => { navigate(-1) }}>
                    <img src="../public/images/back.svg" alt="Voltar" />
                </button>
                <button className="btn-close" type="button" onClick={() => navigate('/')}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1>{id ? 'Editar Ordem de Serviço' : 'Cadastrar Ordem de Serviço'}</h1>
            <div className="content-double-label">
                <label>
                    <span>CLIENTE</span>
                    <input name="cliente" list="cliente" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={client?.name} onChange={() => { }} disabled required />

                </label>
                <label>
                    <span>CPF</span>
                    <input name="cpf" list="cpf" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={client?.cpf_cnpj} onChange={() => { }} disabled required />
                </label>
            </div>
            <label>
                <span className="span-active">DATA</span>
                <input name="data" type="date" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={date.toString()} onChange={e => setDate(new Date(e.target.value))} required />
            </label>
            <div className="content-double-label">
                <label>
                    <span>MARCA</span>
                    <input name="marca" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={brand} onChange={e => setBrand(e.target.value)} required />
                </label>
                <label>
                    <span>MODELO</span>
                    <input name="modelo" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={model} onChange={e => setModel(e.target.value)} required />
                </label>
                <label>
                    <span>COR</span>
                    <input name="cor" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={color} onChange={e => setColor(e.target.value)} required />
                </label>
            </div>
            <div className="content-double-label">
                <label>
                    <span>PLACA</span>
                    <input name="placa" list="placa" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={id_plate} onChange={async e => {
                        setId_plate(e.target.value)
                        const veiculo = await window.api.Vehicle().getByPlate(e.target.value)
                        if (veiculo) {
                            setBrand(veiculo.brand || "")
                            setModel(veiculo.model || "")
                            setColor(veiculo.color || "")
                            setYear(veiculo.year.toString() || "")
                        }
                        await utils.sleep(10)
                        for (let i = 0; i < inputs.length; i++) {
                            if (inputs[i].value != '') {
                                utils.InputsHandleFocus({ target: inputs[i] });
                            }
                        }
                    }} required />
                    <datalist id="placa" >
                        {vehicles?.map((veiculo, index: number) => {
                            return <option key={index} value={veiculo.id_plate}></option>
                        })}
                    </datalist>
                </label>
                <label>
                    <span>ANO</span>
                    <input name="ano" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={year} onChange={e => setYear(e.target.value)} required />
                </label>
                {/* <label>
                    <span>KM</span>
                    <input name="km" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={km} onChange={e => setKm(e.target.value)} required />
                </label> */}
            </div>
            <div>
                <div >
                    {servicosForm}
                </div>
            </div>
            <div className="btn-submit">
                <button id="pt1" type="button" onClick={async () => {
                    const formCadServico = document.getElementById('formCadServico') as any
                    // try {
                    //     if (!formCadServico.checkValidity()) {
                    //         formCadServico.reportValidity()
                    //         return
                    //     }
                    //     if (!id) {
                    //         let include = false
                    //         if (vehicles.length > 0) {
                    //             vehicles.forEach(veiculo => {
                    //                 if (veiculo.id_plate == id_plate) {
                    //                     include = true
                    //                 }
                    //             })
                    //         }
                    //         const veiculo = new window.api.Veiculo.veiculo(id_plate, cpf_cnpj, brand, model, color, year, km)
                    //         const veiculoR = !include ? window.api.Veiculo.insert(veiculo) : window.api.Veiculo.update(veiculo)
                    //         if (veiculoR.changes == 0) {
                    //             throw new Error("Não foi possível atualizar o veículo");
                    //         }
                    //         const servicoTemp = window.api.Ordem_Servico.ordem_servico(undefined, id_plate, km, cpf_cnpj, date)
                    //         const servicoR = window.api.Ordem_Servico.insert(servicoTemp)
                    //         for (let i = 0; i < quantidadeServicos; i++) {
                    //             const servicoRealizado = window.api.Servico.servico(undefined, servicoR.lastInsertRowid, servico[i], detalhes[i], quantidade[i], precoUnitario[i])
                    //             const servicoRealizadoR = window.api.Servico.insert(servicoRealizado)
                    //             if (servicoRealizadoR.changes == 0) {
                    //                 throw new Error("Não foi possível inserir o serviço");
                    //             }
                    //         }
                    //         window.api.Pdf.create(servicoR.lastInsertRowid);
                    //         (async () => {
                    //             await window.api.Dialog.showMessageBox({ message: 'Ordem de Serviço cadastrada com sucesso!' })
                    //             navigate(-1)
                    //         })();
                    //     } else {
                    //         const veiculo = new window.api.Veiculo.veiculo(id_plate, service.id_cliente, brand, model, color, year, km)
                    //         const veiculoR = window.api.Veiculo.update(veiculo)
                    //         if (veiculoR.changes == 0) {
                    //             throw new Error("Não foi possível atualizar o veículo");
                    //         }
                    //         const servicoTemp = window.api.Ordem_Servico.ordem_servico(id, id_plate, km, service.id_cliente, date)
                    //         const servicoR = window.api.Ordem_Servico.update(servicoTemp)
                    //         if (servicoR.changes == 0) {
                    //             throw new Error("Não foi possível atualizar a ordem de serviço");
                    //         }
                    //         editServico.forEach(servico => {
                    //             const toBeDeleted = window.api.Servico.delete({ id: servico.id })
                    //             if (toBeDeleted.changes == 0) {
                    //                 throw new Error("Não foi possível excluir o serviço antigo");
                    //             }
                    //         });
                    //         for (let i = 0; i < quantidadeServicos; i++) {
                    //             const servicoRealizado = window.api.Servico.servico(undefined, id, servico[i], detalhes[i], quantidade[i], precoUnitario[i])
                    //             const servicoRealizadoR = window.api.Servico.insert(servicoRealizado)
                    //             if (servicoRealizadoR.changes == 0) {
                    //                 throw new Error("Não foi possível inserir o serviço");
                    //             }
                    //         }
                    //         (async () => {
                    //             window.api.Pdf.create(id);
                    //             const printer = await window.api.Printer.getPrinter();
                    //             window.api.Printer.printer('./output/1.pdf', { printer: printer });
                    //         })();
                    //         (async () => {
                    //             await window.api.Dialog.showMessageBox({ message: 'Ordem de Serviço cadastrada com sucesso!' })
                    //             navigate(-1)
                    //         })();
                    //     }
                    // } catch (error) {
                    //     (async () => {
                    //         await window.api.Dialog.showMessageBox({ type: 'error', message: error.message })
                    //     })();
                    // }
                }}>SALVAR</button>
                {/* <button type='button' onClick={() => {
                    setServico([...servico, ''])
                    setDetalhes([...detalhes, ''])
                    setQuantidade([...quantidade, ""])
                    setPrecoUnitario([...precoUnitario, ""])
                    setQuantidadeServicos(quantidadeServicos + 1)
                }}>ADD</button>
                <button type='button' onClick={() => {
                    if (quantidadeServicos > 0) {
                        setQuantidadeServicos(quantidadeServicos - 1)
                        servico.splice(servico.length - 1, 1)
                        setServico(servico)
                        detalhes.splice(detalhes.length - 1, 1)
                        setDetalhes(detalhes)
                        quantidade.splice(quantidade.length - 1, 1)
                        setQuantidade(quantidade)
                        precoUnitario.splice(precoUnitario.length - 1, 1)
                        setPrecoUnitario(precoUnitario)
                    }
                }}>SUB</button> */}
            </div>
        </form>
    </>);
}