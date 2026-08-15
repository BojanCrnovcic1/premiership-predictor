import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

import styles from "./RegisterForm.module.scss";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    teamName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    teamName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const change =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = {
      teamName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!form.teamName.trim()) validation.teamName = "Required";

    if (!form.firstName.trim()) validation.firstName = "Required";

    if (!form.lastName.trim()) validation.lastName = "Required";

    if (!form.email.trim()) validation.email = "Required";

    if (!form.password.trim()) validation.password = "Required";

    if (form.password !== form.confirmPassword) {
      validation.confirmPassword = "Passwords do not match.";
    }

    setErrors(validation);

    if (Object.values(validation).some((x) => x !== "")) {
      return;
    }

    try {
      setLoading(true);

      await register({
        teamName: form.teamName,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard");
    } catch {
      setErrors({
        ...validation,
        general: "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Team name"
        value={form.teamName}
        error={errors.teamName}
        onChange={change("teamName")}
      />

      <Input
        label="First name"
        value={form.firstName}
        error={errors.firstName}
        onChange={change("firstName")}
      />

      <Input
        label="Last name"
        value={form.lastName}
        error={errors.lastName}
        onChange={change("lastName")}
      />

      <Input
        label="Email"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={change("email")}
      />

      <Input
        label="Password"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={change("password")}
      />

      <Input
        label="Confirm password"
        type="password"
        value={form.confirmPassword}
        error={errors.confirmPassword}
        onChange={change("confirmPassword")}
      />

      {errors.general && <p className={styles.error}>{errors.general}</p>}

      <Button type="submit" loading={loading} fullWidth>
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
