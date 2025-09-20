"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDeliveryData = seedDeliveryData;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedDeliveryData() {
    console.log('🌍 Seeding delivery data...');
    const deliveryZones = [
        {
            name: 'Cocody',
            basePrice: 2000,
            pricePerKm: 500,
            freeDeliveryThreshold: 25000,
            supportsUrgentDelivery: true,
            polygonCoordinates: [
                [5.4000, -3.9500],
                [5.4500, -3.9500],
                [5.4500, -4.0500],
                [5.4000, -4.0500],
                [5.4000, -3.9500]
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
                [5.3000, -4.1000],
                [5.4000, -4.1000],
                [5.4000, -4.2000],
                [5.3000, -4.2000],
                [5.3000, -4.1000]
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
                [5.3000, -3.9500],
                [5.4000, -3.9500],
                [5.4000, -4.0500],
                [5.3000, -4.0500],
                [5.3000, -3.9500]
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
                [5.3500, -3.9000],
                [5.4000, -3.9000],
                [5.4000, -4.0000],
                [5.3500, -4.0000],
                [5.3500, -3.9000]
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
                [5.2000, -4.0000],
                [5.5000, -4.0000],
                [5.5000, -4.3000],
                [5.2000, -4.3000],
                [5.2000, -4.0000]
            ],
            isActive: true,
        }
    ];
    for (const zoneData of deliveryZones) {
        const existingZone = await prisma.deliveryZone.findUnique({
            where: { name: zoneData.name }
        });
        if (!existingZone) {
            const zone = await prisma.deliveryZone.create({
                data: zoneData
            });
            console.log(`✅ Zone "${zone.name}" créée`);
            await createPricingRulesForZone(zone.id);
        }
        else {
            console.log(`⚠️  Zone "${zoneData.name}" existe déjà`);
        }
    }
    console.log('✅ Delivery data seeded successfully');
}
async function createPricingRulesForZone(zoneId) {
    const pricingRules = [
        {
            zoneId,
            dayOfWeek: 1,
            startHour: 9,
            endHour: 17,
            multiplier: 1.0,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 2,
            startHour: 9,
            endHour: 17,
            multiplier: 1.0,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 3,
            startHour: 9,
            endHour: 17,
            multiplier: 1.0,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 4,
            startHour: 9,
            endHour: 17,
            multiplier: 1.0,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 5,
            startHour: 9,
            endHour: 17,
            multiplier: 1.0,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 6,
            startHour: 9,
            endHour: 17,
            multiplier: 1.2,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 7,
            startHour: 9,
            endHour: 17,
            multiplier: 1.3,
            isUrgent: false
        },
        {
            zoneId,
            dayOfWeek: 1,
            startHour: 18,
            endHour: 22,
            multiplier: 1.5,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 2,
            startHour: 18,
            endHour: 22,
            multiplier: 1.5,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 3,
            startHour: 18,
            endHour: 22,
            multiplier: 1.5,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 4,
            startHour: 18,
            endHour: 22,
            multiplier: 1.5,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 5,
            startHour: 18,
            endHour: 22,
            multiplier: 1.5,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 6,
            startHour: 9,
            endHour: 17,
            multiplier: 1.8,
            isUrgent: true
        },
        {
            zoneId,
            dayOfWeek: 7,
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
//# sourceMappingURL=delivery.seed.js.map