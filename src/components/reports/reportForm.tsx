"use client";
import { CalendarIcon, ClipboardMinus, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Account } from "@/types/account";
import { ApiFunctions } from "@/types/apiFunctions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Report } from "@/types/report";
import Link from "next/link";

type Props = {
  accountList: Account[];
  apiFn: ApiFunctions;
};

export const ReportForm = ({ accountList, apiFn }: Props) => {
  const [accountId, setAccountId] = useState<string>("");
  const [initialDate, setInitialDate] = useState<Date>();
  const [finalDate, setFinalDate] = useState<Date>();
  const [haveReportData, setHaveReportData] = useState(false);
  const [reportData, setReportData] = useState<Report>();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = await apiFn.report.get({
      account_id: accountId,
      startDate: initialDate?.toISOString(),
      endDate: finalDate?.toISOString(),
    });
    if ("error" in submitData) {
      alert(submitData.message);
    } else {
      setHaveReportData(true);
      setReportData(submitData);
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <Accordion className="w-full p-4" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="gap-3 text-right">Busca Avançada</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleFormSubmit} className="grid w-full items-start gap-6">
              <div className="flex gap-3">
                <div className="flex-1 grid gap-3">
                  <Label htmlFor="conta">Selecione a conta</Label>
                  <Select value={accountId} onValueChange={(e) => setAccountId(e)}>
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
                                  Tipo: {account.accountType === "CURRENT" ? "Corrente" : "Poupança"}
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
                <div className="grid gap-3">
                  <Label htmlFor="conta">Selecione a data de busca</Label>
                  <div className="flex justify-start items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !initialDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {initialDate ? format(initialDate, "PPP", { locale: ptBR }) : <span>Data Inicial</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={initialDate} onSelect={setInitialDate} />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !finalDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {finalDate ? format(finalDate, "PPP", { locale: ptBR }) : <span>Data Final</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={finalDate} onSelect={setFinalDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-end">
                <Button type="submit" className="">
                  Buscar pagamentos
                </Button>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {!haveReportData && (
        <div className="flex flex-col items-center justify-center w-full">
          <ClipboardMinus size={60} className="text-muted-foreground" />
          <p className="p-4 text-xl font-bold text-center w-full"> Selecione um período para exibir relatórios</p>
        </div>
      )}
      {haveReportData && reportData && (
        <Table>
          <TableHeader>
            <div>
              <p className="font-extrabold text-2xl ">Relatório de</p>
              <span className="font-bold "> {format(initialDate as Date, "dd/MM/yyyy", { locale: ptBR })} </span>à
              <span className="font-bold "> {format(finalDate as Date, "dd/MM/yyyy", { locale: ptBR })} </span>
            </div>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="hidden sm:table-cell">Descrição</TableHead>
              <TableHead className="hidden md:table-cell">Valor</TableHead>
              <TableHead className="hidden md:table-cell text-center">Comprovante</TableHead>
            </TableRow>
          </TableHeader>
          {haveReportData && reportData.payments && reportData.payments.length > 0 ? (
            <>
              <TableBody>
                {reportData.payments.map((report) => (
                  <TableRow key={report.id} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">{format(report.date, "dd/MM/yyyy", { locale: ptBR })}</div>
                    </TableCell>
                    <TableCell>
                      <div className="hidden text-sm text-muted-foreground md:inline">{report.description}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">R$ {report.amount.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Link className="flex items-center justify-center" href={report.imageUrl ? report.imageUrl : "/"}>
                        <ExternalLink />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-right" colSpan={2}>
                    Pagamento total
                  </TableCell>
                  <TableCell className="text-left" colSpan={2}>
                    R$ {reportData.paymentsAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </>
          ) : (
            <p className="p-4 "> Não há pagamentos para a data informada</p>
          )}
        </Table>
      )}
    </div>
  );
};
