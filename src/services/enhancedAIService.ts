
interface AIResponse {
  answer: string;
  error?: string;
  confidence: number;
  relatedTopics: string[];
  followUpQuestions: string[];
}

interface KnowledgeBase {
  [key: string]: {
    [question: string]: {
      content: string;
      difficulty: 'basic' | 'intermediate' | 'advanced';
      keywords: string[];
      examples: string[];
    };
  };
}

export class EnhancedAIService {
  private knowledgeBase: KnowledgeBase;
  private conversationHistory: Array<{question: string; answer: string; timestamp: Date}> = [];

  constructor() {
    this.initializeEnhancedKnowledgeBase();
  }

  private initializeEnhancedKnowledgeBase() {
    this.knowledgeBase = {
      math: {
        'algebra_basics': {
          content: `# 📚 **Algebra - गणित की आधारभूत शाखा**

## **मुख्य अवधारणाएं (Core Concepts):**

### 🔢 **Variables (चर):**
- **x, y, z** - अज्ञात मान (Unknown values)
- **Constants** - स्थिर मान जैसे 5, 10, π

### ⚖️ **Equations (समीकरण):**
- **Linear:** ax + b = c
- **Quadratic:** ax² + bx + c = 0
- **System:** Multiple equations एक साथ

## **🎯 Problem Solving Steps:**
1. **समझें** - Problem को ध्यान से पढ़ें
2. **पहचानें** - कौन सा variable find करना है
3. **Setup** - Equation बनाएं
4. **Solve** - Step by step हल करें
5. **Check** - Answer को verify करें

## **💡 Practical Examples:**

### **Example 1:** Simple Linear
**Problem:** 2x + 5 = 13
**Solution:**
- 2x + 5 = 13
- 2x = 13 - 5 = 8
- x = 8 ÷ 2 = 4
**Answer:** x = 4

### **Example 2:** Word Problem
**Problem:** राम के पास करीम से 5 रुपये ज्यादा हैं। दोनों के पास कुल 25 रुपये हैं।
**Solution:**
- राम के पास = x + 5
- करीम के पास = x
- Total: (x + 5) + x = 25
- 2x + 5 = 25
- 2x = 20
- x = 10
**Answer:** करीम के पास 10, राम के पास 15 रुपये

## **🔍 Advanced Topics:**
- **Factoring:** (x + 2)(x + 3) = x² + 5x + 6
- **Completing Square:** x² + 6x + 9 = (x + 3)²
- **Quadratic Formula:** x = (-b ± √(b² - 4ac)) / 2a

## **📈 Real-World Applications:**
- **Business:** Profit/Loss calculations
- **Engineering:** Design formulas
- **Science:** Physics equations
- **Daily Life:** Shopping discounts, loan calculations`,
          difficulty: 'basic',
          keywords: ['algebra', 'variable', 'equation', 'solve', 'linear'],
          examples: ['2x + 5 = 13', 'x² - 4 = 0', 'system of equations']
        },

        'geometry_fundamentals': {
          content: `# 📐 **Geometry - आकार और स्थान का विज्ञान**

## **🔺 Basic Shapes (मूलभूत आकृतियां):**

### **Triangle (त्रिभुज):**
- **Area = ½ × base × height**
- **Perimeter = a + b + c**
- **Types:** Equilateral, Isosceles, Scalene

### **Rectangle (आयत):**
- **Area = length × width**
- **Perimeter = 2(l + w)**

### **Circle (वृत्त):**
- **Area = πr²**
- **Circumference = 2πr**
- **π ≈ 3.14159**

## **🎯 Important Theorems:**

### **Pythagoras Theorem:**
**a² + b² = c²** (Right triangle में)

**Example:**
- एक triangle की भुजाएं 3, 4, और 5 cm हैं
- 3² + 4² = 9 + 16 = 25 = 5²
- यह एक right triangle है!

## **📏 Measurement Units:**
- **Length:** mm, cm, m, km
- **Area:** cm², m², hectare
- **Volume:** cm³, liter, m³

## **🏗️ Practical Applications:**
- **Construction:** Building measurements
- **Art & Design:** Proportions
- **Navigation:** Distance calculations
- **Sports:** Field dimensions`,
          difficulty: 'basic',
          keywords: ['geometry', 'triangle', 'circle', 'area', 'perimeter', 'pythagoras'],
          examples: ['area of triangle', 'pythagorean theorem', 'circle circumference']
        }
      },

      science: {
        'physics_basics': {
          content: `# 🔬 **Physics - प्रकृति के नियमों का अध्ययन**

## **⚡ Fundamental Forces:**

### **1. Gravity (गुरुत्वाकर्षण):**
- **Formula:** F = mg
- **g = 9.8 m/s²** (Earth पर)
- **Applications:** Objects falling, planetary motion

### **2. Electromagnetic Force:**
- **Electricity:** Current, Voltage, Resistance
- **Magnetism:** North-South poles
- **Light:** Electromagnetic waves

## **🚗 Motion & Mechanics:**

### **Newton's Laws:**
1. **First Law:** Object at rest stays at rest (Inertia)
2. **Second Law:** F = ma (Force = mass × acceleration)
3. **Third Law:** Every action has equal opposite reaction

### **Key Formulas:**
- **Speed = Distance/Time**
- **Acceleration = Change in velocity/Time**
- **Kinetic Energy = ½mv²**
- **Potential Energy = mgh**

## **💡 Energy & Power:**

### **Types of Energy:**
- **Kinetic:** Moving objects
- **Potential:** Stored energy
- **Chemical:** Batteries, food
- **Nuclear:** Atoms
- **Solar:** Sun's radiation

### **Conservation Law:**
Energy cannot be created or destroyed, only transformed!

## **🌊 Waves & Sound:**
- **Sound Speed:** ~343 m/s in air
- **Light Speed:** 3×10⁸ m/s
- **Frequency × Wavelength = Speed**

## **🔬 Modern Physics:**
- **Atoms:** Protons, neutrons, electrons
- **Quantum:** Energy in packets
- **Relativity:** E = mc²

## **📱 Daily Life Applications:**
- **Smartphones:** Electricity, magnetism, waves
- **Cars:** Mechanics, combustion
- **Weather:** Pressure, temperature
- **Cooking:** Heat transfer`,
          difficulty: 'intermediate',
          keywords: ['physics', 'force', 'energy', 'motion', 'newton', 'gravity'],
          examples: ['F=ma', 'conservation of energy', 'wave equation']
        }
      },

      english: {
        'grammar_mastery': {
          content: `# 📖 **English Grammar - भाषा की संरचना**

## **🏗️ Sentence Structure:**

### **Basic Pattern:**
**Subject + Verb + Object (SVO)**

**Examples:**
- **I** (S) **eat** (V) **food** (O)
- **She** (S) **reads** (V) **books** (O)
- **They** (S) **play** (V) **cricket** (O)

## **📝 Parts of Speech:**

### **1. Noun (संज्ञा):**
- **Person:** Ram, teacher, doctor
- **Place:** Delhi, school, market
- **Thing:** book, car, phone
- **Idea:** love, happiness, freedom

### **2. Verb (क्रिया):**
- **Action:** run, jump, eat, write
- **Being:** is, am, are, was, were
- **Helping:** can, will, should, must

### **3. Adjective (विशेषण):**
- **Describing nouns:** beautiful, big, smart
- **Position:** before noun या after linking verb

### **4. Adverb (क्रिया विशेषण):**
- **Modify verbs:** quickly, slowly, carefully
- **Usually end in -ly**

## **⏰ Tenses (काल):**

### **Present Tense:**
- **Simple:** I eat rice daily
- **Continuous:** I am eating rice now
- **Perfect:** I have eaten rice

### **Past Tense:**
- **Simple:** I ate rice yesterday
- **Continuous:** I was eating rice
- **Perfect:** I had eaten rice

### **Future Tense:**
- **Simple:** I will eat rice tomorrow
- **Continuous:** I will be eating rice
- **Perfect:** I will have eaten rice

## **❌ Common Mistakes:**

### **Subject-Verb Agreement:**
- **Correct:** He goes to school
- **Wrong:** He go to school

### **Article Usage:**
- **A/An:** Before singular countable nouns
- **The:** Specific nouns

### **Prepositions:**
- **In:** months, years, cities
- **On:** days, dates, surfaces
- **At:** specific times, places

## **✍️ Writing Tips:**
1. **Keep sentences clear and simple**
2. **Use active voice when possible**
3. **Check subject-verb agreement**
4. **Proofread for spelling and punctuation**

## **📚 Practice Exercises:**
- **Daily reading:** newspapers, stories
- **Writing practice:** diary, essays
- **Speaking:** conversations, presentations
- **Listening:** English movies, songs`,
          difficulty: 'basic',
          keywords: ['grammar', 'tense', 'noun', 'verb', 'sentence', 'english'],
          examples: ['subject verb object', 'present tense', 'past tense']
        }
      },

      reasoning: {
        'logical_thinking_advanced': {
          content: `# 🧠 **Logical Reasoning - तर्कशील चिंतन**

## **🎯 Problem-Solving Framework:**

### **IDEAL Method:**
1. **I**dentify the problem clearly
2. **D**efine possible solutions
3. **E**xamine alternatives
4. **A**ct on best solution
5. **L**ook back and learn

## **🔍 Types of Reasoning:**

### **1. Deductive Reasoning (निगमनात्मक):**
- **General → Specific**
- **Example:**
  - All birds can fly (General rule)
  - Sparrow is a bird (Specific case)
  - Therefore, sparrow can fly (Conclusion)

### **2. Inductive Reasoning (आगमनात्मक):**
- **Specific → General**
- **Example:**
  - Sun rises in east today
  - Sun rose in east yesterday
  - Sun always rises in east (Pattern)

### **3. Abductive Reasoning (अपहरणात्मक):**
- **Best Explanation**
- **Example:**
  - Car won't start
  - Battery might be dead (Most likely cause)

## **🧩 Critical Thinking Skills:**

### **Analysis Questions:**
- **What is the evidence?**
- **Are there alternative explanations?**
- **What assumptions are being made?**
- **What are the consequences?**
- **How reliable is the source?**

### **Logical Fallacies to Avoid:**
- **Ad Hominem:** Attacking person, not argument
- **Straw Man:** Misrepresenting opponent's position
- **False Dilemma:** Only two options when more exist
- **Hasty Generalization:** Too small sample size

## **🔢 Mathematical Logic:**

### **Syllogisms:**
- **Major Premise:** All A are B
- **Minor Premise:** C is A
- **Conclusion:** Therefore, C is B

### **Truth Tables:**
- **AND:** Both must be true
- **OR:** At least one must be true
- **NOT:** Opposite of given statement

## **🎲 Probability & Statistics:**
- **Probability = Favorable outcomes / Total outcomes**
- **Mean, Median, Mode**
- **Correlation vs Causation**

## **💡 Practical Applications:**

### **Decision Making:**
- **List pros and cons**
- **Consider long-term consequences**
- **Gather relevant information**
- **Avoid emotional bias**

### **Problem Solving at Work:**
- **Break complex problems into smaller parts**
- **Use data and evidence**
- **Consider multiple perspectives**
- **Test solutions before full implementation**

## **🧪 Scientific Method:**
1. **Observation**
2. **Question**
3. **Hypothesis**
4. **Experiment**
5. **Analysis**
6. **Conclusion**

## **📈 Improving Logic Skills:**
- **Practice puzzles and riddles**
- **Read diverse perspectives**
- **Question your own beliefs**
- **Learn from mistakes**
- **Discuss ideas with others**`,
          difficulty: 'advanced',
          keywords: ['logic', 'reasoning', 'critical thinking', 'problem solving', 'deductive', 'inductive'],
          examples: ['deductive reasoning', 'syllogism', 'critical analysis']
        }
      }
    };
  }

  async answerQuestion(question: string, subject: string = 'general'): Promise<AIResponse> {
    console.log("Enhanced AI processing question:", question, "in subject:", subject);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Thinking time
      
      const analysis = this.analyzeQuestion(question, subject);
      const answer = this.generateEnhancedAnswer(question, subject, analysis);
      const relatedTopics = this.findRelatedTopics(question, subject);
      const followUpQuestions = this.generateFollowUpQuestions(question, subject);
      
      // Store in conversation history
      this.conversationHistory.push({
        question,
        answer,
        timestamp: new Date()
      });
      
      return {
        answer: this.formatEnhancedAnswer(answer, subject, question, analysis),
        confidence: analysis.confidence,
        relatedTopics,
        followUpQuestions
      };
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      return {
        answer: "क्षमा करें, आपके प्रश्न को process करते समय technical issue आया। कृपया फिर से प्रयास करें।",
        error: error instanceof Error ? error.message : 'Unknown error',
        confidence: 0,
        relatedTopics: [],
        followUpQuestions: []
      };
    }
  }

  private analyzeQuestion(question: string, subject: string) {
    const lowerQuestion = question.toLowerCase();
    let confidence = 0.7;
    let difficulty: 'basic' | 'intermediate' | 'advanced' = 'basic';
    let questionType = 'general';
    
    // Analyze question complexity
    const complexWords = ['complex', 'advanced', 'detailed', 'comprehensive', 'analysis'];
    const basicWords = ['what', 'basic', 'simple', 'introduction'];
    
    if (complexWords.some(word => lowerQuestion.includes(word))) {
      difficulty = 'advanced';
      confidence = 0.8;
    } else if (basicWords.some(word => lowerQuestion.includes(word))) {
      difficulty = 'basic';
      confidence = 0.9;
    } else {
      difficulty = 'intermediate';
      confidence = 0.85;
    }
    
    // Determine question type
    if (lowerQuestion.includes('how')) questionType = 'procedural';
    else if (lowerQuestion.includes('why')) questionType = 'explanatory';
    else if (lowerQuestion.includes('what')) questionType = 'definitional';
    else if (lowerQuestion.includes('solve') || lowerQuestion.includes('calculate')) questionType = 'problem-solving';
    
    return { confidence, difficulty, questionType };
  }

  private generateEnhancedAnswer(question: string, subject: string, analysis: any): string {
    const lowerQuestion = question.toLowerCase();
    
    // Try to find specific knowledge first
    if (this.knowledgeBase[subject]) {
      for (const [topicKey, topicData] of Object.entries(this.knowledgeBase[subject])) {
        if (topicData.keywords.some(keyword => lowerQuestion.includes(keyword))) {
          return topicData.content;
        }
      }
    }
    
    // Subject-specific enhanced responses
    switch (subject) {
      case 'math':
        return this.generateMathAnswer(question, analysis);
      case 'science':
        return this.generateScienceAnswer(question, analysis);
      case 'english':
        return this.generateEnglishAnswer(question, analysis);
      case 'reasoning':
        return this.generateReasoningAnswer(question, analysis);
      default:
        return this.generateGeneralAnswer(question, analysis);
    }
  }

  private generateMathAnswer(question: string, analysis: any): string {
    return `# 🧮 **Mathematics Solution**

## **समस्या विश्लेषण (Problem Analysis):**
आपका प्रश्न mathematics से संबंधित है। आइए इसे step-by-step solve करते हैं।

## **🎯 Solution Approach:**

### **Step 1: समझना (Understanding)**
- पहले problem को clearly समझते हैं
- कौन सी information दी गई है
- क्या find करना है

### **Step 2: Planning**
- कौन सा formula या method use करना है
- किस approach से solve करना है

### **Step 3: Execution**
- Step by step calculation
- हर step को verify करना

### **Step 4: Verification**
- Answer को check करना
- Logic sense बनाता है या नहीं

## **💡 Math Tips:**
- **हमेशा units check करें**
- **Rough estimate करके verify करें**
- **Multiple methods से solve करके confirm करें**

## **📚 Related Concepts:**
गणित में practice बहुत जरूरी है। Regular practice से concepts clear होते हैं।

**क्या आप अपना specific math problem share कर सकते हैं? मैं detailed solution दूंगा।**`;
  }

  private generateScienceAnswer(question: string, analysis: any): string {
    return `# 🔬 **Science Explanation**

## **वैज्ञानिक विश्लेषण (Scientific Analysis):**
Science हमारे चारों ओर की दुनिया को समझने का तरीका है।

## **🌟 Key Scientific Principles:**

### **Observation (अवलोकन):**
- पहले clearly observe करते हैं
- Details पर ध्यान देते हैं
- Patterns identify करते हैं

### **Hypothesis (परिकल्पना):**
- Educated guess बनाते हैं
- Testable prediction करते हैं

### **Experimentation (प्रयोग):**
- Controlled experiments करते हैं
- Variables को control करते हैं
- Data collect करते हैं

### **Analysis (विश्लेषण):**
- Results को analyze करते हैं
- Conclusions draw करते हैं

## **🧬 Real-World Applications:**
Science सिर्फ textbook में नहीं है - यह हमारे daily life में everywhere है!

## **📱 Examples in Daily Life:**
- **Cooking:** Chemical reactions
- **Weather:** Physics principles  
- **Medicine:** Biology और chemistry
- **Technology:** Engineering applications

**आपका specific science question क्या है? मैं detailed scientific explanation दूंगा।**`;
  }

  private generateEnglishAnswer(question: string, analysis: any): string {
    return `# 📚 **English Language Help**

## **भाषा सीखने की यात्रा (Language Learning Journey):**

### **🎯 Focus Areas:**

#### **Grammar Foundation:**
- **Sentence structure** समझना
- **Tenses** की proper usage
- **Parts of speech** identify करना

#### **Vocabulary Building:**
- **Daily new words** सीखना  
- **Context** में words का use
- **Synonyms और antonyms**

#### **Communication Skills:**
- **Speaking** confidently
- **Writing** clearly
- **Listening** actively
- **Reading** comprehensively

## **💡 Learning Strategies:**

### **Daily Practice:**
- **15 minutes reading** English content
- **New words** in notebook लिखना
- **Speaking practice** with friends/family

### **Fun Methods:**
- **English movies** with subtitles
- **English songs** सुनना
- **Social media** in English
- **Games** in English

## **✍️ Writing Improvement:**
1. **Start simple** - short sentences
2. **Grammar check** करना
3. **Proofreading** habit बनाना
4. **Regular practice** करना

**आपका specific English doubt क्या है? Grammar, vocabulary, या writing के बारे में?**`;
  }

  private generateReasoningAnswer(question: string, analysis: any): string {
    return `# 🧠 **Logical Reasoning Guide**

## **तर्कशील सोच का विकास (Developing Logical Thinking):**

### **🎯 Critical Thinking Process:**

#### **Question Everything:**
- **Why** यह सही है?
- **How** यह work करता है?
- **What if** conditions अलग हों?

#### **Evidence-Based Thinking:**
- **Facts** और **opinions** में difference
- **Reliable sources** identify करना
- **Bias** को recognize करना

### **🔍 Problem-Solving Framework:**

#### **Step 1: Define Problem**
- **Clearly** problem को state करना
- **Assumptions** identify करना

#### **Step 2: Gather Information**  
- **Relevant data** collect करना
- **Multiple perspectives** consider करना

#### **Step 3: Generate Solutions**
- **Creative thinking** apply करना
- **Brainstorming** techniques use करना

#### **Step 4: Evaluate Options**
- **Pros और cons** list करना
- **Consequences** predict करना

#### **Step 5: Implement & Review**
- **Best solution** choose करना
- **Results** evaluate करना

## **🧩 Logical Puzzles Practice:**
Regular practice से logical thinking improve होती है।

**आपका specific reasoning problem क्या है? Logic puzzles, critical thinking, या decision making?**`;
  }

  private generateGeneralAnswer(question: string, analysis: any): string {
    return `# 🌟 **General Knowledge Response**

## **आपके प्रश्न का विश्लेषण (Question Analysis):**

मैं आपके प्रश्न को समझने की कोशिश कर रहा हूं। यह एक interesting topic है!

## **🔍 Comprehensive Approach:**

### **Multiple Perspectives:**
- **Historical** context देखना
- **Current** relevance समझना  
- **Future** implications consider करना

### **Practical Applications:**
- **Real-world** examples देना
- **Daily life** में कैसे useful है
- **Skills** development के लिए कैसे use करें

## **💡 Learning Strategy:**

### **Deep Understanding:**
- **Why** यह important है
- **How** यह work करता है
- **When** apply करना चाहिए

### **Critical Questions:**
- क्या यह **reliable** source से आया है?
- कया **evidence** support करता है?
- **Alternative viewpoints** क्या हैं?

## **🎯 Next Steps:**
आपकी curiosity अच्छी है! ज्ञान प्राप्त करने की यह journey continue रखें।

**कृपया अपना प्रश्न more specific करें ताकि मैं detailed और focused answer दे सकूं। किस particular aspect के बारे में जानना चाहते हैं?**`;
  }

  private findRelatedTopics(question: string, subject: string): string[] {
    const topics: string[] = [];
    
    switch (subject) {
      case 'math':
        topics.push('Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry');
        break;
      case 'science':
        topics.push('Physics', 'Chemistry', 'Biology', 'Earth Science', 'Astronomy');
        break;
      case 'english':
        topics.push('Grammar', 'Vocabulary', 'Writing', 'Literature', 'Communication');
        break;
      case 'reasoning':
        topics.push('Logic', 'Critical Thinking', 'Problem Solving', 'Decision Making');
        break;
      default:
        topics.push('General Knowledge', 'Current Affairs', 'History', 'Geography');
    }
    
    return topics.slice(0, 3);
  }

  private generateFollowUpQuestions(question: string, subject: string): string[] {
    const questions: string[] = [];
    
    switch (subject) {
      case 'math':
        questions.push(
          'क्या आप इसे अलग method से solve करना चाहेंगे?',
          'इस concept के real-world applications क्या हैं?',
          'Related math problems practice करना चाहेंगे?'
        );
        break;
      case 'science':
        questions.push(
          'इस phenomenon की scientific explanation चाहिए?',
          'Daily life में इसका application कैसे देखते हैं?',
          'Related experiments के बारे में जानना चाहेंगे?'
        );
        break;
      case 'english':
        questions.push(
          'Grammar rules और examples चाहिए?',
          'Writing skills improve करने के tips चाहिए?',
          'Vocabulary building techniques जानना चाहते हैं?'
        );
        break;
      default:
        questions.push(
          'इस topic पर और detail चाहिए?',
          'Related concepts के बारे में जानना चाहते हैं?',
          'Practical applications discuss करें?'
        );
    }
    
    return questions;
  }

  private formatEnhancedAnswer(answer: string, subject: string, question: string, analysis: any): string {
    const timestamp = new Date().toLocaleString('hi-IN');
    const confidenceText = analysis.confidence > 0.8 ? 'उच्च' : analysis.confidence > 0.6 ? 'मध्यम' : 'निम्न';
    
    let formattedAnswer = `${answer}\n\n---\n\n`;
    
    // Add confidence and metadata
    formattedAnswer += `**📊 Response Quality:**\n`;
    formattedAnswer += `• **Confidence Level:** ${confidenceText} (${Math.round(analysis.confidence * 100)}%)\n`;
    formattedAnswer += `• **Question Type:** ${analysis.questionType}\n`;
    formattedAnswer += `• **Difficulty Level:** ${analysis.difficulty}\n\n`;
    
    // Add subject-specific learning tips
    const learningTips = {
      math: '**🧮 Math Tip:** Practice regularly करें और concepts को real problems पर apply करें।',
      science: '**🔬 Science Tip:** Observation और experimentation से सीखें, theory को practice से connect करें।',
      english: '**📚 English Tip:** Daily reading और speaking practice से fluency improve होगी।',
      reasoning: '**🧠 Reasoning Tip:** Different perspectives से think करें और logic को question करें।',
      geography: '**🗺️ Geography Tip:** Maps use करें और current events को geography से relate करें।',
      knowledge: '**📖 Learning Tip:** Multiple sources से information verify करें और critical thinking apply करें।'
    };
    
    formattedAnswer += learningTips[subject as keyof typeof learningTips] || learningTips.knowledge;
    
    // Add encouragement and next steps
    formattedAnswer += `\n\n**🌟 Keep Learning:** आपकी curiosity बहुत अच्छी है! Continue asking questions और exploring करते रहें।`;
    
    formattedAnswer += `\n\n*Enhanced AI द्वारा comprehensive response। Quality और accuracy के लिए continuously improving।*`;
    formattedAnswer += `\n📅 ${timestamp}`;
    
    return formattedAnswer;
  }

  // Additional utility methods
  getConversationHistory() {
    return this.conversationHistory.slice(-5); // Last 5 interactions
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  setCustomKnowledge(subject: string, topic: string, content: any) {
    if (!this.knowledgeBase[subject]) {
      this.knowledgeBase[subject] = {};
    }
    this.knowledgeBase[subject][topic] = content;
  }
}

export const enhancedAIService = new EnhancedAIService();
