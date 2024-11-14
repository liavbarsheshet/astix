import { Token } from "./token.js";

/**
 * Represents an abstract syntax tree (AST) node interface.
 */
export interface INode {
  /**
   * The value of this node.
   */
  value: Token;
  /**
   * Token type or identifier associated with this node.
   */
  token: string;
  /**
   * Array of child nodes for this node.
   */
  children: Node[];
  /**
   * Line number of the source code corresponding to this node.
   */
  line: number;
  /**
   * Column position of the source code corresponding to this node.
   */
  position: number;
}

/**
 * Class representing a node within an AST.
 */
export class Node implements INode {
  public value: Token;
  public token: string;
  public children: Node[];
  public line: number;
  public position: number;
  private parent: Node | null = null;

  /**
   * Creates an AST node.
   * @param value The value of this node.
   * @param token The token type associated with this node.
   * @param children Initial child nodes of this node.
   * @param line Line number of this node in the source code.
   * @param position Column position of this node in the source code.
   */
  constructor(
    value: Token,
    token: string,
    children: Node[] = [],
    line: number = 0,
    position: number = 0
  ) {
    this.value = value;
    this.token = token;
    this.children = children;
    this.line = line;
    this.position = position;
  }

  /**
   * Appends a new child node to this node.
   * @param childValue - The value of the child node.
   * @param token The token type of the child node (default is an empty string).
   * @param line Line number for the child node.
   * @param position Column position for the child node.
   */
  appendChild(childValue: Token, token: string = "", line: number = 0, position: number = 0): void {
    const childNode = new Node(childValue, token, [], line, position);
    childNode.parent = this;
    this.children.push(childNode);
  }

  /**
   * Gets the parent node of this node.
   * @returns The parent node, or null if this node has no parent.
   */
  getParent(): Node | null {
    return this.parent;
  }

  /**
   * Traverses this node and its children in pre-order.
   * @param callback A function to execute for each node.
   */
  traversePreOrder(callback: (node: Node) => void): void {
    callback(this);
    this.children.forEach((child) => child.traversePreOrder(callback));
  }

  /**
   * Traverses this node and its children in post-order.
   * @param callback A function to execute for each node.
   */
  traversePostOrder(callback: (node: Node) => void): void {
    this.children.forEach((child) => child.traversePostOrder(callback));
    callback(this);
  }

  /**
   * Checks if this node has children.
   * @returns True if the node has children; otherwise, false.
   */
  hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Finds a child node by token.
   * @param token The token to search for.
   * @returns The first matching child node or undefined if not found.
   */
  findChildByToken(token: string): Node | undefined {
    return this.children.find((child) => child.token === token);
  }
}
