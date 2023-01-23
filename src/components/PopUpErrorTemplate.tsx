import React from "react";

export default function PopUpErrorTemplate(props: { title?: string, content?: string, onClose: () => void }) {
    return (<div className="pop-up-error-template">
        <div className="pop-up-error-template-symbol">
            <div></div>
            <div></div>
        </div>
        <div className="pop-up-error-template-content">
            <h1>{props.title ? props.title : "Erro"}</h1>
            {props.content && <p>{props.content}</p>}
            <button type="button" onClick={props.onClose}>OK</button>
        </div>
    </div>)
}