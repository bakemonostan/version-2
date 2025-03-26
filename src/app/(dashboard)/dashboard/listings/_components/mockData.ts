import { VehicleListingTableData } from "../../../../../types/dashboard";

// Mock images for testing
const carImages = [
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2080",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
];

// Sample statuses
const statuses: Array<'active' | 'pending' | 'paused' | 'rejected'> = [
  'active', 'pending', 'paused', 'rejected'
];

// Generate a random date within the past year
const getRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const randomTimestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(randomTimestamp).toISOString();
};

// Generate a collection of mock vehicle listings
export const mockVehicleListings: VehicleListingTableData[] = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: `vehicle-${index + 1}`,
    title: `${['Toyota Camry', 'Honda Civic', 'Tesla Model S', 'Ford Mustang', 'Chevrolet Corvette', 'BMW 3 Series', 'Mercedes-Benz E-Class', 'Audi A4', 'Lexus ES', 'Porsche 911'][index % 10]}`,
    make: `${['Toyota', 'Honda', 'Tesla', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche'][index % 10]}`,
    model: `${['Camry', 'Civic', 'Model S', 'Mustang', 'Corvette', '3 Series', 'E-Class', 'A4', 'ES', '911'][index % 10]}`,
    year: `${2018 + (index % 6)}`,
    status: statuses[index % 4],
    vehicle_type: `${['Sedan', 'Hatchback', 'Electric', 'Sports Car', 'Sports Car', 'Sedan', 'Sedan', 'Sedan', 'Sedan', 'Sports Car'][index % 10]}`,
    image: carImages[index % carImages.length],
    date: getRandomDate(),
  })); 
