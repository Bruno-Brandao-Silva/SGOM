import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

export default function Client() {
    const navigate = useNavigate();
    const cpf_cnpj = useParams().cpf_cnpj?.replace("\\", "/");
    const [client, setClient] = useState<Client>();
    const [addresses, setAddresses] = useState<Address[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    const [contacts, setContacts] = useState<Contact[]>();
    useEffect(() => {
        window.api.Client().getByCpfCnpj(cpf_cnpj).then((client) => {
            setClient(client);
        });
        window.api.Address().getByCpfCnpj(cpf_cnpj).then((addresses) => {
            setAddresses(addresses);
        });
        window.api.Vehicle().getByCpfCnpj(cpf_cnpj).then((vehicles) => {
            setVehicles(vehicles);
        });
        window.api.Contact().getByCpfCnpj(cpf_cnpj).then((contacts) => {
            setContacts(contacts);
        });
    }, []);
    return (<>
        <Header />
        <h1 className="title">CLIENTE</h1>
        <div className="client">
            <div className="client-toolbar">
                <Link className="link" to={`/ClientEditForm/${cpf_cnpj.replace("/", "\\")}`}><img src='../public/images/edit-user.png'></img><span>EDITAR CLIENTE</span></Link>
                <Link className="link" to={`/VehicleRegForm/${cpf_cnpj.replace("/", "\\")}`}><img src='../public/images/add-sedan.png'></img><span>ADICIONAR VEíCULO</span></Link>
                <Link className="link" to={`/AddressRegForm/${cpf_cnpj.replace("/", "\\")}`}><img src='../public/images/address.png'></img><span>ADICIONAR ENDEREÇO</span></Link>
                <Link className="link" to={`/ServiceRegForm/${cpf_cnpj.replace("/", "\\")}`}><img src='../public/images/add-service.png'></img><span>ADICIONAR SERVIÇO</span></Link>
            </div>
            <div className="client-container">
                <div className="client-info">
                    <h1>{client?.name}</h1>
                    <h3>CPF/CNPJ: {client?.cpf_cnpj}</h3>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <div className="client-contacts">
                        <h2>CONTATOS</h2>
                        {contacts?.map((contact, index: number) => (<Link to={`/ContactEditForm/${cpf_cnpj.replace("/", "\\")}/${contact.id}`} key={index} className="client-contact-link" >
                            <p>{`${contact.type}: ${contact.value}`}</p>
                        </Link>))}
                    </div>
                    <div className="client-vehicles">
                        <h2>VEÍCULOS</h2>
                        {vehicles?.map((vehicle, index: number) => (<Link to={`/VehicleEditForm/${cpf_cnpj.replace("/", "\\")}/${vehicle.id_plate}`} key={index} className="client-vehicle-link" >
                            <p>{`${vehicle.id_plate}: ${vehicle.brand} ${vehicle.model} ${vehicle.color} ${vehicle.year}`}</p>
                        </Link>))}
                    </div>
                </div>
                <div className="client-addresses">
                    <h2>ENDEREÇOS</h2>
                    {addresses?.map((address, index: number) => (<Link to={`/AddressEditForm/${cpf_cnpj.replace("/", "\\")}/${address.id}`} key={index} className="client-address-link" >
                        <p>{`${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state} - CEP:${address.cep}` + (address.complement && `  -  Complemento: ${address.complement}`)}</p>
                    </Link>))}
                </div>
            </div>
        </div>
    </>)
}