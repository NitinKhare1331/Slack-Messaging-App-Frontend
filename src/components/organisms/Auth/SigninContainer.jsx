import { useState } from "react";
import { SigninCard } from "./SigninCard";

export const SigninContainer = () => {
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: ''
    });

    return (
        <SigninCard signupForm={signupForm} setSignupForm={setSignupForm}/>
    )
}