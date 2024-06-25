import api from "@/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export const AccountComponent = async () => {
  const accountsList = await api.account.get();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>Contas</p>
          <Button className="background bg-green-700 h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Adicionar conta</span>
          </Button>
        </CardTitle>
        <CardDescription>Adicione e gerencie suas contas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Conta</TableHead>
              <TableHead>Tipo de Conta</TableHead>
              <TableHead>Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsList.length > 0 &&
              accountsList.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>
                    {account.accountType === "CURRENT" ? (
                      <Badge className="bg-green-700">Conta Corrente</Badge>
                    ) : (
                      <Badge className="bg-blue-700">Conta Poupança</Badge>
                    )}
                  </TableCell>
                  <TableCell>R$ {account.balance.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            {accountsList.length <= 0 && <div>Não há registros para exibir</div>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
