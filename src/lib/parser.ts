import { Grammar, GrammarRule } from "./grammar.js";
import { Tokenizer } from "./tokenizer.js";
import { ParserError } from "./errors.js";
import { AstTree } from "./ast-tree.js";
import { Node } from "./ast-node.js";
import { Token } from "./token.js";

/**
 * Represents the Parser, which takes a tokenized input and builds an AST based on grammar rules.
 */
export class Parser {
  private grammar: Grammar;
  private tokens: Token[];
  private position: number;

  /**
   * Creates a new Parser instance.
   * @param grammar - The grammar defining rules for parsing.
   * @param input - The input string to parse.
   * @throws TokenizerError if tokenization fails.
   */
  constructor(grammar: Grammar, input: string) {
    const tokenizer = new Tokenizer(
      grammar.rules.flatMap((rule) => rule.tokens),
      input
    );
    this.tokens = tokenizer.tokenize();
    this.position = 0;
    this.grammar = grammar;
  }

  /**
   * Parses tokens based on grammar and generates an AST.
   * @returns The generated AST.
   * @throws ParserError if parsing fails due to unexpected or missing tokens.
   */
  public parse(): AstTree {
    const rootRule = this.grammar.rules[0]; // Assume the first rule is the root rule
    const rootNode = this.matchRule(rootRule);
    return new AstTree(rootNode);
  }

  /**
   * Matches a grammar rule to the current position in the token list.
   * @param rule - The grammar rule to match.
   * @returns A Node corresponding to the matched rule.
   * @throws ParserError if the expected token is not found.
   */
  private matchRule(rule: GrammarRule): Node {
    // Create a root node for the rule with placeholder values for line and position.
    const rootNode = new Node(
      new Token(rule.name || "", rule.name || "", false, ""),
      rule.name || "",
      [],
      0,
      0
    );

    for (const tokenRule of rule.tokens) {
      const token = this.matchToken(tokenRule);
      if (token) {
        rootNode.appendChild(token, token.name || "", 0, this.position);
      } else {
        const currentToken = this.tokens[this.position];
        throw new ParserError(
          `Expected token "${tokenRule.name}" but found "${currentToken?.name || "end of input"}"`,
          0, // Line number placeholder
          this.position // Use position as a placeholder for column
        );
      }
    }

    return rootNode;
  }

  /**
   * Matches a single token to the current position in the token list.
   * @param tokenRule - The token rule to match.
   * @returns The matched token or null if no match.
   */
  private matchToken(tokenRule: Token): Token | null {
    if (this.position >= this.tokens.length) return null;

    const currentToken = this.tokens[this.position];
    const isMatch =
      (tokenRule.pattern instanceof RegExp && tokenRule.pattern.test(currentToken.value)) ||
      (typeof tokenRule.pattern === "string" && tokenRule.pattern === currentToken.value);

    if (isMatch) {
      this.position++;
      return currentToken;
    }

    return null;
  }
}
