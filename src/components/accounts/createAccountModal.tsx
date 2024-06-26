"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { ApiFunctions } from "@/types/apiFunctions";

type Props = {
  apiFn: ApiFunctions;
};

const initialAccountData = {
  name: "",
  accountType: "",
  balance: 0,
};
export function CreateAccountModal({ apiFn }: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [accountData, setAccountData] = React.useState(initialAccountData);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = await apiFn.account.create(accountData);
    if ("error" in submitData) {
      alert(submitData.message);
    } else {
      alert("Conta cadastrada");
      setAccountData(initialAccountData);
      setOpen(false);
    }

    /*    const signup = await apiFn.user.signup({ email, password });

    if ("error" in signup) {
      setHaveError(true);
      setErrorMessage(signup.message);
    }
    if ("id" in signup) {
      router.push("/login");
    } */
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="background bg-green-700 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Adicionar conta</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar conta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid items-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da conta</Label>
              <Input
                value={accountData.name}
                onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                type="name"
                id="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="initialBalance">Saldo inicial</Label>
              <Input
                value={accountData.balance}
                onChange={(e) => setAccountData({ ...accountData, balance: +e.target.value })}
                id="initialBalance"
              />
            </div>
            <div>
              <Select
                value={accountData.accountType}
                onValueChange={(e) => setAccountData({ ...accountData, accountType: e })}
              >
                <SelectTrigger id="conta" className="items-start [&_[data-description]]:hidden">
                  <SelectValue placeholder="Selecione a conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Conta Corrente</SelectItem>
                  <SelectItem value="SAVINGS">Conta Poupança</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Adicionar</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} className="background bg-green-700 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Adicionar conta</DrawerTitle>
        </DrawerHeader>
        <form onSubmit={handleFormSubmit} className="grid items-start gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da conta</Label>
            <Input
              value={accountData.name}
              onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
              type="name"
              id="name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="initialBalance">Saldo inicial</Label>
            <Input
              value={accountData.balance}
              onChange={(e) => setAccountData({ ...accountData, balance: +e.target.value })}
              id="initialBalance"
            />
          </div>
          <div>
            <Select
              value={accountData.accountType}
              onValueChange={(e) => setAccountData({ ...accountData, accountType: e })}
            >
              <SelectTrigger id="conta" className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT">Conta Corrente</SelectItem>
                <SelectItem value="SAVINGS">Conta Poupança</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Adicionar</Button>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
