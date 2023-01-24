import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Header() {
    const hash = window.location.hash;
    return (<>
        <header>
            <Link className={hash === "#/" ? "link link-active" : "link"} to='/'><img className="logo" src="../public/images/favicon.png" alt="Logo" /></Link>
            <div className="nav-bar" onWheel={(e) => {
                e.currentTarget.scrollBy({
                    left: e.deltaY,
                    behavior: "auto"
                });
            }}>
                <Link className={hash.includes("#/AllClients") ? "link link-active" : "link"} to='/AllClients'><img src='../public/images/user.png'></img><p>CLIENTES</p></Link>
                <Link className={hash.includes("#/ClientRegForm") ? "link link-active" : "link"} to='/ClientRegForm'><img src='../public/images/add-user.png'></img><p>CADASTRAR CLIENTE</p></Link>
                <Link className={hash.includes("#/AllVehicles") ? "link link-active" : "link"} to='/AllVehicles'><img src='../public/images/sedan.png'></img><p>VEÍCULOS</p></Link>
                <Link className={hash.includes("#/AllServices") ? "link link-active" : "link"} to='/AllServices'><img src='../public/images/service.png'></img><p>SERVIÇO REALIZADOS</p></Link>
                <Link className={hash.includes("#/AddressRegForm") ? "link link-active" : "link"} to='/AddressRegForm/459.336.068-47'><img src='../public/images/service.png'></img><p>TESTE</p></Link>
            </div>
        </header>
    </>)
}