const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fonction pour vérifier si un point est dans un polygone (algorithme ray casting)
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
}

async function testLocationCoverage() {
  console.log('🧪 Test de couverture des zones de livraison...\n');

  // Votre position GPS actuelle
  const testPosition = [5.414759713963812, -3.9839628349277008];
  console.log(`📍 Position test: ${testPosition[0]}, ${testPosition[1]}\n`);

  try {
    // Récupérer toutes les zones de livraison
    const zones = await prisma.deliveryZone.findMany({
      where: { isActive: true }
    });

    console.log('🔍 Vérification dans chaque zone :\n');

    let foundInZone = false;

    for (const zone of zones) {
      const polygon = zone.polygonCoordinates;
      const isInZone = isPointInPolygon(testPosition, polygon);
      
      console.log(`Zone: ${zone.name}`);
      console.log(`  - Prix de base: ${zone.basePrice} FCFA`);
      console.log(`  - Prix par km: ${zone.pricePerKm} FCFA`);
      console.log(`  - Seuil livraison gratuite: ${zone.freeDeliveryThreshold} FCFA`);
      console.log(`  - Position dans la zone: ${isInZone ? '✅ OUI' : '❌ NON'}`);
      
      if (isInZone) {
        foundInZone = true;
        console.log(`  - 🎯 ZONE TROUVÉE ! Votre position est dans ${zone.name}`);
      }
      console.log('');
    }

    if (foundInZone) {
      console.log('✅ Votre position GPS est couverte par au moins une zone de livraison !');
    } else {
      console.log('❌ Votre position GPS n\'est couverte par aucune zone de livraison.');
      console.log('💡 Les zones actuelles couvrent :');
      zones.forEach(zone => {
        const coords = zone.polygonCoordinates;
        const minLat = Math.min(...coords.map(c => c[0]));
        const maxLat = Math.max(...coords.map(c => c[0]));
        const minLng = Math.min(...coords.map(c => c[1]));
        const maxLng = Math.max(...coords.map(c => c[1]));
        console.log(`  - ${zone.name}: Lat ${minLat} à ${maxLat}, Lng ${minLng} à ${maxLng}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLocationCoverage();
