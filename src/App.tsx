import React, { useEffect } from "react";
import Home from "./components/home/Home";
import Layouts from "./components/layouts/Layouts";
import Archives from "./components/archive/Archives";
import SingleDetails from "./components/archive/SingleDetails";
import SingleChat from "./components/archive/SingleChat";
import SingleProfile from "./components/archive/SingleProfile";
import LayoutsHasHeader from "./components/layouts/LayoutsHasHeader";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddRequest from "./components/Requests/AddRequest";
import Notfound from "./components/404/Notfound";
import fetchRequests from "./store/requests/requestsActions";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./assets/css/styles.css";
import ServerError from "./components/404/ServerError";

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRequests() as any);
    }, []);

    return (
        <section className="o-page">
            <Routes>
                <Route element={<Layouts />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/requests" element={<Archives />} />
                    <Route path="/single" element={<SingleDetails />} />
                    <Route path="/single-chat" element={<SingleChat />} />
                    <Route path="/single-profile" element={<SingleProfile />} />
                    <Route path="/request" element={<AddRequest />} />
                    <Route path="/404" element={<Notfound />} />
                    <Route path="/server-error" element={<ServerError />} />
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
