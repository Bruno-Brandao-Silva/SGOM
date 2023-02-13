import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function PurchaseAll() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [obj, setObj] = useState<{ purchase: Purchase, purchaseList: PurchaseList[], total: number }[]>([]);
    const [found, setFound] = useState<{ purchase: Purchase, purchaseList: PurchaseList[], total: number }[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        window.api.Purchase().getAll().then((purchases) => {
            setPurchases(purchases);
        });
    }, []);

    useEffect(() => {
        purchases?.forEach((purchase) => {
            window.api.PurchaseList().getByPurchaseId(purchase.id).then((purchaseList) => {
                const total = purchaseList.reduce((acc, { price, quantity }) => {
                    return acc + (price * quantity)
                }, 0)

                setObj((obj) => [...obj, { purchase, purchaseList, total }]);
                setFound((found) => [...found, { purchase, purchaseList, total }]);
            });
        });
    }, [purchases]);

    return (<>
        <Header />
        <h1 className="title">{"VENDAS"}</h1>
        <div className="all">
            <div>
                <label>
                    <span>BUSCAR SERVIÇO POR PLACA</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={search} onChange={e => { setSearch(e.target.value); }}></input>
                </label>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>CPF/CNPJ</th>
                        <th>DATA</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {found?.slice(0 + (15 * page), 15 + (15 * page)).map(({ purchase, purchaseList, total }, index: number) => {
                        return (<tr key={index} onClick={() => navigate(`/PurchaseEditForm/${purchase.id}`)} >
                            <th>{purchase.cpf_cnpj}</th>
                            <th>{purchase.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                            <th>{`${utils.monetaryMask(total)}`}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => {
                    if (page > 0) {
                        setPage(page - 1);
                    }
                }}>{"<"}</button>
                <span>{page + 1}</span>
                <button onClick={() => {
                    if (found?.length > 15 + (15 * page)) {
                        setPage(page + 1);
                    }
                }}>{">"}</button>
            </div>
        </div>
    </>)
}