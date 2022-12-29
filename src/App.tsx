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
import Permissions from "./components/404/Permissions";
// Fetch Data
import { fetchRequests } from "./store/requests/requestsActions";
import { fetchAccounts, createGithubAccount } from "./store/account/accountsActions";
import { fetchTickets } from "./store/tickets/ticketsActions";
// Utils
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./assets/css/styles.css";
import { getCurrentAccount } from "./store/account/accountsActions";

// github Services
import { getUserData } from "./services/githubServices";
import { RootState } from "./store/rootReducer";
import { IAddAccount } from "./models/account";
import { v4 as uuidv4 } from "uuid";
import useGithub from "./hooks/useGithub";

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const accountsState = useSelector((state: RootState) => state.accounts);

    /// github issues
    const [user, setUser] = useState<IAddAccount>();
    const [accountIndex, setAccountIndex] = useState<number>();

    // Github account Hook
    useGithub();

    useEffect(() => {
        // @todo: Merge Requests
        dispatch(fetchRequests() as any);
        dispatch(fetchAccounts() as any);
        dispatch(fetchTickets() as any);
    }, []);

    useEffect(() => {
        if (!accountsState.isLoading && localStorage.getItem("accessToken") !== null) {
            // Recieve github data from (custom) node.js backend server
            (async () => {
                const userData = await getUserData();
                const itemId = `github-${userData.login}-${uuidv4()}`;
                const accountIndex = accountsState.accounts.findIndex((account) => account.userName === userData.login);

                setUser({
                    itemId: itemId,
                    name: userData.name || userData.login,
                    lastName: "",
                    userName: userData.login,
                    email: userData.email,
                    hasRemember: false,
                    isAdmin: false,
                });

                setAccountIndex(accountIndex);

                // If we have current User on globals store
                if (accountIndex !== -1) {
                    dispatch(getCurrentAccount(accountIndex) as any);
                }
            })();
        }
    }, [accountsState.isLoading, localStorage.getItem("accessToken")]);

    useEffect(() => {
        // Create User on Hygraph if github account doesnt exist on store
        if (user && accountIndex === -1 && localStorage.getItem("accessToken") !== null) {
            user && dispatch(createGithubAccount(user) as any);
        }
    }, [user]);

    return (
        <section className="o-page">
            <Routes>
                <Route element={<Layouts />}>
                    {Object.keys(accountsState.currentAccount).length > 0 ? (
                        <>
                            {accountsState.currentAccount && !accountsState.currentAccount.isAdmin ? (
                                <Route path="/" element={<Navigate to="/archives/requests" />} />
                            ) : (
                                <Route path="/" element={<Home />} />
                            )}

                            <Route path="/request/:id" element={<SingleDetails />} />
                            <Route path="/ticket/:id" element={<SingleChat />} />
                            <Route path="/user/:id" element={<SingleProfile />} />
                            <Route path="/archives/:type" element={<Archives />} />
                            <Route path="/add-request" element={<AddRequest />} />
                        </>
                    ) : (
                        <Route path="/permission" element={<Permissions />} />
                    )}

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
