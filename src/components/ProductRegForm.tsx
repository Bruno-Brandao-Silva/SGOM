import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ProductRegForm() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imagePreview, setImagePreview] = useState<string>();
    useEffect(() => {
        if (id) {
            window.api.Product().getById(+id).then(product => {
                setName(product.name)
                setDescription(product.description ? product.description : "")
                setPrice(product.price.toString())
                setImagePreview(product.image ? product.image : "")
            }).finally(() => {
                utils.inputsVerify(utils.getAllInputs(document))
            })
        } else {
            setName("")
            setDescription("")
            setPrice("")
            setImagePreview("")
        }
    }, [id])

    return (<>
        <Header />
        <h1 className="title">{(id ? "EDITAR" : "CADASTRAR") + " PRODUTO"}</h1>

        <form className="reg-form">
            <div className="reg-form-column">
                <div style={{ width: "65%" }}>
                    <label>
                        <span>Nome do produto</span>
                        <input
                            onFocus={e => utils.InputsHandleFocus(e)}
                            onBlur={e => utils.InputsHandleFocusOut(e)}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        ></input>
                    </label>
                    <label>
                        <span>Descrição do produto</span>
                        <textarea
                            onFocus={e => utils.InputsHandleFocus(e)}
                            onBlur={e => utils.InputsHandleFocusOut(e)}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        <span>Preço do produto</span>
                        <input
                            type="number"
                            onFocus={e => utils.InputsHandleFocus(e)}
                            onBlur={e => utils.InputsHandleFocusOut(e)}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        ></input>
                    </label>
                </div>
                <div className="reg-form-image-container">
                    <img className="reg-form-image" src={`../public/images/products/${imagePreview || '../picture.png'}`} />
                    <button type="button" onClick={async () => {
                        setImagePreview((await window.api.chooseFile())[0])
                    }}>ESCOLHER IMAGEM</button>
                </div>
            </div>




            <button type="button" className="reg-form-button" onClick={async () => {
                const form = document.querySelector(".reg-form") as HTMLFormElement
                if (!form.checkValidity()) {
                    form.reportValidity()
                    return
                }
                try {
                    let product = window.api.Product()
                    if (name !== "") product.name = name
                    if (description !== "") product.description = description
                    if (price !== "") product.price = +price
                    if (imagePreview) product.image = imagePreview
                    if (id) { product.id = +id; product.update(product) } else { product.insert(product) }
                } catch (e) {
                    console.log(e)
                }
            }}>{id ? 'SALVAR' : 'CADASTRAR'}</button>
        </form>
    </>)
}