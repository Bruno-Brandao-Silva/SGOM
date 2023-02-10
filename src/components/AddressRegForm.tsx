import React, { useEffect, useState } from "react";
import utils from "./../models/utils";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import PopUp from "./PopUp";
import PopUpErrorTemplate from "./PopUpErrorTemplate";
import PopUpSuccessTemplate from "./PopUpSuccessTemplate";

export default function AddressRegForm() {
    const navigate = useNavigate()
    const cpf_cnpj = useParams().cpf_cnpj?.replace("\\", "/");
    const { id } = useParams();

    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [popUp, setPopUp] = useState<React.ReactNode>(null);
    const inputs = document.getElementsByTagName('input');
    useEffect(() => {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value != '') {
                utils.InputsHandleFocus({ target: inputs[i] });
            }
        }
    }, []);
    useEffect(() => {
        id && window.api.Address().getById(+id).then((res) => {
            res.cep && setCep(res.cep);
            res.number && setNumber(res.number);
            res.complement && setComplement(res.complement);
            res.street && setStreet(res.street);
            res.district && setDistrict(res.district);
            res.city && setCity(res.city);
            res.state && setState(res.state);
        }).finally(() => {
            utils.sleep(10).then(() => {
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value != '') {
                        utils.InputsHandleFocus({ target: inputs[i] });
                    }
                }
            });
        });
    }, [id]);

    return (<>
        <Header />
        {popUp && <PopUp>{popUp}</PopUp>}
        <form className="reg-form">
            <div className="double-input">
                <label style={{ width: "45%" }}>
                    <span>CEP</span>
                    <input name="cep" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} pattern="\d{5}-\d{3}" value={cep} onChange={e => setCep(utils.cepRegex(e))} required />
                </label>
                <label style={{ width: "45%" }}>
                    <span>Número</span>
                    <input name="numero" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={number} onChange={e => setNumber(e.target.value)} required />
                </label>
            </div>
            <label>
                <span>Complemento</span>
                <input name="complemento" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={complement} onChange={e => setComplement(e.target.value)} />
            </label>
            <label>
                <span>Logradouro</span>
                <input name="logradouro" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={street} onChange={e => setStreet(e.target.value)} required />
            </label>
            <label>
                <span>Bairro</span>
                <input name="bairro" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={district} onChange={e => setDistrict(e.target.value)} required />
            </label>
            <div className="double-input">
                <label style={{ width: "45%" }}>
                    <span>Cidade</span>
                    <input name="cidade" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={city} onChange={e => setCity(e.target.value)} required />
                </label>
                <label style={{ width: "45%" }}>
                    <span>Estado</span>
                    <input name="estado" list="estado" onFocus={e => utils.InputsHandleFocus(e)} onBlur={e => utils.InputsHandleFocusOut(e)} value={state} onChange={e => setState(e.target.value)} required />
                    {/* <datalist id="estado" className="datalist">
                        <option value={'Acre'}>AC</option>
                        <option value={'Alagoas'}>AL</option>
                        <option value={'Amapá'}>AP</option>
                        <option value={'Amazonas'}>AM</option>
                        <option value={'Bahia'}>BA</option>
                        <option value={'Ceará'}>CE</option>
                        <option value={'Distrito Federal'}>DF</option>
                        <option value={'Espírito Santo'}>ES</option>
                        <option value={'Goiás'}>GO</option>
                        <option value={'Maranhão'}>MA</option>
                        <option value={'Mato Grosso'}>MT</option>
                        <option value={'Mato Grosso do Sul'}>MS</option>
                        <option value={'Minas Gerais'}>MG</option>
                        <option value={'Pará'}>PA</option>
                        <option value={'Paraíba'}>PB</option>
                        <option value={'Pernambuco'}>PE</option>
                        <option value={'Piauí'}>PI</option>
                        <option value={'Rio de Janeiro'}>RJ</option>
                        <option value={'Rio Grande do Norte'}>RN</option>
                        <option value={'Rio Grande do Sul'}>RS</option>
                        <option value={'Rondônia'}>RO</option>
                        <option value={'Santa Catarina'}>SC</option>
                        <option value={'São Paulo'}>SP</option>
                        <option value={'Sergipe'}>SE</option>
                        <option value={'Tocantins'}>TO</option>
                    </datalist> */}
                </label>
            </div>
            <button type="button" className="reg-form-button" onClick={async () => {
                const form = document.getElementsByClassName('reg-form')[0] as HTMLFormElement;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                const address = window.api.Address();
                address.cpf_cnpj = cpf_cnpj
                address.cep = cep;
                address.number = number;
                address.complement = complement;
                address.street = street;
                address.district = district;
                address.city = city;
                address.state = state;
                try {
                    if (!id) {
                        const response = await address.insert(address)
                        if (response.changes == 0) {
                            throw new Error('Não foi possível cadastrar o endereço')
                        } else {

                        }
                    } else {
                        address.id = +id;
                        const response = await address.update(address)
                        if (response.changes == 0) {
                            throw new Error('Não foi possível atualizar o endereço')
                        } else {

                        }
                    }
                } catch (error) {
                    setPopUp(<PopUpErrorTemplate onClose={() => setPopUp(null)} content={error.message} />);
                    return
                }
                setPopUp(<PopUpSuccessTemplate buttons={[
                    { text: "OK", onClick: () => navigate(`/Client/${cpf_cnpj.replace("/", "\\")}`) },
                ]} title="Endereço salvo com sucesso!" />)
            }}>SALVAR</button>
        </form>
    </>)
}