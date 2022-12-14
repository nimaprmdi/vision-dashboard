import axsio from "axios";
import configureStore from "../store/configureStore";
import { toast } from "react-toastify";
import { ADD_SERVER_ERROR } from "../store/entities/entitiesReducer";

const store = configureStore;

const axiosApiInstance = axsio.create({
    baseURL: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clayawfwp14ev01ukh88s2hit/master",
});

axiosApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        const redirect404: string = process.env.REACT_APP_NOT_FOUND_REDIRECT as string;
        const redirectServerError: string = process.env.REACT_APP_SERVER_ERROR_REDIRECT as string;

        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;

        if (!expectedErrors) {
            toast.error("An unexpected error occurrred.");

            // @todo : Error Tracker here -> sentry.io

            if (window.location.pathname !== redirectServerError) {
                window.location.href = redirectServerError;
            }
        } else {
            if (error.response.status === 400) {
                toast.error("Bad Request - The request could not be understood by the server");
            } else if (error.response.status === 401) {
                toast.error("Unauthorized - The request requires user authentication");
            } else if (error.response.status === 403) {
                toast.error("Forbidden - The server understood the request, but is refusing to fulfill it.");
            } else if (error.response.status === 404) {
                toast.error("Not Found - The requested resource could not be found.");
            } else if (error.response.status === 429) {
                toast.error("Too Many Requests");
            } else {
                toast.error(error.message);
            }

            if (window.location.pathname !== redirect404) {
                window.location.href = redirect404;
            }
        }

        store.dispatch(ADD_SERVER_ERROR({ status: error.response.status, message: error.response.message }));

        return Promise.reject(error);
    }
);

export default {
    get: axiosApiInstance.get,
    post: axiosApiInstance.post,
    put: axiosApiInstance.put,
    delete: axiosApiInstance.delete,
};
