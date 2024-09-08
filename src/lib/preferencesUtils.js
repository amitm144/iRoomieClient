import {
  AirVent,
  ArrowUpDown,
  Dog,
  Cigarette,
  Sofa,
  Car,
  Briefcase,
  Music,
  Film,
  Gamepad2,
  GraduationCap,
  Clock,
  Laptop,
  Shield,
  Book,
  Utensils,
} from "lucide-react";



export const initialPreferences = {
  roommate: {
    overview: {
      rentRange: 10000,
      bedrooms: 1,
      bathrooms: 1,
      minSize: 20,
    },
    details: {
      AC: true,
      Parking: true,
      Balcony: true,
      Furnished: true,
      Elevator: true,
      "Pet Friendly": true,
      "Smoking Allowed": true,
    },
    leaseDuration: {
      moveInDateStart: new Date().getTime(),
    },
    location: {
      address: {
        street: undefined,
        city: undefined,
        coordinates: [],
      },
      radius: 1000,
    },
  },
  apartment: {
    ageRange: [18, 60],
    gender: [],
    occupations: [],
    sharedInterests: [],
  },
};

export const iconMapRoommatePreferences = {
  AC: AirVent,
  Parking: Car,
  Balcony: ArrowUpDown,
  Furnished: Sofa,
  Elevator: ArrowUpDown,
  "Pet Friendly": Dog,
  "Smoking Allowed": Cigarette,
};

export const occupationOptions = [
  { value: "Soldier", label: "Soldier", icon: Shield },
  { value: "Student", label: "Student", icon: GraduationCap },
  { value: "Part-Time", label: "Part-Time Worker", icon: Clock },
  { value: "Full-Time", label: "Full-Time Employee", icon: Briefcase },
  { value: "Freelancer", label: "Freelancer", icon: Laptop },
];

export const interestOptions = [
  { value: "Music", label: "Music", icon: Music },
  { value: "Movies", label: "Movies", icon: Film },
  { value: "Sports", label: "Sports", icon: Gamepad2 },
  { value: "Reading", label: "Reading", icon: Book },
  { value: "Cooking", label: "Cooking", icon: Utensils },
];
