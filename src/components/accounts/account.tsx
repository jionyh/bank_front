import api from "@/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateAccountModal } from "./createAccountModal";

export const AccountComponent = async () => {
  const accountsList = await api.account.get();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex h-10 items-start justify-between">
          <p className="text-xl">Contas</p>
          <CreateAccountModal apiFn={api} />
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
                      <Badge className="w-32 bg-green-700 hover:bg-green-700">
                        <span className=" w-full text-center">Conta Corrente</span>
                      </Badge>
                    ) : (
                      <Badge className="w-32 bg-blue-700 hover:bg-blue-700">
                        <span className=" w-full text-center">Conta Poupança</span>
                      </Badge>
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
