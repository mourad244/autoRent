// attributes marque, modele, classeVehicule, year, vehicleType, country, registryDate, licencePlate, color, transmission, horsePower, Carburant, seatCapacity, door, dailyPrice,
// year en englais est
export type ICar = {
  brand: string;
  model: string;
  vehicleClass: string;
  year: number;
  vehicleType: string;
  country: string;
  registryDate: string;
  licencePlate: string;
  color: string;
  transmission: string;
  horsePower: number;
  fuel: string;
  seatCapacity: number;
  door: number;
  dailyPrice: number;
  isAvailable: boolean | undefined;

  // image: string;
  // description: string;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
  // owner: IUser;
  // location: ILocation;
  // reservation: IReservation;
  // commentaire: ICommentaire;
  // note: INote;
  // facture: IFacture;
  // paiement: IPaiement;
  // avis: IAvis;
  // image: IImage;
};
