import React from "react";
import utils from "./../models/utils";

export default function FormCadCliente() {
    const [cpf, setCpf] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contato_1, setContato_1] = React.useState("");
    const [contato_2, setContato_2] = React.useState("");

    // const formCadCliente = document.getElementById('formCadCliente') as any

    return (<>
        <form id="formCadCliente" className="section-cad-cliente-pt1">
            <div id="close" className="container-btn-top">
                <div></div>
                <button type="button" className="btn-close" onClick={() => {
                    // href="index.html"
                }}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1>Cadastro do Cliente</h1>
            <label>
                <span>CPF</span>
                <input name="cpf" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} required pattern="\d{3}.\d{3}.\d{3}-\d{2}" value={cpf} onChange={e => setCpf(utils.cpfRegex(e))} />
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
                        const data: any[] = []
                        for (let i = 0; i < formCadCliente.elements.length; i++) {
                            if (formCadCliente.elements[i].name && formCadCliente.elements[i].name != 'cpf' && formCadCliente.elements[i].value != '') {
                                data.push(formCadCliente.elements[i].value)
                            }
                        }
                        const cliente = (window as any).api.Cliente.cliente(undefined, ...data)
                        const response = (window as any).api.Cliente.insert(cliente)
                        console.log(response)
                        await utils.sleep(50)
                        window.location.href = 'formCadEndereco.html'
                    } catch (error) {
                        console.log(error)
                    }
                }}>CONTINUAR</button>
            </div>
        </form>
    </>
    );
}