import React from "react";

export default function PopUp(props: { title?: string, children?: React.ReactNode, onClose?: () => void }) {
    return (
        <div className="pop-up">
            <div className="pop-up-content">
                <div className="pop-up-header">
                    {props.title && <h1>{props.title}</h1>}
                    {props.onClose && <button onClick={props.onClose}>
                        <div></div>
                        <div></div>
                    </button>}
                </div>
                <div className="pop-up-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}