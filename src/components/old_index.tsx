import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../models/utils";
export default function Index() {
    const [busca, setBusca] = useState("");
    const [clients, setClients] = useState<Client[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    useEffect(() => {
        window.api.Client().getAll().then((clients) => setClients(clients));
        window.api.Vehicle().getAll().then((vehicles) => setVehicles(vehicles));
    }, []);
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
                {clients?.map((client, index: number) => {
                    if (busca != "" && (client.name.toString().toLowerCase().startsWith(busca.toLowerCase()) || client.cpf_cnpj.toString().replace(/\D/g, '').toLowerCase().startsWith(busca.toLowerCase()))) {
                        return (<Link key={index} to={`/Cliente/${client.cpf_cnpj}`} className="todos-a">
                            <div className="todos-sub-container">
                                <h1>{client.name}</h1>
                                <h3>{client.cpf_cnpj}</h3>
                            </div>
                        </Link>)
                    }
                })}
                {vehicles?.map((veiculo, index: number) => {
                    if (busca != "" && veiculo.id_plate.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                        return (<Link key={index} to={`/Cliente/${veiculo.id_plate}`} className="todos-a">
                            <div className="todos-sub-container">
                                <h1>{veiculo.id_plate}</h1>
                                <h3>{veiculo.brand}</h3>
                                <p>{veiculo.model}</p>
                                <p>{veiculo.color}</p>
                                <p>{veiculo.km}</p>
                            </div>
                        </Link>)
                    }
                })}
            </div>
        </div>
    </div >)
}