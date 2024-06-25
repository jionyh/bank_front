import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentForm } from "./paymentForm";
import api from "@/api";

export const PaymentComponent = async () => {
  const accountsList = await api.account.get();
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Pagamentos</CardTitle>
        <CardDescription>Preencha o novo pagamento</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentForm accountList={accountsList} apiFn={api} />
      </CardContent>
    </Card>
  );
};
