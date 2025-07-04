
import { PointOfInterest } from "@/types/poi";

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: "1",
    name: "Piața Mare Sibiu", 
    category: "Atracție Turistică",
    description: "Centrul istoric al Sibiului, cu arhitectură medievală unică",
    rating: 4.8,
    status: "open",
    coordinates: { lat: 45.7983, lng: 24.1256 }
  },
  {
    id: "2",
    name: "Turnul Sfatului",
    category: "Monument",
    description: "Simbol al Sibiului, turn istoric cu vedere panoramică",
    rating: 4.7,
    status: "open",
    coordinates: { lat: 45.7980, lng: 24.1250 }
  },
  {
    id: "3",
    name: "Restaurant Crama Sibiul Vechi",
    category: "Restaurant",
    description: "Bucătărie românească tradițională în cadru istoric",
    rating: 4.5,
    status: "busy",
    coordinates: { lat: 45.7975, lng: 24.1260 }
  },
  {
    id: "4",
    name: "Podul Minciunilor",
    category: "Atracție Turistică", 
    description: "Cel mai cunoscut pod din Sibiu, cu multe legende",
    rating: 4.3,
    status: "open",
    coordinates: { lat: 45.7970, lng: 24.1248 }
  },
  {
    id: "5",
    name: "Centrul Comercial Promenada",
    category: "Shopping",
    description: "Mall modern cu magazine și restaurante",
    rating: 4.2,
    status: "open",
    coordinates: { lat: 45.8020, lng: 24.1300 }
  }
];
