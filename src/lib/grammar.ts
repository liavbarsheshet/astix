import { Token } from "./token.js";

/**
 * Enum for operator associativity types.
 */
export enum Associativity {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  NONASSOC = "NONASSOC",
}

/**
 * Represents a Grammar Rule interface with precedence and associativity.
 */
export interface IGrammarRule {
  /**
   * List of tokens in this grammar rule.
   */
  tokens: Token[];

  /**
   * Associativity of the rule (LEFT, RIGHT, or NONASSOC).
   */
  associativity?: Associativity;

  /**
   * Precedence level of the rule.
   */
  precedence?: number;

  /**
   * Rule name, for reference in the grammar.
   */
  name?: string;
}

/**
 * Base Grammar Rule class that users can extend for custom grammar definitions.
 */
export class GrammarRule implements IGrammarRule {
  public tokens: Token[];
  public associativity?: Associativity;
  public precedence?: number;
  public name?: string;

  /**
   * Creates a new Grammar Rule.
   * @param tokens - Array of tokens that make up the rule.
   * @param associativity - Associativity of the rule (default is non-associative).
   * @param precedence - Precedence level of the rule (optional).
   * @param name - Optional name for the rule.
   */
  constructor(
    tokens: Token[],
    associativity: Associativity = Associativity.NONASSOC,
    precedence?: number,
    name?: string
  ) {
    this.tokens = tokens;
    this.associativity = associativity;
    this.precedence = precedence;
    this.name = name;
  }
}

/**
 * Represents a Grammar interface with a list of rules.
 */
export interface IGrammar {
  /**
   * Collection of grammar rules.
   */
  rules: GrammarRule[];

  /**
   * Adds a new rule to the grammar.
   * @param rule - The grammar rule to add.
   */
  addRule(rule: GrammarRule): void;
}

/**
 * Base Grammar class that users can extend.
 */
export class Grammar implements IGrammar {
  public rules: GrammarRule[];

  /**
   * Creates a new Grammar instance.
   */
  constructor() {
    this.rules = [];
  }

  /**
   * Adds a new rule to the grammar.
   * @param rule - The grammar rule to add.
   */
  public addRule(rule: GrammarRule): void {
    this.rules.push(rule);
  }

  /**
   * Retrieves rules by precedence, optionally filtered by associativity.
   * @param associativity - Associativity to filter by (optional).
   * @returns Array of rules matching the specified associativity.
   */
  public getRulesByAssociativity(associativity?: Associativity): GrammarRule[] {
    return this.rules.filter((rule) => !associativity || rule.associativity === associativity);
  }

  /**
   * Sorts rules by precedence, from highest to lowest.
   * @returns Array of rules sorted by precedence.
   */
  public getRulesByPrecedence(): GrammarRule[] {
    return this.rules.slice().sort((a, b) => (b.precedence || 0) - (a.precedence || 0));
  }
}
