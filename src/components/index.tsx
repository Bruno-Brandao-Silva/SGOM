import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function Index() {
    const [info, setInfo] = useState<Info>(window.api.Info());
    useEffect(() => {
        window.api.Info().get().then((info) => {
            setInfo(info);
        })
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
                });
            })
        }
    }, [info]);
    return (<>
        <Header />
        <div style={{ width: "fit-content", margin: "150px auto" }}>
            <div className="react-logo">
                <div></div>
                <div></div>
                <div></div>
                <span></span>
            </div>
        </div>
    </>)
}