"use client";

import { useState } from "react";
import Image from "next/image";

//style
import "./inputComponent.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftImage?: string;
  rightImage?: string;
  visible?: string;
  disabled?: boolean;
}

export default function InputComponent({ rightImage, visible, leftImage, type, disabled = false, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const isPasswordField = type === "password";

  // Validate email function
  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailPattern.test(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "email") {
      validateEmail(event);
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className={`inputComponent ${leftImage ? "extraPad" : ""}`}>
      {leftImage && <Image className="leftImage" src={leftImage} alt="icon" />}

      <input
        {...props}
        type={isPasswordField && isPasswordVisible ? "text" : type}
        required
        disabled={disabled}
        onChange={handleInputChange}
        className={!isValid && type === "email" ? "invalid-input" : ""}
      />

      {isPasswordField && rightImage && (
        <Image
          className="rightImage"
          src={isPasswordVisible ? visible || rightImage : rightImage}
          alt="toggle password"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      )}

      {!isValid && type === "email" && (
        <span className="error-message">Please enter a valid email address.</span>
      )}
    </div>
  );
}