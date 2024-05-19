"use client";

import { FC, useMemo } from "react";
import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";

interface CustomSelectProps {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  value,
  onChange,
  onCreate,
  disabled,
  placeholder,
  options = [],
}) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) =>
    onChange(option?.value);

  const formatedValue = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      value={formatedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
};

export { CustomSelect };
