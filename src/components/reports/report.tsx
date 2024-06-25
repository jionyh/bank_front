import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api";
import { ReportForm } from "./reportForm";

export const ReportComponent = async () => {
  const accountsList = await api.account.get();
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ReportForm accountList={accountsList} apiFn={api} />
      </CardContent>
    </Card>
  );
};
