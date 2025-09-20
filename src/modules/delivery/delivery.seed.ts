import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDeliveryData() {
  console.log('🌍 Seeding delivery data...');

  // Zones de livraison pour Abidjan - Zones élargies pour couvrir toute la ville
  const deliveryZones = [
    {
      name: 'Cocody',
      basePrice: 2000,
      pricePerKm: 500,
      freeDeliveryThreshold: 25000,
      supportsUrgentDelivery: true,
      polygonCoordinates: [
        [5.4000, -3.9500], // Nord-Ouest
        [5.4500, -3.9500], // Nord-Est
        [5.4500, -4.0500], // Sud-Est
        [5.4000, -4.0500], // Sud-Ouest
        [5.4000, -3.9500]  // Fermer le polygone
      ],
      isActive: true,
    },
    {
      name: 'Yopougon',
      basePrice: 2500,
      pricePerKm: 550,
      freeDeliveryThreshold: 28000,
      supportsUrgentDelivery: true,
      polygonCoordinates: [
        [5.3000, -4.1000], // Nord-Ouest
        [5.4000, -4.1000], // Nord-Est
        [5.4000, -4.2000], // Sud-Est
        [5.3000, -4.2000], // Sud-Ouest
        [5.3000, -4.1000]  // Fermer le polygone
      ],
      isActive: true,
    },
    {
      name: 'Abidjan Centre',
      basePrice: 2000,
      pricePerKm: 500,
      freeDeliveryThreshold: 25000,
      supportsUrgentDelivery: true,
      polygonCoordinates: [
        [5.3000, -3.9500], // Nord-Ouest
        [5.4000, -3.9500], // Nord-Est
        [5.4000, -4.0500], // Sud-Est
        [5.3000, -4.0500], // Sud-Ouest
        [5.3000, -3.9500]  // Fermer le polygone
      ],
      isActive: true,
    },
    {
      name: 'Marcory',
      basePrice: 2000,
      pricePerKm: 500,
      freeDeliveryThreshold: 25000,
      supportsUrgentDelivery: true,
      polygonCoordinates: [
        [5.3500, -3.9000], // Nord-Ouest
        [5.4000, -3.9000], // Nord-Est
        [5.4000, -4.0000], // Sud-Est
        [5.3500, -4.0000], // Sud-Ouest
        [5.3500, -3.9000]  // Fermer le polygone
      ],
      isActive: true,
    },
    {
      name: 'Abidjan Banlieue',
      basePrice: 3000,
      pricePerKm: 600,
      freeDeliveryThreshold: 30000,
      supportsUrgentDelivery: false,
      polygonCoordinates: [
        [5.2000, -4.0000], // Nord-Ouest
        [5.5000, -4.0000], // Nord-Est
        [5.5000, -4.3000], // Sud-Est
        [5.2000, -4.3000], // Sud-Ouest
        [5.2000, -4.0000]  // Fermer le polygone
      ],
      isActive: true,
    }
  ];

  // Créer les zones de livraison
  for (const zoneData of deliveryZones) {
    const existingZone = await prisma.deliveryZone.findUnique({
      where: { name: zoneData.name }
    });

    if (!existingZone) {
      const zone = await prisma.deliveryZone.create({
        data: zoneData
      });
      console.log(`✅ Zone "${zone.name}" créée`);

      // Créer les règles de tarification pour cette zone
      await createPricingRulesForZone(zone.id);
    } else {
      console.log(`⚠️  Zone "${zoneData.name}" existe déjà`);
    }
  }

  console.log('✅ Delivery data seeded successfully');
}

async function createPricingRulesForZone(zoneId: string) {
  const pricingRules = [
    // Règles pour les jours de semaine (Lundi-Vendredi)
    {
      zoneId,
      dayOfWeek: 1, // Lundi
      startHour: 9,
      endHour: 17,
      multiplier: 1.0,
      isUrgent: false
    },
    {
      zoneId,
      dayOfWeek: 2, // Mardi
      startHour: 9,
      endHour: 17,
      multiplier: 1.0,
      isUrgent: false
    },
    {
      zoneId,
      dayOfWeek: 3, // Mercredi
      startHour: 9,
      endHour: 17,
      multiplier: 1.0,
      isUrgent: false
    },
    {
      zoneId,
      dayOfWeek: 4, // Jeudi
      startHour: 9,
      endHour: 17,
      multiplier: 1.0,
      isUrgent: false
    },
    {
      zoneId,
      dayOfWeek: 5, // Vendredi
      startHour: 9,
      endHour: 17,
      multiplier: 1.0,
      isUrgent: false
    },
    // Règles pour le weekend
    {
      zoneId,
      dayOfWeek: 6, // Samedi
      startHour: 9,
      endHour: 17,
      multiplier: 1.2,
      isUrgent: false
    },
    {
      zoneId,
      dayOfWeek: 7, // Dimanche
      startHour: 9,
      endHour: 17,
      multiplier: 1.3,
      isUrgent: false
    },
    // Règles pour les livraisons urgentes
    {
      zoneId,
      dayOfWeek: 1, // Lundi
      startHour: 18,
      endHour: 22,
      multiplier: 1.5,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 2, // Mardi
      startHour: 18,
      endHour: 22,
      multiplier: 1.5,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 3, // Mercredi
      startHour: 18,
      endHour: 22,
      multiplier: 1.5,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 4, // Jeudi
      startHour: 18,
      endHour: 22,
      multiplier: 1.5,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 5, // Vendredi
      startHour: 18,
      endHour: 22,
      multiplier: 1.5,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 6, // Samedi
      startHour: 9,
      endHour: 17,
      multiplier: 1.8,
      isUrgent: true
    },
    {
      zoneId,
      dayOfWeek: 7, // Dimanche
      startHour: 9,
      endHour: 17,
      multiplier: 2.0,
      isUrgent: true
    }
  ];

  for (const ruleData of pricingRules) {
    const existingRule = await prisma.deliveryPricingRule.findFirst({
      where: {
        zoneId: ruleData.zoneId,
        dayOfWeek: ruleData.dayOfWeek,
        startHour: ruleData.startHour,
        endHour: ruleData.endHour,
        isUrgent: ruleData.isUrgent
      }
    });

    if (!existingRule) {
      await prisma.deliveryPricingRule.create({
        data: ruleData
      });
    }
  }
}

// Exécuter le seeding si ce fichier est appelé directement
if (require.main === module) {
  seedDeliveryData()
    .catch((e) => {
      console.error('❌ Erreur lors du seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
