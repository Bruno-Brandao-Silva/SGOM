import React, { useEffect, useState } from "react";
import utils from "../models/utils";

export default function ProductRegForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    return (
        <div className="formCadProduct">
            <h1>Cadastro de Produtos</h1>
            <form>
                <label>

                    <span>Nome</span>
                    <input
                        onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></input>
                </label>
                <label>
                    <span>Descrição</span>
                    <input
                        onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></input>
                </label>
                <label>
                    <span>Preço</span>
                    <input
                        onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    ></input>
                </label>
                <div className="btn-submit">
                    <button id="pt1" type="button" onClick={async () => {
                        let product = window.api.Product()
                        product.name = name
                        product.description = description
                        product.price = +price
                        product.insert(product)

                    }}>{'CADASTRAR'}</button>
                </div>
            </form>
        </div>
    )
}