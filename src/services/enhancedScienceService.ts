
interface ScienceKnowledge {
  [key: string]: {
    content: string;
    difficulty: 'basic' | 'intermediate' | 'advanced';
    keywords: string[];
    examples: string[];
    practicalApplications: string[];
  };
}

export class EnhancedScienceService {
  private scienceKnowledge: ScienceKnowledge;

  constructor() {
    this.initializeScienceKnowledge();
  }

  private initializeScienceKnowledge() {
    this.scienceKnowledge = {
      physics: {
        content: `# ⚛️ **Physics - प्राकृतिक नियमों का विज्ञान**

## **🌟 Fundamental Physics Concepts:**

### **⚡ Forces & Motion (बल और गति):**
- **Newton's First Law:** वस्तु विराम या गति में तब तक रहती है जब तक कोई बाहरी बल न लगे
- **Newton's Second Law:** F = ma (Force = mass × acceleration)
- **Newton's Third Law:** हर क्रिया की समान और विपरीत प्रतिक्रिया होती है

### **🔋 Energy & Power (ऊर्जा और शक्ति):**
- **Kinetic Energy:** KE = ½mv² (गतिशील वस्तु की ऊर्जा)
- **Potential Energy:** PE = mgh (स्थितिज ऊर्जा)
- **Conservation of Energy:** ऊर्जा न बनती है न नष्ट होती है, केवल रूप बदलती है

### **🌊 Waves & Sound (तरंग और ध्वनि):**
- **Wave Equation:** v = fλ (velocity = frequency × wavelength)
- **Sound Speed in Air:** ~343 m/s
- **Light Speed:** 3×10⁸ m/s (प्रकाश की गति)

### **⚡ Electricity & Magnetism:**
- **Ohm's Law:** V = IR (Voltage = Current × Resistance)
- **Power:** P = VI (Power = Voltage × Current)
- **Magnetic Field:** Moving charges create magnetic fields

## **🚗 Real-World Physics Applications:**
- **Cars:** Friction, momentum, energy conversion
- **Mobile Phones:** Electromagnetic waves, circuits
- **Solar Panels:** Photoelectric effect
- **Bridges:** Structural forces, resonance

## **🧮 Important Formulas:**
- **Distance:** s = ut + ½at²
- **Velocity:** v = u + at
- **Momentum:** p = mv
- **Work:** W = F × d × cos(θ)`,
        difficulty: 'intermediate',
        keywords: ['physics', 'force', 'energy', 'motion', 'newton', 'electricity', 'magnetism', 'waves'],
        examples: ['F=ma', 'conservation of energy', 'ohms law', 'wave equation'],
        practicalApplications: ['Engineering design', 'Technology development', 'Space exploration', 'Medical equipment']
      },

      chemistry: {
        content: `# 🧪 **Chemistry - पदार्थ और अभिक्रियाओं का विज्ञान**

## **🔬 Fundamental Chemistry Concepts:**

### **⚛️ Atomic Structure (परमाणु संरचना):**
- **Protons:** Positive charge (+1), nucleus में स्थित
- **Neutrons:** No charge (0), nucleus में स्थित  
- **Electrons:** Negative charge (-1), nucleus के चारों ओर चक्कर लगाते हैं
- **Atomic Number:** Protons की संख्या = Element की पहचान

### **📊 Periodic Table (आवर्त सारणी):**
- **Groups:** Vertical columns (समान गुण वाले elements)
- **Periods:** Horizontal rows (electron shells की संख्या)
- **Metals, Metalloids, Non-metals:** अलग-अलग properties

### **⚖️ Chemical Reactions (रासायनिक अभिक्रियाएं):**
- **Synthesis:** A + B → AB (संयोजन अभिक्रिया)
- **Decomposition:** AB → A + B (अपघटन अभिक्रिया)
- **Displacement:** A + BC → AC + B (विस्थापन अभिक्रिया)
- **Redox:** Reduction + Oxidation (अपचयन + उपचयन)

### **⚗️ Acids, Bases & Salts:**
- **Acids:** pH < 7 (HCl, H₂SO₄, HNO₃)
- **Bases:** pH > 7 (NaOH, KOH, Ca(OH)₂)
- **Neutral:** pH = 7 (Pure water)
- **Salt Formation:** Acid + Base → Salt + Water

### **💨 States of Matter (पदार्थ की अवस्थाएं):**
- **Solid:** Fixed shape और volume
- **Liquid:** Fixed volume, no fixed shape
- **Gas:** No fixed shape या volume
- **Plasma:** Ionized gas (सूर्य में पाया जाता है)

## **🏭 Industrial Applications:**
- **Petrochemicals:** Fuel, plastics, medicines
- **Fertilizers:** Crop production के लिए
- **Pharmaceuticals:** Drug development
- **Food Industry:** Preservatives, flavoring

## **🧬 Important Chemical Equations:**
- **Photosynthesis:** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
- **Respiration:** C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP
- **Water Formation:** 2H₂ + O₂ → 2H₂O
- **Salt Formation:** HCl + NaOH → NaCl + H₂O`,
        difficulty: 'intermediate',
        keywords: ['chemistry', 'atomic', 'periodic table', 'reactions', 'acids', 'bases', 'molecules'],
        examples: ['atomic structure', 'chemical equations', 'acid base reactions', 'periodic table'],
        practicalApplications: ['Medicine development', 'Environmental science', 'Materials engineering', 'Food technology']
      },

      biology: {
        content: `# 🧬 **Biology - जीवन विज्ञान**

## **🌱 Fundamental Biology Concepts:**

### **🔬 Cell Structure (कोशिका संरचना):**
- **Cell Membrane:** कोशिका की बाहरी सीमा, selective permeability
- **Nucleus:** कोशिका का control center, DNA stored here
- **Cytoplasm:** Cell के अंदर का liquid medium
- **Mitochondria:** Energy production (ATP synthesis)
- **Ribosomes:** Protein synthesis करते हैं

### **🌿 Plant vs Animal Cells:**
**Plant Cells:**
- Cell Wall (cellulose से बनी)
- Chloroplasts (photosynthesis के लिए)  
- Large Central Vacuole (water storage)

**Animal Cells:**
- No cell wall
- Smaller vacuoles
- Centrosome (cell division में helpful)

### **🧪 Life Processes (जीवन प्रक्रियाएं):**

#### **Nutrition (पोषण):**
- **Autotrophs:** अपना भोजन बनाते हैं (plants)
- **Heterotrophs:** दूसरों का भोजन खाते हैं (animals)
- **Photosynthesis:** 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂

#### **Respiration (श्वसन):**
- **Aerobic:** Oxygen के साथ (38 ATP molecules)
- **Anaerobic:** Oxygen के बिना (2 ATP molecules)
- **Equation:** C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP

#### **Transportation:**
- **Plants:** Xylem (water), Phloem (food)
- **Animals:** Blood circulation, heart pumping

### **🧬 Genetics (आनुवंशिकता):**
- **DNA:** Genetic information storage
- **Genes:** Specific traits के लिए responsible
- **Chromosomes:** DNA + Proteins का bundle
- **Inheritance:** Parents से children में traits transfer

### **🌍 Evolution (विकास):**
- **Natural Selection:** Survival of the fittest
- **Adaptation:** Environment के अनुसार changes
- **Speciation:** नई species का formation

## **🏥 Medical Applications:**
- **Vaccines:** Disease prevention के लिए
- **Antibiotics:** Bacterial infections का treatment
- **Gene Therapy:** Genetic disorders का treatment
- **Biotechnology:** Medicine, agriculture में applications

## **🌿 Ecological Concepts:**
- **Food Chain:** Producer → Primary Consumer → Secondary Consumer
- **Ecosystem:** Living + Non-living components
- **Biodiversity:** Species variety और importance
- **Conservation:** Natural resources को protect करना`,
        difficulty: 'intermediate',
        keywords: ['biology', 'cell', 'genetics', 'evolution', 'photosynthesis', 'respiration', 'ecosystem'],
        examples: ['cell structure', 'photosynthesis equation', 'genetic inheritance', 'food chain'],
        practicalApplications: ['Medical research', 'Agricultural improvement', 'Environmental conservation', 'Biotechnology']
      }
    };
  }

  getScienceAnswer(question: string, scienceSubject: string): string {
    const lowerQuestion = question.toLowerCase();
    
    // Get specific science subject knowledge
    const subjectData = this.scienceKnowledge[scienceSubject];
    
    if (subjectData) {
      // Check if question matches any keywords
      const hasMatchingKeywords = subjectData.keywords.some(keyword => 
        lowerQuestion.includes(keyword)
      );
      
      if (hasMatchingKeywords) {
        return this.formatScienceResponse(subjectData.content, scienceSubject, question);
      }
    }
    
    // Return general science response if no specific match
    return this.getGeneralScienceResponse(question, scienceSubject);
  }

  private formatScienceResponse(content: string, scienceSubject: string, question: string): string {
    const subjectEmojis = {
      physics: '⚛️',
      chemistry: '🧪', 
      biology: '🧬'
    };

    const emoji = subjectEmojis[scienceSubject as keyof typeof subjectEmojis] || '🔬';
    
    return `${content}

---

## **🎯 आपके प्रश्न के संदर्भ में:**
आपने ${scienceSubject} के बारे में पूछा है। ऊपर दी गई जानकारी आपके प्रश्न से directly related है।

## **💡 Study Tips for ${scienceSubject.charAt(0).toUpperCase() + scienceSubject.slice(1)}:**
- **Regular practice** करें और concepts को real examples से समझें
- **Experiments** और **observations** पर focus करें
- **Formula और equations** को daily life से connect करें
- **Diagrams** draw करके concepts को visualize करें

**क्या आप इस topic पर कोई specific doubt clear करना चाहते हैं? मैं detailed explanation दूंगा! ${emoji}**`;
  }

  private getGeneralScienceResponse(question: string, scienceSubject: string): string {
    const subjectNames = {
      physics: 'Physics (भौतिक विज्ञान)',
      chemistry: 'Chemistry (रसायन विज्ञान)',
      biology: 'Biology (जीव विज्ञान)'
    };

    const subjectName = subjectNames[scienceSubject as keyof typeof subjectNames] || 'Science';

    return `# 🔬 **${subjectName} Expert Response**

## **आपके प्रश्न का विश्लेषण:**
आपने ${subjectName} के बारे में पूछा है। यह एक fascinating subject है जो हमारे daily life से deeply connected है।

## **🎯 ${scienceSubject.charAt(0).toUpperCase() + scienceSubject.slice(1)} में Key Areas:**

${scienceSubject === 'physics' ? `
### **Core Physics Topics:**
- **Mechanics:** Motion, forces, energy
- **Thermodynamics:** Heat और temperature
- **Electromagnetism:** Electricity और magnetism  
- **Optics:** Light और vision
- **Modern Physics:** Quantum mechanics, relativity
` : ''}

${scienceSubject === 'chemistry' ? `
### **Core Chemistry Topics:**
- **Atomic Structure:** Atoms और molecules
- **Chemical Bonding:** Elements कैसे combine होते हैं
- **Chemical Reactions:** Reactants → Products
- **Organic Chemistry:** Carbon-based compounds
- **Analytical Chemistry:** Composition analysis
` : ''}

${scienceSubject === 'biology' ? `
### **Core Biology Topics:**
- **Cell Biology:** Life की basic unit
- **Genetics:** Heredity और variation
- **Ecology:** Organisms और environment
- **Physiology:** Life processes
- **Evolution:** Species development
` : ''}

## **🧪 Practical Learning Approach:**
- **Observe** everyday phenomena scientifically
- **Question** करें "Why" और "How" 
- **Experiment** करें safely
- **Connect** theory को practical applications से

**कृपया अपना specific ${subjectName} का question detail में बताएं। मैं comprehensive और easy-to-understand explanation दूंगा!**

---
*Enhanced Science AI - आपका dedicated ${subjectName} expert! 🚀*`;
  }

  getAllScienceTopics(): string[] {
    return Object.keys(this.scienceKnowledge);
  }

  getScienceKeywords(scienceSubject: string): string[] {
    return this.scienceKnowledge[scienceSubject]?.keywords || [];
  }
}

export const enhancedScienceService = new EnhancedScienceService();
