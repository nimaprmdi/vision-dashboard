import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, Provider, useDispatch } from "react-redux";
import { RootState } from "./store/rootReducer";
import "./assets/css/styles.css";
import Layouts from "./components/layouts/Layouts";
import Home from "./components/home/Home";

const App: React.FC = (): JSX.Element => {
    const accountState = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();

    console.log(accountState);

    return (
        <Layouts>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Layouts>
    );
};

export default App;
