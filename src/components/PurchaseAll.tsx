import React, { useState, useEffect } from "react";

export default function PurchaseAll() {
    const [search, setSearch] = useState("");
    const [purchases, setPurchases] = useState([]);
    const [obj, setObj] = useState<{ purchase: Purchase, purchaseList: PurchaseList[], total: number }[]>();
    const [found, setFound] = useState<{ purchase: Purchase, purchaseList: PurchaseList[], total: number }[]>();
    useEffect(() => {
        window.api.Purchase().getAll().then((purchases) => {
            setPurchases(purchases);
        });
    }, []);

    useEffect(() => {
        purchases?.forEach((purchase) => {
            window.api.PurchaseList().getByPurchaseId(purchase.id).then((purchaseList) => {
                let total = 0;
                purchaseList.forEach((purchaselist) => {
                    // total += purchaselist. * purchaselist.quantity;
                });
                setObj((obj) => [...obj, { purchase, purchaseList, total }]);
            });
        });
    }, [purchases]);

    return (<>
    </>)
}