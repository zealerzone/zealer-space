import { FC } from "react";
import { LucIcon } from "@ui/components/LucIcon";
import { cn } from "@ui/lib/utils";
import CurrencyInput from "react-currency-input-field";

import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface CustomCurrencyProps {
  value: string;
  placeholder?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

const CustomCurrency: FC<CustomCurrencyProps> = ({
  onChange,
  value,
  disabled,
  placeholder,
}) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "absolute left-1.5 top-1 items-center justify-center rounded-sm bg-slate-400 p-2 transition hover:bg-slate-500",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600",
              )}
            >
              {!parsedValue && (
                <LucIcon iconName="Info" className="size-3 text-white" />
              )}
              {isIncome && (
                <LucIcon iconName="CirclePlus" className="size-3 text-white" />
              )}
              {isExpense && (
                <LucIcon iconName="CircleMinus" className="size-3 text-white" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className="text-muted-foreground mt-2 text-sm">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as expense"}
      </p>
    </div>
  );
};

export default CustomCurrency;
