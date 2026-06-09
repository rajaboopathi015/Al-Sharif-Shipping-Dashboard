import Image from "next/image";

type AlSharifLogoProps = {
  className?: string;
  collapsed?: boolean;
};

export function AlSharifLogo({ className = "", collapsed = false }: AlSharifLogoProps) {
  if (collapsed) {
    return (
      <Image
        src="/alsharif-logo.png"
        alt="Al Sharif Group"
        width={40}
        height={40}
        className={`h-10 w-10 shrink-0 object-contain ${className}`}
        priority
      />
    );
  }

  return (
    <Image
      src="/alsharif-logo-full.png"
      alt="Al Sharif Group"
      width={180}
      height={36}
      className={`h-8 w-auto max-w-[170px] shrink-0 object-contain object-left ${className}`}
      priority
    />
  );
}
