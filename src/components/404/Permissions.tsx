import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import PreLoader from "../common/PreLoader";

const Permissions = () => {
    const navigate = useNavigate();
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);
    const accountState = useSelector((state: RootState) => state.accounts);

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
                {isHttpCalling && accountState.isLoading && Object.keys(accountState.currentAccount).length > 0 ? (
                    <PreLoader title="Please Wait" />
                ) : (
                    <>{navigate("/")}</>
                )}
            </Box>
        </Box>
    );
};

export default Permissions;
