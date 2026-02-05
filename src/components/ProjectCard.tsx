 import { useState } from "react";
 import { ChevronLeft, ChevronRight } from "lucide-react";
 import { type Project } from "@/data/projects";
 import { cn } from "@/lib/utils";
 
 interface ProjectCardProps {
   project: Project;
 }
 
 const ProjectCard = ({ project }: ProjectCardProps) => {
   const [currentIndex, setCurrentIndex] = useState(0);
 
   const goToPrevious = () => {
     setCurrentIndex((prev) => 
       prev === 0 ? project.images.length - 1 : prev - 1
     );
   };
 
   const goToNext = () => {
     setCurrentIndex((prev) => 
       prev === project.images.length - 1 ? 0 : prev + 1
     );
   };
 
   return (
     <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
       {/* Image Carousel */}
       <div className="relative aspect-[4/3] overflow-hidden">
         <img
           src={project.images[currentIndex]}
           alt={`${project.name} - Imagen ${currentIndex + 1}`}
           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
         />
         
         {/* Navigation Arrows */}
         {project.images.length > 1 && (
           <>
             <button
               onClick={goToPrevious}
               className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
               aria-label="Imagen anterior"
             >
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button
               onClick={goToNext}
               className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
               aria-label="Imagen siguiente"
             >
               <ChevronRight className="w-5 h-5" />
             </button>
           </>
         )}
 
         {/* Dots Indicator */}
         {project.images.length > 1 && (
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
             {project.images.map((_, index) => (
               <button
                 key={index}
                 onClick={() => setCurrentIndex(index)}
                 className={cn(
                   "w-2 h-2 rounded-full transition-colors",
                   index === currentIndex
                     ? "bg-primary"
                     : "bg-background/60 hover:bg-background/80"
                 )}
                 aria-label={`Ir a imagen ${index + 1}`}
               />
             ))}
           </div>
         )}
       </div>
 
       {/* Content */}
       <div className="p-4">
         <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
           {project.name}
         </h3>
         <p className="text-muted-foreground text-xs mt-2 line-clamp-3">
           {project.description}
         </p>
       </div>
     </div>
   );
 };
 
 export default ProjectCard;