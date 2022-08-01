import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cliente from "../models/cliente";
export default function todosClientes() {
    const navigate = useNavigate();
    const clientes = (window as any).api.Cliente.getAll() as Cliente[];
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
            <div className="todos-container">
                {clientes.map((cliente, index: number) =>
                (<Link key={index} to={`/Cliente/${cliente.id}`} className="todos-a">
                    <div className="todos-sub-container">
                        <h1>{cliente.nome}</h1>
                        <h3>{cliente.cpf}</h3>
                        <p>{cliente.email}</p>
                        <p>{cliente.contato_1}</p>
                        <p>{cliente.contato_2}</p>
                    </div>
                </Link>))}
            </div>
        </div>
    </>)
}