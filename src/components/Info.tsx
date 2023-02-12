import React, { useState, useEffect } from "react";
import Utils from "../models/Utils";
import Header from "./Header";

export default function Info() {
    const [info, setInfo] = useState<Info>(window.api.Info());
    const [name, setName] = useState("");
    const [line_1, setLine_1] = useState("");
    const [line_2, setLine_2] = useState("");
    const [line_3, setLine_3] = useState("");
    const [line_4, setLine_4] = useState("");
    const [line_5, setLine_5] = useState("");
    useEffect(() => {
        window.api.Info().get().then((info) => {
            setInfo(info);
            if (info) {
                setName(info.name);
                setLine_1(info.line_1);
                setLine_2(info.line_2);
                setLine_3(info.line_3);
                setLine_4(info.line_4);
                setLine_5(info.line_5);
            }
        }).finally(() => { Utils.inputsVerify(Utils.getAllInputs(document)) });
    }, []);

    useEffect(() => {
        if (!info) {
            const newInfo = window.api.Info();
            newInfo.name = "Nome Da Empresa";
            newInfo.line_1 = 'Manutenção em geral'
            newInfo.line_2 = 'Reparo de câmbio, tração e diferencial'
            newInfo.line_3 = 'Instalação de turbo e intercooler'
            newInfo.line_4 = 'Adailton: (11) 9 6503-6465'
            newInfo.line_5 = 'RUA BEM-TE-VI, 515 - CEP: 06 293-060 - VILA AYROSA - OSASCO - SP'
            newInfo.insert(newInfo).then(() => {
                window.api.Info().get().then((info) => {
                    setInfo(info);
                    if (info) {
                        setName(info.name);
                        setLine_1(info.line_1);
                        setLine_2(info.line_2);
                        setLine_3(info.line_3);
                        setLine_4(info.line_4);
                        setLine_5(info.line_5);
                    }
                });
            }).finally(() => { Utils.inputsVerify(Utils.getAllInputs(document)) });
        }
    }, [info]);

    return (<>
        <Header />
        <h1 className="title">INFOMAÇÕES DE IMPRESSÃO</h1>
        <form className="reg-form">
            <label>
                <span>Nome da empresa</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                ></input>
            </label><label>
                <span>Linha 1</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={line_1}
                    onChange={e => setLine_1(e.target.value)}
                    required
                ></input>
            </label><label>
                <span>Linha 2</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={line_2}
                    onChange={e => setLine_2(e.target.value)}
                    required
                ></input>
            </label><label>
                <span>Linha 3</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={line_3}
                    onChange={e => setLine_3(e.target.value)}
                    required
                ></input>
            </label><label>
                <span>Linha 4</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={line_4}
                    onChange={e => setLine_4(e.target.value)}
                    required
                ></input>
            </label><label>
                <span>Linha 5</span>
                <input
                    onFocus={e => Utils.InputsHandleFocus(e)}
                    onBlur={e => Utils.InputsHandleFocusOut(e)}
                    value={line_5}
                    onChange={e => setLine_5(e.target.value)}
                    required
                ></input>
            </label>
            <button type="button" className="reg-form-button" onClick={async () => {
                const info = window.api.Info();
                info.name = name;
                info.line_1 = line_1;
                info.line_2 = line_2;
                info.line_3 = line_3;
                info.line_4 = line_4;
                info.line_5 = line_5;
                await info.update(info);
                window.api.Info().get().then((info) => {
                    setInfo(info);
                    setName(info.name);
                    setLine_1(info.line_1);
                    setLine_2(info.line_2);
                    setLine_3(info.line_3);
                    setLine_4(info.line_4);
                    setLine_5(info.line_5);
                });
            }}>Salvar</button>
        </form>
    </>);
}