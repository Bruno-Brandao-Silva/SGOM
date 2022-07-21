import React, { useEffect } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadEndereco() {
    const [cep, setCep] = React.useState("");
    const [numero, setNumero] = React.useState("");
    const [complemento, setComplemento] = React.useState("");
    const [logradouro, setLogradouro] = React.useState("");
    const [bairro, setBairro] = React.useState("");
    const [cidade, setCidade] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const { id_cliente, id } = useParams();
    useEffect(() => {
        if (id) {
            const inputs = document.getElementsByTagName('input');
            const endereco = (window as any).api.Endereco.get(id);
            let i = 0;
            if (endereco.cep) {
                setCep(endereco.cep);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.numero) {
                setNumero(endereco.numero);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.complemento) {
                setComplemento(endereco.complemento);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.logradouro) {
                setLogradouro(endereco.logradouro);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.bairro) {
                setBairro(endereco.bairro);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.cidade) {
                setCidade(endereco.cidade);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (endereco.estado) {
                setEstado(endereco.estado);
                utils.InputsHandleFocus({ target: inputs[i] });
            }

        }
    }, []);
    const navigate = useNavigate()

    return (<>
        <form id="formCadEndereco" className="section-cad-cliente-pt1">
            <div className="container-btn-top">
                {!id ? <button className="btn-return" onClick={() => { navigate(`/FormCadEndereco/${id}`) }}>
                    <img src="./public/images/back.svg" alt="Voltar" />
                </button> : <div></div>}
                <button type="button" className="btn-close" onClick={() => navigate('/')}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
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
                {id ? <></> : <button id="salvar" type="submit" onClick={submitForm}>SALVAR</button>}
                <button type="submit" onClick={() => {
                    try {
                        submitForm();
                        id ? navigate('/') : navigate('/');
                    } catch (e) {
                        console.log(e);
                    }
                }}>{id ? 'SALVAR' : 'SALVAR E ADICIONAR UM SERVIÇO'}</button>
            </div>
        </form>
    </>)
    async function submitForm() {
        const formCadEndereco = document.getElementById('formCadEndereco') as any
        try {
            if (!formCadEndereco.checkValidity()) {
                formCadEndereco.reportValidity()
                return
            }
            const data: any[string] = []
            for (let i = 0; i < formCadEndereco.elements.length; i++) {
                if (formCadEndereco.elements[i].name && formCadEndereco.elements[i].value != '') {
                    data[formCadEndereco.elements[i].name] = (formCadEndereco.elements[i].value)
                }
            }
            console.log(data)
            let response
            if (!id) {
                const endereco = (window as any).api.Endereco.endereco(undefined, id_cliente, data['cep'], data['logradouro'], data['bairro'], data['cidade'], data['estado'], data['numero'], data['complemento'])
                response = (window as any).api.Endereco.insert(endereco)
            } else {
                const endereco = (window as any).api.Endereco.endereco(id, id_cliente, data['cep'], data['logradouro'], data['bairro'], data['cidade'], data['estado'], data['numero'], data['complemento'])
                response = (window as any).api.Endereco.update(endereco)
            }
            console.log(response)
            await utils.sleep(50)
        } catch (error) {
            throw new Error(error)
        }
    }
}