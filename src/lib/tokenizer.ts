import { TokenizerError } from "./errors.js";
import { Token } from "./token.js";

/**
 * Interface for the Tokenizer, responsible for converting an input string into a sequence of tokens based on provided patterns.
 */
export interface ITokenizer {
  /**
   * Tokenizes the input string based on defined token patterns.
   * @returns Array of matched tokens.
   * @throws TokenizerError if an unexpected character is encountered.
   */
  tokenize(): Token[];
}

/**
 * Tokenizer class that converts an input string into tokens based on specified patterns.
 */
export class Tokenizer implements ITokenizer {
  private tokens: Token[];
  private input: string;
  private position: number;
  private line: number;
  private column: number;

  /**
   * Creates a new Tokenizer instance.
   * @param tokens - Array of Token objects defining patterns for tokenization.
   * @param input - The input string to tokenize.
   */
  constructor(tokens: Token[], input: string) {
    this.tokens = tokens;
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  /**
   * Converts the input string into a sequence of tokens by matching against each token's pattern.
   * Tokens marked with `skip: true` are ignored.
   * @returns Array of matched tokens, excluding skipped tokens.
   * @throws TokenizerError if an unexpected character is encountered.
   */
  public tokenize(): Token[] {
    const result: Token[] = [];

    while (this.position < this.input.length) {
      let matched = false;

      for (const token of this.tokens) {
        if (token.skip) continue;

        const match = this.matchToken(token);
        if (match) {
          result.push(new Token(token.pattern, token.name, false)); // Corrected to use 3 arguments
          this.updatePosition(match);
          matched = true;
          break;
        }
      }

      if (!matched)
        throw new TokenizerError(
          `Unexpected character "${this.input[this.position]}"`,
          this.line,
          this.column
        );
    }

    return result;
  }

  /**
   * Attempts to match the current input position with the given token's pattern.
   * Advances the tokenizer's position upon a successful match.
   * @param token The token definition to match against.
   * @returns The matched substring if successful, or null if no match is found.
   */
  private matchToken(token: Token): string | null {
    const pattern =
      token.pattern instanceof RegExp ? token.pattern : new RegExp(`^${token.pattern}`);
    const substring = this.input.slice(this.position);
    const match = substring.match(pattern);

    if (match && match.index === 0) return match[0];

    return null;
  }

  /**
   * Updates the line and column position based on the matched substring.
   * @param match - The matched substring to advance past.
   */
  private updatePosition(match: string): void {
    this.position += match.length;

    for (const char of match) {
      if (char === "\n") {
        this.line++;
        this.column = 1;
        continue;
      }

      this.column++;
    }
  }
}
