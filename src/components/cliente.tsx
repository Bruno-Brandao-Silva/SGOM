import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Address from "../models/Address";
import Client from "../models/Client";

export default function Cliente() {
    const navigate = useNavigate();
    const { cpf_cnpj } = useParams();
    const [client, setClient] = useState<Client>();
    const [addresses, setAddresses] = useState<Address[]>();
    useEffect(() => {
        window.api.Client().getByCpfCnpj(cpf_cnpj).then((client: Client) => {
            setClient(client);
        });
        window.api.Address().getByCpfCnpj(cpf_cnpj).then((addresses: Address[]) => {
            setAddresses(addresses);
        });
    }, []);
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
                <Link to={`/FormCadClient/${cpf_cnpj}`}><img src='../public/images/user.png'></img><span>ADICIONAR SERVIÇO</span></Link>
                <Link to={`/FormCadVeiculo/${cpf_cnpj}`}><img src='../public/images/sedan.png'></img><span>ADICIONAR VEíCULO</span></Link>
                <Link to={`/FormCadAddress/${cpf_cnpj}`}><img src='../public/images/address.png'></img><span>ADICIONAR ENDEREÇO</span></Link>
                <Link to={`/FormCadServico/${cpf_cnpj}`}><img src='../public/images/service.png'></img><span>ADICIONAR SERVIÇO</span></Link>
            </div>
            <div className="cliente-info">
                <h1>NOME: {client.name}</h1>
                <h3>CPF/CNPJ: {client.cpf_cnpj}</h3>
                {/* <p>E-MAIL: {client.email}</p>
                <p>CONTATO 1: {client.contato_1}</p>
                <p>CONTATO 2: {client.contato_2}</p> */}
            </div>
            <div className="todos-container">
                {addresses.map((address, index: number) => (<Link to={`/FormCadAddress/${cpf_cnpj}/${address.cpf_cnpj}`} key={index} className="todos-sub-container" >
                    <p>{address.street}</p>
                    <p>{address.complement}</p>
                    <p>{address.district}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.cep}</p>
                </Link>))}
            </div>
        </div>
    </>)
}