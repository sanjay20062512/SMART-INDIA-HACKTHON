// Multilingual Alert Templates for Livestock Disease Advisories
export const alertTemplates = [
  {
    id: "fmd-critical",
    disease: "Foot & Mouth Disease (FMD)",
    severity: "CRITICAL",
    species: "Cattle & Buffalo",
    targetArea: "Perundurai & Bhavani Blocks",
    title: {
      en: "URGENT: Foot & Mouth Disease (FMD) Outbreak Containment Notice",
      ta: "அவசரம்: கோமாரி நோய் (FMD) தடுப்பு மற்றும் பாதுகாப்பு எச்சரிக்கை",
      hi: "अति आवश्यक: खुरपका-मुंहपका (FMD) रोग प्रकोप नियंत्रण चेतावनी"
    },
    message: {
      en: "Confirmed cases of FMD detected in Perundurai East. Immediate 5km containment zone enforced. Movement of cattle prohibited. Emergency ring vaccination active. Report salivation or foot lesions to nearest Veterinary Hospital immediately.",
      ta: "பெருந்துறை கிழக்கு பகுதியில் கோமாரி நோய் உறுதி செய்யப்பட்டுள்ளது. 5 கி.மீ எல்லைக்குள் மாடுகள் இடமாற்றம் தடை செய்யப்பட்டுள்ளது. அவசர தடுப்பூசி பணி தொடங்கப்பட்டுள்ளது. வாயில் உமிழ்நீர் அல்லது கால் புண்கள் காணப்பட்டால் உடனே கால்நடை மருத்துவரை அணுகவும்.",
      hi: "पेरुंदुरई पूर्व क्षेत्र में खुरपका-मुंहपका (FMD) रोग की पुष्टि हुई है। 5 किमी का रोकथाम क्षेत्र लागू। मवेशियों की आवाजाही पर तत्काल रोक। आपातकालीन टीकाकरण जारी। लक्षण दिखने पर निकटतम पशु चिकित्सालय से संपर्क करें।"
    },
    suggestedChannels: ["SMS", "Farmer App", "IVR Call", "Panchayat Notice"]
  },
  {
    id: "ppr-warning",
    disease: "Peste des Petits Ruminants (PPR)",
    severity: "WARNING",
    species: "Goat & Sheep",
    targetArea: "Bhavani & Kavindapadi",
    title: {
      en: "ADVISORY: PPR Outbreak Risk in Small Ruminants",
      ta: "ஆலோசனை: ஆடுகளுக்கான பிபிஆர் (ஆட்டுக்கொல்லி) நோய் முன்னெச்சரிக்கை",
      hi: "परामर्श: बकरियों और भेड़ों में पीपीआर (PPR) रोग की चेतावनी"
    },
    message: {
      en: "Sporadic symptoms of PPR detected in goat herds in Bhavani block. Quarantine new animals for 14 days before mixing. Free vaccination available at local Veterinary Dispensaries.",
      ta: "பவானி வட்டாரத்தில் ஆடுகளுக்கு பிபிஆர் நோய் அறிகுறிகள் தென்படுகின்றன. புதிய ஆடுகளை 14 நாட்கள் தனிமைப்படுத்தவும். அருகிலுள்ள கால்நடை மருந்தகத்தில் இலவச தடுப்பூசி பெற்றுக்கொள்ளவும்.",
      hi: "भवानी ब्लॉक में बकरियों में पीपीआर रोग के लक्षण पाए गए हैं। नए पशुओं को 14 दिन अलग रखें। नजदीकी पशु औषधालय से निःशुल्क टीका लगवाएं।"
    },
    suggestedChannels: ["SMS", "Farmer App", "Panchayat Notice"]
  },
  {
    id: "anthrax-alert",
    disease: "Anthrax Suspect",
    severity: "CRITICAL",
    species: "All Livestock",
    targetArea: "Sathyamangalam Forest Fringe",
    title: {
      en: "CRITICAL BIOSECURITY: Anthrax Suspect in Forest Perimeter",
      ta: "முக்கிய உயிரியல் பாதுகாப்பு: சத்தியமங்கலம் வன எல்லை அடைப்பான் நோய் எச்சரிக்கை",
      hi: "गंभीर जैव सुरक्षा चेतावनी: सत्यमंगलम वन सीमा में एंथ्रेक्स संदिग्ध मामला"
    },
    message: {
      en: "Sudden death with dark uncoagulated blood discharge reported. DO NOT OPEN CARCASS. Deep burial with quicklime required under veterinary supervision. Keep grazing away from forest boundary.",
      ta: "திடீர் மரணம் மற்றும் இரத்தப்போக்கு ஏற்பட்டால் இறந்த உடலை திறக்க வேண்டாம். கால்நடை மருத்துவர் மேற்பார்வையில் சுண்ணக்கட்டியுடன் ஆழமாக புதைக்கவும். வன எல்லை பகுதியில் மேய்ச்சலை தவிர்க்கவும்.",
      hi: "रक्तस्राव के साथ अचानक मृत्यु होने पर शव को न खोलें। पशु चिकित्सक की देखरेख में चूने के साथ गहरा दफनाएं। वन सीमा पर चराई से बचें।"
    },
    suggestedChannels: ["SMS", "IVR Call", "Farmer App", "Panchayat Notice"]
  }
];
