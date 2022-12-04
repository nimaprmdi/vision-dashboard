import BlurHeader from "./BlurHeader";
import { Outlet } from "react-router-dom";

const LayoutsHasHeader = () => {
    return (
        <>
            <BlurHeader />
            <Outlet />
        </>
    );
};

export default LayoutsHasHeader;
