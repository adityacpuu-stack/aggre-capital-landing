// Script to populate ecosystem partners from static data
// Run this once to migrate static data to database

const staticEcosystemPartners = [
  { name: "Danamon", subtitle: "A member of MUFG", category: "Bank", sort_order: 1 },
  { name: "Bank Sampoerna", subtitle: "Trusted Financial Partner", category: "Bank", sort_order: 2 },
  { name: "Venteny", subtitle: "Digital Innovation", category: "Technology", sort_order: 3 },
  { name: "Bank Dassa", subtitle: "PT Bank Perkreditan Rakyat", category: "Bank", sort_order: 4 },
  { name: "Bank Bahtera Masyarakat", subtitle: "Melayani dengan Hati", category: "Bank", sort_order: 5 },
  { name: "KB Financial Group", subtitle: "Global Financial Services", category: "Finance", sort_order: 6 },
  { name: "Bank Vima", subtitle: "PT Bank Pembangunan Daerah Bali", category: "Bank", sort_order: 7 },
  { name: "Ralali", subtitle: "B2B Marketplace", category: "Marketplace", sort_order: 8 },
  { name: "MNC Finance", subtitle: "Multifinance Solutions", category: "Finance", sort_order: 9 },
  { name: "Mekar", subtitle: "Fintech Platform", category: "Fintech", sort_order: 10 },
  { name: "Pepper Advantage", subtitle: "Credit Solutions", category: "Fintech", sort_order: 11 }
];

async function populateEcosystemPartners() {
  console.log('Starting to populate ecosystem partners...');
  
  for (const partner of staticEcosystemPartners) {
    try {
      const response = await fetch('http://localhost:3000/api/partners/ecosystem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partner),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Added: ${partner.name}`);
      } else {
        console.log(`❌ Failed to add: ${partner.name}`);
      }
    } catch (error) {
      console.log(`❌ Error adding ${partner.name}:`, error.message);
    }
  }
  
  console.log('✅ Finished populating ecosystem partners!');
}

// Uncomment the line below and run: node populate-ecosystem-partners.js
// populateEcosystemPartners();

module.exports = { staticEcosystemPartners, populateEcosystemPartners };