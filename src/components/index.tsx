import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
    return (<>
        <div>
            <br />
            <Link to='/FormCadCliente'>FormCadCliente</Link>
            <br />
            <Link to='/FormCadCliente/1'>FormCadCliente/1</Link>
            <br />
            <Link to='/FormCadEndereco/1'>FormCadEndereco/1</Link>
            <br />
            <Link to='/FormCadEndereco/1/1'>FormCadEndereco/1/1</Link>
            <br />
            <Link to='/FormCadServico/'>FormCadServiço</Link>
        </div>
        <div>
            <div>
                <Link to='/AllClientes'><img src='public/images/favicon.png'></img></Link>
            </div>
        </div>
    </>)
}