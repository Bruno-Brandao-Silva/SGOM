// react component for a form to create a new service
import React, { useEffect, useState } from "react";
import utils from "../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import PopUp from "./PopUp";
import PopUpErrorTemplate from "./PopUpErrorTemplate";
import PopUpSuccessTemplate from "./PopUpSuccessTemplate";

export default function VehicleRegForm() {
    const navigate = useNavigate();
    const inputs = document.getElementsByTagName('input');
    const { cpf_cnpj, id_plate } = useParams();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [idPlateInput, setIdPlateInput] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [km, setKm] = useState("");
    const [popUp, setPopUp] = useState<React.ReactNode>(null);

    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);

    useEffect(() => {
        id_plate && window.api.Vehicle().getByPlate(id_plate).then((vehicle) => {
            setBrand(vehicle.brand);
            setModel(vehicle.model);
            setIdPlateInput(vehicle.id_plate);
            setColor(vehicle.color);
            setYear(vehicle.year.toString());
            setKm(vehicle.km.toString());
        }).finally(() => {
            utils.sleep(10).then(() => {
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value != '') {
                        utils.InputsHandleFocus({ target: inputs[i] });
                    }
                }
            });
        });
    }, [id_plate]);
    return (<>
        <Header />
        {popUp && <PopUp>{popUp}</PopUp>}
        <form className="reg-form" >
            <div className="double-input-forced">
                <label>
                    <span>PLACA</span>
                    <input name="placaInput" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={idPlateInput} onChange={id_plate !== undefined ? () => { } : e => setIdPlateInput(utils.plateRegex(e))} disabled={(id_plate !== undefined)} required />
                </label>
                <label>
                    <span>MARCA</span>
                    <input name="marca" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={brand} onChange={e => setBrand(e.target.value)} required />
                </label>

            </div>
            <div className="double-input-forced">
                <label>
                    <span>MODELO</span>
                    <input name="modelo" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={model} onChange={e => setModel(e.target.value)} required />
                </label>
                <label>
                    <span>COR</span>
                    <input name="cor" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={color} onChange={e => setColor(e.target.value)} required />
                </label>
            </div>
            <div className="double-input-forced">

                <label>
                    <span>ANO</span>
                    <input name="ano" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={year} onChange={e => setYear(e.target.value)} required />
                </label>
                <label>
                    <span>KM</span>
                    <input name="km" type="number" step='1' onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={km} onChange={e => setKm(e.target.value)} required />
                </label>
            </div>
            <button className="reg-form-button" type="button" onClick={async () => {
                const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                try {
                    const vehicle = window.api.Vehicle();
                    vehicle.brand = brand;
                    vehicle.model = model;
                    vehicle.color = color;
                    vehicle.year = parseInt(year);
                    vehicle.km = parseFloat(km);
                    vehicle.cpf_cnpj = cpf_cnpj;
                    if (!id_plate) {
                        vehicle.id_plate = idPlateInput;
                        const response = await vehicle.insert(vehicle);
                        if (response.changes == 0) {
                            throw new Error('Não foi possível cadastrar o veículo')
                        } else {
                            setPopUp(<PopUpSuccessTemplate buttons={[
                                { text: "OK", onClick: () => navigate(`/Client/${cpf_cnpj}`) },
                            ]} title="Veículo salvo com sucesso!" />)
                        }
                    } else {
                        vehicle.id_plate = id_plate;
                        const response = await vehicle.update(vehicle);

                        if (response.changes == 0) {
                            throw new Error('Não foi possível editar o veículo')
                        } else {
                            setPopUp(<PopUpSuccessTemplate buttons={[
                                { text: "OK", onClick: () => navigate(`/Client/${cpf_cnpj}`) },
                            ]} title="Veículo salvo com sucesso!" />)
                        }
                    }
                } catch (error) {
                    setPopUp(<PopUpErrorTemplate content={error.message} onClose={() => setPopUp(null)} />);
                }
            }}>SALVAR</button>
        </form>
    </>);
}