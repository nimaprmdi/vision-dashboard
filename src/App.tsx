import React, { useEffect, Suspense } from "react";
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
import fetchRequests from "./store/requests/requestsActions";
import fetchAccounts from "./store/account/accountsActions";
import fetchTickets from "./store/tickets/ticketsActions";
// Utils
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./assets/css/styles.css";

const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRequests() as any);
        dispatch(fetchAccounts() as any);
        dispatch(fetchTickets() as any);
    }, []);

    return (
        <section className="o-page">
            <Suspense
                fallback={
                    <div>
                        <p>Loading...</p>
                    </div>
                }
            >
                <Routes>
                    <Route element={<Layouts />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/archives/:type" element={<Archives />} />

                        <Route path="/request/:id" element={<SingleDetails />} />
                        <Route path="/ticket/:id" element={<SingleChat />} />

                        <Route path="/single-profile" element={<SingleProfile />} />
                        <Route path="/add-request" element={<AddRequest />} />
                        <Route path="/server-error" element={<ServerError />} />
                        <Route path="*" element={<Notfound />} />
                    </Route>

                    <Route element={<LayoutsHasHeader />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </Suspense>
        </section>
    );
};

export default App;
