import React from "react";
import {Route,Routes } from "react-router-dom";
import WelcomeView from "../components/welcomeView";
import WaitingView from "../components/waitingView";
import ChoosingView from "../components/choosingView";
import DrawingView from "../components/drawingView";
import WaitingDrawView from "../components/waitingDrawView";

export default function Switcher(){
    return(
        <Routes>

            <Route path={"/"} element={<WelcomeView />}/>
            <Route path={"/wait"} element={<WaitingView />}/>
            <Route path={"/choosing"} element={<ChoosingView />}/>
            <Route path={"/draw/:role"} element={<DrawingView />}/>
            <Route path={"/waitingRoom"} element={<WaitingDrawView />}/>

        </Routes>
    )
}