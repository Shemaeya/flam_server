const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateDeliveryZones() {
  console.log('🌍 Mise à jour des zones de livraison...');

  try {
    // Supprimer toutes les zones existantes
    await prisma.deliveryZone.deleteMany({});
    console.log('✅ Anciennes zones supprimées');

    // Créer les nouvelles zones élargies
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

    // Créer les nouvelles zones
    for (const zoneData of deliveryZones) {
      await prisma.deliveryZone.create({
        data: zoneData,
      });
      console.log(`✅ Zone ${zoneData.name} créée`);
    }

    console.log('🎉 Toutes les zones de livraison ont été mises à jour !');
    
    // Afficher un résumé
    const zones = await prisma.deliveryZone.findMany();
    console.log('\n📊 Zones de livraison disponibles :');
    zones.forEach(zone => {
      console.log(`- ${zone.name}: ${zone.basePrice} FCFA de base`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour des zones:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateDeliveryZones();
