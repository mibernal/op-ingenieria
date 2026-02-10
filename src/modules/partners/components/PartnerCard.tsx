import OptimizedImage from "@/shared/components/OptimizedImage";
import type { Partner } from "@/core/domain/partner";
import { cn } from "@/lib/utils";

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="p-2">
      <div className={cn("bg-card rounded-2xl shadow-sm border border-border overflow-hidden")}>
        <div className="w-full aspect-[16/10] flex items-center justify-center px-6 py-4">
          {partner.logo ? (
            <OptimizedImage
              src={partner.logo}
              alt={partner.name}
              width={360}
              height={160}
              objectFit="contain"
              loading="lazy"
              disablePlaceholder
              fadeIn={false}
              className="w-full h-full"
              imgClassName="w-full h-full max-h-20 object-contain"
            />
          ) : (
            <span className="text-sm font-medium text-foreground text-center">
              {partner.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerCard;
