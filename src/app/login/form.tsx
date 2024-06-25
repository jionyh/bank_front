"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFunctions } from "@/types/apiFunctions";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  apiFn: ApiFunctions;
};

export default function LoginForm({ apiFn }: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [haveError, setHaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(undefined);
    setHaveError(false);
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const loginUser = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: `/`,
    });
    if (loginUser?.error && !loginUser.ok) {
      setHaveError(true);
      setErrorMessage(loginUser.error);
    }

    if (loginUser?.ok && !haveError) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" ref={emailRef} placeholder="Entre com seu email" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" ref={passwordRef} required />
        </div>
        {haveError && (
          <p className="text-destructive-foreground text-center bg-destructive p-2 mx-4 rounded-sm  ">{errorMessage}</p>
        )}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Não tem conta?
        <Link href="#" className="underline ml-2">
          Criar Conta
        </Link>
      </div>
    </form>
  );
}
