import AuthCard from "../../components/AuthCard";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <AuthCard title="Welcome Back" subtitle="Login to continue">
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
