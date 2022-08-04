import React from "react";
import { Link } from "react-router-dom";
import Cliente from "../models/cliente";
import Veiculo from "../models/veiculo";
import utils from "../models/utils";

export default function Index() {
    const [busca, setBusca] = React.useState("");
    const clientes = (window as any).api.Cliente.getAll() as Cliente[];
    const veiculos = (window as any).api.Veiculo.getAll() as Veiculo[];
    return (<div className="index-container">
        <h1 className="index-h1">SGOM</h1>
        <div className="index-top-container">
            <div className="index-top-sub-container">
                <Link to='/TodosClientes'><img src='../public/images/favicon.png'></img><span>CLIENTES</span></Link>
                <Link to='/TodosVeiculos'><img src='../public/images/favicon.png'></img><span>VEÍCULOS</span></Link>
                <Link to='/TodosServicos'><img src='../public/images/favicon.png'></img><span>SERVIÇO REALIZADOS</span></Link>
            </div>
        </div>
        <button type="button" onClick={async () => {
            const resp = await (window as any).api.Dialog.showMessageBox({ type: 'confirm', message: 'Hola?' })
            console.log(resp)
        }}>Hello World</button>
        <div>
            <label>
                <span>BUSCAR CLIENTE E VEÍCULO</span>
                <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={busca} onChange={e => setBusca(e.target.value)}></input>
            </label>
        </div>
        <div>
            <span>RESULTADOS</span>
            <div className="todos-container">
                {clientes.map((cliente, index: number) => {
                    if (busca != "" && (cliente.nome.toString().toLowerCase().startsWith(busca.toLowerCase()) || cliente.cpf.toString().replace(/\D/g, '').toLowerCase().startsWith(busca.toLowerCase()))) {
                        return (<Link key={index} to={`/Cliente/${cliente.id}`} className="todos-a">
                            <div className="todos-sub-container">
                                <h1>{cliente.nome}</h1>
                                <h3>{cliente.cpf}</h3>
                                <p>{cliente.email}</p>
                                <p>{cliente.contato_1}</p>
                                <p>{cliente.contato_2}</p>
                            </div>
                        </Link>)
                    }
                })}
                {veiculos.map((veiculo, index: number) => {
                    if (busca != "" && veiculo.placa.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                        return (<Link key={index} to={`/Cliente/${veiculo.placa}`} className="todos-a">
                            <div className="todos-sub-container">
                                <h1>{veiculo.placa}</h1>
                                <h3>{veiculo.marca}</h3>
                                <p>{veiculo.modelo}</p>
                                <p>{veiculo.cor}</p>
                                <p>{veiculo.km}</p>
                            </div>
                        </Link>)
                    }
                })}
            </div>
        </div>
    </div>)
}