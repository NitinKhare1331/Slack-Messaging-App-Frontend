import { useEffect, useState } from "react";
import { useSignin } from "@/hooks/apis/auth/useSignin";
import { useNavigate } from "react-router-dom";
import { SigninCard } from "./SigninCard";

export const SigninContainer = () => {

    const navigate = useNavigate();

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });

    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signinMutation } = useSignin();

    async function onSigninFormSubmit(e) {
        e.preventDefault();
        console.log('Signup form submitted', signinForm);
        
        if(!signinForm.email || !signinForm.password) {
            console.log('All fields are required!');
            setValidationError({ message: 'All fields are required!' });
            return;
        }

        setValidationError(null);

        await signinMutation({
            email: signinForm.email,
            password: signinForm.password,
        })
    }

    useEffect(() => {
        if(isSuccess){
            setTimeout(() => {
                navigate('/home');
            }, 3000)
        }
    }, [isSuccess, navigate]);

    return (
        <SigninCard 
            error={error}
            isPending={isPending}
            isSuccess={isSuccess}
            signinForm={signinForm} 
            setSigninForm={setSigninForm} 
            validationError={validationError}
            onSigninFormSubmit={onSigninFormSubmit}
        />
    );
}