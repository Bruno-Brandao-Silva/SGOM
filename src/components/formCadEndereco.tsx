import React, { useEffect, useState } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadEndereco() {
    const navigate = useNavigate()
    const { id_cliente, id } = useParams();
    const inputs = document.getElementsByTagName('input');

    // const address = window.api.Address().getByCpfCnpj(id);
    const [address, setAddress] = useState<Address>();

    const [cep, setCep] = React.useState(address?.cep || "");
    const [numero, setNumero] = React.useState(address?.number || "");
    const [complemento, setComplemento] = React.useState(address?.complement || "");
    const [logradouro, setLogradouro] = React.useState(address?.street || "");
    const [bairro, setBairro] = React.useState(address?.district || "");
    const [cidade, setCidade] = React.useState(address?.city || "");
    const [estado, setEstado] = React.useState(address?.state || "");

    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);

    return (<>
        <form id="formCadEndereco" className="section-cad-cliente-pt1">
            <div className="container-btn-top">
                {id ?
                    <button className="btn-return" type="button" onClick={() => { navigate(-1) }}>
                        <img src="../public/images/back.svg" alt="Voltar" />
                    </button>
                    :
                    <button className="btn-return" type="button" onClick={() => { navigate(`/FormCadEndereco/${id_cliente}`) }}>
                        <img src="../public/images/back.svg" alt="Voltar" />
                    </button>
                }
                <button className="btn-close" type="button" onClick={() => navigate('/')}><span><div></div><div></div></span></button>
            </div>
            <h1>{id ? 'Editar Endereço' : 'Cadastrar Endereço'}</h1>
            <div className="content-double-label">
                <label>
                    <span>CEP</span>
                    <input name="cep" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} pattern="\d{5}-\d{3}" value={cep} onChange={e => setCep(utils.cepRegex(e))} required />
                </label>
                <label>
                    <span>Número</span>
                    <input name="numero" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={numero} onChange={e => setNumero(e.target.value)} />
                </label>
            </div>
            <label>
                <span>Complemento</span>
                <input name="complemento" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={complemento} onChange={e => setComplemento(e.target.value)} />
            </label>
            <label>
                <span>Logradouro</span>
                <input name="logradouro" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={logradouro} onChange={e => setLogradouro(e.target.value)} />
            </label>
            <label>
                <span>Bairro</span>
                <input name="bairro" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={bairro} onChange={e => setBairro(e.target.value)} />
            </label>
            <div className="content-double-label">
                <label>
                    <span>Cidade</span>
                    <input name="cidade" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={cidade} onChange={e => setCidade(e.target.value)} />
                </label>
                <label>
                    <span>Estado</span>
                    <input name="estado" list="estado" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={estado} onChange={e => setEstado(e.target.value)} />
                    {/* <datalist id="estado" className="datalist">
                        <option value={'Acre'}>AC</option>
                        <option value={'Alagoas'}>AL</option>
                        <option value={'Amapá'}>AP</option>
                        <option value={'Amazonas'}>AM</option>
                        <option value={'Bahia'}>BA</option>
                        <option value={'Ceará'}>CE</option>
                        <option value={'Distrito Federal'}>DF</option>
                        <option value={'Espírito Santo'}>ES</option>
                        <option value={'Goiás'}>GO</option>
                        <option value={'Maranhão'}>MA</option>
                        <option value={'Mato Grosso'}>MT</option>
                        <option value={'Mato Grosso do Sul'}>MS</option>
                        <option value={'Minas Gerais'}>MG</option>
                        <option value={'Pará'}>PA</option>
                        <option value={'Paraíba'}>PB</option>
                        <option value={'Pernambuco'}>PE</option>
                        <option value={'Piauí'}>PI</option>
                        <option value={'Rio de Janeiro'}>RJ</option>
                        <option value={'Rio Grande do Norte'}>RN</option>
                        <option value={'Rio Grande do Sul'}>RS</option>
                        <option value={'Rondônia'}>RO</option>
                        <option value={'Santa Catarina'}>SC</option>
                        <option value={'São Paulo'}>SP</option>
                        <option value={'Sergipe'}>SE</option>
                        <option value={'Tocantins'}>TO</option>
                    </datalist> */}
                </label>
            </div>
            <div className="btn-submit">
                <button type="button" onClick={async () => {
                    const formCadEndereco = document.getElementById('formCadEndereco') as any
                    try {
                        if (!formCadEndereco.checkValidity()) {
                            formCadEndereco.reportValidity()
                            return
                        }
                        const address = window.api.Address()
                        //.endereco(id, id_cliente, cep, logradouro, bairro, cidade, estado, numero, complemento);
                        if (!id) {
                            const response = await address.insert()
                            if (response.changes == 0) {
                                throw new Error('Não foi possível cadastrar o endereço')
                            } else {
                                (async () => {
                                    // await window.api.Dialog.showMessageBox({ message: 'Endereço cadastrado com sucesso' })
                                    navigate(`/Cliente/${id_cliente}`)
                                })();
                            }
                        } else {
                            const response = await address.update()
                            if (response.changes == 0) {
                                throw new Error('Não foi possível atualizar o endereço')
                            } else {
                                (async () => {
                                    // await window.api.Dialog.showMessageBox({ message: 'Endereço atualizado com sucesso' })
                                    navigate(-1)
                                })()
                            }
                        }
                    } catch (error) {
                        (async () => {
                            // await window.api.Dialog.showMessageBox({ type: 'error', message: error.message })
                        })();
                    }
                }}>SALVAR</button>
            </div>
        </form>
    </>)
}