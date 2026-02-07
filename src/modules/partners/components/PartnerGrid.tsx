import type { Partner } from "@/core/domain/partner";
import { PartnerCard } from "./PartnerCard";

export function PartnerGrid({ partners }: { partners: Partner[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {partners.map((p) => (
        <PartnerCard key={p.id} partner={p} />
      ))}
    </div>
  );
}
