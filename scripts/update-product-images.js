const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Configuration des images
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const IMAGES_PATH = path.join(__dirname, '../public/images');

// Mapping des catégories vers les images disponibles
const IMAGE_MAPPING = {
  'B6': 'b12.png',   // Utilise b12.png pour B6
  'B12': 'b12.png',
  'B15': 'b15.png',
  'B28': 'b12.png',  // Utilise b12.png pour B28
  'B50': 'b50.png',
};

// Mapping des marques vers des couleurs ou styles spécifiques
const BRAND_STYLES = {
  'Total': 'red',
  'Oryx': 'blue', 
  'Petroci': 'green',
  'Shell': 'yellow'
};

async function updateProductImages() {
  console.log('🖼️  Mise à jour des images des produits...');
  
  try {
    // Vérifier que le dossier d'images existe
    if (!fs.existsSync(IMAGES_PATH)) {
      console.error('❌ Dossier d\'images non trouvé:', IMAGES_PATH);
      return;
    }

    // Récupérer tous les produits avec leurs relations
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        type: true
      }
    });

    console.log(`📦 ${products.length} produits trouvés`);

    let updatedCount = 0;

    for (const product of products) {
      const categoryName = product.category.name;
      const brandName = product.brand.name;
      
      // Déterminer l'image à utiliser
      let imageFile = IMAGE_MAPPING[categoryName] || 'b12.png';
      
      // Vérifier que l'image existe
      const imagePath = path.join(IMAGES_PATH, imageFile);
      if (!fs.existsSync(imagePath)) {
        console.warn(`⚠️  Image non trouvée: ${imageFile} pour ${brandName} ${categoryName}`);
        imageFile = 'b12.png'; // Image par défaut
      }

      // Générer l'URL complète
      const imageUrl = `${BASE_URL}/images/${imageFile}`;

      // Mettre à jour le produit
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl }
      });

      console.log(`✅ ${brandName} ${categoryName} -> ${imageFile}`);
      updatedCount++;
    }

    console.log(`\n🎉 ${updatedCount} produits mis à jour avec succès!`);
    
    // Afficher un résumé des images utilisées
    console.log('\n📊 Résumé des images utilisées:');
    const imageUsage = {};
    for (const product of products) {
      const categoryName = product.category.name;
      const imageFile = IMAGE_MAPPING[categoryName] || 'b12.png';
      imageUsage[imageFile] = (imageUsage[imageFile] || 0) + 1;
    }
    
    Object.entries(imageUsage).forEach(([image, count]) => {
      console.log(`  ${image}: ${count} produits`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour des images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Fonction pour lister les images disponibles
async function listAvailableImages() {
  console.log('🖼️  Images disponibles:');
  
  try {
    if (!fs.existsSync(IMAGES_PATH)) {
      console.error('❌ Dossier d\'images non trouvé:', IMAGES_PATH);
      return;
    }

    const files = fs.readdirSync(IMAGES_PATH);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
    });

    imageFiles.forEach(file => {
      const imagePath = path.join(IMAGES_PATH, file);
      const stats = fs.statSync(imagePath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`  📄 ${file} (${sizeKB} KB) -> ${BASE_URL}/images/${file}`);
    });

    console.log(`\n📊 Total: ${imageFiles.length} images trouvées`);
  } catch (error) {
    console.error('❌ Erreur lors de la lecture des images:', error);
  }
}

// Exécuter le script
async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'list':
      await listAvailableImages();
      break;
    case 'update':
    default:
      await updateProductImages();
      break;
  }
}

main().catch(console.error);
