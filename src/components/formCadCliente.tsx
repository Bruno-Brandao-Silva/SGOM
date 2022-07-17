import React from "react";
import './script'
export default function FormCadCliente() {
    return (<>
        <form id="formCadCliente" className="section-cad-cliente-pt1">
            <div id="close" className="container-btn-top">
                <div></div>
                <a href="index.html"><button type="button" className="btn-close">
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button></a>
            </div>
            <h1>Cadastro do Cliente</h1>
            <label>
                <span>CPF</span>
                <input name="cpf" required pattern="\d{3}.\d{3}.\d{3}-\d{2}" />
            </label>
            <label>
                <span>NOME</span>
                <input name="nome" required />
            </label>
            <label>
                <span>E-MAIL</span>
                <input type="email" name="email" />
            </label>
            <div className="content-double-label">
                <label>
                    <span>CONTATO 1</span>
                    <input name="contato_1" />
                </label>
                <label>
                    <span>CONTATO 2</span>
                    <input name="contato_2" />
                </label>
            </div>
            <div className="btn-submit">
                <button id="pt1" type="button">CONTINUAR</button>
            </div>
        </form>
    </>
    );
}