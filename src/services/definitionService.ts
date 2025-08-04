
interface Definition {
  term: string;
  meaning: string;
  context: string;
  examples: string[];
  relatedTerms: string[];
}

interface DefinitionResponse {
  definitions: Definition[];
  mainConcepts: string[];
  subject: string;
}

export class DefinitionService {
  private definitionsDatabase: { [key: string]: Definition } = {
    // Math definitions
    'algebra': {
      term: 'Algebra',
      meaning: 'गणित की वह शाखा जिसमें अज्ञात संख्याओं (variables) का उपयोग करके समीकरण हल किए जाते हैं',
      context: 'Mathematics - गणित',
      examples: ['2x + 5 = 13', 'y = mx + c', 'x² - 4 = 0'],
      relatedTerms: ['equation', 'variable', 'coefficient', 'linear']
    },
    'equation': {
      term: 'Equation (समीकरण)',
      meaning: 'दो mathematical expressions के बीच equality (=) का संबंध',
      context: 'Mathematics - गणित',
      examples: ['3x + 2 = 14', 'a² + b² = c²'],
      relatedTerms: ['algebra', 'solution', 'variable']
    },
    'variable': {
      term: 'Variable (चर)',
      meaning: 'अज्ञात मान को दर्शाने वाला symbol जैसे x, y, z',
      context: 'Mathematics - गणित',
      examples: ['x in 2x + 3', 'y in y = 5'],
      relatedTerms: ['algebra', 'coefficient', 'constant']
    },

    // Science definitions
    'photosynthesis': {
      term: 'Photosynthesis (प्रकाश संश्लेषण)',
      meaning: 'पौधों द्वारा सूर्य के प्रकाश की उपस्थिति में CO2 और पानी से भोजन बनाने की प्रक्रिया',
      context: 'Biology - जीव विज्ञान',
      examples: ['6CO2 + 6H2O → C6H12O6 + 6O2', 'पत्तियों में chlorophyll'],
      relatedTerms: ['chlorophyll', 'glucose', 'oxygen', 'carbon dioxide']
    },
    'gravity': {
      term: 'Gravity (गुरुत्वाकर्षण)',
      meaning: 'दो objects के बीच आकर्षण बल जो उनके mass के कारण होता है',
      context: 'Physics - भौतिक विज्ञान',
      examples: ['F = GMm/r²', 'Apple falling from tree', 'Moon orbiting Earth'],
      relatedTerms: ['force', 'mass', 'acceleration', 'newton']
    },
    'atom': {
      term: 'Atom (परमाणु)',
      meaning: 'तत्व की सबसे छोटी इकाई जो proton, neutron और electron से मिलकर बनी होती है',
      context: 'Chemistry - रसायन विज्ञान',
      examples: ['Hydrogen atom (1 proton, 1 electron)', 'Carbon atom (6 protons)'],
      relatedTerms: ['proton', 'neutron', 'electron', 'nucleus']
    },

    // English definitions
    'noun': {
      term: 'Noun (संज्ञा)',
      meaning: 'व्यक्ति, स्थान, वस्तु या भावना को दर्शाने वाला word',
      context: 'English Grammar',
      examples: ['Ram (person)', 'Delhi (place)', 'Book (thing)', 'Love (feeling)'],
      relatedTerms: ['verb', 'adjective', 'pronoun', 'grammar']
    },
    'verb': {
      term: 'Verb (क्रिया)',
      meaning: 'Action या state of being को दर्शाने वाला word',
      context: 'English Grammar',
      examples: ['run (action)', 'is (state)', 'think (mental action)'],
      relatedTerms: ['noun', 'tense', 'subject', 'object']
    },

    // Reasoning definitions
    'logic': {
      term: 'Logic (तर्क)',
      meaning: 'सही reasoning और valid conclusions तक पहुंचने की systematic method',
      context: 'Logical Reasoning',
      examples: ['If A then B', 'All birds fly', 'Cause and effect'],
      relatedTerms: ['reasoning', 'conclusion', 'premise', 'argument']
    },
    'syllogism': {
      term: 'Syllogism (न्यायवाक्य)',
      meaning: 'दो premises से एक logical conclusion निकालने की method',
      context: 'Logical Reasoning',
      examples: ['All men are mortal, Socrates is a man, Therefore Socrates is mortal'],
      relatedTerms: ['premise', 'conclusion', 'logic', 'deduction']
    }
  };

  extractDefinitions(text: string, subject: string): DefinitionResponse {
    const words = text.toLowerCase().split(/\s+/);
    const foundDefinitions: Definition[] = [];
    const mainConcepts: string[] = [];

    // Look for terms in the text
    for (const [key, definition] of Object.entries(this.definitionsDatabase)) {
      if (text.toLowerCase().includes(key) || words.includes(key)) {
        foundDefinitions.push(definition);
        mainConcepts.push(definition.term);
      }
    }

    // Add subject-specific terms if none found
    if (foundDefinitions.length === 0) {
      const subjectTerms = this.getSubjectSpecificTerms(subject);
      foundDefinitions.push(...subjectTerms);
      mainConcepts.push(...subjectTerms.map(def => def.term));
    }

    return {
      definitions: foundDefinitions.slice(0, 5), // Limit to 5 definitions
      mainConcepts: mainConcepts.slice(0, 3),
      subject
    };
  }

  private getSubjectSpecificTerms(subject: string): Definition[] {
    const subjectMappings: { [key: string]: string[] } = {
      'math': ['algebra', 'equation', 'variable'],
      'science': ['photosynthesis', 'gravity', 'atom'],
      'science_physics': ['gravity', 'force', 'energy'],
      'science_chemistry': ['atom', 'molecule', 'reaction'],
      'science_biology': ['photosynthesis', 'cell', 'DNA'],
      'english': ['noun', 'verb', 'adjective'],
      'reasoning': ['logic', 'syllogism', 'premise']
    };

    const terms = subjectMappings[subject] || ['logic'];
    return terms.map(term => this.definitionsDatabase[term]).filter(Boolean);
  }

  addDefinition(definition: Definition) {
    this.definitionsDatabase[definition.term.toLowerCase()] = definition;
  }

  searchDefinitions(query: string): Definition[] {
    const results: Definition[] = [];
    const lowerQuery = query.toLowerCase();

    for (const [key, definition] of Object.entries(this.definitionsDatabase)) {
      if (
        key.includes(lowerQuery) ||
        definition.term.toLowerCase().includes(lowerQuery) ||
        definition.meaning.toLowerCase().includes(lowerQuery)
      ) {
        results.push(definition);
      }
    }

    return results.slice(0, 10);
  }
}

export const definitionService = new DefinitionService();
