import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";
import StoreView from "./StoreView";
import pdfTemplate from "../models/PdfTemplates";

export default function PurchaseRegForm() {
    const { id } = useParams();
    const dataAtual = new Date().toLocaleDateString().replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')

    const [cpf_cnpj, setCpf_Cnpj] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(dataAtual);
    const [oldPurchaseList, setOldPurchaseList] = useState<PurchaseList[]>([]);
    const [purchaseList, setPurchaseList] = useState<{ product: Product, quantity: number }[]>([]);
    const [storeView, setStoreView] = useState(false);
    const [clientAlreadyRegistered, setClientAlreadyRegistered] = useState(false);
    const [clients, setClients] = useState<Client[]>();

    useEffect(() => {
        window.api.Client().getAll().then((clients) => {
            setClients(clients);
        });
        if (id) {
            window.api.Purchase().getById(+id).then((purchase) => {
                purchase.cpf_cnpj && setCpf_Cnpj(purchase.cpf_cnpj);
                setDate(purchase.date);
                purchase.cpf_cnpj && window.api.Client().getByCpfCnpj(purchase.cpf_cnpj).then((client) => {
                    setName(client.name);
                    setClientAlreadyRegistered(true);
                });
                window.api.PurchaseList().getByPurchaseId(+id).then((purchaseList) => {
                    setOldPurchaseList(purchaseList);
                });
            }).finally(() => {
                utils.inputsVerify(utils.getAllInputs(document))
            });
        }
    }, []);

    useEffect(() => {
        if (oldPurchaseList?.length > 0 && id) {
            const list = oldPurchaseList.map((purchaseList) => {
                const product = window.api.Product();
                product.name = purchaseList.name;
                product.price = purchaseList.price;
                product.id = purchaseList.id_product;
                product.description = purchaseList.description;
                product.image = purchaseList.image;
                return { product, quantity: purchaseList.quantity };
            });
            setPurchaseList(list);
        }
    }, [oldPurchaseList]);

    const [, setRender] = useState({});
    return (<>
        <Header />
        <div className="store-view-container">
            {storeView && <StoreView productsList={purchaseList} setProductsList={setPurchaseList} onClose={() => setStoreView(false)} />}
        </div>
        <h1 className="title">{(id ? "EDITAR" : "CADASTRAR") + " VENDA"}</h1>
        <form className="reg-form">
            <div className="double-input">
                <label style={{ width: "55%" }}>
                    <span>CLIENTE</span>
                    <input list="cliente" onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)} value={name}
                        onChange={e => setName(e.target.value)} disabled={clientAlreadyRegistered} required={cpf_cnpj.length > 0 || name.length > 0} />
                </label>
                <label style={{ width: "24%" }}>
                    <span>CPF/CNPJ</span>
                    <input list="cpf_cnpj" onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)} value={cpf_cnpj} onChange={e => {
                            const value = e.target.value.length > 14 ? utils.CNPJRegex(e) : utils.cpfRegex(e)
                            setCpf_Cnpj(value)
                            if (!(e.target.value.length > 14 ? utils.CNPJValidator(e) : utils.cpfValidator(e)))
                                e.target.setCustomValidity("CPF/CNPJ inválido!");
                            else
                                e.target.setCustomValidity("");

                            if (value.length >= 14) {
                                const client = clients?.find((client: Client) => client.cpf_cnpj === value);
                                if (client) {
                                    setName(client.name);
                                    setCpf_Cnpj(client.cpf_cnpj);
                                    setClientAlreadyRegistered(true);
                                    utils.inputsVerify(utils.getAllInputs(document));
                                } else {
                                    setName("");
                                    setClientAlreadyRegistered(false);
                                }
                            } else {
                                setClientAlreadyRegistered(false);

                            }
                        }} required={cpf_cnpj.length > 0 || name.length > 0} />
                    <datalist id="cpf_cnpj" >
                        {clients?.map((client: Client) => {
                            return <option key={client.cpf_cnpj} value={client.cpf_cnpj} />
                        })}
                    </datalist>
                </label>

                <label style={{ width: "15%" }}>
                    <span className="span-active">DATA</span>
                    <input type="date" onFocus={e => utils.InputsHandleFocus(e)}
                        value={date.toString()} onChange={e => setDate(e.target.value)} required />
                </label>
            </div>
            {purchaseList && <div style={{ width: "100%" }}>
                {purchaseList?.map(({ product, quantity }, index) => {
                    return <div className="service-product-show" key={index}>
                        <div className="start">
                            <img src={`../public/images/products/${product.image ? product.image : "../picture.png"}`} alt={product.name} />
                            <span>{product.name}</span>
                        </div>
                        <div className="end">
                            <span>{utils.monetaryMask(quantity * product.price)}</span>
                            <button type="button" onClick={() => {
                                const newProducts = purchaseList;
                                newProducts[index].quantity = newProducts[index].quantity - 1;
                                if (newProducts[index].quantity === 0) {
                                    newProducts.splice(index, 1);
                                }
                                setPurchaseList(newProducts);
                                setRender({});
                            }}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => {
                                const newProducts = purchaseList;
                                newProducts[index].quantity = newProducts[index].quantity + 1;
                                setPurchaseList(newProducts);
                                setRender({});
                            }}>+</button>
                            <button type="button" onClick={() => {
                                const newProducts = purchaseList;
                                newProducts.splice(index, 1);
                                setPurchaseList(newProducts);
                                setRender({});
                            }}><img src="./public/images/delete.png" /></button>
                        </div>
                    </div>

                })}
                <div className="service-product-show" style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                    <p>TOTAL:</p>
                    <p>{utils.monetaryMask(purchaseList.reduce((acc, { product, quantity }) => {
                        return acc + (product.price * quantity)
                    }, 0))}</p>
                </div>
            </div>}
            <div className="reg-form-buttons">
                <button type="button" className="reg-form-button" onClick={() => setStoreView(true)}>ADICIONAR PRODUTOS</button>
                <button type="button" className="reg-form-button" onClick={async () => {
                    const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                    if (!form.checkValidity()) {
                        form.reportValidity()
                        return
                    }
                    if (purchaseList.length === 0) {
                        return
                    }
                    try {
                        let client: Client;
                        if (!clientAlreadyRegistered && name.length > 0 && cpf_cnpj.length > 0) {
                            client = window.api.Client()
                            client.cpf_cnpj = cpf_cnpj;
                            client.name = name;
                            await client.insert(client);
                        } else if (name.length > 0 && cpf_cnpj.length > 0) {
                            client = await window.api.Client().getByCpfCnpj(cpf_cnpj);
                        }
                        const purchase = window.api.Purchase();
                        client && (purchase.cpf_cnpj = client.cpf_cnpj);
                        purchase.date = date;

                        const newId = await (async () => {
                            if (id) {
                                purchase.id = +id;
                                await window.api.PurchaseList().deleteAllByPurchaseId(purchase.id);
                                await purchase.update(purchase);
                                return purchase.id;
                            } else {
                                const response = await purchase.insert(purchase);
                                return response.lastInsertRowid;
                            }
                        })()
                        purchaseList.forEach(async ({ product, quantity }) => {
                            const purchaseList = window.api.PurchaseList()
                            purchaseList.id_purchase = newId;
                            purchaseList.id_product = product.id;
                            purchaseList.quantity = quantity;
                            purchaseList.name = product.name;
                            purchaseList.price = product.price;
                            purchaseList.image = product.image;
                            purchaseList.description = product.description;
                            await purchaseList.insert(purchaseList);
                        });
                        const purchaseFinal = await window.api.Purchase().getById(newId)
                        const docDefinition = pdfTemplate.purchasePDF({
                            purchase: purchaseFinal,
                            purchaseList: await window.api.PurchaseList().getByPurchaseId(newId),
                            info: await window.api.Info().get(),
                            client: await window.api.Client().getByCpfCnpj(purchaseFinal.cpf_cnpj),
                            addresses: await window.api.Address().getByCpfCnpj(purchaseFinal.cpf_cnpj),
                            contacts: await window.api.Contact().getByCpfCnpj(purchaseFinal.cpf_cnpj),
                        });
                        console.log(await window.api.pdfCreator(
                            docDefinition,
                            `purchase-${newId}`,
                            "purchases"
                        ));
                    } catch (error) {
                        console.log(error)
                    }

                }}>{id ? "SALVAR" : "CADASTRAR"}</button>
            </div>
        </form>
    </>)
}