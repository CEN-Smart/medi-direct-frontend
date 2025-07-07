import { useState } from "react";

export const usePasswordPolicy = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword] = useState("");

  const [passwordPolicy, setPasswordPolicy] = useState([
    { label: "At least 12 characters", valid: false },
    { label: "One lowercase character (a-z)", valid: false },
    { label: "One uppercase character (A-Z)", valid: false },
    { label: "One number, symbol or whitespace character", valid: false },
    { label: "Password must match", valid: false },
  ]);

  const updatePasswordPolicy = (password: string) => {
    const valid = [
      { label: "At least 12 characters", valid: password?.length >= 12 },
      { label: "One lowercase character (a-z)", valid: /[a-z]/.test(password) },
      { label: "One uppercase character (A-Z)", valid: /[A-Z]/.test(password) },
      {
        label: "One number, symbol or whitespace character",
        valid:
          /[0-9]/.test(password) ||
          /\s/.test(password) ||
          /[!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?]+/.test(password),
      },
      { label: "Password must match", valid: password === confirmPassword },
    ];

    setPasswordPolicy(valid);
  };

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    updatePasswordPolicy(e.target.value);
  }
  function onPasswordMustMatch(e: React.ChangeEvent<HTMLInputElement>) {
    const passwordMatch = e.target.value === password;

    const updatedPasswordPolicy = passwordPolicy.map((policy) => {
      if (policy.label === "Password must match") {
        return { ...policy, valid: passwordMatch };
      }
      return policy;
    });

    setPasswordPolicy(updatedPasswordPolicy);
  }

  return {
    password,
    confirmPassword,
    passwordPolicy,
    onPasswordChange,
    onPasswordMustMatch,
  };
};
