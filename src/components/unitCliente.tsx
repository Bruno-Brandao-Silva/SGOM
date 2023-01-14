import React from "react";

export default function unitCliente({ client }: { client: Client }) {
    return (<>
        <div className="unitCliente-Container">
            <div className="unitCliente-Horizontal-Div">
                <h1>Nome: {client.name}</h1>
            </div>

            <h1>CPF: {client.cpf_cnpj}</h1>
        </div>
    </>)
}