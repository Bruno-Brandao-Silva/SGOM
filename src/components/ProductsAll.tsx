import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ProductsAll() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [found, setFound] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        window.api.Product().getAll().then((products) => {
            setProducts(products);
            setFound(products);
        });
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            setFound(products?.filter((p) => {
                return p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString().includes(search);
            }));
        } else {
            setFound(products);
        }
    }, [search]);
    return (<>
        <Header />
        <h1 className="title">{"PRODUTOS"}</h1>

        <label style={{ width: "50%", margin: "20px auto" }}>
            <span>BUSCAR PRODUTO POR NOME OU ID</span>
            <input list="cliente" onFocus={e => utils.InputsHandleFocus(e)}
                onBlur={e => utils.InputsHandleFocusOut(e)} value={search}
                onChange={e => setSearch(e.target.value)} />
        </label>
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
                                        navigate(`/ProductRegForm/${product.id}`);
                                    }}>editar</button>
                                    <button onClick={async () => {
                                        await window.api.Product().delete(product.id);
                                        const newProducts = products.filter((p) => p.id !== product.id);
                                        setProducts(newProducts);
                                    }}>excluir</button>
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
    </>)
}