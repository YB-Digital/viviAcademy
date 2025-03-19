"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import googleIcon from "@/image/googleIcon.svg"; // Dosya yolunun doğru olduğundan emin ol

interface GoogleLoginButtonProps {
    handleGoogleLogin: (token: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ handleGoogleLogin }) => {
    const login = useGoogleLogin({
        onSuccess: (response) => {
            if (response.access_token) {
                handleGoogleLogin(response.access_token);
            } else {
                console.error("Google login response did not contain an access token.");
            }
        },
        onError: () => console.error("Google login failed. Please try again."),
    });

    return (
        <button onClick={() => login()} className="google-login-btn" aria-label="Login with Google">
            <Image src={googleIcon} alt="Google Login" width={40} height={40} />
        </button>
    );
};

export default GoogleLoginButton;
