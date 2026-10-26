
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { authService } from "@/services/auth-service";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

export function LoginForm() {
  const { t } = useTranslation();
  const { login, setUser } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMassage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      login(response.data.accessToken);
      const profile = await authService.profile();
      setUser(profile.data);
      setErrorMassage("");
    } catch (error) {
        setErrorMassage(t('loginError'));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
      </CardHeader>
      <CardContent>
          {errorMessage!=="" && <Alert variant={"destructive"} className={"mb-3"}>
              <AlertDescription>
                  <p>{errorMessage}</p>
              </AlertDescription>
          </Alert>
          }
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              className="transition-all duration-200"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('login')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
