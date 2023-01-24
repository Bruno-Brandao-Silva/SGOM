import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

export default function Client() {
    const navigate = useNavigate();
    const { cpf_cnpj } = useParams();
    const [client, setClient] = useState<Client>();
    const [addresses, setAddresses] = useState<Address[]>();
    useEffect(() => {
        window.api.Client().getByCpfCnpj(cpf_cnpj).then((client) => {
            setClient(client);
        });
        window.api.Address().getByCpfCnpj(cpf_cnpj).then((addresses) => {
            setAddresses(addresses);
        });
    }, []);
    return (<>
        <Header />
        <div className="client">
            <div className="client-toolbar">
                <Link className="link" to={`/ClientRegForm/${cpf_cnpj}`}><img src='../public/images/user.png'></img><span>EDITAR CLIENTE</span></Link>
                <Link className="link" to={`/VehicleRegForm/${cpf_cnpj}`}><img src='../public/images/sedan.png'></img><span>ADICIONAR VEíCULO</span></Link>
                <Link className="link" to={`/AddressRegForm/${cpf_cnpj}`}><img src='../public/images/address.png'></img><span>ADICIONAR ENDEREÇO</span></Link>
                <Link className="link" to={`/ServiceRegForm/${cpf_cnpj}`}><img src='../public/images/service.png'></img><span>ADICIONAR SERVIÇO</span></Link>
            </div>
            <div className="client-container">
                <div className="client-info">
                    <h1>{client?.name}</h1>
                    <h3>CPF/CNPJ: {client?.cpf_cnpj}</h3>
                </div>
                <div className="client-addresses">
                    <h2>ENDEREÇOS</h2>
                    {addresses?.map((address, index: number) => (<Link to={`/AddressRegForm/${cpf_cnpj}/${address.id}`} key={index} className="client-address-link" >
                        <p>{`${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state} - CEP:${address.cep}`}</p>
                        {address.complement && <p>Complemento: {address.complement}</p>}
                    </Link>))}
                </div>
            </div>
        </div>
    </>)
}