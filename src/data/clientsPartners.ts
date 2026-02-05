 export interface Client {
   id: string;
   name: string;
   logo?: string;
 }
 
 export interface Partner {
   id: string;
   name: string;
   logo?: string;
 }
 
 export const clients: Client[] = [
   { id: "1", name: "Ecopetrol" },
   { id: "2", name: "ISA" },
   { id: "3", name: "Grupo Éxito" },
   { id: "4", name: "Colpatria" },
   { id: "5", name: "Bancolombia" },
   { id: "6", name: "Universidad Nacional" },
   { id: "7", name: "Hospital San Ignacio" },
   { id: "8", name: "Avianca" },
   { id: "9", name: "Corona" },
   { id: "10", name: "Alpina" },
 ];
 
 export const partners: Partner[] = [
   { id: "1", name: "Schneider Electric" },
   { id: "2", name: "ABB" },
   { id: "3", name: "Siemens" },
   { id: "4", name: "Eaton" },
   { id: "5", name: "Legrand" },
   { id: "6", name: "General Electric" },
   { id: "7", name: "Caterpillar" },
   { id: "8", name: "Cummins" },
 ];