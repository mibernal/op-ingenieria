import OptimizedImage from "@/shared/components/OptimizedImage";
import type { Partner } from "@/core/domain/partner";

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="p-2">
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="w-full aspect-square flex items-center justify-center p-3">
          {partner.logo ? (
            <OptimizedImage
              src={partner.logo}
              alt={partner.name}
              width={240}
              height={240}
              objectFit="contain"
              loading="lazy"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span className="text-sm font-medium text-foreground text-center">{partner.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerCard;
