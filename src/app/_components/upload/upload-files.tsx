import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { defined, download, openInNewTab } from "@/lib/utils";
import {
  FileDown,
  FileIcon,
  FileMinus,
  FilePlus,
  Paperclip,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadFilesPropType = {
  onUpload: (files: File[]) => void;
  handleGoToPreviousStage: () => void;
};

export function UploadFiles({
  handleGoToPreviousStage,
  onUpload,
}: UploadFilesPropType) {
  const [files, setFiles] = useState<File[]>();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      setFiles([...(files ?? []), ...acceptedFiles]);
    },
    [files],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = () => {
    if (!defined(files) || files.length === 0) {
      toast({
        title: "😢 Uh oh! Something went wrong!",
        description:
          "Please make sure you have uploaded at least one file to submit your configuration.",
      });
      return;
    }
    onUpload(files);
  };

  const handleRemoveFile = (index: number) => {
    console.log("Removing", index, "from", files);
    const temp = [...(files ?? [])];
    temp.splice(index, 1);
    setFiles(temp);
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div
          className="flex h-96 w-96 cursor-pointer items-center justify-center rounded-md bg-purple-600 bg-opacity-20 p-8 text-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 font-bold">
            {isDragActive ? (
              <>
                <FileIcon className="h-20 w-20" />
                <span>Dropping files...</span>
              </>
            ) : (
              <>
                <Paperclip className="text-primary" />
                <p>Click here to select files or drop them here.</p>
              </>
            )}
          </div>
        </div>
        {files && (
          <div className="h-96 max-h-96 w-96 max-w-96 overflow-x-hidden overflow-y-scroll rounded-md px-4">
            <div className="flex flex-col gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex w-full cursor-pointer items-center justify-between rounded border p-2"
                  onClick={() => openInNewTab(file)}
                >
                  <span
                    className="max-w-4/5 truncate text-balance font-bold hover:underline"
                    key={file.name}
                  >
                    {file.name}
                  </span>
                  <div className="flex">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        download(file, file.name);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <FileDown />
                    </Button>
                    <Button
                      className="text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <FileMinus />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button onClick={handleGoToPreviousStage} variant={"secondary"}>
          Go back
        </Button>
        <Button onClick={handleSubmit} className="">
          Finish
        </Button>
      </div>
    </div>
  );
}
