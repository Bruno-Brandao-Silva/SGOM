import React from "react";
import { Link } from "react-router-dom";
import utils from "../models/utils";

export default function Index() {
    return (<div className="index-container">
        {/* <div>
            <br />
            <Link to='/FormCadCliente'>FormCadCliente</Link>
            <br />
            <Link to='/FormCadCliente/1'>FormCadCliente/1</Link>
            <br />
            <Link to='/FormCadEndereco/1'>FormCadEndereco/1</Link>
            <br />
            <Link to='/FormCadEndereco/1/1'>FormCadEndereco/1/1</Link>
            <br />
            <Link to='/FormCadServico/'>FormCadServiço</Link>
        </div> */}
        <h1 className="index-h1">SGOM</h1>
        <div className="index-top-container">
            <div className="index-top-sub-container">
                <Link to='/TodosClientes'><img src='../public/images/favicon.png'></img><span>CLIENTES</span></Link>
                <Link to='/AllClientes'><img src='../public/images/favicon.png'></img><span>VEÍCULOS</span></Link>
                <Link to='/AllClientes'><img src='../public/images/favicon.png'></img><span>SERVIÇO REALIZADOS</span></Link>
            </div>
            <div className="index-top-sub-container">
                <Link to='/FormCadCliente'><img src='../public/images/favicon.png'></img><span>CADASTRAR CLIENTE</span></Link>
                <Link to='/Cliente/1'><img src='../public/images/favicon.png'></img><span>Action</span></Link>
                <Link to='/AllClientes'><img src='../public/images/favicon.png'></img><span>Action</span></Link>
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