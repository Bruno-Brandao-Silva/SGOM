import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ServicesAll() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [found, setFound] = useState<{ service: Service, client: Client, total: number }[]>([]);
    const [serviceObj, setServiceObj] = useState<{ service: Service, client: Client, total: number }[]>([]);
    const [services, setServices] = useState<Service[]>();
    useEffect(() => {
        window.api.Service().getAll().then((services) => {
            setServices(services);
        });
    }, []);
    useEffect(() => {
        services?.forEach((service, index: number) => {
            window.api.Client().getByCpfCnpj(service.cpf_cnpj).then(client => {
                window.api.RequireList().getAllByServiceId(service.id).then(requireList => {
                    setServiceObj(prev => [...prev, {
                        service, client, total: requireList.reduce((acc, item) => {
                            return acc + (item.price * item.quantity)
                        }, 0) + service.price
                    }]);
                    setFound(prev => [...prev, {
                        service, client, total: requireList.reduce((acc, item) => {
                            return acc + (item.price * item.quantity)
                        }, 0) + service.price
                    }]);
                });
            });
        });
    }, [services]);

    useEffect(() => {
        setPage(0);
        if (search.length > 0) {
            setFound(serviceObj?.filter((obj) => {
                return obj.service.id_plate.toLowerCase().includes(search.toLowerCase())
                    || (obj.service.id_plate.toLowerCase().replace(/\W/g, '').includes(search.toLowerCase())
                        || obj.client.cpf_cnpj.includes(search))
                    || obj.client.cpf_cnpj.replace(/\W/g, '').includes(search);
            }));
        } else {
            setFound(serviceObj);
        }
    }, [search]);

    return (<>
        <Header />
        <h1 className="title">{"SERVIÇOS"}</h1>

        <div className="all">
            <div>
                <label>
                    <span>BUSCAR SERVIÇO POR PLACA OU CPF/CNPJ</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={search} onChange={e => { setSearch(e.target.value); }}></input>
                </label>
            </div>
            <table className="table">
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
                    {found?.slice(0 + (15 * page), 15 + (15 * page)).map(({ service, client, total }, index: number) => {
                        return (<tr key={index} onClick={() => navigate(`/ServiceEditForm/${service.id}`)} >
                            <th>{service.id_plate}</th>
                            <th>{client.name}</th>
                            <th>{client.cpf_cnpj}</th>
                            <th>{service.date.toString().replace(/\D/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</th>
                            <th>{`${utils.monetaryMask(total)}`}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
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
    </>)
}