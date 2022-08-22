import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Veiculo from "../models/veiculo";
import utils from "../models/utils";
import Cliente from "../models/cliente";
import Ordem_Servico from "../models/ordem_servico";

export default function VeiculoTSX() {
    const navigate = useNavigate();
    const { placa } = useParams();
    const veiculo = (window as any).api.Veiculo.get(placa) as Veiculo;
    const cliente = (window as any).api.Cliente.get(veiculo.id_cliente) as Cliente;
    const ordem_servicos = (window as any).api.Ordem_Servico.getByPlaca(placa) as Ordem_Servico[];
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
            <h1 className="index-h1">VEÍCULO</h1>
            <div className="toolbar index-top-sub-container">
                <Link to={`/FormCadCliente/${1}`}><img src='../public/images/user.png'></img><span>EDITAR VEÍCULO</span></Link>
                <Link to={`/FormCadVeiculo/${1}`}><img src='../public/images/sedan.png'></img><span>REMOVER VEÍCULO</span></Link>
            </div>
            <br></br>
            <div className='veiculo-info'>
                <h1>PLACA: {placa}</h1>
                <h3>MARCA: {1}</h3>
                <p>MODELO: {1}</p>
                <p>COR: {1}</p>
                <p>KM: {1}</p>
            </div>
            <br></br>
            <table className="table-ordem-servicos">
                <thead>
                    <tr>
                        <th>PLACA</th>
                        <th>CLIENTE</th>
                        <th>CPF/CNPJ</th>
                        <th>DATA</th>
                    </tr>
                </thead>
                <tbody>
                    {ordem_servicos.map((servico, index: number) => {

                        return (<tr key={index} onClick={() => navigate(`/EditServico/${servico.id}`)} >
                            <th>{servico.placa}</th>
                            <th>{cliente.nome}</th>
                            <th>{cliente.cpf}</th>
                            <th>{servico.data.replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                        </tr>)
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