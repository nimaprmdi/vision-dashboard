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
import { fetchAccounts, createGithubAccount } from "./store/account/accountsActions";
import { fetchTickets } from "./store/tickets/ticketsActions";
// Utils
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./assets/css/styles.css";

import { getCurrentAccount } from "./store/account/accountsActions";

// github servceis
import { getUserData } from "./services/githubServices";
import useGithub from "./hooks/useGithub";
import { RootState } from "./store/rootReducer";
import { IAddAccount } from "./models/account";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const accountsState = useSelector((state: RootState) => state.accounts);
    const navigate = useNavigate();

    // Hook
    const rerender = useGithub();

    useEffect(() => {
        // @todo: Merge Requests
        dispatch(fetchRequests() as any);
        dispatch(fetchAccounts() as any);
        dispatch(fetchTickets() as any);
    }, []);

    /// github issues
    const [user, setUser] = useState<IAddAccount>();
    const [accountIndex, setAccountIndex] = useState<number>();

    useEffect(() => {
        if (!accountsState.isLoading && localStorage.getItem("accessToken") !== null && localStorage.getItem("loginService") === "github") {
            (async () => {
                const userData = await getUserData();

                console.log("userData", userData);

                const itemId = `github-${userData.login}-${uuidv4()}`;

                setUser({
                    itemId: itemId,
                    name: userData.name || userData.login,
                    lastName: "",
                    userName: userData.login,
                    email: userData.email,
                    hasRemember: false,
                    isAdmin: false,
                });

                const accountIndex = accountsState.accounts.findIndex((account) => account.userName === userData.login);
                setAccountIndex(accountIndex);

                if (accountIndex !== -1) {
                    console.log("inside");
                    dispatch(getCurrentAccount(accountIndex) as any);
                }
            })();
        }
    }, [accountsState.isLoading, localStorage.getItem("accessToken")]);

    useEffect(() => {
        if (user && accountIndex === -1 && localStorage.getItem("loginService") === "github") {
            user && dispatch(createGithubAccount(user) as any);
        }
    }, [user]);

    return (
        <section className="o-page">
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
