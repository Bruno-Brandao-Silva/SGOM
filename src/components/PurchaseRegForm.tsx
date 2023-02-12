import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function PurchaseRegForm() {
    const { id } = useParams();
    return (<>
        <Header />
        <h1 className="title">{(id ? "EDITAR" : "CADASTRAR") + " VENDA"}</h1>
        <form className="reg-form">
            <button type="button" className="reg-form-button" onClick={async () => { }}>{id ? "SALVAR" : "CADASTRAR"}</button>
        </form>
    </>)
}