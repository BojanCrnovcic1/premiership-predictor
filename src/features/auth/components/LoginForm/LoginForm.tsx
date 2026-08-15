import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

import styles from "./LoginForm.module.scss";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = {
      email: "",
      password: "",
      general: "",
    };

    if (!email.trim()) {
      validation.email = "Email is required.";
    }

    if (!password.trim()) {
      validation.password = "Password is required.";
    }

    setErrors(validation);

    if (validation.email || validation.password) {
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch {
      setErrors({
        ...validation,
        general: "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        error={errors.email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        error={errors.password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.general && <p className={styles.error}>{errors.general}</p>}

      <Button type="submit" loading={loading} fullWidth>
        Sign In
      </Button>

      <div className={styles.footer}>
        <span>Don't have an account?</span>

        <Link to="/register">Create one</Link>
      </div>
    </form>
  );
};

export default LoginForm;
