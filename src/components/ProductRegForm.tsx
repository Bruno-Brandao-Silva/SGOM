import React, { useEffect, useState } from "react";
import utils from "../models/utils";
import Header from "./Header";

export default function ProductRegForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imagePreview, setImagePreview] = useState<string[]>([]);

    return (<>
        <Header />
        <form className="reg-form">
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

            <img src={`../public/images/products/${imagePreview[0] || '../favicon.png'}`} />

            <button type="button" className="reg-form-button" onClick={async () => {
                setImagePreview(await window.api.chooseFile())
            }}>IMG</button>
            <button type="button" className="reg-form-button" onClick={async () => {
                let product = window.api.Product()
                product.name = name
                product.description = description
                product.price = +price
                product.insert(product)
            }}>{'CADASTRAR'}</button>
        </form>
    </>)
}