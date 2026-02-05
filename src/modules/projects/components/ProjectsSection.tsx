 import { useState, useMemo } from "react";
 import { ChevronDown, ChevronRight } from "lucide-react";
 import ProjectCard from "./ProjectCard";
 import { projects, projectCategories, type Project } from "@/modules/projects/data/projects";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { Button } from "@/components/ui/button";
 
 const ProjectsSection = () => {
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 
   const filteredProjects = useMemo(() => {
     if (!selectedCategory) return projects;
     return projects.filter((project) => project.category === selectedCategory);
   }, [selectedCategory]);
 
   const selectedCategoryName = useMemo(() => {
     if (!selectedCategory) return "Todos los proyectos";
     return projectCategories.find((c) => c.id === selectedCategory)?.name || "Todos los proyectos";
   }, [selectedCategory]);
 
   return (
     <section id="proyectos" className="py-16 md:py-24 bg-background">
       <div className="container mx-auto px-4">
         <h2 className="section-title text-center mb-4">Proyectos Ejecutados</h2>
         <p className="section-subtitle text-center mx-auto mb-8">
           Conozca algunos de nuestros proyectos más destacados en diferentes sectores industriales y comerciales.
         </p>
 
         {/* Category Dropdown Menu */}
         <div className="flex justify-center mb-10">
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="outline" className="min-w-[280px] justify-between">
                 <span>{selectedCategoryName}</span>
                 <ChevronDown className="ml-2 h-4 w-4" />
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-[280px] bg-popover z-50">
               <DropdownMenuItem
                 onClick={() => setSelectedCategory(null)}
                 className="cursor-pointer"
               >
                 <span>Todos los proyectos</span>
               </DropdownMenuItem>
               {projectCategories.map((category) => (
                 <DropdownMenuItem
                   key={category.id}
                   onClick={() => setSelectedCategory(category.id)}
                   className="cursor-pointer justify-between"
                 >
                   <span>{category.name}</span>
                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
                 </DropdownMenuItem>
               ))}
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
 
         {/* Projects Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredProjects.map((project, index) => (
             <div
               key={project.id}
               className="animate-fade-in"
               style={{ animationDelay: `${index * 0.05}s` }}
             >
               <ProjectCard project={project} />
             </div>
           ))}
         </div>
 
         {/* Empty State */}
         {filteredProjects.length === 0 && (
           <div className="text-center py-12">
             <p className="text-muted-foreground">
               No hay proyectos en esta categoría.
             </p>
           </div>
         )}
       </div>
     </section>
   );
 };
 
 export default ProjectsSection;