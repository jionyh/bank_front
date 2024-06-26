import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";
import api from "@/api";

export default function SignUp() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="my-auto mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrar Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm apiFn={api} />
        </CardContent>
      </Card>
    </main>
  );
}
