import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./PF_Visualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import { dfs, getNodesInShortestPathOrderDFS } from "../Algorithms/dfs";

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 17;
let FINISH_NODE_COL = 45;

const PF_Visualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [clear, setClear] = useState(false);
  // const [srow, setSrow] = useState(START_NODE_ROW);
  // const [scol, setScol] = useState(START_NODE_COL);
  // const [frow, setFrow] = useState(FINISH_NODE_ROW);
  // const [fcol, setFcol] = useState(FINISH_NODE_COL);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // function handleChange(event) {
  //   setSrow(event.target.value);
  //   console.log(srow);
  //   START_NODE_ROW = srow;
  // }
  // const setStartCol = (e) => {
  //   setScol(e.target.value);
  //   START_NODE_COL = scol;
  // };
  // const setFinishRow = (e) => {
  //   setFrow(e.target.value);
  //   FINISH_NODE_ROW = frow;
  // };
  // const setFinishCol = (e) => {
  //   setFcol(e.target.value);
  //   FINISH_NODE_COL = fcol;
  // };

  useEffect(() => {
    getInitialGrid();
    setClear(false);
  }, [clear]);

  const getInitialGrid = () => {
    const grid = [];

    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }

      grid.push(currentRow);
    }
    setGrid(grid);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const clearGrid = () => {
    setGrid([]);
    setClear(true);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDFS = (visitedNodesInOrderDFS, nodesInShortestPathOrderDFS) => {
    for (let i = 0; i <= visitedNodesInOrderDFS.length; i++) {
      if (i === visitedNodesInOrderDFS.length) {
        setTimeout(() => {
          animateShortestPathDFS(nodesInShortestPathOrderDFS);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrderDFS[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPathDFS = (nodesInShortestPathOrderDFS) => {
    for (let i = 0; i < nodesInShortestPathOrderDFS.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrderDFS[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrderDFS = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrderDFS =
      getNodesInShortestPathOrderDFS(finishNode);
    animateDFS(visitedNodesInOrderDFS, nodesInShortestPathOrderDFS);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const changeSrcAndDes = () => {
    if (notPossible()) return;

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = "node";
    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = "node";

    START_NODE_ROW = parseInt(document.getElementById("start_row").value);
    START_NODE_COL = parseInt(document.getElementById("start_col").value);
    FINISH_NODE_ROW = parseInt(document.getElementById("finish_row").value);
    FINISH_NODE_COL = parseInt(document.getElementById("finish_col").value);

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = "node node-finish";
  };

  const notPossible = () => {
    if (
      isNaN(parseInt(document.getElementById("start_row").value)) ||
      isNaN(parseInt(document.getElementById("start_col").value)) ||
      isNaN(parseInt(document.getElementById("finish_row").value)) ||
      isNaN(parseInt(document.getElementById("finish_col").value))
    )
      return true;

    if (
      parseInt(document.getElementById("start_row").value) > 19 ||
      parseInt(document.getElementById("start_col").value) > 49
    )
      return true;
    if (
      parseInt(document.getElementById("start_row").value) < 0 ||
      parseInt(document.getElementById("start_col").value) < 0
    )
      return true;

    if (
      parseInt(document.getElementById("finish_row").value) > 19 ||
      parseInt(document.getElementById("finish_col").value) > 49
    )
      return true;
    if (
      parseInt(document.getElementById("finish_row").value) < 0 ||
      parseInt(document.getElementById("finish_col").value) < 0
    )
      return true;
    return false;
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="heading">PathFinding Visualizer</div>
        <div className="btns">
          <button onClick={() => visualizeDijkstra()} className="dijkstra_btn">
            Visualize Dijkstra's Algorithm
          </button>
          <button onClick={() => visualizeDFS()} className="dfs_btn">
            Visualize dfs
          </button>
          <button onClick={() => clearGrid()} className="clear-grid">
            Clear Path
          </button>
        </div>
      </div>
      <div className="changeNodes">
        <label>
          Start Row:
          <input
            type="number"
            id="start_row"
            defaultValue="10"
            onChange={changeSrcAndDes}
          />
        </label>
        <label>
          Start Col:
          <input
            type="number"
            id="start_col"
            defaultValue="15"
            onChange={changeSrcAndDes}
          />
        </label>
        <label>
          Finish Row:
          <input
            type="number"
            id="finish_row"
            defaultValue="17"
            onChange={changeSrcAndDes}
          />
        </label>
        <label>
          Finish Col:
          <input
            type="number"
            id="finish_col"
            defaultValue="45"
            onChange={changeSrcAndDes}
          />
        </label>
      </div>

      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    row={row}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PF_Visualizer;
