"use client";
import { Bird, Rabbit, Turtle, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Account } from "@/types/account";
import { ApiFunctions } from "@/types/apiFunctions";
import { useState } from "react";
import { CreatePayment } from "@/types/payment";
import { useRouter } from "next/navigation";

type Props = {
  accountList: Account[];
  apiFn: ApiFunctions;
};

const initialPaymentData = {
  account_id: "",
  amount: "",
  description: "",
  imageUrl: "",
};

export const PaymentForm = ({ accountList, apiFn }: Props) => {
  const [paymentData, setPaymentData] = useState<CreatePayment>(initialPaymentData);
  const [file, setFile] = useState<File | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account_id", paymentData.account_id);
    formData.append("amount", paymentData.amount);
    formData.append("description", paymentData.description);
    if (file) {
      formData.append("image", file);
    }

    const submitData = await apiFn.payment.create(formData);
    console.log(submitData);
    if ("error" in submitData) {
      alert(submitData.message);
    } else {
      alert("Pagamento cadastrado");
      setPaymentData(initialPaymentData);
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form onSubmit={handleFormSubmit} className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Cadastrar novo pagamento</legend>
          <div className="grid gap-3">
            <Label htmlFor="conta">Selecione a conta</Label>
            <Select
              value={paymentData.account_id}
              onValueChange={(e) => setPaymentData({ ...paymentData, account_id: e })}
            >
              <SelectTrigger id="conta" className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                {accountList ? (
                  accountList.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      <div className="flex items-start gap-3">
                        <div className="grid gap-0.5">
                          <p>
                            <span className="font-medium text-foreground">{account.name}</span>
                          </p>
                          <p className="text-xs" data-description>
                            Tipo: {account.accountType === "CURRENT" ? "Corrente" : "Poupança"} - Saldo:{" "}
                            {account.balance}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="null" disabled>
                    Não há contas Cadastradas
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="grid flex-1 gap-3">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                placeholder=""
                value={paymentData?.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Comprovante</Label>
              <Input
                id="picture"
                type="file"
                accept=".jpg,.jpeg,.pdf,.gif"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="content">Descrição do pagamento</Label>
            <Textarea
              id="content"
              placeholder=""
              className="min-h-[9.5rem]"
              onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
              value={paymentData.description}
            />
          </div>
        </fieldset>
        <div className="flex justify-end">
          <Button type="submit" className="">
            Cadastrar Novo pagamento
          </Button>
        </div>
      </form>
    </div>
  );
};
