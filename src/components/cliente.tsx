import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Veiculo from "../models/veiculo";
import Endereco from "../models/endereco";

export default function Cliente() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cliente = (window as any).api.Cliente.get(id);
    const enderecos = (window as any).api.Endereco.getAllByCliente(id) as Endereco[];
    const veiculos = (window as any).api.Veiculo.getAllByCliente(id) as Veiculo[];
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
                <Link to={`/FormCadCliente/${id}`}><img src='../public/images/user.png'></img><span>EDITAR CLIENTE</span></Link>
                <Link to={`/FormCadVeiculo/${id}`}><img src='../public/images/sedan.png'></img><span>ADICIONAR VEíCULO</span></Link>
                <Link to={`/FormCadEndereco/${id}`}><img src='../public/images/address.png'></img><span>ADICIONAR ENDEREÇO</span></Link>
                <Link to={`/FormCadServico/${id}`}><img src='../public/images/service.png'></img><span>ADICIONAR SERVIÇO</span></Link>
            </div>
            <br></br>
            <div className="cliente-info">
                <h1>NOME: {cliente.nome}</h1>
                <h3>CPF/CNPJ: {cliente.cpf}</h3>
                <div className="contatos">
                    <p>E-MAIL: {cliente.email}</p>
                    <p>CONTATO 1: {cliente.contato_1}</p>
                    <p>CONTATO 2: {cliente.contato_2}</p>
                </div>
            </div>
            <br></br>
            <br></br>
            <h3>VEÍCULOS</h3>
            <br></br>
            <div className="todos-container">
                {veiculos.map((veiculo, index: number) => {
                    return (<Link key={index} to={`/Veiculo/${veiculo.placa}`} className="todos-a">
                        <div className="todos-sub-container">
                            <h1>{veiculo.placa}</h1>
                            <h3>{veiculo.marca}</h3>
                            <p>{veiculo.modelo}</p>
                            <p>{veiculo.cor}</p>
                            <p>{veiculo.km}</p>
                        </div>
                    </Link>)
                })}
            </div>
            <br></br>
            <br></br>
            <h3>ENDEREÇOS</h3>
            <br></br>
            {enderecos.map((endereco, index: number) => (<div className="cliente-end" key={index}><Link to={`/FormCadEndereco/${id}/${endereco.id}`} key={index} >
                <p>{`${endereco.logradouro}, ${endereco.numero}, ${endereco.complemento} - ${endereco.bairro} - ${endereco.cidade} - ${endereco.estado} - CEP: ${endereco.cep}`}</p>
            </Link></div>))}
        </div>
    </>)
}