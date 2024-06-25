import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";
import api from "@/api";

export default function Login() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="my-auto mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Banco</CardTitle>
          <CardDescription>Entre com seu email para acessar suas contas</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm apiFn={api} />
        </CardContent>
      </Card>
    </main>
  );
}
