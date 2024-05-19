import { FC } from "react";
import { LucIcon } from "@ui/components/LucIcon";
import { cn } from "@ui/lib/utils";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface CustomDatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  disabled,
  onChange,
  value,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal ",
            !value && "text-muted-foreground",
          )}
        >
          <LucIcon iconName="Calculator" className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>Pick a Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
