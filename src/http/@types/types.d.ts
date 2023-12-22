export interface IUser {
  id?: string;
  email: string;
  password: string;
  fullName: string;
  role?: "admin" | "client" | string;
  createdAt?: Date;
  updatedAt?: Date;

  profile?: IUserProfile;
}
export interface IUserProfile {
  profileImage?: string;
  contact: string;
  birthDate: Date;
  street: string;
  houseNumber: string;
  neighbourhood: string;
  complement: string | null;
  country: string;
  city: string;

  userId?: string; // FK
}

export interface IUserProfileUpdate {
  profileImage?: string;
  contact?: string;
  birthDate?: Date;
  street?: string;
  houseNumber?: string;
  neighbourhood?: string;
  complement?: string | null;
  country?: string;
  city?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  value: number;
  quantity: number;
  active?: boolean;
  description: string;
  image: string;
  sizes: string;
  colors: string;
  gender: string;
  category: string;
  isOnSale?: boolean;
  saleEnd?: Date | null;
  saleValue?: number | null;
}

export interface IProductUpdate {
  name?: string;
  value?: number;
  quantity?: number;
  description?: string;
  active?: boolean;
  image?: string;
  sizes?: string;
  colors?: string;
  gender?: string;
  category?: string;
  isOnSale?: boolean;
  saleEnd?: Date | null;
  saleValue?: number | null;
}

export interface WishListItem {
  id: string;
  createdAt: Date;
  fkUserId: string;
  name: string;
  value: number | Decimal;
  image: string;
  productId: string;
}
export interface WishListItemInsert {
  name: string;
  value: number;
  image: string;
  productId: string;
}

export interface ErrorHandling {
  status: number;
  message: string;
}
