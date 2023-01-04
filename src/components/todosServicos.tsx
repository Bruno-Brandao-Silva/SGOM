import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/utils";
import Client from "../models/Client";
import Service from "../models/Service";

export default function todosOrdem_Servicos() {
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
        <div className="todos">
            <div id="close" className="container-btn-top">
                <div></div>
                <button type="button" className="btn-close" onClick={() => {
                    navigate('/')
                }}>
                    <span>
                        <div></div>
                        <div></div>
                    </span>
                </button>
            </div>
            <h1 className="index-h1">TODOS OS SERVIÇOS</h1>
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
                        let total = 0;
                        // services.forEach(s => {
                        //     // if (s.id_servico == servico.id) {
                        //     //     total += s.quantidade * s.precoUnitario
                        //     // }
                        // })

                        if (search == '') {
                            return (<tr key={index} onClick={() => navigate(`/EditServico/${servico.id}`)} >
                                <th>{servico.id_plate}</th>
                                <th>{client.name}</th>
                                <th>{client.cpf_cnpj}</th>
                                <th>{servico.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`${utils.monetaryMask(total)}`}</th>
                            </tr>)
                        } else if (servico.id_plate.toString().toLowerCase().startsWith(search.toLowerCase())) {
                            return (<tr key={index} onClick={() => navigate(`/EditServico/${servico.id}`)} >
                                <th>{servico.id_plate}</th>
                                <th>{client.name}</th>
                                <th>{client.cpf_cnpj}</th>
                                <th>{servico.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                                <th>{`${utils.monetaryMask(total)}`}</th>
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