import React from "react";
import { useNavigate } from "react-router-dom";

export const withRouter = (Component: any) => {
    const Wrapper = (props: React.AllHTMLAttributes<HTMLDivElement>) => {
        const navigate = useNavigate();
        return <Component navigate={navigate} {...props} />;
    };

    return Wrapper;
};
