import { FC } from "react";
import { Button, LucIcon } from "@ui/index";
import { useCSVReader } from "react-papaparse";

interface UploadButtonProps {
  onUpload: (results: any) => void;
}

const UploadButton: FC<UploadButtonProps> = ({ onUpload }) => {
  const { CSVReader } = useCSVReader();

  // TODO Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <LucIcon iconName="Upload" className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
