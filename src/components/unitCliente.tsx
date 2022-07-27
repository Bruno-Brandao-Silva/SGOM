import React from "react";
import Cliente from "../models/cliente";

export default function unitCliente({ cliente }: { cliente: Cliente }) {
    return (<>
        <div className="unitCliente-Container">
            <div className="unitCliente-Horizontal-Div">
            <h1>Nome: {cliente.nome}</h1>
            </div>
            
            <h1>CPF: {cliente.cpf}</h1>
        </div>
    </>)
}