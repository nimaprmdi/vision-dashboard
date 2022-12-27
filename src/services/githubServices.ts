const getUserData = async () => {
    let response = {};

    await fetch("http://localhost:4000/getUserData", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })
        .then((resposne) => {
            return resposne.json();
        })
        .then((data) => {
            console.log(data);
            response = data;
            return data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });

    return response;
};

const loginWithGithub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID);
};

export { getUserData, loginWithGithub };
