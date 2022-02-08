import React from "react";
import {Route,Routes } from "react-router-dom";
import WelcomeView from "../components/welcomeView";
import WaitingView from "../components/waitingView";

export default function Switcher(){
    return(
        <Routes>

            <Route path={"/"} element={<WelcomeView />}/>
            <Route path={"/wait"} element={<WaitingView />}/>

        </Routes>
    )
}