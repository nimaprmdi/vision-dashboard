import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import BreadCrumb from "./BreadCrumb";

interface LayoutsProps {
    children?: JSX.Element | JSX.Element[];
}

const Layouts = ({ children }: LayoutsProps): JSX.Element => {
    return (
        <Grid container spacing={2}>
            <Header />
            <Grid item xs={8}>
                <BreadCrumb />
                {children}
            </Grid>
            <Footer />
        </Grid>
    );
};

export default Layouts;
