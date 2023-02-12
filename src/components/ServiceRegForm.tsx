import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import utils from "../models/Utils";
import Header from "./Header";
import StoreView from "./StoreView";
import pdfTemplates from "../models/PdfTemplates";
export default function ServiceRegForm() {
    const cpf_cnpj = useParams().cpf_cnpj?.replace("\\", "/");
    const { id_plate, id } = useParams();
    const navigate = useNavigate();

    const dataAtual = new Date().toLocaleDateString().replace(/^(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')

    const [, setRender] = useState({});
    const [inputs, setInputs] = useState<(HTMLInputElement | HTMLTextAreaElement)[]>();
    const [clients, setClients] = useState<Client[]>();
    const [vehicles, setVehicles] = useState<Vehicle[]>();
    const [name, setName] = useState("");
    const [cpf_cnpj_input, setCpf_cnpj_input] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [warranty, setWarranty] = useState("");
    const [date, setDate] = useState(dataAtual);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [id_plate_input, setId_plate_input] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [km, setKm] = useState("");

    const [requireList, setRequireList] = useState<{ product: Product, quantity: number }[]>([]);
    const [storeView, setStoreView] = useState(false);

    const [carAlreadyRegistered, setCarAlreadyRegistered] = useState(false);
    const [clientAlreadyRegistered, setClientAlreadyRegistered] = useState(false);

    useEffect(() => {
        setInputs(utils.getAllInputs(document));
        window.api.Client().getAll().then((clients) => setClients(clients));
    }, []);

    useEffect(() => {
        if (id) {
            window.api.Service().getById(+id).then((service: Service) => {
                setDescription(service.description);
                setPrice(service.price.toString());
                setDate(service.date);
                setId_plate_input(service.id_plate);
                setKm(service.km.toString());
                setWarranty(service.warranty.toString());
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
                window.api.RequireList().getAllByServiceId(+id).then((products) => {
                    const productsList = products.map((product) => {
                        const newProduct = window.api.Product();
                        newProduct.id = product.id_product;
                        newProduct.name = product.name;
                        newProduct.price = product.price;
                        newProduct.description = product.description;
                        newProduct.image = product.image;
                        return { product: newProduct, quantity: product.quantity };
                    });
                    setRequireList(productsList);
                }
                );
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
        <h1 className="title">{(id ? "EDITAR" : "CADASTRAR") + " SERVIÇO"}</h1>

        <div className="store-view-container">
            {storeView && <StoreView productsList={requireList} setProductsList={setRequireList} onClose={() => setStoreView(false)} />}
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
            <div className="double-input">
                <label style={{ width: "47.5%" }}>
                    <span>MESES DE GARANTIA DO SERVIÇO</span>
                    <input type="number" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={warranty} onChange={e => setWarranty(e.target.value)} required />
                </label>
                <label style={{ width: "47.5%" }}>
                    <span>PREÇO DO SERVIÇO</span>
                    <input type="number" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={price} onChange={e => setPrice(e.target.value)} required />
                </label>
            </div>
            {requireList && <div style={{ width: "100%" }}>
                {requireList?.map(({ product, quantity }, index) => {
                    return <div className="service-product-show" key={index}>
                        <div className="start">
                            <img src={`../public/images/products/${product.image ? product.image : "../picture.png"}`} alt={product.name} />
                            <span>{product.name}</span>
                        </div>
                        <div className="end">
                            <span>{utils.monetaryMask(quantity * product.price)}</span>
                            <button type="button" onClick={() => {
                                const newProducts = requireList;
                                newProducts[index].quantity = newProducts[index].quantity - 1;
                                if (newProducts[index].quantity === 0) {
                                    newProducts.splice(index, 1);
                                }
                                setRequireList(newProducts);
                                setRender({});
                            }}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => {
                                const newProducts = requireList;
                                newProducts[index].quantity = newProducts[index].quantity + 1;
                                setRequireList(newProducts);
                                setRender({});
                            }}>+</button>
                            <button type="button" onClick={() => {
                                const newProducts = requireList;
                                newProducts.splice(index, 1);
                                setRequireList(newProducts);
                                setRender({});
                            }}><img src="./public/images/delete.png" /></button>
                        </div>
                    </div>

                })}
                <div className="service-product-show" style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                    <p>TOTAL:</p>
                    <p>{utils.monetaryMask(+price + requireList.reduce((acc, { product, quantity }) => {
                        return acc + (product.price * quantity)
                    }, 0))}</p>
                </div>
            </div>}
            <div className="reg-form-buttons">
                <button type="button" className="reg-form-button" onClick={() => setStoreView(true)}>ADICIONAR PRODUTOS</button>
                <button id="pt1" type="button" className="reg-form-button" onClick={async () => {
                    const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                    if (!form.checkValidity()) {
                        form.reportValidity()
                        return
                    }
                    const client = window.api.Client();
                    const addresses = await window.api.Address().getByCpfCnpj(cpf_cnpj_input);
                    const contacts = await window.api.Contact().getByCpfCnpj(cpf_cnpj_input);
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
                    service.warranty = parseFloat(warranty);
                    let serviceResponse: RunResult;
                    try {
                        client.cpf_cnpj = cpf_cnpj_input;
                        client.name = name;
                        if (!clientAlreadyRegistered) {
                            await client.insert(client);
                        }
                        if (carAlreadyRegistered) {
                            await vehicle.update(vehicle);
                        } else {
                            await vehicle.insert(vehicle);
                        }
                        if (id) {
                            service.id = +id;
                            serviceResponse = await service.update(service);
                            if (requireList?.length > 0) {
                                const require_list = window.api.RequireList();
                                await require_list.deleteAllByServiceId(service.id);
                                requireList.forEach(async ({ product, quantity }) => {
                                    const require_list = window.api.RequireList();
                                    require_list.id_service = service.id;
                                    require_list.id_product = product.id;
                                    require_list.price = product.price;
                                    require_list.name = product.name;
                                    require_list.image = product.image;
                                    require_list.description = product.description;
                                    require_list.quantity = quantity;
                                    await require_list.insert(require_list);
                                });
                            }
                        } else {
                            serviceResponse = await service.insert(service);
                            service.id = serviceResponse.lastInsertRowid;
                            if (requireList?.length > 0) {
                                requireList.forEach(async ({ product, quantity }) => {
                                    const require_list = window.api.RequireList();
                                    require_list.id_service = serviceResponse.lastInsertRowid;
                                    require_list.id_product = product.id;
                                    require_list.price = product.price;
                                    require_list.name = product.name;
                                    require_list.image = product.image;
                                    require_list.description = product.description;
                                    require_list.quantity = quantity;
                                    await require_list.insert(require_list);
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    // const info = window.api.Info();
                    // info.name = "Nome Da Empresa";
                    // info.line_1 = 'Manutenção em geral'
                    // info.line_2 = 'Reparo de câmbio, tração e diferencial'
                    // info.line_3 = 'Instalação de turbo e intercooler'
                    // info.line_4 = 'Adailton: (11) 9 6503-6465'
                    // info.line_5 = 'RUA BEM-TE-VI, 515 - CEP: 06 293-060 - VILA AYROSA - OSASCO - SP'
                    // await info.insert(info);
                    const docDefinition = pdfTemplates.servicePDF({
                        service, client, addresses, contacts,
                        requireList: await window.api.RequireList().getAllByServiceId(service.id),
                        vehicle, info: await window.api.Info().get()

                    });
                    console.log(await window.api.pdfCreator(
                        docDefinition,
                        `service-${service.id}`,
                        "services"
                    ));
                }}>SALVAR</button>
            </div>
        </form>
    </>);
}