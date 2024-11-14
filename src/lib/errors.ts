/**
 * Base class for all custom errors in the astix library.
 */
export class AstixError extends Error {
  public name: string;
  public message: string;
  public line?: number;
  public column?: number;

  /**
   * Creates a new AstixError instance.
   * @param name - The name of the error type.
   * @param message - The error message.
   * @param line - Optional line number in the input where the error occurred.
   * @param column - Optional column position in the line where the error occurred.
   */
  constructor(name: string, message: string, line?: number, column?: number) {
    super(message);
    this.name = name;
    this.message = message;
    this.line = line;
    this.column = column;
  }

  /**
   * Provides a formatted error message including line and column information if available.
   * @returns A string representation of the error.
   */
  public toString(): string {
    return `${this.name}: ${this.message}${
      this.line !== undefined && this.column !== undefined
        ? ` at line ${this.line}, column ${this.column}`
        : ""
    }`;
  }
}

/**
 * Error class for tokenization-related issues.
 */
export class TokenizerError extends AstixError {
  /**
   * Creates a new TokenizerError.
   * @param message - The error message.
   * @param line - The line number where the error occurred.
   * @param column - The column position in the line where the error occurred.
   */
  constructor(message: string, line: number, column: number) {
    super("TokenizerError", message, line, column);
  }
}

/**
 * Error class for parser-related issues.
 */
export class ParserError extends AstixError {
  /**
   * Creates a new ParserError.
   * @param message - The error message.
   * @param line - The line number where the error occurred.
   * @param column - The column position in the line where the error occurred.
   */
  constructor(message: string, line: number, column: number) {
    super("ParserError", message, line, column);
  }
}

/**
 * Error class for grammar-related issues.
 */
export class GrammarError extends AstixError {
  /**
   * Creates a new GrammarError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super("GrammarError", message);
  }
}

/**
 * Error class for issues with AST node creation or structure.
 */
export class AstNodeError extends AstixError {
  /**
   * Creates a new AstNodeError.
   * @param message - The error message.
   * @param line - The line number where the error occurred (optional).
   * @param column - The column position in the line where the error occurred (optional).
   */
  constructor(message: string, line?: number, column?: number) {
    super("AstNodeError", message, line, column);
  }
}
