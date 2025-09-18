# 🚀 Optimisation API - Récupération des Relations

## 🎯 **Astuce : Récupérer toutes les données en une seule requête**

Au lieu de faire plusieurs appels API séparés, on peut utiliser les relations Prisma pour récupérer toutes les données d'un produit en une seule requête.

## 📝 **Exemple de modification dans le service Product**

### **Avant (plusieurs requêtes) :**
```typescript
// ❌ Inefficace - plusieurs requêtes
async getProducts() {
  const products = await this.prisma.product.findMany();
  
  for (const product of products) {
    product.brand = await this.prisma.brand.findUnique({
      where: { id: product.brandId }
    });
    product.category = await this.prisma.category.findUnique({
      where: { id: product.categoryId }
    });
    product.type = await this.prisma.type.findUnique({
      where: { id: product.typeId }
    });
    product.shopStocks = await this.prisma.shopStock.findMany({
      where: { productId: product.id },
      include: { shop: true }
    });
  }
  
  return products;
}
```

### **Après (une seule requête optimisée) :**
```typescript
// ✅ Efficace - une seule requête avec relations
async getProducts() {
  const products = await this.prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      type: true,
      shopStocks: {
        include: {
          shop: true
        }
      },
      reviews: {
        select: {
          rating: true
        }
      }
    }
  });

  // Calculer la note moyenne et le nombre de reviews
  const productsWithStats = products.map(product => ({
    ...product,
    averageRating: product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / product.reviews.length
      : 0,
    reviewCount: product.reviews.length
  }));

  return productsWithStats;
}
```

## 🔧 **Modifications à apporter dans le serveur**

### **1. Service Product (src/products/products.service.ts)**
```typescript
async findAll(query: any) {
  const products = await this.prisma.product.findMany({
    where: {
      isActive: true,
      ...(query.search && {
        OR: [
          { brand: { name: { contains: query.search, mode: 'insensitive' } } },
          { category: { name: { contains: query.search, mode: 'insensitive' } } },
          { type: { name: { contains: query.search, mode: 'insensitive' } } }
        ]
      }),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.brandId && { brandId: query.brandId }),
      ...(query.typeId && { typeId: query.typeId })
    },
    include: {
      brand: true,
      category: true,
      type: true,
      shopStocks: {
        include: {
          shop: true
        }
      },
      reviews: {
        select: {
          rating: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    skip: (query.page - 1) * query.limit,
    take: query.limit
  });

  // Calculer les statistiques
  const productsWithStats = products.map(product => ({
    ...product,
    averageRating: product.reviews.length > 0 
      ? Number((product.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / product.reviews.length).toFixed(2))
      : 0,
    reviewCount: product.reviews.length,
    totalStock: product.shopStocks.reduce((sum, stock) => sum + stock.quantity, 0)
  }));

  return {
    products: productsWithStats,
    total: await this.prisma.product.count({ where: { isActive: true } })
  };
}
```

### **2. DTO de réponse (src/products/dto/product-response.dto.ts)**
```typescript
export class ProductResponseDto {
  id: string;
  brandId: string;
  categoryId: string;
  typeId: string;
  imageUrl?: string;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  totalStock: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations incluses
  brand: {
    id: string;
    name: string;
    logo?: string;
    colors?: any;
    gasColor?: string;
    description?: string;
    hotline?: string;
    website?: string;
  };

  category: {
    id: string;
    name: string;
    pricePurchase: number;
    priceRefill: number;
    currentName?: string;
    usage?: string;
    size?: string;
    weight?: number;
    unit?: string;
  };

  type: {
    id: string;
    name: string;
  };

  shopStocks: Array<{
    id: string;
    shopId: string;
    productId: string;
    quantity: number;
    shop: {
      id: string;
      name: string;
      address: string;
      city: string;
      state: string;
      latitude: number;
      longitude: number;
      phone: string;
      email?: string;
    };
  }>;
}
```

## 🎯 **Avantages de cette approche**

1. **Performance** : Une seule requête au lieu de N+1 requêtes
2. **Simplicité** : Toutes les données sont disponibles immédiatement
3. **Cohérence** : Pas de risque de données incohérentes entre les requêtes
4. **Efficacité réseau** : Moins de round-trips entre le client et le serveur

## 📊 **Résultat attendu**

L'API retournera maintenant des produits avec toutes leurs relations incluses :

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "brandId": "brand_456",
        "categoryId": "cat_789",
        "typeId": "type_101",
        "imageUrl": "https://...",
        "isActive": true,
        "averageRating": 4.5,
        "reviewCount": 12,
        "totalStock": 150,
        "brand": {
          "id": "brand_456",
          "name": "Total",
          "logo": "https://...",
          "description": "Marque de gaz"
        },
        "category": {
          "id": "cat_789",
          "name": "Gaz 12kg",
          "pricePurchase": 15000,
          "priceRefill": 12000,
          "size": "12kg",
          "weight": 12.0,
          "unit": "kg"
        },
        "type": {
          "id": "type_101",
          "name": "Gaz domestique"
        },
        "shopStocks": [
          {
            "id": "stock_1",
            "quantity": 50,
            "shop": {
              "id": "shop_1",
              "name": "Station Total Cocody",
              "address": "Boulevard de la République",
              "city": "Abidjan"
            }
          }
        ]
      }
    ],
    "total": 25
  }
}
```

Cette approche rend l'intégration Flutter beaucoup plus simple et performante ! 🚀



