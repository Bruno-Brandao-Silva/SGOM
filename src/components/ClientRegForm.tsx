import React, { useEffect, useState } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import PopUp from "./PopUp";
import PopUpErrorTemplate from "./PopUpErrorTemplate";
import PopUpSuccessTemplate from "./PopUpSuccessTemplate";

export default function ClientRegForm() {
    const navigate = useNavigate()
    const { param_cpf_cnpj } = useParams();
    const [inputContacts, setInputContacts] = useState<{ id: number, type: string, value: string }[]>([])
    const [contactsAmount, setContactsAmount] = useState(0);
    const [cpf_cnpj, setCpf_Cnpj] = useState("");
    const [name, setName] = useState("");
    const [popUp, setPopUp] = useState<React.ReactNode>(null);

    const inputs = document.getElementsByTagName('input');
    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);
    useEffect(() => {
        if (param_cpf_cnpj?.length > 0) {
            window.api.Client().getByCpfCnpj(param_cpf_cnpj).then((client) => {
                setName(client.name);
                setCpf_Cnpj(client.cpf_cnpj);
            });
        }
    }, [param_cpf_cnpj]);

    return (<>
        <Header />
        {popUp && <PopUp>{popUp}</PopUp>}
        <form className="reg-form">
            <label>
                <span>CPF/CNPJ</span>
                <input name="cpf" id='cpf' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} required pattern="(\d{3}.\d{3}.\d{3}-\d{2})|(\d{2}.\d{3}.\d{3}/\d{4}-\d{2})" value={cpf_cnpj} onChange={e => {
                    if (e.target.value.length <= 18) {
                        setCpf_Cnpj(e.target.value.length > 14 ? utils.CNPJRegex(e) : utils.cpfRegex(e))
                        if (!(e.target.value.length > 14 ? utils.CNPJValidator(e) : utils.cpfValidator(e))) {
                            e.target.setCustomValidity("CPF/CNPJ inválido!");
                        } else {
                            e.target.setCustomValidity("");
                        }
                    }
                }} disabled={param_cpf_cnpj ? true : false} />
            </label>
            <label>
                <span>NOME</span>
                <input name="nome" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <div className="double-input">
                {inputContacts.map((contact, index) => {
                    return (

                        <label className="deletable-input" key={index} style={contact.type === "telefone" || contact.type === "celular" ? { width: "45%" } : {}}>
                            <span>{`CONTATO: ${contact.type.toUpperCase()}`}</span>
                            <input name={contact.type} type={contact.type === "email" ? "email" : "text"} onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={contact.value} onChange={e => {
                                const index = inputContacts.findIndex((inputContact) => inputContact.id === contact.id);
                                if (contact.type === "telefone") {
                                    inputContacts[index].value = utils.phoneNumberRegex(e);
                                } else if (contact.type === "celular") {
                                    inputContacts[index].value = utils.cellPhoneNumberRegex(e);
                                } else {
                                    inputContacts[index].value = e.target.value;
                                }
                                setInputContacts([...inputContacts])
                            }} required />
                            <button type="button" onClick={() => {
                                const index = inputContacts.findIndex((inputContact) => inputContact.id === contact.id);
                                inputContacts.splice(index, 1);
                                setInputContacts([...inputContacts])
                            }}>X</button>
                        </label>
                    )
                })}
            </div>
            <div className="reg-form-buttons">
                <div className="dropdown">
                    <button type="button" onClick={(e) => {
                        document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
                    }} className="reg-form-button">ADICIONAR CONTATOS \/</button>
                    <div className="dropdown-content" >
                        <button type="button" onClick={() => {
                            document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
                            setContactsAmount(contactsAmount + 1);
                            setInputContacts([...inputContacts, { id: contactsAmount, type: 'email', value: '' }])
                        }}>E-MAIL</button>
                        <button type="button" onClick={() => {
                            document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
                            setContactsAmount(contactsAmount + 1);
                            setInputContacts([...inputContacts, { id: contactsAmount, type: 'celular', value: '' }])
                        }}>CELULAR</button>
                        <button type="button" onClick={() => {
                            document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
                            setContactsAmount(contactsAmount + 1);
                            setInputContacts([...inputContacts, { id: contactsAmount, type: 'telefone', value: '' }])
                        }}>TELEFONE</button>
                        <button type="button" onClick={() => {
                            document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
                            setContactsAmount(contactsAmount + 1);
                            setInputContacts([...inputContacts, { id: contactsAmount, type: 'sem formato', value: '' }])
                        }}>SEM FORMATO</button>
                    </div>
                </div>
                <button type="button" className="reg-form-button" onClick={async () => {
                    const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return;
                    }
                    const client = window.api.Client();
                    client.cpf_cnpj = cpf_cnpj;
                    client.name = name;
                    if (!param_cpf_cnpj) {
                        try {
                            const response = await client.insert(client);
                            if (response.changes == 0) {
                                throw new Error('Não foi possível cadastrar o cliente!');
                            } else {
                                inputContacts.forEach(async inputContact => {
                                    const contact = window.api.Contact();
                                    contact.cpf_cnpj = cpf_cnpj;
                                    contact.type = inputContact.type;
                                    contact.value = inputContact.value;
                                    try {
                                        const response = await contact.insert(contact);
                                        if (response.changes == 0) {
                                            throw new Error('Não foi possível cadastrar o contato!');
                                        }
                                    } catch (error) {
                                        setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                                        return
                                    }
                                });
                            }
                        } catch (error) {
                            setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                            return
                        }
                        setPopUp(<PopUpSuccessTemplate buttons={[
                            { text: "Agora", onClick: () => navigate(`/FormCadEndereco/${cpf_cnpj}`) },
                            { text: "Depois", onClick: () => navigate(`/Cliente/${cpf_cnpj}`) },
                        ]} title="Cliente cadastrado com sucesso!"
                            content="Cadastrar endereço agora?" />)
                    }
                }}>{param_cpf_cnpj ? 'SALVAR' : 'CADASTRAR'}</button>
            </div>
        </form>
    </>
    );
}