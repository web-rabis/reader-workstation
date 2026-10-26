
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import imgLogo from "@/components/img/logo2.png";

const Login = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-8  max-w-xl ">
        <header className="mb-12 text-center">
          <div className="flex justify-between items-center mb-4">
              <img src={imgLogo} alt="logo" className={"h-[35px]"}/>

            <LanguageSelector />
          </div>
        </header>
        <main className="animate-in">
          <LoginForm />
        </main>
      </div>
    </div>
  );
};

export default Login;
