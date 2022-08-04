import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cliente from "../models/cliente";
import utils from "../models/utils";
import Veiculo from "../models/veiculo";
export default function todosVeiculos() {
    const navigate = useNavigate();
    navigate
    const veiculos = (window as any).api.Veiculo.getAll() as Veiculo[];
    const clientes = (window as any).api.Cliente.getAll() as Cliente[];
    const [busca, setBusca] = React.useState("");
    return (<>
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
                    {veiculos.map((veiculo, index: number) => {
                        const cliente = clientes.find(c => c.id == veiculo.id_cliente)
                        if (busca == '') {
                            return (<tr key={index} onClick={() => navigate(`/FormCadVeiculo/${veiculo.id_cliente}/${veiculo.placa}`)} >
                                <th>{veiculo.placa}</th>
                                <th>{veiculo.marca}</th>
                                <th>{veiculo.modelo}</th>
                                <th>{veiculo.ano}</th>
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                            </tr>)
                        } else if (veiculo.placa.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/FormCadVeiculo/${veiculo.id_cliente}/${veiculo.placa}`)} >
                                <th>{veiculo.placa}</th>
                                <th>{veiculo.marca}</th>
                                <th>{veiculo.modelo}</th>
                                <th>{veiculo.ano}</th>
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                            </tr>)
                        }
                    })}
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