import React, { useEffect } from "react";
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
import { fetchAccounts } from "./store/account/accountsActions";
import { fetchTickets } from "./store/tickets/ticketsActions";
// Utils
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import "./assets/css/styles.css";
import AddTicket from "./components/form/AddTicket";

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const accountsState = useSelector((state: RootState) => state.accounts);

    // @todo: Add Ticket Button
    // other todos

    // Current Account Dispatch Problem
    // T`icket request select prblem relation

    useEffect(() => {
        // @todo: Merge Requests
        dispatch(fetchRequests() as any);
        dispatch(fetchAccounts() as any);
        dispatch(fetchTickets() as any);
    }, []);

    return (
        <section className="o-page">
            <Routes>
                <Route element={<Layouts />}>
                    {Object.keys(accountsState.currentAccount).length ? (
                        <Route>
                            <Route path="/" element={accountsState.currentAccount.isAdmin ? <Home /> : <Navigate to="/archives/requests" />} />
                            <Route path="/request/:id" element={<SingleDetails />} />
                            <Route path="/ticket/:id" element={<SingleChat />} />
                            <Route path="/user/:id" element={<SingleProfile />} />
                            <Route path="/archives/:type" element={<Archives />} />
                            <Route path="/add-request" element={<AddRequest />} />
                            <Route path="/add-ticket" element={<AddTicket />} />
                        </Route>
                    ) : (
                        <Route path="/" element={<Navigate to="/verify" />} />
                    )}

                    <Route path="/server-error" element={<ServerError />} />
                    <Route path="*" element={<Notfound />} />
                </Route>

                <Route element={<LayoutsHasHeader />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/verify" element={<Permissions />} />
            </Routes>
        </section>
    );
};

export default App;
