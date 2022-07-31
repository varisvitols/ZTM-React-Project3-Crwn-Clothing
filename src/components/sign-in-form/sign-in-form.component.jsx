import { useState, useContext } from "react";

// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import {
    // auth,
    signIn,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    // For signInWithGoogleRedirect
    // useEffect(() => {
    //     const getResponse = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if (response) {
    //             await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     getResponse();
    // }, []);

    // const resetFormFields = () => {
    //     setFormFields(defaultFormFields);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formFields);

        try {
            const {user} = await signIn(email, password);
            console.log(user);
            setCurrentUser(user);

            // resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log('user authorization failed with an error', error);
            }
        }
    }

    const handleChange = (event) => {
        console.log(formFields);
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                    {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
                </div>
            </form>
        </div>
    )
}

export default SignInForm