import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Client from "./../models/Client";
import Client from "../models/Client";
// import Cliente from "../models/cliente";
// import Veiculo from "../models/veiculo";
import utils from "../models/utils";
export default function Index() {
    const [busca, setBusca] = React.useState("");
    const clientes = [] as any[]; //(window as any).api.Cliente.getAll() as any[];
    const veiculos = [] as any[]; // (window as any).api.Veiculo.getAll() as any[];
    return (<div className="index-container">
        <h1 className="index-h1">SGOM</h1>
        <div className="index-top-container">
            <div className="index-top-sub-container">
                <Link to='/TodosClientes'><img src='../public/images/user.png'></img><span>CLIENTES</span></Link>
                <Link to='/TodosVeiculos'><img src='../public/images/sedan.png'></img><span>VEÍCULOS</span></Link>
                <Link to='/TodosServicos'><img src='../public/images/service.png'></img><span>SERVIÇO REALIZADOS</span></Link>
            </div>
        </div>
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
        <button onClick={async () => {
            console.log("TESTE");
            const client = window.api.Client();
            // const client = new Client({ cpf_cnpj: 'asd', name: 'Bruno' })
            console.log(client);
            console.log(await client.insert());
            // console.log((window as any).api.insert(client));
            // console.log(await (window as any).api.database({ method: 'run', query: 'INSERT INTO CLIENT VALUES (?, ?)', params: ['5679', 'Bruno'] }));
            // console.log(await (window as any).api.database({ method: 'get', query: 'SELECT * FROM CLIENT WHERE NAME = ?', params: 'Bruno' }));
            // console.log(await (window as any).api.database({ method: 'all', query: 'SELECT * FROM CLIENT WHERE NAME = ? AND CPF_CNPJ = ?', params: ['Bruno', '5679'] }));
        }}>TESTE</button>
    </div >)
}