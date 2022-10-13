import React from "react";
import axios from "axios";
import cookie from "js-cookie";

function Logout() {

    const removeCookie = (key) => {
        if(window !== "undefind") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/api/user/logout",
            withCredentials: true,
        })
        .then(() => removeCookie('jwt'))
        .catch((erreur) => console.log(erreur))

        window.location = "/";
    }

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};


export default Logout;