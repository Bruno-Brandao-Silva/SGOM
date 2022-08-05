import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Endereco from "../models/endereco";

export default function Cliente() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cliente = (window as any).api.Cliente.get(id);
    const enderecos = (window as any).api.Endereco.getAllByCliente(id) as Endereco[];
    return (<>
        <div className="todos">
            <div id="close" className="container-btn-top">
                <button className="btn-return" onClick={() => { navigate(-1) }}>
                    <img src="../public/images/back.svg" alt="Voltar" />
                </button>
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
            <div className="toolbar index-top-sub-container">
                <Link to={`/FormCadCliente/${id}`}><img src='../public/images/user.png'></img><span>ADICIONAR SERVIÇO</span></Link>
                <Link to={`/FormCadVeiculo/${id}`}><img src='../public/images/sedan.png'></img><span>ADICIONAR VEíCULO</span></Link>
                <Link to={`/FormCadEndereco/${id}`}><img src='../public/images/address.png'></img><span>ADICIONAR ENDEREÇO</span></Link>
                <Link to={`/FormCadServico/${id}`}><img src='../public/images/service.png'></img><span>ADICIONAR SERVIÇO</span></Link>
            </div>
            <div className="cliente-info">
                <h1>NOME: {cliente.nome}</h1>
                <h3>CPF/CNPJ: {cliente.cpf}</h3>
                <p>E-MAIL: {cliente.email}</p>
                <p>CONTATO 1: {cliente.contato_1}</p>
                <p>CONTATO 2: {cliente.contato_2}</p>
            </div>
            <div className="todos-container">
                {enderecos.map((endereco, index: number) => (<Link to={`/FormCadEndereco/${id}/${endereco.id}`} key={index} className="todos-sub-container" >
                    <p>{endereco.logradouro}</p>
                    <p>{endereco.complemento}</p>
                    <p>{endereco.bairro}</p>
                    <p>{endereco.cidade}</p>
                    <p>{endereco.estado}</p>
                    <p>{endereco.cep}</p>
                </Link>))}
            </div>
        </div>
    </>)
}