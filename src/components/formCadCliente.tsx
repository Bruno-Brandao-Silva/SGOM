import React, { useEffect, useState } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';

export default function FormCadCliente() {
    const navigate = useNavigate()
    const { id: cpf_cnpj } = useParams();

    const inputs = document.getElementsByTagName('input');
    const [cliente, setCliente] = useState<Client>();
    useEffect(() => {
        if (cpf_cnpj?.length > 0) {
            window.api.Client().getByCpfCnpj(cpf_cnpj).then((cliente) => {
                setCliente(cliente);
            });
        }
    }, [cpf_cnpj]);

    const [cpf, setCpf] = React.useState(cliente?.cpf_cnpj || "");
    const [nome, setNome] = React.useState(cliente?.name || "");
    const [email, setEmail] = React.useState("");
    const [contato_1, setContato_1] = React.useState("");
    const [contato_2, setContato_2] = React.useState("");
    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);

    return (<>
        <form id="formCadCliente" className="section-cad-cliente-pt1">
            <div id="close" className="container-btn-top">
                <button className="btn-return" type="button" onClick={() => { navigate(-1) }}>
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
            <h1>{cpf_cnpj ? 'Editar Cliente' : 'Cadastrar do Cliente'}</h1>
            <label>
                <span>CPF</span>
                <input name="cpf" id='cpf' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} required pattern="(\d{3}.\d{3}.\d{3}-\d{2})|(\d{2}.\d{3}.\d{3}/\d{4}-\d{2})" value={cpf} onChange={e => {
                    if (e.target.value.length <= 18) {
                        setCpf(e.target.value.length > 14 ? utils.CNPJRegex(e) : utils.cpfRegex(e))
                        if (!(e.target.value.length > 14 ? utils.CNPJValidator(e) : utils.cpfValidator(e))) {
                            e.target.setCustomValidity("CPF/CNPJ inválido!");
                        } else {
                            e.target.setCustomValidity("");
                        }
                    }
                }} disabled={cpf_cnpj ? true : false} />
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
                        const cliente = window.api.Client()
                        // .cliente(cpf_cnpj, cpf, nome, email, contato_1, contato_2)

                        if (!cpf_cnpj) {
                            const response = await cliente.insert()
                            if (response.changes == 0) {
                                throw new Error('Não foi possível cadastrar o cliente!')
                            } else {
                                (async () => {
                                    // await window.api.Dialog.showMessageBox({ message: 'Cliente cadastrado com sucesso!' })
                                    navigate('/FormCadEndereco/' + response.lastInsertRowid)
                                })();
                            }
                        } else {
                            const response = await cliente.update()
                            if (response.changes == 0) {
                                throw new Error('Não foi possível editar o cliente!')
                            } else {
                                (async () => {
                                    // await window.api.Dialog.showMessageBox({ message: 'Cliente cadastrado com sucesso!' })
                                    navigate(-1)
                                })();
                            }
                        }
                    } catch (error) {
                        (async () => {
                            // await window.api.Dialog.showMessageBox({ type: 'error', message: error.message })
                        })();
                    }
                }}>{cpf_cnpj ? 'SALVAR' : 'CONTINUAR COM O CADASTRO'}</button>
            </div>
        </form>
    </>
    );
}