import WideCard from "../WideCard";
import EastIcon from "@mui/icons-material/East";
import { Box, Typography, Link as MUILink } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";

const WideCardMore = () => {
    const account = useSelector((state: RootState) => state.accounts.currentAccount);

    return (
        <WideCard
            className="c-smartcard u-opacity-0 u-fadein"
            hasBackground={true}
            sx={{ minHeight: "auto", width: "100%", pl: { xs: 4, md: 6 }, py: 5, gap: { xs: 10, md: 19 } }}
        >
            <Box sx={{ width: "100%", maxHeight: "305px" }}>
                <Typography variant="h6" color="gray.light" className="u-text-small">
                    Welcome back,
                </Typography>

                <Typography variant="h2" color="white">
                    {account.name || " "}
                </Typography>

                <Typography variant="h6" color="gray.light" mt={2.5}>
                    Glad to see you again! <br /> Want to view more?
                </Typography>
            </Box>

            <Link to={`/user/${account.itemId}`} className="u-link-primary">
                <MUILink component="div" className="u-link-primary" underline="none">
                    <Box className="c-smartcard__more" sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" color="white" mr={2}>
                            View More
                        </Typography>
                        <EastIcon sx={{ color: "white" }} />
                    </Box>
                </MUILink>
            </Link>
        </WideCard>
    );
};

export default WideCardMore;
