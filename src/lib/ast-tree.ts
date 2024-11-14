import { Node } from "./ast-node.js";

/**
 * Represents an AST (Abstract Syntax Tree) interface.
 */
export interface IAstTree {
  /**
   * The root node of the AST.
   */
  root: Node;

  /**
   * Array of leaf nodes in the AST.
   * Leaf nodes are nodes without children.
   */
  leaves: Node[];

  /**
   * Adds an existing node to the AST.
   * @param node - The node to add.
   * @param parent - The parent node to which the node will be added (default is root).
   */
  addNode(node: Node, parent?: Node): void;

  /**
   * Retrieves all nodes in the AST in pre-order traversal.
   * @returns Array of nodes in pre-order.
   */
  getNodesPreOrder(): Node[];

  /**
   * Retrieves all nodes in the AST in post-order traversal.
   * @returns Array of nodes in post-order.
   */
  getNodesPostOrder(): Node[];
}

/**
 * Class representing an Abstract Syntax Tree (AST).
 */
export class AstTree implements IAstTree {
  public root: Node;
  public leaves: Node[];

  /**
   * Creates an AST with a specified root node.
   * @param root - The root node of the AST.
   */
  constructor(root: Node) {
    this.root = root;
    this.leaves = root.children.length === 0 ? [root] : this.findLeaves();
  }

  /**
   * Adds an existing node to the AST under a specified parent.
   * @param node - The node to add.
   * @param parent - The parent node to which the node will be added (default is root).
   */
  public addNode(node: Node, parent: Node = this.root): void {
    parent.children.push(node);

    // Efficient leaf tracking
    if (parent.children.length === 1) {
      // If this is the first child, remove the parent from leaves
      this.leaves = this.leaves.filter((leaf) => leaf !== parent);
    }
    if (node.children.length === 0) {
      this.leaves.push(node);
    }
  }

  /**
   * Retrieves all nodes in the AST in pre-order traversal.
   * @returns Array of nodes in pre-order.
   */
  public getNodesPreOrder(): Node[] {
    const nodes: Node[] = [];
    this.root.traversePreOrder((node) => nodes.push(node));
    return nodes;
  }

  /**
   * Retrieves all nodes in the AST in post-order traversal.
   * @returns Array of nodes in post-order.
   */
  public getNodesPostOrder(): Node[] {
    const nodes: Node[] = [];
    this.root.traversePostOrder((node) => nodes.push(node));
    return nodes;
  }

  /**
   * Finds all leaf nodes (nodes with no children).
   * @returns Array of leaf nodes.
   */
  private findLeaves(): Node[] {
    return this.getNodesPreOrder().filter((node) => node.children.length === 0);
  }
}
