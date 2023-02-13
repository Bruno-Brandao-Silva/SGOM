import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../models/Utils";
import Header from "./Header";

export default function Index() {
    useEffect(() => {
        window.api.Info().get();
    }, [])
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