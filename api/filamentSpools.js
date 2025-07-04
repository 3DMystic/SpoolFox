const filamentSpools = {
    PLA: [
        {
            // these are example filament spools
            // will be replaced with real data later
            id: 'pla1',
            name: 'PLA Filament',
            color: '#FF5733',
            diameter: 1.75,
            weight: 1000, // in grams
            price: 20.00, // in USD
            brand: 'Brand A',
            materialType: 'PLA',
            spoolSize: 200, // in meters
            lastUsed: '2023-10-01T12:00:00Z'
        },
        {
            id: 'pla2',
            name: 'ABS Filament',
            color: '#33FF57',
            diameter: 1.75,
            weight: 750, // in grams
            price: 25.00, // in USD
            brand: 'Brand B',
            materialType: 'ABS',
            spoolSize: 150, // in meters
            lastUsed: '2023-09-15T12:00:00Z'
        }],
        PETG: [
        {
            id: 'petg1',
            name: 'PETG Filament',
            color: '#3357FF',
            diameter: 1.75,
            weight: 500, // in grams
            price: 30.00, // in USD
            brand: 'Brand C',
            materialType: 'PETG',
            spoolSize: 100, // in meters
            lastUsed: '2023-08-20T12:00:00Z'
        }],
        TPU: [
        {
            id: 'tpu1',
            name: 'TPU Filament',
            color: '#FF33A1',
            diameter: 1.75,
            weight: 300, // in grams
            price: 35.00, // in USD
            brand: 'Brand D',
            materialType: 'TPU',
            spoolSize: 50, // in meters
            lastUsed: '2023-07-10T12:00:00Z'
        }]
}

module.exports = filamentSpools;