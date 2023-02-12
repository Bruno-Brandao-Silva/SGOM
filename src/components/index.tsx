import React, { useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../models/Utils";
import Header from "./Header";

export default function Index() {
    const [busca, setBusca] = useState("");
    const [clients, setClients] = useState<Client[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    const [img, setImg] = useState<any>();
    return (<>
        <Header />
        <div>
            <label>
                <span>BUSCAR CLIENTE E VEÍCULO</span>
                <input onFocus={e => Utils.InputsHandleFocus(e)} onBlur={e => Utils.InputsHandleFocusOut(e)} value={busca} onChange={e => setBusca(e.target.value)}></input>
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
    </>)
}