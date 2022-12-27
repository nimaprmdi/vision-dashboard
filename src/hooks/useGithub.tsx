import React, { useEffect, useState } from "react";

const useGithub = () => {
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");

        if (codeParams && localStorage.getItem("accessToken") === null) {
            async function getAccessToken() {
                await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
                    method: "GET",
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);

                        if (data.access_token) {
                            localStorage.setItem("accessToken", data.access_token);
                            setRerender(!rerender);
                        }
                    });
            }
            getAccessToken();
        }
    }, []);

    // return null;
    return rerender;
};

export default useGithub;
