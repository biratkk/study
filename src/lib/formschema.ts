
export type FormSchema = {
  title: string;
  description: string;
  properties: Record<string, FormSchemaPropertyType>;
};

export type ReactHookFormInferType = Record<
  string,
  FormSchemaPropertyType["default"]
>;

export type FormSchemaPropertyType =
| StringProperty
| BigStringProperty
| NumberProperty
| BooleanProperty
| FileProperty;

export type StringProperty = {
  type: "string";
  default: string;
};

export type BigStringProperty = {
  type: "bigstring";
  default: string;
};

export type NumberProperty = {
  type: "number";
  default: number;
  minimum?: number;
  maximum?: number;
};

export type BooleanProperty = {
  type: "boolean";
  default: boolean;
};

export type FileProperty = {
  type: "file";
  default: null;
};

const initialValueMap: Record<
  FormSchemaPropertyType["type"],
  FormSchemaPropertyType["default"]
> = {
  bigstring: "",
  string: "",
  boolean: false,
  file: null,
  number: 1,
};

export function createInitialFormValueFromSchema(
  schema: Record<string, FormSchemaPropertyType>,
  fillers = initialValueMap,
) {
  const obj: Record<string, FormSchemaPropertyType["default"]> = {};

  for (const key in schema) {
    const propType = schema[key]!.type;
    obj[key] = fillers[propType];
  }

  return obj;
}



// --------------- ZOD ------------------------------------

// export type FormSchemaPropertyType =
//   | z.ZodDefault<z.ZodString>
//   | z.ZodDefault<z.ZodNumber>
//   | z.ZodDefault<z.ZodBoolean>;

// const initialValueMap: Record<
//   string, // Zod.ZodFirstPartySchemaTypes["_def"]["typeName"],
//   FormSchemaPropertyType
// > = {
//   ZodString: z.string().default(""),
//   ZodNumber: z.number().default(1),
//   ZodBoolean: z.boolean().default(false),
// };

// export function createInitialFormValueFromSchema(
//   schema: Record<string, FormSchemaPropertyType>,
//   fillers = initialValueMap,
// ) {
//   const obj: Record<string, FormSchemaPropertyType['default']> = {};

//   for (const key in schema) {
//     const propType = schema[key]!._def.typeName;
//     obj[key] = fillers[propType]!;
//   }

//   return obj;
// }
