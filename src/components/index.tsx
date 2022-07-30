import React from "react";
import { Link } from "react-router-dom";
import utils from "../models/utils";

export default function Index() {
    return (<div className="index-container">
        <h1 className="index-h1">SGOM</h1>
        <div className="index-top-container">
            <div className="index-top-sub-container">
                <Link to='/TodosClientes'><img src='../public/images/favicon.png'></img><span>CLIENTES</span></Link>
                <Link to='/TodosVeiculos'><img src='../public/images/favicon.png'></img><span>VEÍCULOS</span></Link>
                <Link to='/TodosServicos'><img src='../public/images/favicon.png'></img><span>SERVIÇO REALIZADOS</span></Link>
            </div>
        </div>
        <div>
            <label>
                <span>BUSCAR CLIENTE E VEÍCULO</span>
                <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)}></input>
            </label>
        </div>
        <div>
            <span>RESULTADOS</span>
        </div>
    </div>)
}