import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../models/utils";
import Header from "./Header";

export default function AllProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        window.api.Product().getAll().then((products) => {
            setProducts(products);
        });
    }, []);

    return (<>
        <Header />
        <div className="products-container">
            {products.map((product, index) => {
                return (
                    <div className="product-card" key={index}>
                        <div className="product-info-container" >
                            <img src={`../public/images/products/${product.image}`} />
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
    </>)
}