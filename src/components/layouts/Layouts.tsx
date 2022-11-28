import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import BreadCrumb from "./BreadCrumb";

interface LayoutsProps {
    children?: JSX.Element | JSX.Element[];
}

const Layouts = ({ children }: LayoutsProps) => {
    return (
        <section className="o-page">
            <Grid container spacing={2}>
                <Header />
                <Grid item xs={12} md={8} mt={2}>
                    <BreadCrumb />
                    {children}
                </Grid>
                <Footer />
            </Grid>
        </section>
    );
};

export default Layouts;
