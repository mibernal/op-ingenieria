 import { useRef, useEffect, useState } from "react";
 import { ChevronLeft, ChevronRight } from "lucide-react";
 import { clients, partners } from "@/modules/projects/data/clientsPartners";
 import { cn } from "@/lib/utils";
 
 interface LogoCarouselProps {
   items: { id: string; name: string; logo?: string }[];
   title: string;
 }
 
 const LogoCarousel = ({ items, title }: LogoCarouselProps) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const [canScrollLeft, setCanScrollLeft] = useState(false);
   const [canScrollRight, setCanScrollRight] = useState(true);
 
   const checkScroll = () => {
     if (scrollRef.current) {
       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
       setCanScrollLeft(scrollLeft > 0);
       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
     }
   };
 
   useEffect(() => {
     checkScroll();
     const ref = scrollRef.current;
     if (ref) {
       ref.addEventListener("scroll", checkScroll);
       return () => ref.removeEventListener("scroll", checkScroll);
     }
   }, []);
 
   const scroll = (direction: "left" | "right") => {
     if (scrollRef.current) {
       const scrollAmount = 300;
       scrollRef.current.scrollBy({
         left: direction === "left" ? -scrollAmount : scrollAmount,
         behavior: "smooth",
       });
     }
   };
 
   return (
     <div className="mb-12">
       <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
         {title}
       </h3>
       <div className="relative">
         {/* Left Arrow */}
         <button
           onClick={() => scroll("left")}
           className={cn(
             "absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background shadow-md rounded-full flex items-center justify-center transition-opacity",
             canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
           )}
           aria-label="Anterior"
         >
           <ChevronLeft className="w-5 h-5 text-foreground" />
         </button>
 
         {/* Carousel */}
         <div
           ref={scrollRef}
           className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
         >
           {items.map((item) => (
             <div
               key={item.id}
               className="flex-shrink-0 w-40 h-24 bg-card rounded-lg shadow-sm border border-border flex items-center justify-center p-4 hover:shadow-md transition-shadow"
             >
               {item.logo ? (
                 <img
                   src={item.logo}
                   alt={item.name}
                   className="max-w-full max-h-full object-contain"
                 />
               ) : (
                 <span className="text-sm font-medium text-foreground text-center leading-tight">
                   {item.name}
                 </span>
               )}
             </div>
           ))}
         </div>
 
         {/* Right Arrow */}
         <button
           onClick={() => scroll("right")}
           className={cn(
             "absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background shadow-md rounded-full flex items-center justify-center transition-opacity",
             canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
           )}
           aria-label="Siguiente"
         >
           <ChevronRight className="w-5 h-5 text-foreground" />
         </button>
       </div>
     </div>
   );
 };
 
 const ClientsPartnersSection = () => {
   return (
     <section id="clientes" className="py-16 md:py-24 bg-muted/30">
       <div className="container mx-auto px-4">
         <h2 className="section-title text-center mb-4">Clientes y Partners</h2>
         <p className="section-subtitle text-center mx-auto mb-12">
           Empresas que confían en nosotros y marcas líderes que representamos.
         </p>
 
         <LogoCarousel items={clients} title="Nuestros Clientes" />
         <LogoCarousel items={partners} title="Partners que Representamos" />
       </div>
     </section>
   );
 };
 
 export default ClientsPartnersSection;