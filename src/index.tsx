import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clayawfwp14ev01ukh88s2hit/master",
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ThemeProvider theme={dashboardTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <React.StrictMode>
                    <ApolloProvider client={client}>
                        <App />
                        <ToastContainer />
                    </ApolloProvider>
                </React.StrictMode>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
