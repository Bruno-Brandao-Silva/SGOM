import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function VehiclesAll() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [search, setSearch] = React.useState("");
    const [found, setFound] = useState<{ vehicle: Vehicle, client: Client }[]>([]);
    const [vehicleObj, setVehicleObj] = useState<{ vehicle: Vehicle, client: Client }[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    useEffect(() => {
        window.api.Vehicle().getAll().then((vehicles) => {
            setVehicles(vehicles);
        });
    }, []);
    useEffect(() => {
        vehicles.forEach((vehicle, index: number) => {
            window.api.Client().getByCpfCnpj(vehicle.cpf_cnpj).then(client => {
                setVehicleObj(prev => [...prev, { vehicle, client }]);
                setFound(prev => [...prev, { vehicle, client }]);
            });
        });
    }, [vehicles]);

    useEffect(() => {
        setPage(0);
        if (search.length > 0) {
            setFound(vehicleObj?.filter((obj) => {
                return (obj.vehicle.id_plate.toLowerCase().includes(search.toLowerCase())
                    || (obj.vehicle.id_plate.toLowerCase().replace(/\W/g, '').includes(search.toLowerCase())
                        || obj.client.cpf_cnpj.toString().includes(search))
                    || obj.client.cpf_cnpj.toString().replace(/\W/g, '').includes(search));
            }));
        } else {
            setFound(vehicleObj);
        }
    }, [search]);
    return (<>
        <Header />
        <h1 className="title">{"VEÍCULOS"}</h1>

        <div className="all">
            <div>
                <label>
                    <span>BUSCAR VEÍCULO POR PLACA OU CPF/CNPJ</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={search} onChange={e => { setSearch(e.target.value); }}></input>
                </label>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>PLACA</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>ANO</th>
                        <th>CLIENTE</th>
                        <th>CPF/CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {found?.slice(0 + (15 * page), 15 + (15 * page)).map(({ vehicle, client }, index: number) => {
                        return (<tr key={index} onClick={() => navigate(`/VehicleEditForm/${vehicle.cpf_cnpj.replace("/", "\\")}/${vehicle.id_plate}`)} >
                            <th>{vehicle.id_plate}</th>
                            <th>{vehicle.brand}</th>
                            <th>{vehicle.model}</th>
                            <th>{vehicle.year}</th>
                            <th>{client?.name}</th>
                            <th>{client?.cpf_cnpj}</th>
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