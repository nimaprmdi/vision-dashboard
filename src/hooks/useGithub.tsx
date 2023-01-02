import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CHANGE_HTTP_CALL_STATUS } from "../store/entities/entitiesReducer";
const useGithub = () => {
    const [rerender, setRerender] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");

        if (codeParams && localStorage.getItem("accessToken") === null) {
            dispatch(CHANGE_HTTP_CALL_STATUS(true));

            async function getAccessToken() {
                await fetch("https://vision-dashboard.onrender.com/getAccessToken?code=" + codeParams, {
                    method: "GET",
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.access_token) {
                            localStorage.setItem("accessToken", data.access_token);
                            localStorage.setItem("loginService", "github");
                            setRerender(!rerender);
                        }
                    })
                    .catch((error) => {
                        return error;
                    });

                dispatch(CHANGE_HTTP_CALL_STATUS(false));
            }
            getAccessToken();
        }
    }, []);

    // return null;
    return rerender;
};

export default useGithub;
