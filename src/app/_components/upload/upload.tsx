"use client";
import uploadConfigurationFormSchemas, {
  type UploadFileConfigName,
} from "@/lib/forms/upload-forms";
import { type ReactHookFormInferType } from "@/lib/formschema";
import { cn, defined } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { UploadFiles } from "./upload-files";
import { UploadForm } from "./upload-form";
import Uploading from "./uploading";

const stages = {
  SELECT: "SELECT",
  CONFIGURE: "CONFIGURE",
  UPLOAD: "UPLOAD",
  UPLOADING: "UPLOADING",
} as const;

export default function UploadView() {
  const [stage, setStage] = useState<keyof typeof stages>(stages.SELECT);
  const [selected, setSelected] = useState<UploadFileConfigName>();
  const [configData, setConfigData] = useState<ReactHookFormInferType>();
  const [fileUpload, setFileUpload] = useState<File[]>();

  const handleConfirm = () => {
    setStage(stages.UPLOADING);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-4 py-10">
      {/* <PreviousUploads /> */}
      <div className="flex w-5/6 items-center justify-center px-4">
        {stage === stages.SELECT && (
          <UploadSuggestions
            onSelected={(s: UploadFileConfigName) => {
              setSelected(s);
              setStage(stages.CONFIGURE);
            }}
          />
        )}
        {defined(selected) && stage === stages.CONFIGURE && (
          <UploadForm
            onGoBack={() => {
              setSelected(undefined);
              setStage(stages.SELECT);
            }}
            onSave={(data) => {
              setConfigData(data);
              setStage(stages.UPLOAD);
            }}
            schema={uploadConfigurationFormSchemas[selected]}
            initial={configData}
          />
        )}
        {stage === stages.UPLOAD && (
          <UploadFiles
            handleGoToPreviousStage={() => {
              setStage(stages.CONFIGURE);
            }}
            onUpload={(files) => {
              setFileUpload(files);
              handleConfirm();
            }}
          />
        )}
        {stage === stages.UPLOADING && <Uploading />}
      </div>
    </div>
  );
}

export function PreviousUploads() {
  return (
    <div className=" right-0 top-20 h-[calc(100vh-4rem)] w-1/6 rounded-sm border-r p-4">
      <div className="px-4 font-semibold">Previous Uploads</div>
    </div>
  );
}

type UploadSuggestionPropType = {
  onSelected: (s: UploadFileConfigName) => void;
};

export function UploadSuggestions({ onSelected }: UploadSuggestionPropType) {
  return (
    <div className="flex min-h-96 w-[48rem] flex-col p-4">
      <div className="w-full text-center font-bold">Choose a configuration</div>
      <div className="group/parent mt-4 flex flex-col gap-2">
        {Object.entries(uploadConfigurationFormSchemas).map(([name, props]) => (
          <div
            className={cn(
              "group/child flex cursor-pointer items-center justify-between gap-8 rounded-md border p-2 duration-300",
            )}
            key={name}
            onClick={() => onSelected(name as UploadFileConfigName)}
          >
            <div>
              <h3
                className={cn(
                  "text-lg font-semibold duration-150 group-hover/parent:group-hover/child:text-foreground group-hover/parent:text-muted",
                )}
              >
                {name}
              </h3>
              <p className="text-muted-foreground duration-150 group-hover/parent:group-hover/child:text-foreground group-hover/parent:text-muted">
                {props.description}
              </p>
            </div>
            <div>
              <ArrowRight className="h-8 w-8 duration-150 group-hover/parent:group-hover/child:text-primary group-hover/parent:text-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
