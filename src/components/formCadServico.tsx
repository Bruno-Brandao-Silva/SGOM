// react component for a form to create a new service
import React, { useEffect } from "react";
import utils from "../models/utils";
import { useNavigate, useParams, } from 'react-router-dom';
import Cliente from "../models/cliente";
import Veiculo from "../models/veiculo";
import Ordem_Servico from "../models/ordem_servico";
import Servico from "../models/servico";

export default function FormCadServiço() {
    const navigate = useNavigate();
    const inputs = document.getElementsByTagName('input');

    const { id_cliente, id } = useParams();

    const editOrdemServico = (window as any).api.Ordem_Servico.get(id) as Ordem_Servico;
    const editServico = (window as any).api.Servico.getAllByOrdem_Servico(id) as Servico[];
    const cliente: Cliente = (window as any).api.Cliente.get(editOrdemServico ? editOrdemServico.id_cliente : id_cliente) as Cliente;
    const veiculos = (window as any).api.Veiculo.getAllByCliente(id) as Veiculo[];
    const veiculo = (window as any).api.Veiculo.get(editOrdemServico?.placa) as Veiculo;

    const date = new Date()
    const dataAtual = date.toLocaleDateString().replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')
    const [, setReact] = React.useState({});
    const [data, setData] = React.useState(editOrdemServico?.data || dataAtual);
    const [marca, setMarca] = React.useState(veiculo?.marca || "");
    const [modelo, setModelo] = React.useState(veiculo?.modelo || "");
    const [placa, setPlaca] = React.useState(veiculo?.placa || useParams().placa || "");
    const [cor, setCor] = React.useState(veiculo?.cor || "");
    const [ano, setAno] = React.useState(veiculo?.ano.toString() || "");
    const [km, setKm] = React.useState(editOrdemServico?.km.toString() || "");
    const [quantidadeServicos, setQuantidadeServicos] = React.useState(editServico?.length || 0);


    let tempServico: any = [], tempDetalhes: any = [], tempPrecoUnitario: any = [], tempQuantidade: any = []
    for (let i = 0; i < editServico?.length; i++) {
        tempServico[i] = editServico[i].servico
        tempDetalhes[i] = editServico[i].detalhes
        tempPrecoUnitario[i] = editServico[i].precoUnitario.toString()
        tempQuantidade[i] = editServico[i].quantidade.toString()
    }

    const [servico, setServico] = React.useState<string[]>(tempServico);
    const [detalhes, setDetalhes] = React.useState<string[]>(tempDetalhes);
    const [precoUnitario, setPrecoUnitario] = React.useState<string[]>(tempPrecoUnitario);
    const [quantidade, setQuantidade] = React.useState<string[]>(tempQuantidade);
    useEffect(() => {
        setDetalhes(detalhes)
    }, [detalhes])
    const servicosForm: JSX.Element[] = []
    if (servico && servico.length > 0) {
        for (let i = 0; i < quantidadeServicos; i++) {
            servicosForm.push(<div key={i} className="content-double-label">
                <label>
                    <span>SERVIÇO</span>
                    <input name="servico" list="servico" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={servico[i]} onChange={e => {
                        servico[i] = e.target.value;
                        setServico(servico)
                        setReact({})
                    }} required />
                </label>
                <label>
                    <span>DETALHES</span>
                    <input name="detalhes" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={detalhes[i]} onChange={e => {
                        detalhes[i] = e.target.value;
                        setDetalhes(detalhes)
                        setReact({})
                    }} required />
                </label>
                <label>
                    <span>QUANTIDADE</span>
                    <input name="quantidade" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={quantidade[i]} onChange={e => {
                        quantidade[i] = e.target.value;
                        setQuantidade(quantidade)
                        setReact({})
                    }} required />
                </label>
                <label>
                    <span>PREÇO UNITÁRIO</span>
                    <input name="precoUnitario" type="number" step='0.01' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={precoUnitario[i]} onChange={e => {
                        precoUnitario[i] = e.target.value;
                        setPrecoUnitario(precoUnitario)
                        setReact({})
                    }} required />
                </label>
            </div>)
        }
    }
    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, [quantidadeServicos])
    return (<>
        <form id="formCadServico" >
            <div className="container-btn-top">
                <button className="btn-return" type="button" onClick={async () => { navigate(-1) }}>
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
                    <input name="cliente" list="cliente" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cliente?.nome} onChange={() => { }} disabled required />

                </label>
                <label>
                    <span>CPF</span>
                    <input name="cpf" list="cpf" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cliente?.cpf} onChange={() => { }} disabled required />
                </label>
            </div>
            <label>
                <span className="span-active">DATA</span>
                <input name="data" type="date" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={data} onChange={e => setData(e.target.value)} required />
            </label>
            <div className="content-double-label">
                <label>
                    <span>MARCA</span>
                    <input name="marca" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={marca} onChange={e => setMarca(e.target.value)} required />
                </label>
                <label>
                    <span>MODELO</span>
                    <input name="modelo" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={modelo} onChange={e => setModelo(e.target.value)} required />
                </label>
                <label>
                    <span>COR</span>
                    <input name="cor" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cor} onChange={e => setCor(e.target.value)} required />
                </label>
            </div>
            <div className="content-double-label">
                <label>
                    <span>PLACA</span>
                    <input name="placa" list="placa" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={placa} onChange={async e => {
                        setPlaca(e.target.value)
                        const veiculo = await (window as any).api.Veiculo.get(e.target.value)
                        if (veiculo) {
                            setMarca(veiculo.marca || "")
                            setModelo(veiculo.modelo || "")
                            setCor(veiculo.cor || "")
                            setAno(veiculo.ano.toString() || "")
                        }
                        await utils.sleep(10)
                        for (let i = 0; i < inputs.length; i++) {
                            if (inputs[i].value != '') {
                                utils.InputsHandleFocus({ target: inputs[i] });
                            }
                        }
                    }} required />
                    <datalist id="placa" >
                        {veiculos?.map((veiculo, index: number) => {
                            return <option key={index} value={veiculo.placa}></option>
                        })}
                    </datalist>
                </label>
                <label>
                    <span>ANO</span>
                    <input name="ano" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={ano} onChange={e => setAno(e.target.value)} required />
                </label>
                <label>
                    <span>KM</span>
                    <input name="km" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={km} onChange={e => setKm(e.target.value)} required />
                </label>
            </div>
            <div>
                <div >
                    {servicosForm}
                </div>
            </div>
            <div className="btn-submit">
                <button id="pt1" type="button" onClick={async () => {
                    const formCadServico = document.getElementById('formCadServico') as any
                    try {
                        if (!formCadServico.checkValidity()) {
                            formCadServico.reportValidity()
                            return
                        }
                        if (!id) {
                            let include = false
                            if (veiculos.length > 0) {
                                veiculos.forEach(veiculo => {
                                    if (veiculo.placa == placa) {
                                        include = true
                                    }
                                })
                            }
                            const veiculo = new (window as any).api.Veiculo.veiculo(placa, id_cliente, marca, modelo, cor, ano, km)
                            const veiculoR = !include ? (window as any).api.Veiculo.insert(veiculo) : (window as any).api.Veiculo.update(veiculo)
                            console.log(veiculoR)
                            const servicoTemp = (window as any).api.Ordem_Servico.ordem_servico(undefined, placa, km, id_cliente, data)
                            const servicoR = (window as any).api.Ordem_Servico.insert(servicoTemp)
                            console.log(servicoR)
                            for (let i = 0; i < quantidadeServicos; i++) {
                                console.log(servico[i], detalhes[i], quantidade[i], precoUnitario[i])
                                const servicoRealizado = (window as any).api.Servico.servico(undefined, servicoR.lastInsertRowid, servico[i], detalhes[i], quantidade[i], precoUnitario[i])
                                const servicoRealizadoR = (window as any).api.Servico.insert(servicoRealizado)
                                console.log(servicoRealizadoR)
                            }

                            alert('Ordem de Serviço cadastrada com sucesso!')
                            // navigate('/FormCadEndereco/' + response.id)
                        } else {
                            const veiculo = new (window as any).api.Veiculo.veiculo(placa, editOrdemServico.id_cliente, marca, modelo, cor, ano, km)
                            const veiculoR = (window as any).api.Veiculo.update(veiculo)
                            if (veiculoR.changes == 0) {
                                throw new Error("Não foi possível atualizar o veículo");
                            }
                            const servicoTemp = (window as any).api.Ordem_Servico.ordem_servico(id, placa, km, editOrdemServico.id_cliente, data)
                            const servicoR = (window as any).api.Ordem_Servico.update(servicoTemp)
                            if (servicoR.changes == 0) {
                                throw new Error("Não foi possível atualizar a ordem de serviço");
                            }
                            editServico.forEach(servico => {
                                const toBeDeleted = (window as any).api.Servico.delete({ id: servico.id })
                                if (toBeDeleted.changes == 0) {
                                    throw new Error("Não foi possível excluir o serviço antigo");
                                }
                            });
                            for (let i = 0; i < quantidadeServicos; i++) {
                                const servicoRealizado = (window as any).api.Servico.servico(undefined, id, servico[i], detalhes[i], quantidade[i], precoUnitario[i])
                                const servicoRealizadoR = (window as any).api.Servico.insert(servicoRealizado)
                                if (servicoRealizadoR.changes == 0) {
                                    throw new Error("Não foi possível inserir o serviço");
                                }
                            }

                            alert('Ordem de Serviço cadastrada com sucesso!')
                            // navigate('/FormCadEndereco/' + response.id)
                        }
                        // navigate(-1)
                    } catch (error) {
                        alert(error.message)
                    }
                }}>SALVAR</button>
                <button type='button' onClick={() => {
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
                }}>SUB</button>
            </div>
        </form>
    </>);
}