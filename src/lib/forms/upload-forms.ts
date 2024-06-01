import { type FormSchema } from "../formschema";

const uploadFileConfigNames = [
  "Main Term Analysis",
  "Context Analysis",
  "Potential Flaw Analysis",
  "Paraphrasing Analysis",
  "Drawing Analysis",
  "Create your own",
] as const;

export type UploadFileConfigName = (typeof uploadFileConfigNames)[number];

const uploadConfigurationFormSchemas: Record<UploadFileConfigName, FormSchema> =
  {
    "Main Term Analysis": {
      title: "Main Term Analysis",
      description:
        "Pick out a list of all the terms in a PDF and stores the definition of each term.",
      properties: {
        "How detailed would you like the analysis? (Please give a score from 1-10)": {
          type: "string",
          default: ""
        },
        "How much of an expert are you at this topic?": {
          type: "string",
          default: "",
        },
        "Should I do reruns? Reruns make sure that the the analysis is thorough":
          {
            type: "boolean",
            default: false,
          },
      },
    },
    "Context Analysis": {
      title: "Context Analysis",
      description: "Pick out the context for a specific PDF.",
      properties: {},
    },
    "Potential Flaw Analysis": {
      title: "Potential Flaw Analysis",
      description:
        "What parts of the uploaded PDF topic are complex? These are the parts you'd normally get wrong unknowingly.",
      properties: {},
    },
    "Paraphrasing Analysis": {
      title: "Paraphrasing Analysis",
      description:
        "An analysis and understanding of the topic to explain as if to a 10 year old.",
      properties: {},
    },
    "Drawing Analysis": {
      title: "Drawing Analysis",
      description:
        "For visual learners, drawing a diagram/diagrams that represents the extent of the topic.",
      properties: {},
    },
    "Create your own": {
      title: "Create your own",
      description:
        "Create your own configuration, where you can choose what type of analysis you want to do.",
      properties: {},
    },
  } as const;

export default uploadConfigurationFormSchemas;
