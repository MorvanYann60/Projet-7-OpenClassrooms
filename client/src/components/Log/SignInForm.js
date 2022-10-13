import React, { useState } from "react";
import axios from "axios";

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const emailError =document.querySelector(".email.error");
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: "http://localhost:5000/api/user/login",
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
        .then((res) => {
            if(res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} value={email} />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
            <div className="password error"></div>
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    )
}

export default SignInForm;