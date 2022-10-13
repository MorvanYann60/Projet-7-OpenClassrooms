import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");

        passwordConfirmError.innerHTML = '';

        if(password !== controlPassword) {
            passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
        } else {
            axios({
                method: "post",
                url: "http://localhost:5000/api/user/register",
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
            .then((res) => {
                console.log(res);
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

    }

    return (
        <>
            {formSubmit ? (
                <>
                <SignInForm />
                <span></span>
                <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (

                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input type="text" name="pseudo" id="pseudo" onChange={(event) => setPseudo(event.target.value)} value={pseudo} />
                    <div className="pseudo error"></div>
                    <br />
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
                    <label htmlFor="password-conf">Confirmer mot de passe</label>
                    <br />
                    <input type="password" name="password" id="password-conf" onChange={(event) => setControlPassword(event.target.value)} value={controlPassword} />
                    <div className="password-confirm error"></div>
                    <br />
                    <input type="submit" value="Valider inscription" />
                </form>
            )}  
        </>
    )
}

export default SignUpForm;