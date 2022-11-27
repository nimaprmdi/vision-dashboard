import React from "react";
import "./assets/css/styles.css";
import { Routes, Route } from "react-router-dom";
import store from "./store/configureStore";
import { useSelector, Provider, useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    dispatch({ type: "ADD_USER" });

    return (
        <Provider store={store}>
            <div className="App">
                <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
            </div>
        </Provider>
    );
}

export default App;
