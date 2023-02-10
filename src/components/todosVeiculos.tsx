import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/utils";
import Header from "./Header";

export default function todosVeiculos() {
    const navigate = useNavigate();
    const [veiculos, setVeiculos] = useState<Vehicle[]>([]);
    const [clientes, setClientes] = useState<Client[]>([]);
    useEffect(() => {
        window.api.Vehicle().getAll().then((veiculos) => {
            setVeiculos(veiculos);
        });
        window.api.Client().getAll().then((clientes) => {
            setClientes(clientes);
        });
    }, []);

    const [busca, setBusca] = React.useState("");
    return (<>
        <Header />
        <div className="todos">
            <div id="close" className="container-btn-top">
                <div></div>
                <button type="button" className="btn-close" onClick={() => {
                    navigate('/')
                }}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1 className="index-h1">TODOS OS VEÍCULOS</h1>
            <div>
                <label>
                    <span>BUSCAR VEÍCULO POR PLACA</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={busca} onChange={e => { setBusca(e.target.value); }}></input>
                </label>
            </div>
            <table className="table-ordem-servicos">
                <thead>
                    <tr>
                        <th>PLACA</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>ANO</th>
                        <th>CLIENTE</th>
                        <th>CPF/CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {(veiculos && clientes) ? veiculos.map((veiculo, index: number) => {
                        const cliente = clientes?.find(c => c.cpf_cnpj == veiculo.cpf_cnpj)
                        if (busca == '') {
                            return (<tr key={index} onClick={() => navigate(`/VehicleRegForm/${veiculo.cpf_cnpj.replace("/", "\\")}/${veiculo.id_plate}`)} >
                                <th>{veiculo.id_plate}</th>
                                <th>{veiculo.brand}</th>
                                <th>{veiculo.model}</th>
                                <th>{veiculo.year}</th>
                                <th>{cliente?.name}</th>
                                <th>{cliente?.cpf_cnpj}</th>
                            </tr>)
                        } else if (veiculo.id_plate.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/VehicleRegForm/${veiculo.cpf_cnpj.replace("/", "\\")}/${veiculo.id_plate}`)} >
                                <th>{veiculo.id_plate}</th>
                                <th>{veiculo.brand}</th>
                                <th>{veiculo.model}</th>
                                <th>{veiculo.year}</th>
                                <th>{cliente?.name}</th>
                                <th>{cliente?.cpf_cnpj}</th>
                            </tr>)
                        }
                    }) : null}
                </tbody>
                <tfoot>
                    <tr>
                        {/* <th>OLA FOOTER</th> */}
                    </tr>
                </tfoot>
            </table>
        </div>
    </>)
}