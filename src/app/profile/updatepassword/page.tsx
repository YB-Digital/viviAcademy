"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import InputComponent from "@/component/inputComponent";

//style
import "./updatepassword.scss";

// Images
import eyeOff from "@/image/eyeIcon.svg";
import eyeVisible from "@/image/eyeVisible.svg";
import done from "@/image/done.svg";
import wrong from "@/image/wrong.svg";

export default function UpdatePasswordPage() {
  const router = useRouter(); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasNumber: false,
    isLongEnough: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        router.push("/login");
      } else {
        setUserId(storedUserId);
      }
    }
  }, [router]);

  const validatePassword = (password: string) => {
    setPasswordStrength({
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      isLongEnough: password.length >= 8,
    });
  };

  const getBarColors = () => {
    const strengthCount = Object.values(passwordStrength).filter(Boolean).length;
    return [
      strengthCount >= 1 ? "#EA3232" : "#d3d3d3",
      strengthCount >= 2 ? "#FFA500" : "#d3d3d3",
      strengthCount === 3 ? "#4CAF50" : "#d3d3d3",
    ];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://ybdigitalx.com/vivi_front/password_update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "error") {
        setError(data.message || "An error occurred. Please try again.");
      } else {
        setSuccessMessage("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  const barColors = getBarColors();
  const isFormValid =
    passwordStrength.hasUpperCase &&
    passwordStrength.hasNumber &&
    passwordStrength.isLongEnough &&
    newPassword === confirmPassword;

  return (
    <div className="updatepassword">
      <h3 className="font-montserrat">Change Password</h3>
      <p className="font-inter">Update password for enhanced account security.</p>

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="font-inter">New Password *</label>
          <InputComponent
            type={showPassword ? "text" : "password"}
            rightImage={eyeOff}
            visible={eyeVisible}
            onClick={() => setShowPassword(!showPassword)}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>
        <div className="formGroup">
          <label className="font-inter">Confirm New Password *</label>
          <InputComponent
            type={showPassword ? "text" : "password"}
            rightImage={eyeOff}
            visible={eyeVisible}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>

        <div className="password-strength">
          <div className="bar">
            <div>
              <span style={{ backgroundColor: barColors[0] }}></span>
              <span style={{ backgroundColor: barColors[1] }}></span>
              <span style={{ backgroundColor: barColors[2] }}></span>
            </div>
            <p className="font-inter">
              {isFormValid ? "Strong password" : "Weak password. Must contain;"}
            </p>
          </div>
          <ul>
            <li className={passwordStrength.hasUpperCase ? "valid" : "invalid"}>
              <Image src={passwordStrength.hasUpperCase ? done : wrong} alt="check" />
              <p className="font-inter">At least 1 uppercase</p>
            </li>
            <li className={passwordStrength.hasNumber ? "valid" : "invalid"}>
              <Image src={passwordStrength.hasNumber ? done : wrong} alt="check" />
              <p className="font-inter">At least 1 number</p>
            </li>
            <li className={passwordStrength.isLongEnough ? "valid" : "invalid"}>
              <Image src={passwordStrength.isLongEnough ? done : wrong} alt="check" />
              <p className="font-inter">At least 8 characters</p>
            </li>
          </ul>
        </div>

        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="buttons">
          <button type="button" className="discard font-inter">Discard</button>
          <button
            type="submit"
            className="apply font-inter"
            disabled={!isFormValid}
          >
            Apply Changes
          </button>
        </div>
      </form>
    </div>
  );
}