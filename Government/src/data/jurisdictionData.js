// Jurisdiction Hierarchy: State -> District -> Block -> Village
export const jurisdictionHierarchy = {
  state: "Tamil Nadu",
  districts: [
    {
      id: "erode",
      name: "Erode",
      code: "TN-ERD",
      totalAnimals: 124580,
      activeCases: 1284,
      riskLevel: "CRITICAL",
      blocks: [
        {
          id: "perundurai",
          name: "Perundurai",
          coverage: 84.2,
          activeCases: 54,
          outbreakStatus: "CRITICAL",
          villages: [
            { id: "p-all", name: "All Villages", lat: 11.2754, lng: 77.5828 },
            { id: "p-east", name: "Perundurai East", lat: 11.2789, lng: 77.5912, risk: "CRITICAL", affected: 25 },
            { id: "p-thingalur", name: "Thingalur", lat: 11.2333, lng: 77.5500, risk: "MEDIUM", affected: 6 },
            { id: "p-vijayamangalam", name: "Vijayamangalam", lat: 11.2312, lng: 77.4981, risk: "HIGH", affected: 14 },
            { id: "p-kunnathur", name: "Kunnathur", lat: 11.3120, lng: 77.4350, risk: "LOW", affected: 2 }
          ]
        },
        {
          id: "bhavani",
          name: "Bhavani",
          coverage: 78.4,
          activeCases: 28,
          outbreakStatus: "HIGH",
          villages: [
            { id: "b-all", name: "All Villages", lat: 11.4503, lng: 77.6837 },
            { id: "b-kavindapadi", name: "Kavindapadi", lat: 11.4210, lng: 77.5820, risk: "HIGH", affected: 12 },
            { id: "b-ammampalayam", name: "Ammampalayam", lat: 11.4670, lng: 77.6320, risk: "LOW", affected: 1 }
          ]
        },
        {
          id: "gobichettipalayam",
          name: "Gobichettipalayam",
          coverage: 91.1,
          activeCases: 18,
          outbreakStatus: "MEDIUM",
          villages: [
            { id: "g-all", name: "All Villages", lat: 11.4542, lng: 77.4373 },
            { id: "g-kallipatti", name: "Kallipatti", lat: 11.4920, lng: 77.4110, risk: "MEDIUM", affected: 8 },
            { id: "g-nambiyur", name: "Nambiyur", lat: 11.3650, lng: 77.3210, risk: "LOW", affected: 0 }
          ]
        },
        {
          id: "sathyamangalam",
          name: "Sathyamangalam",
          coverage: 71.0,
          activeCases: 12,
          outbreakStatus: "CRITICAL",
          villages: [
            { id: "s-all", name: "All Villages", lat: 11.5034, lng: 77.2444 },
            { id: "s-bannari", name: "Bannari", lat: 11.5450, lng: 77.1680, risk: "CRITICAL", affected: 3 },
            { id: "s-dhimbam", name: "Dhimbam Ghats", lat: 11.6120, lng: 77.1940, risk: "LOW", affected: 0 }
          ]
        },
        {
          id: "modakkurichi",
          name: "Modakkurichi",
          coverage: 88.5,
          activeCases: 7,
          outbreakStatus: "LOW",
          villages: [
            { id: "m-all", name: "All Villages", lat: 11.3025, lng: 77.7842 },
            { id: "m-ganapathipalayam", name: "Ganapathipalayam", lat: 11.2640, lng: 77.7310, risk: "LOW", affected: 3 }
          ]
        },
        {
          id: "kodumudi",
          name: "Kodumudi",
          coverage: 86.9,
          activeCases: 4,
          outbreakStatus: "LOW",
          villages: [
            { id: "k-all", name: "All Villages", lat: 11.0805, lng: 77.8864 },
            { id: "k-salangapalayam", name: "Salangapalayam", lat: 11.1200, lng: 77.8300, risk: "LOW", affected: 1 }
          ]
        }
      ]
    },
    {
      id: "salem",
      name: "Salem",
      code: "TN-SLM",
      totalAnimals: 142100,
      activeCases: 890,
      riskLevel: "HIGH",
      blocks: []
    },
    {
      id: "coimbatore",
      name: "Coimbatore",
      code: "TN-CBE",
      totalAnimals: 118400,
      activeCases: 420,
      riskLevel: "LOW",
      blocks: []
    },
    {
      id: "namakkal",
      name: "Namakkal",
      code: "TN-NKL",
      totalAnimals: 165300,
      activeCases: 1105,
      riskLevel: "HIGH",
      blocks: []
    },
    {
      id: "tiruppur",
      name: "Tiruppur",
      code: "TN-TPR",
      totalAnimals: 109800,
      activeCases: 630,
      riskLevel: "MEDIUM",
      blocks: []
    }
  ]
};
