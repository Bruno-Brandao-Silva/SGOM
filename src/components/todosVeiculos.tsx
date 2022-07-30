import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Veiculo from "../models/veiculo";
export default function todosVeiculos() {
    const navigate = useNavigate();
    const veiculos = (window as any).api.Veiculo.getAll() as Veiculo[];
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
                {veiculos.map((veiculo, index: number) =>
                (<Link key={index} to={`/FormCadVeiculo/${veiculo.id_cliente}/${veiculo.placa}`} className="todos-a">
                    <div className="todos-sub-container">
                        <h1>{veiculo.placa}</h1>
                        <h3>{veiculo.marca}</h3>
                        <p>{veiculo.modelo}</p>
                        <p>{veiculo.cor}</p>
                        <p>{veiculo.km}</p>
                    </div>
                </Link>))}
            </div>
        </div>
    </>)
}