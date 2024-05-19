import React from "react";

import { TransactionsPageSection } from "@/features/transactions/components/TransactionsPageSection";

const TransactionsPage = () => {
  return (
    <section className="container mx-auto -mt-24 w-full pb-10">
      <TransactionsPageSection />
    </section>
  );
};

export default TransactionsPage;
