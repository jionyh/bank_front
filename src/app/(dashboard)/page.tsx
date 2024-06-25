import { AccountComponent } from "@/components/accounts/account";
import { PaymentComponent } from "@/components/payments/payment";
import { ReportComponent } from "@/components/reports/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="account">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="account">Contas</TabsTrigger>
              <TabsTrigger value="payment">Pagamentos</TabsTrigger>
              <TabsTrigger value="report">Relatórios</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account">
            <AccountComponent />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentComponent />
          </TabsContent>
          <TabsContent value="report">
            <ReportComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
