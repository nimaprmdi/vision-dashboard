import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import BreadCrumb from "./BreadCrumb";
import { Outlet } from "react-router-dom";

const Layouts = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={2.5} m={2}>
                <Header />
            </Grid>
            <Grid item xs={12} md={9} mt={3}>
                <BreadCrumb />
                <Outlet />
                <Footer />
            </Grid>
        </Grid>
    );
};

export default Layouts;
