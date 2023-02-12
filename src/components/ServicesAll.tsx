import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ServicesAll() {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>();
    const [services, setServices] = useState<Service[]>();
    const [search, setSearch] = useState("");
    useEffect(() => {
        window.api.Client().getAll().then((clients) => {
            setClients(clients);
        });
        window.api.Service().getAll().then((services) => {
            setServices(services);
        });
    }, []);

    return (<>
        <Header />
        <h1 className="title">{"SERVIÇOS"}</h1>

        <div className="todos">
            <div>
                <label>
                    <span>BUSCAR SERVIÇO POR PLACA</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={search} onChange={e => { setSearch(e.target.value); }}></input>
                </label>
            </div>
            <table className="table-ordem-servicos">
                <thead>
                    <tr>
                        <th>PLACA</th>
                        <th>CLIENTE</th>
                        <th>CPF/CNPJ</th>
                        <th>DATA</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {services?.map((servico, index: number) => {
                        const client = clients.find(c => c.cpf_cnpj == servico.cpf_cnpj)
                        if (search == '') {
                            return (<tr key={index} onClick={() => navigate(`/ServiceEditForm/${servico.id}`)} >
                                <th>{servico.id_plate}</th>
                                <th>{client.name}</th>
                                <th>{client.cpf_cnpj}</th>
                                <th>{servico.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`${utils.monetaryMask(servico.price)}`}</th>
                            </tr>)
                        } else if (servico.id_plate.toString().toLowerCase().startsWith(search.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/ServiceEditForm/${servico.id}`)} >
                                <th>{servico.id_plate}</th>
                                <th>{client.name}</th>
                                <th>{client.cpf_cnpj}</th>
                                <th>{servico.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`${utils.monetaryMask(servico.price)}`}</th>
                            </tr>)
                        }
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        {/* <th>OLA FOOTER</th> */}
                    </tr>
                </tfoot>
            </table>
        </div>
    </>)
}