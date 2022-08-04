import React from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/utils";
import Cliente from "../models/cliente";
export default function todosClientes() {
    const navigate = useNavigate();
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
            <h1 className="index-h1">TODOS OS CLIENTES</h1>
            <div className="toolbar index-top-sub-container">
                <Link to='/FormCadCliente' className="todo-a"><img src='../public/images/favicon.png'></img><span>CADASTRAR CLIENTE</span></Link>
            </div>
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
                    {clientes.map((cliente, index: number) => {
                        if (busca == '') {
                            return (<tr key={index} onClick={() => navigate(`/Cliente/${cliente.id}`)} >
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                                <th>{cliente.email}</th>
                                <th>{cliente.contato_1}</th>
                                <th>{cliente.contato_2}</th>
                            </tr>)
                        } else if (cliente.cpf.toString().toLowerCase().startsWith(busca.toLowerCase())
                            || cliente.nome.toString().toLowerCase().startsWith(busca.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/Cliente/${cliente.id}`)} >
                                <th>{cliente.nome}</th>
                                <th>{cliente.cpf}</th>
                                <th>{cliente.email}</th>
                                <th>{cliente.contato_1}</th>
                                <th>{cliente.contato_2}</th>
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