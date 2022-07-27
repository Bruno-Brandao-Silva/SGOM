// react component for a form to create a new service
import React, { useEffect } from "react";
import utils from "../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Cliente from "../models/cliente";
import UnitCliente from "./unitCliente";

export default function FormCadServiço() {
    const date = new Date()
    let dataAtual = date.toLocaleDateString()
    dataAtual = dataAtual.replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')
    const [cliente, setCliente] = React.useState("");
    const [data, setData] = React.useState(dataAtual);
    const [marca, setMarca] = React.useState("");
    const [modelo, setModelo] = React.useState("");
    const [placa, setPlaca] = React.useState("");
    const [cor, setCor] = React.useState("");
    const [ano, setAno] = React.useState("");
    const [km, setKm] = React.useState("");
    const navigate = useNavigate();
    const { id_cliente, id } = useParams();
    const clientes = (window as any).api.Cliente.getAll();
    // const servico = new Servico(1, 2, 'realizado...', 'detalhes...', 5, 2.25);
    // console.log(servico)
    // console.log(clientes)
    return (<>
        <form id="formCadEndereco" className="section-cad-cliente-pt1">
            <div className="container-btn-top">
                <div></div>
                <button type="button" className="btn-close" onClick={() => navigate('/')}>
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
                    <input name="cliente" list="cliente" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cliente} onChange={e => setCliente(e.target.value)} required />
                    <datalist id="cliente" onClick={e => { console.log('afs') }}>
                        {clientes.map((cliente: Cliente) => {
                            return <option key={cliente.id} onClick={(e) => { console.log('OBA' + e) }} value={cliente.nome}>{cliente.cpf}</option>
                        })}
                    </datalist>
                </label>
                <label>
                    <span className="span-active">DATA</span>
                    <input name="data" type="date" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={data} onChange={e => setData(e.target.value)} required />
                </label>
            </div>
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
                    <input name="placa" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={placa} onChange={e => setPlaca(e.target.value)} required />
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
            <div className="btn-submit">
                <button id="pt1" type="button" onClick={async () => {
                    console.log(dataAtual)
                    // const formCadCliente = document.getElementById('formCadCliente') as any
                    // try {
                    //     if (!formCadCliente.checkValidity()) {
                    //         formCadCliente.reportValidity()
                    //         return
                    //     }

                    //     let response
                    //     if (!id) {
                    //         const cliente = (window as any).api.Cliente.cliente(undefined, cpf, nome, email, contato_1, contato_2)
                    //         response = (window as any).api.Cliente.insert(cliente)
                    //         navigate('/FormCadEndereco/' + response.id)
                    //     } else {
                    //         const cliente = (window as any).api.Cliente.cliente(id, cpf, nome, email, contato_1, contato_2)
                    //         response = (window as any).api.Cliente.update(cliente)
                    //         navigate('/')
                    //     }
                    // } catch (error) {
                    //     console.log(error)
                    // }
                }}>{1 ? 'SALVAR' : 'CONTINUAR'}</button>
            </div>
        </form>
        <div>
            {clientes!.map((cliente: Cliente, index: number) => {
                return <UnitCliente key={index} cliente={cliente} />
            })}
        </div>
    </>);
}