// react component for a form to create a new service
import React, { useEffect, useState } from "react";
import utils from "../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadServiço() {
    const navigate = useNavigate();
    const inputs = document.getElementsByTagName('input');
    const { id_cliente, placa } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle>();
    useEffect(() => {
        window.api.Vehicle().getByPlate(placa).then((vehicle) => {
            setVehicle(vehicle);
        });
    }, []);
    const [marca, setMarca] = React.useState(vehicle?.brand || "");
    const [modelo, setModelo] = React.useState(vehicle?.model || "");
    const [placaInput, setPlacaInput] = React.useState(placa || "");
    const [cor, setCor] = React.useState(vehicle?.color || "");
    const [ano, setAno] = React.useState(vehicle?.year.toString() || "");
    const [km, setKm] = React.useState(vehicle?.km.toString() || "");

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
                            const veiculo = window.api.Vehicle() //veiculo(placaInput, id_cliente, marca, modelo, cor, ano, km)
                            if (!placa) {
                                const response = await veiculo.insert();

                                if (response.changes == 0) {
                                    throw new Error('Não foi possível cadastrar o veículo')
                                } else {
                                    (async () => {
                                        // await window.api.Dialog.showMessageBox({ message: 'Veículo cadastrado com sucesso!' })
                                        navigate(-1)
                                    })()
                                }
                            } else {
                                const response = await veiculo.update();

                                if (response.changes == 0) {
                                    throw new Error('Não foi possível editar o veículo')
                                } else {
                                    (async () => {
                                        // await window.api.Dialog.showMessageBox({ message: 'Veículo cadastrado com sucesso!' })
                                        navigate(-1)
                                    })()
                                }
                            }
                        } catch (error) {
                            (async () => {
                                // await window.api.Dialog.showMessageBox({ type: 'error', message: error.message })
                            })()
                        }
                    }}>SALVAR</button>
                </div>
            </div>
        </form>
    </>);
}