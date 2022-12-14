import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/configureStore";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ThemeProvider theme={dashboardTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                    <ToastContainer />
                </React.StrictMode>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
