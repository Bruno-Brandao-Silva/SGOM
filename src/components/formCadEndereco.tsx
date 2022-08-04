import React, { useEffect } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadEndereco() {
    const navigate = useNavigate()
    const { id_cliente, id } = useParams();
    const inputs = document.getElementsByTagName('input');

    const endereco = (window as any).api.Endereco.get(id);

    const [cep, setCep] = React.useState(endereco?.cep || "");
    const [numero, setNumero] = React.useState(endereco?.numero || "");
    const [complemento, setComplemento] = React.useState(endereco?.complemento || "");
    const [logradouro, setLogradouro] = React.useState(endereco?.logradouro || "");
    const [bairro, setBairro] = React.useState(endereco?.bairro || "");
    const [cidade, setCidade] = React.useState(endereco?.cidade || "");
    const [estado, setEstado] = React.useState(endereco?.estado || "");

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
                    <input name="estado" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={estado} onChange={e => setEstado(e.target.value)} />
                </label>
            </div>
            <div className="btn-submit">
                <button type="button" onClick={() => {
                    const formCadEndereco = document.getElementById('formCadEndereco') as any
                    try {
                        if (!formCadEndereco.checkValidity()) {
                            formCadEndereco.reportValidity()
                            return
                        }
                        const endereco = (window as any).api.Endereco.endereco(id, id_cliente, cep, logradouro, bairro, cidade, estado, numero, complemento);
                        if (!id) {
                            const response = (window as any).api.Endereco.insert(endereco)
                            if (response.changes == 0) {
                                throw new Error('Não foi possível cadastrar o endereço')
                            } else {
                                alert('Endereço cadastrado com sucesso')
                            }
                        } else {
                            const response = (window as any).api.Endereco.update(endereco)
                            if (response.changes == 0) {
                                throw new Error('Não foi possível atualizar o endereço')
                            } else {
                                alert('Endereço atualizado com sucesso')
                            }
                        }
                    } catch (error) {
                        alert(error.message)
                    }
                    navigate(-1) //TO DO - Ir para a pagina do cliente
                }}>SALVAR</button>
            </div>
        </form>
    </>)
}