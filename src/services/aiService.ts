interface AIResponse {
  answer: string;
  error?: string;
}

interface KnowledgeBase {
  [key: string]: {
    [question: string]: string;
  };
}

export class AIService {
  private knowledgeBase: KnowledgeBase;

  constructor() {
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    this.knowledgeBase = {
      math: {
        'algebra': `**Algebra** एक गणित की शाखा है जो variables और constants के साथ काम करती है।

**मुख्य concepts:**
• Variables (x, y, z) - अज्ञात values
• Equations - समीकरण (जैसे 2x + 3 = 7)
• Inequalities - असमानताएं (जैसे x > 5)
• Functions - फंक्शन (जैसे f(x) = x²)

**Basic Operations:**
1. **Addition/Subtraction:** समान terms को जोड़ना/घटाना
2. **Multiplication:** Variables और coefficients का गुणा
3. **Division:** Terms को भाग करना
4. **Factoring:** Common factors निकालना

**Example Problem:**
Solve: 2x + 5 = 13
**Solution:**
• 2x + 5 = 13
• 2x = 13 - 5
• 2x = 8
• x = 4`,

        'geometry': `**Geometry** आकार, size, और स्थान के गुणों का अध्ययन है।

**Basic Shapes:**
• **Triangle:** 3 भुजाओं वाला आकार
  - Area = ½ × base × height
  - Perimeter = a + b + c
• **Square:** समान भुजाओं वाला चतुर्भुज
  - Area = side²
  - Perimeter = 4 × side
• **Circle:** वृत्त
  - Area = πr²
  - Circumference = 2πr

**Important Theorems:**
• **Pythagoras Theorem:** a² + b² = c²
• **Area of Triangle:** ½ × base × height`,

        'calculus': `**Calculus** change और motion का अध्ययन है।

**Main Branches:**
1. **Differential Calculus:** Rate of change (derivatives)
2. **Integral Calculus:** Area under curves (integrals)

**Basic Derivatives:**
• d/dx(x^n) = nx^(n-1)
• d/dx(sin x) = cos x
• d/dx(cos x) = -sin x
• d/dx(e^x) = e^x

**Basic Integrals:**
• ∫x^n dx = x^(n+1)/(n+1) + C
• ∫sin x dx = -cos x + C
• ∫cos x dx = sin x + C`
      },

      science: {
        'physics': `**Physics** प्रकृति और universe के fundamental laws का अध्ययन है।

**Main Branches:**
• **Mechanics:** Motion और forces
• **Thermodynamics:** Heat और energy
• **Electromagnetism:** Electric और magnetic phenomena
• **Optics:** Light की properties
• **Quantum Physics:** Atomic level phenomena

**Important Laws:**
• **Newton's Laws of Motion**
• **Law of Conservation of Energy**
• **Ohm's Law:** V = IR
• **Einstein's E = mc²**`,

        'chemistry': `**Chemistry** matter और उसके properties का अध्ययन है।

**Main Areas:**
• **Organic Chemistry:** Carbon compounds
• **Inorganic Chemistry:** Non-organic compounds
• **Physical Chemistry:** Chemical processes की physics
• **Analytical Chemistry:** Composition analysis

**Periodic Table:**
• Elements को atomic number के अनुसार arrange किया गया है
• Groups (vertical columns) में समान properties होती हैं
• Periods (horizontal rows) में electron shells बढ़ते हैं`,

        'biology': `**Biology** living organisms का अध्ययन है।

**Main Branches:**
• **Botany:** Plants का अध्ययन
• **Zoology:** Animals का अध्ययन
• **Microbiology:** Microscopic organisms
• **Genetics:** Heredity और genes
• **Ecology:** Environment में organisms का interaction

**Cell Structure:**
• **Cell Membrane:** Boundary layer
• **Nucleus:** Control center
• **Mitochondria:** Energy production
• **Ribosomes:** Protein synthesis`
      },

      english: {
        'grammar': `**English Grammar** के मुख्य components:

**Parts of Speech:**
• **Noun:** Person, place, thing (Ram, Delhi, book)
• **Verb:** Action words (run, eat, think)
• **Adjective:** Describing words (beautiful, big, smart)
• **Adverb:** Modify verbs (quickly, slowly, carefully)
• **Pronoun:** Replace nouns (he, she, it, they)

**Tenses:**
• **Present:** I eat, I am eating, I have eaten
• **Past:** I ate, I was eating, I had eaten  
• **Future:** I will eat, I will be eating, I will have eaten

**Sentence Structure:**
Subject + Verb + Object (SVO pattern)`,

        'writing': `**Effective Writing Tips:**

**Essay Structure:**
1. **Introduction:** Hook, background, thesis statement
2. **Body Paragraphs:** Topic sentence, evidence, explanation
3. **Conclusion:** Summarize points, restate thesis

**Writing Process:**
1. **Planning:** Brainstorm ideas
2. **Drafting:** Write first version
3. **Revising:** Improve content and structure
4. **Editing:** Fix grammar and spelling

**Common Mistakes to Avoid:**
• Run-on sentences
• Subject-verb disagreement
• Misplaced apostrophes
• Wrong word usage (there/their/they're)`
      },

      reasoning: {
        'logical_thinking': `**Logical Thinking** systematic और rational approach है problems solve करने के लिए।

**Types of Reasoning:**
• **Deductive:** General से specific (All birds fly, sparrow is bird, so sparrow flies)
• **Inductive:** Specific से general (Many cats are black, so cats are generally black)
• **Abductive:** Best explanation (Car won't start, probably battery is dead)

**Problem-Solving Steps:**
1. **Understand** the problem clearly
2. **Identify** key information
3. **Consider** multiple solutions
4. **Evaluate** each option
5. **Choose** best solution
6. **Implement** and verify`,

        'critical_thinking': `**Critical Thinking** information को objectively analyze करने की skill है।

**Key Elements:**
• **Analysis:** Break down complex information
• **Evaluation:** Judge credibility और relevance
• **Inference:** Draw reasonable conclusions
• **Interpretation:** Understand meaning और significance

**Questions to Ask:**
• What evidence supports this?
• What are alternative viewpoints?
• What assumptions are being made?
• What are potential consequences?`
      },

      geography: {
        'world_geography': `**World Geography** पृथ्वी की physical और human features का अध्ययन है।

**Continents:**
• **Asia:** Largest continent, 60% world population
• **Africa:** Cradle of humanity, Sahara desert
• **North America:** USA, Canada, Mexico
• **South America:** Amazon rainforest, Andes mountains
• **Europe:** Small but influential continent
• **Australia/Oceania:** Island continent
• **Antarctica:** Frozen continent, no permanent population

**Major Oceans:**
• Pacific (largest), Atlantic, Indian, Arctic, Southern

**Climate Zones:**
• Tropical, Temperate, Polar, Arid`,

        'indian_geography': `**भारत का भूगोल:**

**Physical Features:**
• **Himalayas:** उत्तर में, highest peaks
• **Ganges Plain:** fertile agricultural land
• **Deccan Plateau:** peninsular India
• **Western Ghats:** monsoon winds को रोकते हैं
• **Eastern Ghats:** lower elevation

**Major Rivers:**
• **Ganga:** holy river, longest in India
• **Yamuna:** tributary of Ganga
• **Brahmaputra:** flows through Assam
• **Narmada:** westward flowing
• **Godavari:** longest peninsular river

**States और Capitals:**
• Delhi (New Delhi), Maharashtra (Mumbai), Karnataka (Bangalore)`
      },

      knowledge: {
        'history': `**World History के मुख्य periods:**

**Ancient Civilizations:**
• **Indus Valley:** 3300-1300 BCE, well-planned cities
• **Egyptian:** Pyramids, mummies, pharaohs
• **Greek:** Democracy, philosophy, Olympics
• **Roman:** Empire, law system, engineering

**Medieval Period:**
• **Islamic Golden Age:** 8th-13th century
• **European Middle Ages:** Feudalism, Crusades
• **Renaissance:** 14th-17th century, art और science revival

**Modern Era:**
• **Industrial Revolution:** 1760-1840
• **World Wars:** 1914-1918, 1939-1945
• **Digital Age:** Computer और internet revolution`,

        'current_affairs': `**Current Affairs में important topics:**

**Technology:**
• **Artificial Intelligence:** Machine learning, automation
• **Space Exploration:** Mars missions, private space companies
• **Renewable Energy:** Solar, wind power growth

**Global Issues:**
• **Climate Change:** Global warming, environmental protection
• **Healthcare:** Pandemic preparedness, medical advances
• **Economy:** Digital payments, cryptocurrency

**India Specific:**
• **Digital India:** Technology adoption
• **Make in India:** Manufacturing boost
• **Startup Ecosystem:** Innovation और entrepreneurship`
      }
    };
  }

  setApiKey(apiKey: string) {
    // Not needed for offline AI, but keeping for compatibility
    console.log("Offline AI doesn't require API key");
  }

  async answerQuestion(question: string, subject: string = 'general'): Promise<AIResponse> {
    console.log("Processing question with offline AI:", question, subject);
    
    try {
      // Simulate thinking time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const answer = this.generateIntelligentAnswer(question, subject);
      
      return {
        answer: this.formatAnswer(answer, subject, question)
      };
    } catch (error) {
      console.error('Offline AI Error:', error);
      return {
        answer: "क्षमा करें, मैं अभी आपके प्रश्न का उत्तर देने में असमर्थ हूं। कृपया प्रश्न को अलग तरीके से पूछने की कोशिश करें।",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generateIntelligentAnswer(question: string, subject: string): string {
    const lowerQuestion = question.toLowerCase();
    
    // Subject-specific knowledge lookup
    if (this.knowledgeBase[subject]) {
      const subjectKnowledge = this.knowledgeBase[subject];
      
      // Find best matching topic
      const matchingTopic = this.findBestMatch(lowerQuestion, Object.keys(subjectKnowledge));
      if (matchingTopic && subjectKnowledge[matchingTopic]) {
        return subjectKnowledge[matchingTopic];
      }
    }

    // Math problem solver
    if (subject === 'math' || this.containsMathKeywords(lowerQuestion)) {
      return this.solveMathProblem(question);
    }

    // Science question handler
    if (subject === 'science' || this.containsScienceKeywords(lowerQuestion)) {
      return this.handleScienceQuestion(question);
    }

    // English language helper
    if (subject === 'english' || this.containsEnglishKeywords(lowerQuestion)) {
      return this.handleEnglishQuestion(question);
    }

    // General reasoning
    if (subject === 'reasoning' || this.containsReasoningKeywords(lowerQuestion)) {
      return this.handleReasoningQuestion(question);
    }

    // Geography
    if (subject === 'geography' || this.containsGeographyKeywords(lowerQuestion)) {
      return this.handleGeographyQuestion(question);
    }

    // General knowledge fallback
    return this.handleGeneralQuestion(question);
  }

  private findBestMatch(question: string, topics: string[]): string | null {
    let bestMatch = null;
    let highestScore = 0;

    for (const topic of topics) {
      const score = this.calculateSimilarity(question, topic);
      if (score > highestScore && score > 0.3) {
        highestScore = score;
        bestMatch = topic;
      }
    }

    return bestMatch;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    let commonWords = 0;

    words1.forEach(word => {
      if (words2.some(w => w.includes(word) || word.includes(w))) {
        commonWords++;
      }
    });

    return commonWords / Math.max(words1.length, words2.length);
  }

  private containsMathKeywords(question: string): boolean {
    const mathKeywords = ['solve', 'calculate', 'equation', 'algebra', 'geometry', 'calculus', 'derivative', 'integral', 'limit', 'function', '+', '-', '*', '/', '=', 'x', 'y'];
    return mathKeywords.some(keyword => question.includes(keyword));
  }

  private containsScienceKeywords(question: string): boolean {
    const scienceKeywords = ['physics', 'chemistry', 'biology', 'atom', 'molecule', 'cell', 'force', 'energy', 'reaction', 'evolution'];
    return scienceKeywords.some(keyword => question.includes(keyword));
  }

  private containsEnglishKeywords(question: string): boolean {
    const englishKeywords = ['grammar', 'sentence', 'verb', 'noun', 'adjective', 'writing', 'essay', 'paragraph', 'tense'];
    return englishKeywords.some(keyword => question.includes(keyword));
  }

  private containsReasoningKeywords(question: string): boolean {
    const reasoningKeywords = ['logical', 'reasoning', 'think', 'analyze', 'problem', 'solution', 'why', 'how', 'explain'];
    return reasoningKeywords.some(keyword => question.includes(keyword));
  }

  private containsGeographyKeywords(question: string): boolean {
    const geoKeywords = ['country', 'city', 'river', 'mountain', 'continent', 'capital', 'map', 'location', 'climate'];
    return geoKeywords.some(keyword => question.includes(keyword));
  }

  private solveMathProblem(question: string): string {
    // Basic equation solver
    if (question.includes('=') && question.includes('x')) {
      return `**Math Problem Solution:**

मैं आपकी math problem solve करने में help कर सकता हूं।

**General Approach:**
1. **Identify** the type of equation
2. **Isolate** the variable (x, y, etc.)
3. **Perform** operations on both sides
4. **Check** your answer

**Common Types:**
• **Linear Equations:** ax + b = c
• **Quadratic Equations:** ax² + bx + c = 0
• **System of Equations:** Multiple equations with multiple variables

**Example:**
2x + 5 = 13
**Step 1:** Subtract 5 from both sides
2x = 8
**Step 2:** Divide both sides by 2
x = 4

कृपया अपना specific equation share करें detailed solution के लिए।`;
    }

    return `**Mathematics Help:**

मैं आपके math questions का answer दे सकता हूं।

**Popular Topics:**
• **Algebra:** Variables और equations
• **Geometry:** Shapes और measurements  
• **Trigonometry:** Angles और triangles
• **Calculus:** Derivatives और integrals
• **Statistics:** Data analysis

**Problem-Solving Tips:**
1. **समझें** कि question क्या पूछ रहा है
2. **लिखें** जो information दी गई है
3. **चुनें** appropriate formula या method
4. **Calculate** step by step
5. **Check** your answer

कृपया अपना specific math problem बताएं detailed help के लिए।`;
  }

  private handleScienceQuestion(question: string): string {
    return `**Science Question Answer:**

**Physics, Chemistry, और Biology** की fascinating world में आपका स्वागत है!

**Key Scientific Concepts:**
• **Matter:** Everything is made of atoms
• **Energy:** Can't be created or destroyed, only transformed
• **Evolution:** Life forms change over time
• **Chemical Reactions:** Atoms rearrange to form new compounds

**Scientific Method:**
1. **Observation:** देखना और notice करना
2. **Question:** क्या, क्यों, कैसे पूछना
3. **Hypothesis:** Educated guess बनाना
4. **Experiment:** Test करना
5. **Analysis:** Results को समझना
6. **Conclusion:** Final answer देना

**Popular Science Topics:**
• **Space:** Stars, planets, galaxies
• **Environment:** Climate, ecosystems
• **Human Body:** Organs, systems
• **Technology:** How things work

आपका specific science question क्या है? मैं detailed explanation दे सकूंगा।`;
  }

  private handleEnglishQuestion(question: string): string {
    return `**English Language Help:**

**Grammar Fundamentals:**
• **Sentence Structure:** Subject + Verb + Object
• **Tenses:** Present, Past, Future में कब कौन सा use करें
• **Parts of Speech:** Noun, verb, adjective, आदि

**Writing Skills:**
• **Paragraph Structure:** Topic sentence, supporting details, conclusion
• **Essay Writing:** Introduction, body, conclusion
• **Punctuation:** Commas, periods, apostrophes की सही जगह

**Common Mistakes:**
• Subject-verb agreement errors
• Wrong tense usage  
• Confusing words (there/their/they're)
• Run-on sentences

**Tips to Improve:**
1. **Read** regularly to expand vocabulary
2. **Practice** writing daily
3. **Grammar** rules को समझें
4. **Speak** English confidently

आपका specific English question क्या है? Grammar, writing, या vocabulary के बारे में पूछिए।`;
  }

  private handleReasoningQuestion(question: string): string {
    return `**Logical Reasoning और Critical Thinking:**

**Problem-Solving Approach:**
1. **Define** the problem clearly
2. **Gather** all relevant information
3. **Consider** multiple perspectives
4. **Analyze** pros and cons
5. **Make** informed decision
6. **Evaluate** results

**Types of Logical Reasoning:**
• **Deductive:** General rule से specific conclusion
• **Inductive:** Specific observations से general pattern
• **Analogical:** Similarities के based पर reasoning

**Critical Thinking Questions:**
• What evidence supports this claim?
• Are there alternative explanations?
• What assumptions are being made?
• What are potential consequences?

**Reasoning Puzzles:**
• Pattern recognition
• Syllogism problems  
• Cause and effect relationships
• Logical sequences

आपका specific reasoning problem क्या है? मैं step-by-step solution provide करूंगा।`;
  }

  private handleGeographyQuestion(question: string): string {
    return `**Geography Knowledge:**

**World Geography:**
• **7 Continents:** Asia, Africa, North America, South America, Antarctica, Europe, Australia
• **5 Oceans:** Pacific, Atlantic, Indian, Arctic, Southern
• **Major Mountain Ranges:** Himalayas, Andes, Rockies, Alps

**Indian Geography:**
• **28 States और 8 Union Territories**
• **Major Rivers:** Ganga, Yamuna, Brahmaputra, Narmada
• **Climate Zones:** Tropical, arid, temperate
• **Natural Resources:** Coal, iron ore, petroleum

**Physical Geography:**
• **Landforms:** Mountains, plateaus, plains
• **Water Bodies:** Rivers, lakes, seas
• **Climate Patterns:** Monsoons, seasons

**Human Geography:**  
• **Population Distribution:** Where people live
• **Cities और Towns:** Urban development
• **Economic Activities:** Agriculture, industry, services

आपका geography question specific कौन सा topic के बारे में है? Countries, rivers, mountains, या कुछ और?`;
  }

  private handleGeneralQuestion(question: string): string {
    return `**General Knowledge Answer:**

यह एक interesting question है! मैं आपकी help करने की कोशिश करूंगा।

**Knowledge Categories में से यह question शायद relate करता है:**

• **History:** Past events और civilizations
• **Current Affairs:** Recent happenings  
• **Technology:** Modern innovations
• **Culture:** Traditions और practices
• **Economics:** Money, trade, markets
• **Politics:** Government और policies

**General Problem-Solving Approach:**
1. **Break down** complex questions into smaller parts
2. **Use** logical reasoning
3. **Consider** multiple viewpoints
4. **Look for** patterns और connections
5. **Apply** common sense

**Research Tips:**
• Check multiple reliable sources
• Look for recent और updated information
• Consider context और background
• Verify facts before believing

कृपया अपना question more specific करें ताकि मैं better और detailed answer दे सकूं। आप किस particular aspect के बारे में जानना चाहते हैं?`;
  }

  private formatAnswer(answer: string, subject: string, question: string): string {
    const timestamp = new Date().toLocaleString('hi-IN');
    
    let formattedAnswer = `${answer}\n\n---\n`;
    
    // Add subject-specific tips
    const tips = {
      math: "**Math Tip:** हमेशा अपना work step-by-step show करें और answer को verify करें।",
      science: "**Science Tip:** Experiments और observations से concepts को relate करें।", 
      english: "**English Tip:** Regular reading और writing practice से improvement होगी।",
      reasoning: "**Reasoning Tip:** हर conclusion के लिए logical evidence देखें।",
      geography: "**Geography Tip:** Maps और atlases का use करके visual learning करें।",
      knowledge: "**Learning Tip:** Different sources से information cross-check करें।"
    };

    formattedAnswer += tips[subject as keyof typeof tips] || tips.knowledge;
    formattedAnswer += `\n\n*यह offline AI द्वारा generated intelligent response है। कोई और questions हों तो बेझिझक पूछें!*`;
    formattedAnswer += `\n📅 ${timestamp}`;
    
    return formattedAnswer;
  }
}

export const aiService = new AIService();
