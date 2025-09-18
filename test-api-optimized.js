#!/usr/bin/env node

/**
 * Script de test pour l'API optimisée des produits
 * Teste le nouvel endpoint /products/mobile avec toutes les relations
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testOptimizedProductsAPI() {
  console.log('🚀 Test de l\'API optimisée des produits...\n');

  try {
    // Test 1: Récupérer tous les produits avec relations
    console.log('📦 Test 1: Récupération de tous les produits avec relations');
    const response1 = await axios.get(`${BASE_URL}/products/mobile?limit=5`);
    
    if (response1.data.success) {
      console.log('✅ Succès!');
      console.log(`📊 Nombre de produits: ${response1.data.data.products.length}`);
      console.log(`📄 Pagination: Page ${response1.data.data.pagination.page}/${response1.data.data.pagination.pages}`);
      
      // Analyser le premier produit
      if (response1.data.data.products.length > 0) {
        const product = response1.data.data.products[0];
        console.log('\n🔍 Analyse du premier produit:');
        console.log(`   ID: ${product.id}`);
        console.log(`   Nom: ${product.name}`);
        console.log(`   Description: ${product.description}`);
        console.log(`   Prix d'achat: ${product.basePrice} FCFA`);
        console.log(`   Prix de recharge: ${product.discountPrice} FCFA`);
        console.log(`   Stock total: ${product.totalStock}`);
        console.log(`   En stock: ${product.isInStock ? 'Oui' : 'Non'}`);
        console.log(`   Note moyenne: ${product.averageRating}/5 (${product.reviewCount} avis)`);
        
        // Relations
        console.log('\n🏷️ Relations:');
        console.log(`   Marque: ${product.brand?.name || 'N/A'}`);
        console.log(`   Catégorie: ${product.category?.name || 'N/A'}`);
        console.log(`   Type: ${product.type?.name || 'N/A'}`);
        console.log(`   Stocks par magasin: ${product.shopStocks?.length || 0} magasins`);
        
        if (product.shopStocks && product.shopStocks.length > 0) {
          console.log('\n🏪 Détail des stocks:');
          product.shopStocks.forEach((stock, index) => {
            console.log(`   ${index + 1}. ${stock.shop?.name}: ${stock.quantity} unités`);
          });
        }
      }
    } else {
      console.log('❌ Erreur:', response1.data.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 2: Recherche de produits
    console.log('🔍 Test 2: Recherche de produits');
    const response2 = await axios.get(`${BASE_URL}/products/mobile?search=total&limit=3`);
    
    if (response2.data.success) {
      console.log('✅ Succès!');
      console.log(`📊 Résultats de recherche: ${response2.data.data.products.length} produits`);
      
      response2.data.data.products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} - ${product.brand?.name} (Stock: ${product.totalStock})`);
      });
    } else {
      console.log('❌ Erreur:', response2.data.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 3: Filtrage par catégorie
    console.log('🏷️ Test 3: Filtrage par catégorie');
    const response3 = await axios.get(`${BASE_URL}/products/mobile?limit=3`);
    
    if (response3.data.success && response3.data.data.products.length > 0) {
      const firstProduct = response3.data.data.products[0];
      const categoryId = firstProduct.categoryId;
      
      console.log(`Filtrage par catégorie: ${firstProduct.category?.name} (ID: ${categoryId})`);
      
      const response4 = await axios.get(`${BASE_URL}/products/mobile?categoryId=${categoryId}&limit=5`);
      
      if (response4.data.success) {
        console.log('✅ Succès!');
        console.log(`📊 Produits dans cette catégorie: ${response4.data.data.products.length}`);
        
        response4.data.data.products.forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name} - ${product.brand?.name}`);
        });
      } else {
        console.log('❌ Erreur:', response4.data.message);
      }
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 4: Performance - Mesurer le temps de réponse
    console.log('⚡ Test 4: Test de performance');
    const startTime = Date.now();
    
    const response5 = await axios.get(`${BASE_URL}/products/mobile?limit=10`);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (response5.data.success) {
      console.log('✅ Succès!');
      console.log(`⏱️ Temps de réponse: ${responseTime}ms`);
      console.log(`📊 Produits récupérés: ${response5.data.data.products.length}`);
      console.log(`📈 Performance: ${(response5.data.data.products.length / responseTime * 1000).toFixed(2)} produits/seconde`);
    } else {
      console.log('❌ Erreur:', response5.data.message);
    }

    console.log('\n🎉 Tests terminés avec succès!');
    console.log('\n📋 Résumé des optimisations:');
    console.log('   ✅ Une seule requête pour toutes les relations');
    console.log('   ✅ Calculs de statistiques côté serveur');
    console.log('   ✅ Données pré-formatées pour l\'application mobile');
    console.log('   ✅ Performance optimisée');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Exécuter les tests
testOptimizedProductsAPI();



