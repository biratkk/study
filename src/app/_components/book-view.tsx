import { bookViews } from "@/lib/constants";
import { replaceBookViewInPath } from "@/lib/url";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function SidebarView({ name }: { name?: string }) {
  const pathname = usePathname();
  const { viewType } = useParams<{ viewType: string }>();
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full max-w-48 flex-col border-r px-4 pt-10 lg:max-w-72">
        <h3 className="px-4 py-2 text-lg font-semibold">{name}</h3>
        <div className="mt-16 flex flex-col gap-1">
          {Object.entries(bookViews).map(([name, option]) => (
            <Link
              href={replaceBookViewInPath(pathname, name)}
              className={cn(
                "flex cursor-pointer gap-2 rounded-md p-4",
                viewType === name
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary",
              )}
              key={option.name}
            >
              <option.icon />
              {option.name}
            </Link>
          ))}
        </div>
      </div>
      {viewType && (
        <div className="h-full w-full overflow-y-scroll">
          {bookViews[viewType]?.children}
        </div>
      )}
    </div>
  );
}
