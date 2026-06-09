import Image from "next/image";

type TeuCargoShipIconProps = {
  className?: string;
};

export function TeuCargoShipIcon({ className = "h-6 w-6" }: TeuCargoShipIconProps) {
  return (
    <Image
      src="/teu-cargo-ship-icon.png"
      alt=""
      width={24}
      height={24}
      className={`shrink-0 object-contain ${className}`}
      aria-hidden
    />
  );
}
