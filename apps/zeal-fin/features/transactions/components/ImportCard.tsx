import { FC, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LucIcon,
  Skeleton,
} from "@ui/index";
import { format, parse } from "date-fns";

import { convertAmountToMilliUnits } from "@/lib/appUtils";
import ImportTable from "./table/import/ImportTable";

const dateFormat = "dd-MM-yyyy";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedCoulmnState {
  [key: string]: string | null;
}

interface ImportCardProps {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const ImportCard: FC<ImportCardProps> = ({ data, onCancel, onSubmit }) => {
  const [selectedColumn, setSelectedColumn] = useState<SelectedCoulmnState>({});
  const _headers = data[18];
  const headers = _headers?.slice(0, 1).concat("payee", "amount", "balance");
  const body = data.slice(19);
  const endIndex = body.findIndex((row) => row[0] === "");

  const transactionBody = body.slice(0, endIndex);

  function extractPayeeName(particulars: string): string {
    const parts = particulars.split("/");
    const parts2 = particulars.split("_");
    const parts3 = particulars.split("-");

    if (parts.length > 1) {
      return parts[3]?.trim() || "";
    }

    if (parts2.length > 1) {
      return parts2[3]?.trim() || "";
    }
    if (parts3.length > 1) {
      return parts3[2]?.trim() || "";
    }

    return particulars.trim();
  }

  function mergeDrCr(_data: string[][]): string[][] {
    //  Fun to extract Payee name

    return _data.map((row) => {
      const payeeFull = row[2]?.trim() || "";
      const payee = extractPayeeName(payeeFull);

      const date = row[0]?.trim() || "";
      const dr = parseFloat(row[3]?.trim() || "0");
      const cr = parseFloat(row[4]?.trim() || "0");
      const balance = parseFloat(row[5]?.trim() || "0").toFixed(2);
      const amount = (dr - cr).toFixed(2);
      return [date, payee, amount, balance];
    });
  }

  const mergedData = mergeDrCr(transactionBody);
  console.log("mergedData->", mergedData);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumn((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = value;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumn).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedDate = {
      headers: headers?.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumn[`column_${columnIndex}`];
      }),
      body: mergedData
        .map((row) => {
          const transaformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumn[`column_${columnIndex}`] ? cell : null;
          });

          return transaformedRow.every((item) => item === null)
            ? []
            : transaformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedDate.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header =
          (mappedDate.headers && mappedDate.headers[index]) || null;
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formatedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliUnits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    // console.log("formatedData->>", { formatedData });
    onSubmit(formatedData);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="line-clamp-1  text-xl">
          Import Transaction
        </CardTitle>
        <div className="flex items-center gap-x-2">
          <Button onClick={onCancel} size={"sm"}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={progress < requiredOptions.length}
            size={"sm"}
          >
            Continue ({progress} / {requiredOptions.length})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ImportTable
          headers={headers || []}
          body={mergedData}
          selectedColumns={selectedColumn}
          onTableHeadSelectChange={onTableHeadSelectChange}
        />
      </CardContent>{" "}
    </Card>
  );
};

export default ImportCard;
