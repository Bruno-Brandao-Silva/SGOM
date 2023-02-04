import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import utils from "../models/utils";
import Header from "./Header";
import StoreView from "./StoreView";

export default function ServiceRegForm() {
    const { cpf_cnpj, id_plate, id } = useParams();
    const navigate = useNavigate();

    const dataAtual = new Date().toLocaleDateString().replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')

    const [inputs, setInputs] = useState<(HTMLInputElement | HTMLTextAreaElement)[]>();
    // const inputs = utils.getAllInputs(document);
    const [clients, setClients] = useState<Client[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    const [name, setName] = useState("");
    const [cpf_cnpj_input, setCpf_cnpj_input] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(dataAtual);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [id_plate_input, setId_plate_input] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [km, setKm] = useState("");

    const [products, setProducts] = useState<{ product: Product, quantity: number }[]>();
    const [storeView, setStoreView] = useState(false);

    const [carAlreadyRegistered, setCarAlreadyRegistered] = useState(false);
    const [clientAlreadyRegistered, setClientAlreadyRegistered] = useState(false);

    useEffect(() => {
        setInputs(utils.getAllInputs(document));
        window.api.Client().getAll().then((clients) => setClients(clients));
    }, []);

    useEffect(() => {

    }, [id_plate_input]);

    useEffect(() => {
        if (id) {
            window.api.Service().getById(+id).then((service: Service) => {
                setDescription(service.description);
                setPrice(service.price.toString());
                setDate(service.date);
                setId_plate_input(service.id_plate);
                setKm(service.km.toString());
                setCarAlreadyRegistered(true);
                window.api.Vehicle().getByCpfCnpj(service.cpf_cnpj).then((vehicles) => setVehicles(vehicles));
                window.api.Client().getByCpfCnpj(service.cpf_cnpj).then((client) => {
                    setName(client.name)
                    setCpf_cnpj_input(client.cpf_cnpj);
                    setClientAlreadyRegistered(true);
                });
                window.api.Vehicle().getByPlate(service.id_plate).then((vehicle) => {
                    setBrand(vehicle.brand);
                    setModel(vehicle.model);
                    setColor(vehicle.color);
                    setYear(vehicle.year.toString());
                });
            }).finally(() => utils.inputsVerify(inputs));
        } else {
            cpf_cnpj && window.api.Client().getByCpfCnpj(cpf_cnpj).then((client: Client) => {
                if (client) {
                    setName(client.name);
                    setCpf_cnpj_input(client.cpf_cnpj);
                    setClientAlreadyRegistered(true);
                } else {
                    if ((cpf_cnpj.length > 14 ? utils.CNPJValidator(cpf_cnpj) : utils.cpfValidator(cpf_cnpj))) {
                        setCpf_cnpj_input(cpf_cnpj);
                        setClientAlreadyRegistered(false);
                    }
                }
            }).finally(() => utils.inputsVerify(inputs));
            cpf_cnpj && window.api.Vehicle().getByCpfCnpj(cpf_cnpj).then((vehicles: Vehicle[]) => {
                setVehicles(vehicles);
                if (id_plate) {
                    setId_plate_input(id_plate);
                    const vehicle = vehicles.find((vehicle: Vehicle) => vehicle.id_plate === id_plate);
                    if (vehicle) {
                        setCarAlreadyRegistered(true);
                        setBrand(vehicle.brand);
                        setModel(vehicle.model);
                        setColor(vehicle.color);
                        setYear(vehicle.year.toString());
                        setKm(vehicle.km.toString());
                    }
                }
            }).finally(() => utils.inputsVerify(inputs));
        }
    }, [inputs]);


    return (<>
        <Header />
        <div className="store-view-container">
            {storeView && <StoreView />}
        </div>
        <form className="reg-form" >
            <div className="double-input">
                <label style={{ width: "55%" }}>
                    <span>CLIENTE</span>
                    <input list="cliente" onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)} value={name}
                        onChange={e => setName(e.target.value)} disabled={clientAlreadyRegistered} required />
                </label>
                <label style={{ width: "24%" }}>
                    <span>CPF/CNPJ</span>
                    <input list="cpf_cnpj" onFocus={e => utils.InputsHandleFocus(e)}
                        onBlur={e => utils.InputsHandleFocusOut(e)} value={cpf_cnpj_input} onChange={e => {
                            const value = e.target.value.length > 14 ? utils.CNPJRegex(e) : utils.cpfRegex(e)
                            setCpf_cnpj_input(value)
                            if (!(e.target.value.length > 14 ? utils.CNPJValidator(e) : utils.cpfValidator(e)))
                                e.target.setCustomValidity("CPF/CNPJ inválido!");
                            else
                                e.target.setCustomValidity("");

                            if (value.length >= 14) {
                                const client = clients?.find((client: Client) => client.cpf_cnpj === value);
                                if (client) {
                                    setName(client.name);
                                    setCpf_cnpj_input(client.cpf_cnpj);
                                    setClientAlreadyRegistered(true);
                                    window.api.Vehicle().getByCpfCnpj(client.cpf_cnpj).then((vehicles) => {
                                        setVehicles(vehicles)
                                        setBrand("");
                                        setModel("");
                                        setColor("");
                                        setYear("");
                                        setKm("");
                                        setId_plate_input("");
                                        setCarAlreadyRegistered(false);
                                    });
                                    utils.inputsVerify(inputs)
                                } else {
                                    setVehicles([]);
                                    setBrand("");
                                    setModel("");
                                    setColor("");
                                    setYear("");
                                    setKm("");
                                    setId_plate_input("");
                                    setCarAlreadyRegistered(false);
                                    setClientAlreadyRegistered(false);
                                }
                            }
                        }} disabled={
                            cpf_cnpj ? (cpf_cnpj.length > 14 ? utils.CNPJValidator(cpf_cnpj) : utils.cpfValidator(cpf_cnpj)) : false
                        } required />
                    <datalist id="cpf_cnpj" >
                        {clients?.map((client: Client) => {
                            return <option key={client.cpf_cnpj} value={client.cpf_cnpj} />
                        })}
                    </datalist>
                </label>

                <label style={{ width: "15%" }}>
                    <span className="span-active">DATA</span>
                    <input type="date" onFocus={e => utils.InputsHandleFocus(e)}
                        value={date.toString()} onChange={e => setDate(e.target.value)} required />
                </label>
            </div>
            <div className="triple-input-forced">
                <label>
                    <span>PLACA</span>
                    <input list="placa" pattern="[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}"
                        onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)}
                        value={id_plate_input} onChange={async e => {
                            const value = utils.plateRegex(e);
                            setId_plate_input(value)
                            if (value.length == 8) {
                                const vehicle = vehicles?.find((vehicle: Vehicle) => vehicle.id_plate === value);
                                if (vehicle) {
                                    setCarAlreadyRegistered(true);
                                    setBrand(vehicle.brand);
                                    setModel(vehicle.model);
                                    setColor(vehicle.color);
                                    setYear(vehicle.year.toString());
                                    setKm(vehicle.km.toString());
                                } else {
                                    setCarAlreadyRegistered(false);
                                }
                                utils.inputsVerify(inputs)
                            }
                        }} required />
                    <datalist id="placa" >
                        {vehicles?.map((veiculo, index: number) => {
                            return <option key={index} value={veiculo.id_plate}></option>
                        })}
                    </datalist>
                </label>
                <label>
                    <span>MARCA</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={brand} onChange={e => setBrand(e.target.value)} required disabled={carAlreadyRegistered} />
                </label>
                <label>
                    <span>MODELO</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={model} onChange={e => setModel(e.target.value)} required disabled={carAlreadyRegistered} />
                </label>
            </div>
            <div className="triple-input-forced">
                <label>
                    <span>ANO</span>
                    <input type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={year} onChange={e => setYear(e.target.value)} required disabled={carAlreadyRegistered} />
                </label>
                <label>
                    <span>KM</span>
                    <input type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={km} onChange={e => setKm(e.target.value)} required />
                </label>
                <label>
                    <span>COR</span>
                    <input onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={color} onChange={e => setColor(e.target.value)} required disabled={carAlreadyRegistered} />
                </label>
            </div>
            <label>
                <span>DESCRIÇÃO DO SERVIÇO</span>
                <textarea onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <label>
                <span>PREÇO DO SERVIÇO</span>
                <input type="number" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={price} onChange={e => setPrice(e.target.value)} required />
            </label>
            <div>
                {products?.map(({ product, quantity }, index: number) => {
                    return <></>
                })}
            </div>
            <div className="reg-form-buttons">
                <button type="button" className="reg-form-button" onClick={() => setStoreView(true)}>ADICIONAR PRODUTOS</button>
                <button id="pt1" type="button" className="reg-form-button" onClick={async () => {
                    const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                    if (!form.checkValidity()) {
                        form.reportValidity()
                        return
                    }
                    const vehicle = window.api.Vehicle();
                    vehicle.id_plate = id_plate_input;
                    vehicle.brand = brand;
                    vehicle.cpf_cnpj = cpf_cnpj_input;
                    vehicle.model = model;
                    vehicle.year = parseInt(year);
                    vehicle.km = parseFloat(km);
                    vehicle.color = color;
                    const service = window.api.Service();
                    service.id_plate = id_plate_input;
                    service.cpf_cnpj = cpf_cnpj_input;
                    service.date = date;
                    service.description = description;
                    service.price = parseFloat(price);
                    service.km = parseFloat(km);
                    let serviceResponse;
                    let carResponse;
                    try {
                        if (!clientAlreadyRegistered) {
                            const client = window.api.Client();
                            client.cpf_cnpj = cpf_cnpj_input;
                            client.name = name;
                            await client.insert(client);
                        }
                        if (carAlreadyRegistered) {
                            carResponse = await vehicle.update(vehicle);
                        } else {
                            carResponse = await vehicle.insert(vehicle);
                        }
                        if (id) {
                            service.id = +id;
                            serviceResponse = await service.update(service);
                        } else {
                            serviceResponse = await service.insert(service);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}>SALVAR</button>
            </div>
        </form>
    </>);
}