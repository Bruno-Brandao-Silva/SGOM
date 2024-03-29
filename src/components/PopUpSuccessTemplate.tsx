import React from "react";

export default function PopUpSuccessTemplate(props: { title?: string, content?: string, buttons: { text: string, onClick: () => void }[] }) {
    return (<div className="pop-up-success-template">
        <div className="pop-up-success-template-symbol">
            <div></div>
            <div></div>
        </div>
        <div className="pop-up-success-template-content">
            <h1>{props.title ? props.title : "Sucesso"}</h1>
            {props.content && <p>{props.content}</p>}
            <div className="pop-up-success-template-content-buttons">
                {props.buttons.map((button, index) => <button key={index} type="button" onClick={button.onClick}>{button.text}</button>)}
            </div>
        </div>
    </div>)
}