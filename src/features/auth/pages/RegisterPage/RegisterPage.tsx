import AuthCard from "../../components/AuthCard";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthCard title="Create Account" subtitle="Join Premier Predictor">
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
