import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ReactHookFormInferType,
  createInitialFormValueFromSchema,
  type FormSchema,
  type FormSchemaPropertyType,
} from "@/lib/formschema";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import {
  Controller,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

type UploadFormPropType = {
  schema: FormSchema;
  onSave: (val: ReactHookFormInferType) => void;
  onGoBack: () => void;
  initial?: ReactHookFormInferType;
};

// parse into string like this
// const prompt = Object.entries(data)
//       .map(([question, answer]) => `${question}\n${answer}`)
//       .join("\n\n");

export function UploadForm({
  schema,
  onGoBack,
  onSave,
  initial,
}: UploadFormPropType) {
  const form = useForm<ReactHookFormInferType>({
    defaultValues:
      initial ?? createInitialFormValueFromSchema(schema.properties),
  });

  const onSubmit: SubmitHandler<ReactHookFormInferType> = (data) =>
    onSave(data);

  return (
    <div>
      <h3 className="text-xl font-bold">{schema.title}</h3>
      <span className="text-sm text-muted-foreground">
        {schema.description}
      </span>
      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {Object.entries(schema.properties).map(([name, value]) => {
          return (
            <CustomController
              key={name}
              name={name}
              value={value}
              form={form}
            />
          );
        })}
        <div className="flex justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onGoBack();
            }}
            type="submit"
            variant={"secondary"}
            className=""
          >
            Go back
          </Button>
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

type CustomRendererProps = {
  name: string;
  value: FormSchemaPropertyType;
  form: UseFormReturn<ReactHookFormInferType>;
};

export function CustomController(props: CustomRendererProps) {
  if (props.value.type === "string") {
    return <CustomStringInput {...props} />;
  }

  if (props.value.type === "number") {
    return <CustomNumberInput {...props} />;
  }

  if (props.value.type === "boolean") {
    return <CustomBooleanInput {...props} />;
  }

  return redirect("/error/invalid-form");
}

export function CustomStringInput(props: CustomRendererProps) {
  return (
    <FormGroupContainer>
      <Label>{props.name}</Label>
      <Input type="text" {...props.form.register(props.name)} />
      <ErrorMessage
        message={props.form.formState.errors[props.name]?.message}
      />
    </FormGroupContainer>
  );
}

export function CustomNumberInput(props: CustomRendererProps) {
  return (
    props.value.type === "number" && (
      <FormGroupContainer>
        <Label>{props.name}</Label>
        <Input
          type="number"
          {...props.form.register(props.name, {
            min: props.value.minimum,
            max: props.value.maximum,
          })}
        />
        <ErrorMessage
          message={props.form.formState.errors[props.name]?.message}
        />
      </FormGroupContainer>
    )
  );
}

export function CustomBooleanInput(props: CustomRendererProps) {
  return (
    <div className="flex items-center gap-1">
      <Controller
        name={props.name}
        control={props.form.control}
        render={({ field }) => {
          return (
            <Checkbox
              checked={field.value as unknown as boolean}
              onCheckedChange={field.onChange}
            />
          );
        }}
      />
      <Label className="font-normal">{props.name}</Label>
    </div>
  );
}

export function ErrorMessage({ message }: { message?: string }) {
  return <span className="text-xs text-destructive">{message}</span>;
}

export function FormGroupContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
