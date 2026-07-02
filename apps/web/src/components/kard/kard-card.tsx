"use client";

import { Kard, type KardSocialLinks } from "./Kard";
import { type ImageTransform, type KardMode } from "./kardModes";

export interface KardCardProps {
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  kardId: string;
  socials?: KardSocialLinks;
  showEdit?: boolean;
  onEdit?: () => void;
  className?: string;
  theme?: KardMode;
  imageTransform?: ImageTransform;
}

export function KardCard({
  name,
  role,
  company,
  photoUrl,
  kardId,
  socials,
  showEdit = false,
  onEdit,
  className,
  theme = "dark",
  imageTransform,
}: KardCardProps) {
  return (
    <Kard
      mode={theme}
      imageUrl={photoUrl}
      imageTransform={imageTransform}
      name={name}
      title={role}
      company={company}
      socialLinks={socials}
      barcodeId={kardId}
      showEdit={showEdit}
      onEdit={onEdit}
      className={className}
    />
  );
}

export default KardCard;
