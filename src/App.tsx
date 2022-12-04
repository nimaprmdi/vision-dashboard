import React from "react";
import Layouts from "./components/layouts/Layouts";
import Home from "./components/home/Home";
import Archives from "./components/archive/Archives";
import SingleDetails from "./components/archive/SingleDetails";
import SingleChat from "./components/archive/SingleChat";
import SingleProfile from "./components/archive/SingleProfile";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import "./assets/css/styles.css";
import LayoutsHasHeader from "./components/layouts/LayoutsHasHeader";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App: React.FC = (): JSX.Element => {
    const accountState = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch();

    return (
        <section className="o-page">
            <Routes>
                <Route element={<Layouts />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/requests" element={<Archives />} />
                    <Route path="/single" element={<SingleDetails />} />
                    <Route path="/single-chat" element={<SingleChat />} />
                    <Route path="/single-profile" element={<SingleProfile />} />
                </Route>

                <Route element={<LayoutsHasHeader />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </section>
    );
};

export default App;
