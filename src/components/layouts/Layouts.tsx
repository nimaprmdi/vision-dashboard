import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import BreadCrumb from "./BreadCrumb";

interface LayoutsProps {
    children?: JSX.Element | JSX.Element[];
}

const Layouts = ({ children }: LayoutsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={2.5} m={2}>
                <Header />
            </Grid>
            <Grid item xs={12} md={9} mt={3}>
                <BreadCrumb />
                {children}
                <Footer />
            </Grid>
        </Grid>
    );
};

export default Layouts;
