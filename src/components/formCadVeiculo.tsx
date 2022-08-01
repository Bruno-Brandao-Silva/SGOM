// react component for a form to create a new service
import React, { useEffect } from "react";
import utils from "../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Veiculo from "../models/veiculo";

export default function FormCadServiço() {
    const navigate = useNavigate();
    const { id_cliente, placa } = useParams();

    const [marca, setMarca] = React.useState("");
    const [modelo, setModelo] = React.useState("");
    const [placaInput, setPlacaInput] = React.useState(placa || "");
    const [cor, setCor] = React.useState("");
    const [ano, setAno] = React.useState("");
    const [km, setKm] = React.useState("");

    const inputs = document.getElementsByTagName('input');

    useEffect(() => {
        (async () => {
            const veiculo = (window as any).api.Veiculo.get(placa) as Veiculo;
            if (veiculo) {
                setMarca(veiculo.marca);
                setModelo(veiculo.modelo);
                setCor(veiculo.cor);
                setAno(veiculo.ano.toString());
                setKm(veiculo.km.toString());

            }
            await utils.sleep(10)
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value != '') {
                    utils.InputsHandleFocus({ target: inputs[i] });
                }
            }
        })()
    }, []);
    console.log(placa)
    return (<>
        <form id="formCadVeiculo" >
            <div className="container-btn-top">
                <button className="btn-return" type="button" onClick={() => { navigate(-1) }}>
                    <img src="../public/images/back.svg" alt="Voltar" />
                </button>
                <button type="button" className="btn-close" onClick={() => navigate('/')}>
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
                                const veiculoR = (window as any).api.Veiculo.insert(veiculo)
                                console.log(veiculoR)

                                alert('Veículo cadastrado com sucesso!')
                                // navigate('/FormCadEndereco/' + response.id)
                            } else {
                                const veiculoR = (window as any).api.Veiculo.update(veiculo)
                                console.log(veiculoR)

                                alert('Veículo cadastrado com sucesso!')
                                // navigate('/')
                            }
                        } catch (error) {
                            alert('Erro ao cadastrar veículo!')
                            console.log(error)
                        }
                    }}>SALVAR</button>
                </div>
            </div>
        </form>
    </>);
}