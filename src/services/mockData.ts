import type { User, Product, Category, Order } from '@/types';

export const mockUser: User = {
  id: 1,
  email: 'customer@example.com',
  firstName: 'Priya',
  lastName: 'Sharma',
  role: 'CUSTOMER',
};

export const mockCategories: Category[] = [
  { id: 1, name: 'Pottery', description: 'Handcrafted ceramic and clay items' },
  { id: 2, name: 'Textiles', description: 'Woven and embroidered fabrics' },
  { id: 3, name: 'Woodwork', description: 'Hand-carved wooden crafts' },
  { id: 4, name: 'Jewelry', description: 'Artisan jewelry pieces' },
  { id: 5, name: 'Home Decor', description: 'Decorative items for home' },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Hand-Painted Terracotta Vase',
    description: 'A beautifully hand-painted terracotta vase featuring traditional Indian motifs. Each piece is unique, crafted by skilled artisans from Rajasthan. Perfect for displaying fresh or dried flowers.',
    price: 2499,
    category: mockCategories[0],
    stockQuantity: 15,
    imageUrls: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600'],
  },
  {
    id: 2,
    name: 'Handwoven Silk Scarf',
    description: 'Luxurious handwoven silk scarf with intricate patterns inspired by Banarasi weaving traditions. Soft, lightweight, and perfect for all seasons.',
    price: 3999,
    category: mockCategories[1],
    stockQuantity: 25,
    imageUrls: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600'],
  },
  {
    id: 3,
    name: 'Carved Sandalwood Elephant',
    description: 'Exquisitely carved sandalwood elephant, handcrafted by master artisans from Karnataka. The natural fragrance of sandalwood adds to its charm.',
    price: 4599,
    category: mockCategories[2],
    stockQuantity: 8,
    imageUrls: ['https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600'],
  },
  {
    id: 4,
    name: 'Silver Filigree Earrings',
    description: 'Delicate silver filigree earrings showcasing the traditional Cuttack style of Odisha. Lightweight yet stunning statement pieces.',
    price: 1899,
    category: mockCategories[3],
    stockQuantity: 30,
    imageUrls: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'],
  },
  {
    id: 5,
    name: 'Blue Pottery Decorative Plate',
    description: 'Traditional Jaipur blue pottery plate with floral designs. A stunning piece for wall display or as a centerpiece.',
    price: 1599,
    category: mockCategories[0],
    stockQuantity: 20,
    imageUrls: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600'],
  },
  {
    id: 6,
    name: 'Handloom Cotton Throw Blanket',
    description: 'Soft handloom cotton throw with geometric patterns. Woven by artisans from Gujarat using traditional techniques.',
    price: 2799,
    category: mockCategories[1],
    stockQuantity: 12,
    imageUrls: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'],
  },
  {
    id: 7,
    name: 'Brass Diya Set',
    description: 'Set of 5 handcrafted brass diyas with intricate engravings. Perfect for festivals and home decor.',
    price: 999,
    category: mockCategories[4],
    stockQuantity: 40,
    imageUrls: ['https://images.unsplash.com/photo-1604422078609-c18c45f28e00?w=600'],
  },
  {
    id: 8,
    name: 'Wooden Jewelry Box',
    description: 'Hand-carved wooden jewelry box with brass inlay work. Features velvet lining and multiple compartments.',
    price: 3299,
    category: mockCategories[2],
    stockQuantity: 10,
    imageUrls: ['https://images.unsplash.com/photo-1584811644165-33078f50eb30?w=600'],
  },
];

export const mockOrders: Order[] = [
  {
    id: 1001,
    user: mockUser,
    items: [
      { id: 1, product: mockProducts[0], quantity: 2, priceAtPurchase: 2499 },
      { id: 2, product: mockProducts[3], quantity: 1, priceAtPurchase: 1899 },
    ],
    totalAmount: 6897,
    status: 'CONFIRMED',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: 1002,
    user: { ...mockUser, id: 2, firstName: 'Rahul', lastName: 'Patel' },
    items: [
      { id: 3, product: mockProducts[2], quantity: 1, priceAtPurchase: 4599 },
    ],
    totalAmount: 4599,
    status: 'PENDING',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
  {
    id: 1003,
    user: { ...mockUser, id: 3, firstName: 'Anita', lastName: 'Singh' },
    items: [
      { id: 4, product: mockProducts[5], quantity: 2, priceAtPurchase: 2799 },
      { id: 5, product: mockProducts[6], quantity: 3, priceAtPurchase: 999 },
    ],
    totalAmount: 8595,
    status: 'SHIPPED',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
  },
];
