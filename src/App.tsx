import React from "react";
import Layouts from "./components/layouts/Layouts";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import "./assets/css/styles.css";
import Archives from "./components/archive/Archives";
import SingleDetails from "./components/archive/SingleDetails";

const App: React.FC = (): JSX.Element => {
    const accountState = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();

    return (
        <section className="o-page">
            <Layouts>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/requests" element={<Archives />} />
                    <Route path="/single" element={<SingleDetails />} />
                </Routes>
            </Layouts>
        </section>
    );
};

export default App;
