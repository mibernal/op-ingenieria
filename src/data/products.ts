export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  price?: string;
  description: string;
  specs: ProductSpec[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "cargadores", name: "Cargadores", icon: "Battery" },
  { id: "reguladores", name: "Reguladores", icon: "Gauge" },
  { id: "plantas", name: "Plantas Eléctricas", icon: "Zap" },
  { id: "ups", name: "UPS", icon: "Power" },
  { id: "transformadores", name: "Transformadores", icon: "CircleDot" },
];

export const products: Product[] = [
  {
    id: "cargador-48v-3200w",
    title: "Cargador de Alta Frecuencia 48Vcc-3200W",
    category: "cargadores",
    image: "/src/assets/product-cargador.jpg",
    price: "Consultar",
    description: "Cargador de baterías industrial de alta frecuencia diseñado para aplicaciones de telecomunicaciones, sistemas de respaldo y equipos industriales. Ofrece máxima eficiencia y confiabilidad.",
    specs: [
      { label: "Voltaje de Salida", value: "48 Vcc" },
      { label: "Potencia", value: "3200W" },
      { label: "Tipo", value: "Alta Frecuencia" },
      { label: "Eficiencia", value: ">92%" },
      { label: "Protecciones", value: "Sobrecarga, cortocircuito, sobrevoltaje" },
      { label: "Temperatura Operación", value: "0°C a 40°C" },
    ],
  },
  {
    id: "cargador-24v-1600w",
    title: "Cargador de Alta Frecuencia 24Vcc-1600W",
    category: "cargadores",
    image: "/src/assets/product-cargador.jpg",
    price: "Consultar",
    description: "Cargador compacto de alta frecuencia para sistemas de 24V. Ideal para vehículos eléctricos industriales y sistemas de respaldo de energía.",
    specs: [
      { label: "Voltaje de Salida", value: "24 Vcc" },
      { label: "Potencia", value: "1600W" },
      { label: "Tipo", value: "Alta Frecuencia" },
      { label: "Eficiencia", value: ">90%" },
      { label: "Protecciones", value: "Sobrecarga, cortocircuito" },
      { label: "Temperatura Operación", value: "0°C a 45°C" },
    ],
  },
  {
    id: "regulador-30kva",
    title: "Regulador Trifásico 30kVA",
    category: "reguladores",
    image: "/src/assets/product-regulador.jpg",
    price: "Consultar",
    description: "Regulador automático de voltaje trifásico para protección de equipos industriales contra variaciones de tensión. Garantiza voltaje estable y continuo.",
    specs: [
      { label: "Capacidad", value: "30 kVA" },
      { label: "Entrada", value: "208/220/380/440V ±20%" },
      { label: "Salida", value: "208/220/380/440V ±2%" },
      { label: "Fases", value: "Trifásico" },
      { label: "Frecuencia", value: "50/60 Hz" },
      { label: "Tiempo de Respuesta", value: "<20ms" },
    ],
  },
  {
    id: "regulador-15kva",
    title: "Regulador Monofásico 15kVA",
    category: "reguladores",
    image: "/src/assets/product-regulador.jpg",
    price: "Consultar",
    description: "Regulador de voltaje monofásico para aplicaciones comerciales y residenciales de alta demanda. Protección total contra fluctuaciones de red.",
    specs: [
      { label: "Capacidad", value: "15 kVA" },
      { label: "Entrada", value: "120/220V ±25%" },
      { label: "Salida", value: "120/220V ±3%" },
      { label: "Fases", value: "Monofásico" },
      { label: "Frecuencia", value: "50/60 Hz" },
      { label: "Tiempo de Respuesta", value: "<15ms" },
    ],
  },
  {
    id: "planta-30kw",
    title: "Planta Eléctrica 30KW",
    category: "plantas",
    image: "/src/assets/product-planta30.jpg",
    price: "Consultar",
    description: "Generador diésel de 30KW para respaldo de energía en instalaciones industriales y comerciales. Alta confiabilidad y bajo consumo de combustible.",
    specs: [
      { label: "Potencia", value: "30 kW / 37.5 kVA" },
      { label: "Motor", value: "Diésel 4 cilindros" },
      { label: "Voltaje", value: "120/208V - 220/380V" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Autonomía", value: "8 horas a 75% carga" },
      { label: "Arranque", value: "Automático/Manual" },
    ],
  },
  {
    id: "planta-20kw",
    title: "Planta Eléctrica 20KW",
    category: "plantas",
    image: "/src/assets/product-planta20.jpg",
    price: "Consultar",
    description: "Generador diésel compacto de 20KW, ideal para respaldo en pequeñas y medianas empresas. Diseño silencioso y eficiente.",
    specs: [
      { label: "Potencia", value: "20 kW / 25 kVA" },
      { label: "Motor", value: "Diésel 3 cilindros" },
      { label: "Voltaje", value: "120/208V - 220/380V" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Autonomía", value: "10 horas a 75% carga" },
      { label: "Arranque", value: "Automático/Manual" },
    ],
  },
  {
    id: "ups-10kva",
    title: "UPS Online 10kVA",
    category: "ups",
    image: "/src/assets/product-regulador.jpg",
    price: "Consultar",
    description: "Sistema de alimentación ininterrumpida de doble conversión para protección crítica de equipos sensibles. Tecnología online pura.",
    specs: [
      { label: "Capacidad", value: "10 kVA / 9 kW" },
      { label: "Tipo", value: "Online Doble Conversión" },
      { label: "Entrada", value: "120/208/220V" },
      { label: "Salida", value: "120/208/220V regulado" },
      { label: "Autonomía", value: "5-30 min según carga" },
      { label: "Factor de Potencia", value: "0.9" },
    ],
  },
  {
    id: "ups-6kva",
    title: "UPS Online 6kVA",
    category: "ups",
    image: "/src/assets/product-regulador.jpg",
    price: "Consultar",
    description: "UPS de doble conversión para oficinas y equipos de cómputo. Proporciona energía limpia y estable continuamente.",
    specs: [
      { label: "Capacidad", value: "6 kVA / 5.4 kW" },
      { label: "Tipo", value: "Online Doble Conversión" },
      { label: "Entrada", value: "120/220V" },
      { label: "Salida", value: "120/220V regulado" },
      { label: "Autonomía", value: "8-20 min según carga" },
      { label: "Factor de Potencia", value: "0.9" },
    ],
  },
  {
    id: "transformador-75kva",
    title: "Transformador Seco 75kVA",
    category: "transformadores",
    image: "/src/assets/product-cargador.jpg",
    price: "Consultar",
    description: "Transformador tipo seco para instalaciones industriales donde se requiere seguridad contra incendios y bajo mantenimiento.",
    specs: [
      { label: "Capacidad", value: "75 kVA" },
      { label: "Tipo", value: "Seco Clase F" },
      { label: "Primario", value: "13.2 kV / 440V" },
      { label: "Secundario", value: "220/127V" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Enfriamiento", value: "AN (Aire Natural)" },
    ],
  },
  {
    id: "transformador-45kva",
    title: "Transformador en Aceite 45kVA",
    category: "transformadores",
    image: "/src/assets/product-cargador.jpg",
    price: "Consultar",
    description: "Transformador sumergido en aceite dieléctrico para distribución de energía. Excelente regulación y capacidad de sobrecarga.",
    specs: [
      { label: "Capacidad", value: "45 kVA" },
      { label: "Tipo", value: "Sumergido en Aceite" },
      { label: "Primario", value: "13.2 kV" },
      { label: "Secundario", value: "220/127V" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Enfriamiento", value: "ONAN" },
    ],
  },
];
