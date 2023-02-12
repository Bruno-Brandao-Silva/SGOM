import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function ClientsAll() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [clients, setClients] = useState<Client[]>([]);
    const [clientsObj, setClientsObj] = useState<{ name: string, cpf_cnpj: string, email: string, telefone: string, celular: string }[]>([]);
    const [found, setFound] = useState<{ name: string, cpf_cnpj: string, email: string, telefone: string, celular: string }[]>([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        window.api.Client().getAll().then(clients => setClients(clients));
    }, []);
    useEffect(() => {
        clients.forEach((client, index: number) => {
            window.api.Contact().getByCpfCnpj(client.cpf_cnpj).then(contacts => {
                const email = contacts.find(c => c.type == "email")?.value;
                const telefone = contacts.find(c => c.type == "telefone")?.value;
                const celular = contacts.find(c => c.type == "celular")?.value;
                setClientsObj(prev => [...prev, { name: client.name, cpf_cnpj: client.cpf_cnpj, email, telefone, celular }]);
                setFound(prev => [...prev, { name: client.name, cpf_cnpj: client.cpf_cnpj, email, telefone, celular }]);
            });
        });
    }, [clients])

    useEffect(() => {
        if (search.length > 0) {
            setFound(clientsObj?.filter((obj) => {
                return obj.name.toLowerCase().includes(search.toLowerCase())
                    || obj.cpf_cnpj.toString().includes(search)
                    || obj.cpf_cnpj.toString().replace(/\W/g, '').includes(search);
            }));
        } else {
            setFound(clientsObj);
        }
    }, [search]);

    return (<>
        <Header />
        <h1 className="title">{"CLIENTES"}</h1>

        <div className="all">
            <div>
                <label>
                    <span>BUSCAR CLIENTE POR NOME OU CPF/CNPJ</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={search} onChange={e => { setSearch(e.target.value); }}></input>
                </label>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CPF/CNPJ</th>
                        <th>EMAIL</th>
                        <th>CELULAR</th>
                        <th>TELEFONE</th>
                    </tr>
                </thead>
                <tbody>
                    {found?.slice(0 + (15 * page), 15 + (15 * page)).map((cliente, index: number) => {
                        return (<tr key={index} onClick={() => navigate(`/Client/${cliente.cpf_cnpj.replace("/", "\\")}`)} >
                            <th>{cliente.name}</th>
                            <th>{cliente.cpf_cnpj}</th>
                            <th>{cliente.email}</th>
                            <th>{cliente.celular}</th>
                            <th>{cliente.telefone}</th>
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