// react component for a form to create a new service
import React, { useEffect } from "react";
import utils from "../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Veiculo from "../models/veiculo";

export default function FormCadServiço() {
    const navigate = useNavigate();
    const inputs = document.getElementsByTagName('input');
    const { id_cliente, placa } = useParams();

    const veiculo = (window as any).api.Veiculo.get(placa) as Veiculo;

    const [marca, setMarca] = React.useState(veiculo?.marca || "");
    const [modelo, setModelo] = React.useState(veiculo?.modelo || "");
    const [placaInput, setPlacaInput] = React.useState(placa || "");
    const [cor, setCor] = React.useState(veiculo?.cor || "");
    const [ano, setAno] = React.useState(veiculo?.ano.toString() || "");
    const [km, setKm] = React.useState(veiculo?.km.toString() || "");

    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);
    return (<>
        <form id="formCadVeiculo" >
            <div className="container-btn-top">
                <button className="btn-return" type="button" onClick={() => { navigate(-1) }}>
                    <img src="../public/images/back.svg" alt="Voltar" />
                </button>
                <button className="btn-close" type="button" onClick={() => navigate('/')}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1>{placa ? 'Editar Veículo' : 'Cadastrar Veículo'}</h1>
            <div className="content-double-label">
                <label>
                    <span>MARCA</span>
                    <input name="marca" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={marca} onChange={e => setMarca(e.target.value)} required />
                </label>
                <label>
                    <span>MODELO</span>
                    <input name="modelo" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={modelo} onChange={e => setModelo(e.target.value)} required />
                </label>
                <label>
                    <span>COR</span>
                    <input name="cor" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cor} onChange={e => setCor(e.target.value)} required />
                </label>
            </div>
            <div className="content-double-label">
                <label>
                    <span>PLACA</span>
                    <input name="placaInput" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={placaInput} onChange={placa !== undefined ? () => { } : e => setPlacaInput(e.target.value)} disabled={(placa !== undefined)} required />
                </label>
                <label>
                    <span>ANO</span>
                    <input name="ano" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={ano} onChange={e => setAno(e.target.value)} required />
                </label>
                <label>
                    <span>KM</span>
                    <input name="km" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={km} onChange={e => setKm(e.target.value)} required />
                </label>
            </div>
            <div className="content-double-label">
                <div className="btn-submit">
                    <button id="pt1" type="button" onClick={async () => {
                        const formCadVeiculo = document.getElementById('formCadVeiculo') as any
                        try {
                            if (!formCadVeiculo.checkValidity()) {
                                formCadVeiculo.reportValidity()
                                return
                            }
                            const veiculo = new (window as any).api.Veiculo.veiculo(placaInput, id_cliente, marca, modelo, cor, ano, km)
                            if (!placa) {
                                const response = (window as any).api.Veiculo.insert(veiculo)

                                if (response.changes == 0) {
                                    throw new Error('Não foi possível cadastrar o veículo')
                                } else {
                                    alert('Veículo cadastrado com sucesso!')
                                }
                            } else {
                                const response = (window as any).api.Veiculo.update(veiculo)

                                if (response.changes == 0) {
                                    throw new Error('Não foi possível editar o veículo')
                                } else {
                                    alert('Veículo cadastrado com sucesso!')
                                }
                            }
                            navigate(-1)
                        } catch (error) {
                            alert(error.message)
                        }
                    }}>SALVAR</button>
                </div>
            </div>
        </form>
    </>);
}