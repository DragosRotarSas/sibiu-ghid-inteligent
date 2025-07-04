
export interface PointOfInterest {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  status: "open" | "closed" | "busy";
  coordinates: { lat: number; lng: number };
}
