import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ClientsAll() {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        window.api.Client().getAll().then((clients) => {
            setClients(clients);
        });
    }, []);
    const [busca, setBusca] = useState("");
    return (<>
        <Header />
        <h1 className="title">{"CLIENTES"}</h1>

        <div className="todos">
            <div>
                <label>
                    <span>BUSCAR CLIENTE POR NOME OU CPF/CNPJ</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={busca} onChange={e => { setBusca(e.target.value); }}></input>
                </label>
            </div>
            <table className="table-ordem-servicos">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CPF/CNPJ</th>
                        <th>EMAIL</th>
                        <th>CONTATO 1</th>
                        <th>CONTATO 2</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((cliente, index: number) => {
                        if (busca == '') {
                            return (<tr key={index} onClick={() => navigate(`/Client/${cliente.cpf_cnpj.replace("/", "\\")}`)} >
                                <th>{cliente.name}</th>
                                <th>{cliente.cpf_cnpj}</th>
                                {/* <th>{cliente.email}</th>
                                <th>{cliente.contato_1}</th>
                                <th>{cliente.contato_2}</th> */}
                            </tr>)
                        } else if (cliente.cpf_cnpj.toString().toLowerCase().startsWith(busca.toLowerCase())
                            || cliente.name.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/Client/${cliente.cpf_cnpj.replace("/", "\\")}`)} >
                                <th>{cliente.name}</th>
                                <th>{cliente.cpf_cnpj}</th>
                                {/* <th>{cliente.email}</th>
                                <th>{cliente.contato_1}</th>
                                <th>{cliente.contato_2}</th> */}
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