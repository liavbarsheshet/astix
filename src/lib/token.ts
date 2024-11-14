/**
 * Represents a Token with a pattern, a matched value, and optional name and skip properties.
 */
export class Token {
  public pattern: string | RegExp;
  public name?: string;
  public skip: boolean;
  public value: string;

  /**
   * Creates a new Token instance.
   * @param pattern - The pattern for matching, either a string or regex.
   * @param name - Optional name for the token.
   * @param skip - Flag indicating if this token should be skipped (default is false).
   * @param value - The actual matched string from the input.
   */
  constructor(pattern: string | RegExp, name?: string, skip: boolean = false, value: string = "") {
    this.pattern = pattern;
    this.name = name;
    this.skip = skip;
    this.value = value;
  }

  /**
   * Checks if the token pattern is a regular expression.
   * @returns True if the pattern is a RegExp, false if it's a string.
   */
  public isRegex(): boolean {
    return this.pattern instanceof RegExp;
  }
}
