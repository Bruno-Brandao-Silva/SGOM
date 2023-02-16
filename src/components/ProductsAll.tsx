import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import PopUp from "./PopUp";
import PopUpDeleteTemplate from "./PopUpDeleteTemplate";
import Header from "./Header";

export default function ProductsAll() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [found, setFound] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [popUp, setPopUp] = useState<React.ReactNode>(<PopUpDeleteTemplate buttons={[
        {
            text: "Confirmar", onClick: async () => {
                await window.api.Product().delete(1);
                const newProducts = products.filter((p) => p.id !== 1);
                setProducts(newProducts);
                setPopUp(null)
            }
        }, {
            text: "Cancelar", onClick: () => {
                setPopUp(null)
            }
        }
    ]} title="Confirmar exclusão do produto" />)

    useEffect(() => {
        window.api.Product().getAll().then((products) => {
            setProducts(products);
            setFound(products);
        });
    }, []);

    useEffect(() => {
        setPage(0);
        if (search.length > 0) {
            setFound(products?.filter((p) => {
                return p.name.toLowerCase().includes(search.toLowerCase())
                    || p.id.toString().includes(search.toLowerCase())
                    || p.description?.toLowerCase().includes(search.toLowerCase());
            }));
        } else {
            setFound(products);
        }
    }, [search]);

    useEffect(() => {
        if (search.length > 0) {
            setFound(products?.filter((p) => {
                return p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString().includes(search);
            }));
        } else {
            setFound(products);
        }
    }, [products])
    return (<>
        <Header />
        {popUp && <PopUp>{popUp}</PopUp>}
        <h1 className="title">{"PRODUTOS"}</h1>

        <label style={{ width: "50%", margin: "20px auto" }}>
            <span>BUSCAR PRODUTO POR NOME, DESCRIÇÃO OU ID</span>
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
                                        navigate(`/ProductEditForm/${product.id}`);
                                    }}>editar</button>
                                    <button onClick={async () => {
                                        setPopUp(<PopUpDeleteTemplate buttons={[
                                            {
                                                text: "Confirmar", onClick: async () => {
                                                    await window.api.Product().delete(product.id);
                                                    const newProducts = products.filter((p) => p.id !== product.id);
                                                    setProducts(newProducts);
                                                    setPopUp(null)
                                                }
                                            }, {
                                                text: "Cancelar", onClick: () => {
                                                    setPopUp(null)
                                                }
                                            }
                                        ]} title="Confirmar exclusão do produto" />)

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