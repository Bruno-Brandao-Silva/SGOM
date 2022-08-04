import React from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/utils";
import Ordem_Servico from "../models/ordem_servico";
import Cliente from "../models/cliente";
import Servico from "../models/servico";

export default function todosOrdem_Servicos() {
    const navigate = useNavigate();
    const ordem_servicos = (window as any).api.Ordem_Servico.getAll() as Ordem_Servico[]
    const clientes = (window as any).api.Cliente.getAll() as Cliente[]
    const servicos = (window as any).api.Servico.getAll() as Servico[]
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
            <h1 className="index-h1">TODOS OS SERVIÇOS</h1>
            <div>
                <label>
                    <span>BUSCAR SERVIÇO POR PLACA</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={busca} onChange={e => { setBusca(e.target.value); }}></input>
                </label>
            </div>
            <table className="table-ordem-servicos">
                <thead>
                    <tr>
                        <th>PLACA</th>
                        <th>CLIENTE</th>
                        <th>CPF/CNPJ</th>
                        <th>DATA</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {ordem_servicos.map((servico, index: number) => {
                        const cliente = clientes.find(c => c.id == servico.id_cliente)
                        let total = 0;
                        servicos.forEach(s => {
                            if (s.id_servico == servico.id) {
                                total += s.quantidade * s.precoUnitario
                            }
                        })

                        if (busca == '') {
                            return (<tr key={index} onClick={() => navigate(`/EditServico/${servico.id}`)} >
                                <th>{servico.placa}</th>
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                                <th>{servico.data.replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`R$ ${total}`}</th>
                            </tr>)
                        } else if (servico.placa.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/EditServico/${servico.id}`)} >
                                <th>{servico.placa}</th>
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                                <th>{servico.data.replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`R$ ${total}`}</th>
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