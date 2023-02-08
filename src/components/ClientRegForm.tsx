import React, { useEffect, useState } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import PopUp from "./PopUp";
import PopUpErrorTemplate from "./PopUpErrorTemplate";
import PopUpSuccessTemplate from "./PopUpSuccessTemplate";

export default function ClientRegForm() {
    const navigate = useNavigate()
    const { cpf_cnpj } = useParams();
    const [inputContacts, setInputContacts] = useState<{ id: number, type: string, value: string }[]>([])
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactsAmount, setContactsAmount] = useState(0);
    const [cpf_cnpjInput, setCpf_CnpjInput] = useState("");
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
        if (cpf_cnpj?.length > 0) {
            window.api.Client().getByCpfCnpj(cpf_cnpj).then((client) => {
                setName(client.name);
                setCpf_CnpjInput(client.cpf_cnpj);
                window.api.Contact().getByCpfCnpj(cpf_cnpj).then((contacts) => {
                    setContacts(contacts);
                    setContactsAmount(contacts.length);
                    if (inputContacts.length === 0) {
                        for (let i = 0; i < contacts.length; i++) {
                            inputContacts.push({ id: i, type: contacts[i].type, value: contacts[i].value });
                        }
                        setInputContacts(inputContacts);
                    }
                });
            }).finally(() => {
                utils.sleep(10).then(() => {
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].value != '') {
                            utils.InputsHandleFocus({ target: inputs[i] });
                        }
                    }
                });
            });
        }
    }, [cpf_cnpj]);

    return (<>
        <Header />
        {popUp && <PopUp>{popUp}</PopUp>}
        <form className="reg-form">
            <label>
                <span>CPF/CNPJ</span>
                <input name="cpf" id='cpf' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} required pattern="(\d{3}.\d{3}.\d{3}-\d{2})|(\d{2}.\d{3}.\d{3}/\d{4}-\d{2})" value={cpf_cnpjInput} onChange={e => {
                    if (e.target.value.length <= 18) {
                        setCpf_CnpjInput(e.target.value.length > 14 ? utils.CNPJRegex(e) : utils.cpfRegex(e))
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
                <input name="nome" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <div className="double-input">
                {inputContacts.map((contact, index) => {
                    if (contact.type === "celular") {
                        return (
                            <label className="deletable-input" key={index} style={{ width: "45%" }}>
                                <span>{`CONTATO: ${contact.type.toUpperCase()}`}</span>
                                <input name={contact.type} pattern="\(\d{2}\) \d{5}-\d{4}" type="text" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={contact.value} onChange={e => {
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
                    } else if (contact.type === "telefone") {
                        return (
                            <label className="deletable-input" key={index} style={{ width: "45%" }}>
                                <span>{`CONTATO: ${contact.type.toUpperCase()}`}</span>
                                <input name={contact.type} pattern="\(\d{2}\) \d{4}-\d{4}" type="text" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={contact.value} onChange={e => {
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
                    } else {
                        return (
                            <label className="deletable-input" key={index} >
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
                    }
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
                    client.cpf_cnpj = cpf_cnpjInput;
                    client.name = name;
                    if (!cpf_cnpj) {
                        try {
                            await client.insert(client);
                            inputContacts.forEach(async inputContact => {
                                const contact = window.api.Contact();
                                contact.cpf_cnpj = cpf_cnpjInput;
                                contact.type = inputContact.type;
                                contact.value = inputContact.value;
                                try {
                                    await contact.insert(contact);
                                } catch (error) {
                                    setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                                    return
                                }
                            });
                        } catch (error) {
                            setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                            return
                        }
                        setPopUp(<PopUpSuccessTemplate buttons={[
                            { text: "Agora", onClick: () => navigate(`/FormCadEndereco/${cpf_cnpjInput}`) },
                            { text: "Depois", onClick: () => navigate(`/Client/${cpf_cnpjInput}`) },
                        ]} title="Cliente cadastrado com sucesso!"
                            content="Cadastrar endereço agora?" />)
                    } else {
                        try {
                            await client.update(client);
                            let olderContacts: (number | bigint)[] = [];
                            inputContacts.forEach(async inputContact => {
                                const contact = window.api.Contact();
                                contact.cpf_cnpj = cpf_cnpjInput;
                                contact.type = inputContact.type;
                                contact.value = inputContact.value;
                                let temp = contacts.find((contact) => contact.type === inputContact.type && contact.value === inputContact.value);
                                if (temp) {
                                    contact.id = temp.id;
                                    olderContacts.push(temp.id);
                                }
                                try {
                                    if (!temp) {
                                        await contact.insert(contact);
                                    }
                                } catch (error) {
                                    setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                                    return
                                }

                            });
                            contacts.forEach(async contact => {
                                if (!olderContacts.includes(contact.id)) {
                                    await window.api.Contact().delete(contact.id);
                                }
                            });
                        } catch (error) {
                            setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />)
                            return
                        }
                    }
                }}>{cpf_cnpj ? 'SALVAR' : 'CADASTRAR'}</button>
            </div>
        </form>
    </>
    );
}