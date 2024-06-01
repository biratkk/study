import { Boxes } from "lucide-react";

// animate between words [ Configuring, Uploading, Updating, Picking the right fight, etc.]
// TODO: add a potential submessage in here too.

export default function Uploading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <Boxes className="h-40 w-40 animate-pulse text-primary" />
      <span className="spin-in-3 text-2xl">Configuring...</span>
    </div>
  );
}
