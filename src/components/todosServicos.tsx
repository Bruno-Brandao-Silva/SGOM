import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Ordem_Servico from "../models/ordem_servico";
export default function todosOrdem_Servicos() {
    const navigate = useNavigate();
    const servicos = (window as any).api.Ordem_Servico.getAll() as Ordem_Servico[];
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
            <div className="todos-container">
                {servicos.map((servico, index: number) =>
                (<Link key={index} to={`/EditServico/${servico.id}`} className="todos-a">
                    <div className="todos-sub-container">
                        <h1>{servico.id}</h1>
                        <h3>{servico.id_cliente}</h3>
                        <p>{servico.placa}</p>
                        <p>{servico.data}</p>
                        <p>{servico.km}</p>
                    </div>
                </Link>))}
            </div>
        </div>
    </>)
}