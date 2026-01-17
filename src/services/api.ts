// API Service Layer - Ready to connect to Spring Boot backend
// Currently uses mock data, replace BASE_URL and remove mocks when backend is ready

import type {
  User,
  AuthResponse,
  Product,
  Category,
  Order,
  DashboardStats,
  LoginRequest,
  RegisterRequest,
  ProductCreateRequest,
  CartItem,
} from '@/types';
import { mockProducts, mockCategories, mockOrders, mockUser } from './mockData';

// TODO: Update this to your Spring Boot backend URL
const BASE_URL = '/api';

// Helper to get auth token
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Simulated delay for mock API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============ AUTH API ============
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await delay(500);
    // Mock implementation - replace with actual API call
    // const response = await fetch(`${BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return response.json();
    
    if (data.email === 'admin@handicraft.com' && data.password === 'admin123') {
      return { token: 'mock-jwt-token-admin', user: { ...mockUser, role: 'ADMIN' } };
    }
    if (data.email && data.password) {
      return { token: 'mock-jwt-token-customer', user: mockUser };
    }
    throw new Error('Invalid credentials');
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await delay(500);
    return {
      token: 'mock-jwt-token',
      user: {
        id: Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'CUSTOMER',
      },
    };
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    const token = localStorage.getItem('token');
    if (token?.includes('admin')) {
      return { ...mockUser, role: 'ADMIN' };
    }
    return mockUser;
  },
};

// ============ PRODUCTS API ============
export const productsApi = {
  getAll: async (params?: { category?: string; sort?: string }): Promise<Product[]> => {
    await delay(400);
    let products = [...mockProducts];
    
    if (params?.category && params.category !== 'all') {
      products = products.filter(p => 
        p.category.name.toLowerCase() === params.category?.toLowerCase()
      );
    }
    
    if (params?.sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params?.sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }
    
    return products;
  },

  getById: async (id: number): Promise<Product> => {
    await delay(300);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  create: async (data: ProductCreateRequest): Promise<Product> => {
    await delay(500);
    const category = mockCategories.find(c => c.id === data.categoryId);
    return {
      id: Date.now(),
      ...data,
      category: category || mockCategories[0],
      createdAt: new Date().toISOString(),
    };
  },

  update: async (id: number, data: Partial<ProductCreateRequest>): Promise<Product> => {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return { ...product, ...data };
  },

  delete: async (id: number): Promise<void> => {
    await delay(300);
  },
};

// ============ CATEGORIES API ============
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    await delay(200);
    return mockCategories;
  },
};

// ============ ORDERS API ============
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(400);
    return mockOrders;
  },

  getById: async (id: number): Promise<Order> => {
    await delay(300);
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  create: async (items: CartItem[]): Promise<Order> => {
    await delay(500);
    return {
      id: Date.now(),
      user: mockUser,
      items: items.map((item, index) => ({
        id: index + 1,
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
      totalAmount: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateStatus: async (id: number, status: string): Promise<Order> => {
    await delay(300);
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return { ...order, status: status as Order['status'] };
  },
};

// ============ DASHBOARD API ============
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(300);
    return {
      totalOrders: mockOrders.length,
      totalSales: mockOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      pendingOrders: mockOrders.filter(o => o.status === 'PENDING').length,
      totalProducts: mockProducts.length,
    };
  },
};
