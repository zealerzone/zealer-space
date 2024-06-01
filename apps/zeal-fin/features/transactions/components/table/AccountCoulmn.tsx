import { FC } from "react";

import { useOpenAccountZus } from "@/features/accounts/hooks/useOpenAccountZus";

interface AccountCoulmnProps {
  account: string;
  accountId: string;
}

const AccountCoulmn: FC<AccountCoulmnProps> = ({ account, accountId }) => {
  const { onOpen: onOpenAccount } = useOpenAccountZus();

  const onClick = () => {
    onOpenAccount(accountId);
  };
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center hover:underline"
    >
      {account}
    </div>
  );
};

export default AccountCoulmn;
