import useGithub from "../../hooks/useGithub";
import PreLoader from "../common/PreLoader";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useState, useEffect } from "react";
import { IAddAccount } from "../../models/account";
import { v4 as uuidv4 } from "uuid";
import { getCurrentAccount } from "../../store/account/accountsActions";
import { createGithubAccount, setLoadingStatus } from "../../store/account/accountsActions";
import { getUserData } from "../../services/githubServices";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_HTTP_CALL_STATUS } from "../../store/entities/entitiesReducer";
import { toast } from "react-toastify";

const Permissions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accountsState = useSelector((state: RootState) => state.accounts);
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);

    /// github issues
    const [user, setUser] = useState<IAddAccount>();
    const [accountIndex, setAccountIndex] = useState<number>();
    // Github account Hook
    useGithub();

    useEffect(() => {
        // isLoading = false
        // accountIsLoading = false

        if (!isHttpCalling && !accountsState.isLoading && localStorage.getItem("accessToken") !== null) {
            (async () => {
                dispatch(CHANGE_HTTP_CALL_STATUS(true));

                const userData = await getUserData()
                    .then((response) => {
                        dispatch(CHANGE_HTTP_CALL_STATUS(false));
                        return response;
                    })
                    .catch((error) => {
                        dispatch(CHANGE_HTTP_CALL_STATUS(false));

                        toast.error("Login with github failed");
                        navigate(`/login`);

                        return error;
                    });

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
            })();
        }
    }, [accountsState.isLoading, localStorage.getItem("accessToken"), isHttpCalling]);

    useEffect(() => {
        if (user && accountIndex !== -1) {
            dispatch(getCurrentAccount(accountIndex!, navigate) as any);
        }

        if (user && accountIndex === -1 && localStorage.getItem("accessToken") !== null) {
            dispatch(createGithubAccount(user, navigate) as any);
            dispatch(setLoadingStatus(false) as any);
        }
    }, [user, accountIndex]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");

        if (!isHttpCalling && !accountsState.isLoading && localStorage.getItem("accessToken") === null && !codeParams) {
            navigate(`/login`);
        }
    }, [isHttpCalling, localStorage.getItem("accessToken")]);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: "700px",
                    height: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <PreLoader title="Please Wait" />
            </Box>
        </Box>
    );
};

export default Permissions;
