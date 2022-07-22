import React, { useEffect } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadCliente() {
    const [cpf, setCpf] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contato_1, setContato_1] = React.useState("");
    const [contato_2, setContato_2] = React.useState("");
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const inputs = document.getElementsByTagName('input');
            const cliente = (window as any).api.Cliente.get(id);
            let i = 0;
            if (cliente.cpf) {
                setCpf(cliente.cpf);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (cliente.nome) {
                setNome(cliente.nome);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (cliente.email) {
                setEmail(cliente.email);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (cliente.contato_1) {
                setContato_1(cliente.contato_1);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
            i++;
            if (cliente.contato_2) {
                setContato_2(cliente.contato_2);
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);
    const navigate = useNavigate()

    return (<>
        <form id="formCadCliente" className="section-cad-cliente-pt1">
            <div id="close" className="container-btn-top">
                <div></div>
                <button type="button" className="btn-close" onClick={() => {
                    navigate('/')
                }}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1>{id ? 'Editar Cliente' : 'Cadastrar do Cliente'}</h1>
            <label>
                <span>CPF</span>
                <input name="cpf" id='cpf' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} required pattern="\d{3}.\d{3}.\d{3}-\d{2}" value={cpf} onChange={e => {
                    setCpf(utils.cpfRegex(e))
                    console.log(cpf)
                    console.log(e.target.value.replace(/\D/g, '').length)
                    console.log(utils.cpfValidator(e))
                    if (!utils.cpfValidator(e)) {
                        e.target.setCustomValidity("CPF inválido!");
                    } else {
                        e.target.setCustomValidity("");
                    }
                }} />
            </label>
            <label>
                <span>NOME</span>
                <input name="nome" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={nome} onChange={e => setNome(e.target.value)} required />
            </label>
            <label>
                <span>E-MAIL</span>
                <input type="email" name="email" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <div className="content-double-label">
                <label>
                    <span>CONTATO 1</span>
                    <input name="contato_1" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={contato_1} onChange={e => setContato_1(utils.phoneNumberRegex(e))} />
                </label>
                <label>
                    <span>CONTATO 2</span>
                    <input name="contato_2" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={contato_2} onChange={e => setContato_2(utils.phoneNumberRegex(e))} />
                </label>
            </div>
            <div className="btn-submit">
                <button id="pt1" type="button" onClick={async () => {
                    const formCadCliente = document.getElementById('formCadCliente') as any
                    try {
                        if (!formCadCliente.checkValidity()) {
                            formCadCliente.reportValidity()
                            return
                        }

                        let response
                        if (!id) {
                            const cliente = (window as any).api.Cliente.cliente(undefined, cpf, nome, email, contato_1, contato_2)
                            response = (window as any).api.Cliente.insert(cliente)
                            navigate('/FormCadEndereco/' + response.id)
                        } else {
                            const cliente = (window as any).api.Cliente.cliente(id, cpf, nome, email, contato_1, contato_2)
                            response = (window as any).api.Cliente.update(cliente)
                            navigate('/')
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}>{id ? 'SALVAR' : 'CONTINUAR'}</button>
            </div>
        </form>
    </>
    );
}