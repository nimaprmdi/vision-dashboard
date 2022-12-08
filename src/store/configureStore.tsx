import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import api from "./middleware/api";

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
