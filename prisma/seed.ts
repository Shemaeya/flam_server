import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create brands
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: 'Total',
        logo: 'https://example.com/logos/total.png',
        colors: ['red', 'white'],
        gasColor: 'red',
        description: 'Leader mondial de l\'énergie',
        hotline: '+225123456789',
        website: 'https://total.ci',
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Oryx',
        logo: 'https://example.com/logos/oryx.png',
        colors: ['blue', 'white'],
        gasColor: 'blue',
        description: 'Marque de confiance pour le gaz',
        hotline: '+225123456790',
        website: 'https://oryx.ci',
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Petroci',
        logo: 'https://example.com/logos/petroci.png',
        colors: ['green', 'white'],
        gasColor: 'green',
        description: 'Compagnie nationale de pétrole',
        hotline: '+225123456791',
        website: 'https://petroci.ci',
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Shell',
        logo: 'https://example.com/logos/shell.png',
        colors: ['yellow', 'red'],
        gasColor: 'yellow',
        description: 'Énergie pour tous',
        hotline: '+225123456792',
        website: 'https://shell.ci',
      },
    }),
  ]);

  console.log('✅ Brands created');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'B6',
        pricePurchase: 8000,
        priceRefill: 6000,
        currentName: 'B6KG',
        usage: 'Cuisine individuelle',
        size: '6kg',
        weight: 6,
        unit: 'kg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'B12',
        pricePurchase: 15000,
        priceRefill: 12000,
        currentName: 'B12KG',
        usage: 'Cuisine familiale',
        size: '12kg',
        weight: 12,
        unit: 'kg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'B28',
        pricePurchase: 35000,
        priceRefill: 28000,
        currentName: 'B28KG',
        usage: 'Usage commercial',
        size: '28kg',
        weight: 28,
        unit: 'kg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'B50',
        pricePurchase: 60000,
        priceRefill: 50000,
        currentName: 'B50KG',
        usage: 'Usage industriel',
        size: '50kg',
        weight: 50,
        unit: 'kg',
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create types
  const types = await Promise.all([
    prisma.type.create({
      data: {
        name: 'Butane',
      },
    }),
    prisma.type.create({
      data: {
        name: 'Propane',
      },
    }),
    prisma.type.create({
      data: {
        name: 'Mixte',
      },
    }),
  ]);

  console.log('✅ Types created');

  // Create products
  const products = [];
  for (const brand of brands) {
    for (const category of categories) {
      for (const type of types) {
        products.push(
          prisma.product.create({
            data: {
              brandId: brand.id,
              categoryId: category.id,
              typeId: type.id,
              imageUrl: `https://example.com/products/${brand.name.toLowerCase()}-${category.name.toLowerCase()}-${type.name.toLowerCase()}.jpg`,
            },
          }),
        );
      }
    }
  }

  const createdProducts = await Promise.all(products);
  console.log('✅ Products created');

  // Create shops
  const shops = await Promise.all([
    prisma.shop.create({
      data: {
        name: 'Dépôt Cocody',
        address: 'Boulevard de la République, Cocody',
        city: 'Abidjan',
        state: 'Cocody',
        latitude: 5.3599,
        longitude: -4.0083,
        phone: '+225123456789',
        email: 'cocody@flam.ci',
      },
    }),
    prisma.shop.create({
      data: {
        name: 'Dépôt Plateau',
        address: 'Avenue Franchet d\'Esperey, Plateau',
        city: 'Abidjan',
        state: 'Plateau',
        latitude: 5.3204,
        longitude: -4.0281,
        phone: '+225123456790',
        email: 'plateau@flam.ci',
      },
    }),
    prisma.shop.create({
      data: {
        name: 'Dépôt Yopougon',
        address: 'Carrefour Siporex, Yopougon',
        city: 'Abidjan',
        state: 'Yopougon',
        latitude: 5.3214,
        longitude: -4.1234,
        phone: '+225123456791',
        email: 'yopougon@flam.ci',
      },
    }),
  ]);

  console.log('✅ Shops created');

  // Create shop stocks
  const shopStocks = [];
  for (const shop of shops) {
    for (const product of createdProducts) {
      shopStocks.push(
        prisma.shopStock.create({
          data: {
            shopId: shop.id,
            productId: product.id,
            quantity: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
          },
        }),
      );
    }
  }

  await Promise.all(shopStocks);
  console.log('✅ Shop stocks created');

  // Create delivery zones
  const deliveryZones = await Promise.all([
    prisma.deliveryZone.create({
      data: {
        name: 'Cocody',
        basePrice: 2000,
        pricePerKm: 500,
        freeDeliveryThreshold: 50000,
        supportsUrgentDelivery: true,
        polygonCoordinates: [
          [5.3599, -4.0083],
          [5.3600, -4.0084],
          [5.3601, -4.0085],
          [5.3602, -4.0086],
          [5.3599, -4.0083],
        ],
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Plateau',
        basePrice: 1500,
        pricePerKm: 400,
        freeDeliveryThreshold: 40000,
        supportsUrgentDelivery: true,
        polygonCoordinates: [
          [5.3204, -4.0281],
          [5.3205, -4.0282],
          [5.3206, -4.0283],
          [5.3207, -4.0284],
          [5.3204, -4.0281],
        ],
      },
    }),
    prisma.deliveryZone.create({
      data: {
        name: 'Yopougon',
        basePrice: 2500,
        pricePerKm: 600,
        freeDeliveryThreshold: 60000,
        supportsUrgentDelivery: false,
        polygonCoordinates: [
          [5.3214, -4.1234],
          [5.3215, -4.1235],
          [5.3216, -4.1236],
          [5.3217, -4.1237],
          [5.3214, -4.1234],
        ],
      },
    }),
  ]);

  console.log('✅ Delivery zones created');

  // Create delivery pricing rules
  const pricingRules = [];
  for (const zone of deliveryZones) {
    // Weekend pricing (+15%)
    pricingRules.push(
      prisma.deliveryPricingRule.create({
        data: {
          zoneId: zone.id,
          dayOfWeek: 6, // Saturday
          startHour: 0,
          endHour: 23,
          multiplier: 1.15,
          isUrgent: false,
        },
      }),
    );
    pricingRules.push(
      prisma.deliveryPricingRule.create({
        data: {
          zoneId: zone.id,
          dayOfWeek: 7, // Sunday
          startHour: 0,
          endHour: 23,
          multiplier: 1.15,
          isUrgent: false,
        },
      }),
    );

    // Peak hours pricing (+20%)
    pricingRules.push(
      prisma.deliveryPricingRule.create({
        data: {
          zoneId: zone.id,
          dayOfWeek: 1, // Monday
          startHour: 12,
          endHour: 14,
          multiplier: 1.20,
          isUrgent: false,
        },
      }),
    );
    pricingRules.push(
      prisma.deliveryPricingRule.create({
        data: {
          zoneId: zone.id,
          dayOfWeek: 1, // Monday
          startHour: 18,
          endHour: 20,
          multiplier: 1.20,
          isUrgent: false,
        },
      }),
    );

    // Off-peak hours pricing (-10%)
    pricingRules.push(
      prisma.deliveryPricingRule.create({
        data: {
          zoneId: zone.id,
          dayOfWeek: 1, // Monday
          startHour: 22,
          endHour: 6,
          multiplier: 0.90,
          isUrgent: false,
        },
      }),
    );

    // Urgent delivery pricing (+50%)
    if (zone.supportsUrgentDelivery) {
      pricingRules.push(
        prisma.deliveryPricingRule.create({
          data: {
            zoneId: zone.id,
            dayOfWeek: 1, // Monday
            startHour: 0,
            endHour: 23,
            multiplier: 1.50,
            isUrgent: true,
          },
        }),
      );
    }
  }

  await Promise.all(pricingRules);
  console.log('✅ Delivery pricing rules created');

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@flam.ci',
        firstName: 'Admin',
        lastName: 'Flam',
        passwordHash: hashedPassword,
        isEmailVerified: true,
        isPhoneVerified: true,
        phone: '+225123456789',
      },
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        passwordHash: hashedPassword,
        isEmailVerified: true,
        isPhoneVerified: true,
        phone: '+225123456790',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        passwordHash: hashedPassword,
        isEmailVerified: true,
        isPhoneVerified: false,
        phone: '+225123456791',
      },
    }),
  ]);

  console.log('✅ Test users created');

  // Create addresses for test users
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        userId: users[1].id, // John Doe
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Boulevard de la République, Cocody',
        city: 'Abidjan',
        state: 'Cocody',
        zipCode: '00225',
        country: 'Côte d\'Ivoire',
        phone: '+225123456790',
        label: 'Maison',
        isDefault: true,
        latitude: 5.3599,
        longitude: -4.0083,
        inServiceZone: true,
      },
    }),
    prisma.address.create({
      data: {
        userId: users[2].id, // Jane Smith
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Avenue Franchet d\'Esperey, Plateau',
        city: 'Abidjan',
        state: 'Plateau',
        zipCode: '00225',
        country: 'Côte d\'Ivoire',
        phone: '+225123456791',
        label: 'Bureau',
        isDefault: true,
        latitude: 5.3204,
        longitude: -4.0281,
        inServiceZone: true,
      },
    }),
  ]);

  console.log('✅ Test addresses created');

  // Create sample notifications
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: users[1].id,
        title: 'Bienvenue sur Flam!',
        message: 'Merci de vous être inscrit sur notre plateforme de livraison de gaz.',
        type: 'SYSTEM',
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: users[2].id,
        title: 'Promotion spéciale',
        message: 'Livraison gratuite pour toute commande supérieure à 50,000 FCFA!',
        type: 'PROMOTION',
        isRead: false,
      },
    }),
  ]);

  console.log('✅ Sample notifications created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- ${brands.length} brands created`);
  console.log(`- ${categories.length} categories created`);
  console.log(`- ${types.length} types created`);
  console.log(`- ${createdProducts.length} products created`);
  console.log(`- ${shops.length} shops created`);
  console.log(`- ${shopStocks.length} shop stocks created`);
  console.log(`- ${deliveryZones.length} delivery zones created`);
  console.log(`- ${pricingRules.length} pricing rules created`);
  console.log(`- ${users.length} test users created`);
  console.log(`- ${addresses.length} test addresses created`);
  console.log(`- ${notifications.length} sample notifications created`);
  console.log('\n🔑 Test credentials:');
  console.log('- admin@flam.ci / password123');
  console.log('- john@example.com / password123');
  console.log('- jane@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
