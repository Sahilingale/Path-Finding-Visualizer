import React from "react";

export const dfs = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  performDFS(
    grid,
    visitedNodesInOrder,
    finishNode,
    startNode.row,
    startNode.col
  );
  return visitedNodesInOrder;
};

const performDFS = (grid, visitedNodesInOrder, finishNode, r, c) => {
  if (r > 19 || r < 0 || c > 49 || c < 0) {
    return false;
  }
  let node = grid[r][c];
  if (node.isWall) return false;
  if (node.isVisited === true) {
    return false;
  }

  visitedNodesInOrder.push(node);
  console.log(node);
  node.isVisited = true;

  if (node === finishNode) {
    return true;
  }

  updateNeighbour(grid, node);
  if (performDFS(grid, visitedNodesInOrder, finishNode, r - 1, c)) return true;
  if (performDFS(grid, visitedNodesInOrder, finishNode, r, c + 1)) return true;
  if (performDFS(grid, visitedNodesInOrder, finishNode, r + 1, c)) return true;
  if (performDFS(grid, visitedNodesInOrder, finishNode, r, c - 1)) return true;
};

const updateNeighbour = (grid, node) => {
  const { row, col } = node;
  if (row > 0) {
    let neighbour = grid[row - 1][col];
    if (!neighbour.isVisited) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
  if (col < grid[0].length - 1) {
    let neighbour = grid[row][col + 1];
    if (!neighbour.isVisited) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
  if (row < grid.length - 1) {
    let neighbour = grid[row + 1][col];
    if (!neighbour.isVisited) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
  if (col > 0) {
    let neighbour = grid[row][col - 1];
    if (!neighbour.isVisited) {
      neighbour.distance = node.distance + 1;
      neighbour.previousNode = node;
    }
  }
};

export const getNodesInShortestPathOrderDFS = (finishNode) => {
  const nodesInShortestPathOrderDFS = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrderDFS.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrderDFS;
};
