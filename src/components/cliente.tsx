import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Endereco from "../models/endereco";

export default function Cliente() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cliente = (window as any).api.Cliente.get(id);
    const enderecos = (window as any).api.Endereco.getAllByCliente(id) as Endereco[];
    return (<>
        <div className="todos-clientes">
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
            <h1 className="index-h1">CLIENTE</h1>
                <Link to={`/FormCadServico/${id}`}>ADICIONAR SERVIÇO</Link>
            <div className="todos-clientes-container">
                {<div className="todos-clientes-sub-container">
                    <h1>{cliente.nome}</h1>
                    <h3>{cliente.cpf}</h3>
                    <p>{cliente.email}</p>
                    <p>{cliente.contato_1}</p>
                    <p>{cliente.contato_2}</p>
                </div>}
                {enderecos.map((endereco, index: number) => (<div key={index} className="todos-clientes-sub-container">
                    <p>{endereco.logradouro}</p>
                    <p>{endereco.complemento}</p>
                    <p>{endereco.bairro}</p>
                    <p>{endereco.cidade}</p>
                    <p>{endereco.estado}</p>
                    <p>{endereco.cep}</p>
                </div>))}
            </div>
        </div>
    </>)
}