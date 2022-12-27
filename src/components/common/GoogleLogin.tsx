import React, { useState, useEffect } from "react";
import { GoogleLoginButton } from "ts-react-google-login-component";

const GoogleLogin = () => {
    const [user, setUser] = useState<any>(null);

    const preLoginTracking = (): void => {
        console.log("Attemp to login with google");
    };

    const errorHandler = (error: string): void => {
        // handle error if login got failed...
        console.error(error);
    };

    const responseGoogle = (googleUser: any): void => {
        const id_token = googleUser.getAuthResponse(true).id_token;
        const googleId = googleUser.getId();

        console.log({ googleId });
        console.log({ accessToken: id_token });
    };

    const clientConfig = { client_id: "300296620406-2iuap51jnukf4v9almevtbtbvqupmigt.apps.googleusercontent.com", scope: "profile", ux_mode: "redirect" };

    return (
        <div>
            <GoogleLoginButton responseHandler={responseGoogle} clientConfig={clientConfig} preLogin={preLoginTracking} failureHandler={errorHandler} />
        </div>
    );
};

export default GoogleLogin;
