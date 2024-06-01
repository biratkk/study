import googleIcon from "@/assets/logos/google-logo.png";
import Image from "next/image";

export function GoogleIcon() {
  return <Image src={googleIcon.src} alt="Google logo" width={40} height={40} />;
}
