// Types matching Spring Boot backend entities

export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stockQuantity: number;
  imageUrls: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalSales: number;
  pendingOrders: number;
  totalProducts: number;
}

// API Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stockQuantity: number;
  imageUrls: string[];
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}
