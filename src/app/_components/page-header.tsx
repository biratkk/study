import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pages } from "@/lib/constants";
import { type PageNames } from "@/lib/types";
import { Plus } from "lucide-react";

type PageHeaderPropType = {
  title: string;
  description: string;
  iconFromPage: PageNames;
  onCreate: () => void;
};

export default function PageHeader({
  title,
  description,
  onCreate,
  iconFromPage,
}: PageHeaderPropType) {
  const page = pages[iconFromPage];
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="flex items-center gap-4 text-5xl font-bold">
          {title}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onCreate} size={"icon"}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-secondary text-secondary-foreground">
              Create new {title.toLowerCase()}
            </TooltipContent>
          </Tooltip>
        </h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <page.Icon className="h-20 w-20 justify-self-end text-purple-900" />
    </div>
  );
}
