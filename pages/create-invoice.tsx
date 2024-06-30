import("@requestnetwork/create-invoice-form");
import { CreateInvoiceFormProps } from "@/types";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function CreateInvoice() {
  const formRef = useRef<CreateInvoiceFormProps>(null);
  const { wallet, requestNetwork } = useAppContext();

  async function fetchClientList() {
    let customersReq = await fetch("/api/quickbooks-customers");
    let customers: any[] = await customersReq.json();
    if (formRef.current) {
      if (wallet && requestNetwork) {
        formRef.current.signer = wallet.accounts[0].address;
        formRef.current.requestNetwork = requestNetwork;
        formRef.current.clientList = customers;
        formRef.current.config = config;
        formRef.current.useQuickBooks = !!process.env.NEXT_PUBLIC_USE_QUICKBOOKS;
      }
    }
  }
  useEffect(() => {
    fetchClientList();
  }, [wallet, requestNetwork]);

  return (
    <>
      <Head>
        <title>Request Payment - Create an Invoice</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <create-invoice-form ref={formRef} />
      </div>
    </>
  );
}
