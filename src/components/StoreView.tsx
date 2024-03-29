import React, { useEffect, useState } from "react";
import utils from "../models/Utils";

export default function StoreView({ productsList, setProductsList, onClose }:
    {
        productsList: { product: Product, quantity: number }[],
        setProductsList: React.Dispatch<React.SetStateAction<{ product: Product, quantity: number }[]>>,
        onClose: () => void
    }) {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>();
    const [found, setFound] = useState<Product[]>();
    const [page, setPage] = useState(0);
    const [, setRender] = useState({});
    useEffect(() => {
        window.api.Product().getAll().then((res) => {
            setProducts(res);
            setFound(res);
        });
    }, []);
    useEffect(() => {
        setPage(0);
        if (search.length > 0) {
            setFound(products?.filter((p) => {
                return p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString().includes(search);
            }));
        } else {
            setFound(products);
        }
    }, [search]);
    return (
        <div className="store-view">
            <div className="header">
                <label>
                    <span>BUSCAR PRODUTO POR NOME OU ID</span>
                    <input list="cliente" onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)} value={search}
                        onChange={e => setSearch(e.target.value)} />
                </label>
                <button onClick={onClose}>X</button>
            </div>

            <div className="products-container">
                {found?.slice(0 + (15 * page), 15 + (15 * page)).map((product, index) => {
                    return (
                        <div className="product-card" key={index}>
                            <div className="product-info-container" >
                                <img src={`../public/images/products/${product.image ? product.image : "../picture.png"}`} />
                                <div className="product-info">
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p className="price">{utils.monetaryMask(product.price)}</p>
                                    <p className="id">{`ID: ${product.id}`}</p>
                                    <div className="products-buttons">
                                        <button onClick={() => {
                                            const productIndex = productsList?.findIndex((p) => p.product.id === product.id);
                                            if (productIndex !== -1) {
                                                const newProductsList = productsList;
                                                newProductsList[productIndex].quantity = newProductsList[productIndex].quantity - 1;
                                                if (newProductsList[productIndex].quantity === 0) {
                                                    newProductsList.splice(productIndex, 1);
                                                }
                                                setProductsList(newProductsList);
                                                setRender({});
                                            }
                                        }}>-</button>
                                        <span>{productsList.find((p) => p.product.id === product.id)?.quantity || 0}</span>
                                        <button onClick={() => {
                                            const productIndex = productsList?.findIndex((p) => p.product.id === product.id);
                                            if (productIndex !== -1) {
                                                const newProductsList = productsList;
                                                newProductsList[productIndex].quantity = newProductsList[productIndex].quantity + 1;
                                                setProductsList(newProductsList);
                                                setRender({});

                                            } else {
                                                setProductsList([...productsList, { product, quantity: 1 }]);
                                                setRender({});
                                            }
                                        }}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
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
    );
}