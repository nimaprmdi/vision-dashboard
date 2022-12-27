import React, { useEffect, useState } from "react";
// Home
import Home from "./components/home/Home";
// Layouts
import Layouts from "./components/layouts/Layouts";
import LayoutsHasHeader from "./components/layouts/LayoutsHasHeader";
// Archives
import Archives from "./components/archive/Archives";
import SingleDetails from "./components/archive/SingleDetails";
import SingleChat from "./components/archive/SingleChat";
import SingleProfile from "./components/archive/SingleProfile";
// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// Requests
import AddRequest from "./components/Requests/AddRequest";
// 404
import Notfound from "./components/404/Notfound";
import ServerError from "./components/404/ServerError";
// Fetch Data
import { fetchRequests } from "./store/requests/requestsActions";
import { fetchAccounts } from "./store/account/accountsActions";
import { fetchTickets } from "./store/tickets/ticketsActions";
// Utils
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./assets/css/styles.css";
// github servceis

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // @todo: Merge Requests
        dispatch(fetchRequests() as any);
        dispatch(fetchAccounts() as any);
        dispatch(fetchTickets() as any);
    }, []);

    // const handleUserData = async () => {
    // };

    return (
        <section className="o-page">
            {/* {localStorage.getItem("accessToken") ? (
                <>
                    <button
                        style={{ position: "absolute", top: 0, left: 0 }}
                        onClick={() => {
                            localStorage.removeItem("accessToken");
                            // setRerender(!rerender);
                        }}
                    >
                        Log Out
                    </button>

                    <button style={{ position: "absolute", top: "20px", left: 0 }} onClick={() => handleUserData()}>
                        get user data
                    </button>

                    {/* {Object.keys(user).length !== 0 ? <>{user.login}</> : <>Bye</>} 
                </>
            ) : (
                <button style={{ position: "absolute", top: 0, left: 0 }} onClick={loginWithGithub}>
                    Login With Github
                </button>
            )} */}

            <Routes>
                <Route element={<Layouts />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/archives/:type" element={<Archives />} />

                    <Route path="/request/:id" element={<SingleDetails />} />
                    <Route path="/ticket/:id" element={<SingleChat />} />
                    <Route path="/user/:id" element={<SingleProfile />} />

                    <Route path="/add-request" element={<AddRequest />} />
                    <Route path="/server-error" element={<ServerError />} />
                    <Route path="*" element={<Notfound />} />
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
