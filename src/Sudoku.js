import "./App.css";
import React, { useState, useRef } from "react";
import Board from "./ui/Board";
import Interface from "./ui/Interface";
import { REST } from "./services/api.js";
import { SudokuUtil } from "./utils/SudokuUtil";

function getGrid() {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = Array(9).fill(0);
  }
  return grid;
}

function copy2DArray(from, to) {
  for (let i = 0; i < from.length; i++) {
    to[i] = [...from[i]];
  }
}

function Sudoku(){
  let difficulties = ["easy","medium","hard"];
  const [grid, setGrid] = useState(getGrid);
  const [puzzleStatus, setPuzzleStatus] = useState("unsolved");
  const [difficultyStatus, setDifficultyStatus] = useState(difficulties[Math.floor(Math.random() * difficulties.length)]);
  const initialGrid = useRef(getGrid());

  function handleChange(row, col, e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (Number(e.target.value) < 10) {
        const newGrid = [...grid];
        newGrid[row][col] = Number(e.target.value);
        setGrid(newGrid);
      }
    }
  }

  async function handleInterface(action) {
    let newGrid;
    switch (action) {
      case "create-easy":
        setDifficultyStatus("easy");
        newGrid = await handleCreate(difficultyStatus);
        copy2DArray(newGrid, initialGrid.current);
        setPuzzleStatus("unsolved");
        setGrid(newGrid);
        break;
      
      case "create-medium":
        setDifficultyStatus("medium");
        newGrid = await handleCreate(difficultyStatus);
        copy2DArray(newGrid, initialGrid.current);
        setPuzzleStatus("unsolved");
        setGrid(newGrid);
        break;

      case "create-hard":
        setDifficultyStatus("hard");
        newGrid = await handleCreate(difficultyStatus);
        copy2DArray(newGrid, initialGrid.current);
        setPuzzleStatus("unsolved");
        setGrid(newGrid);
        break;

      case "create-random":
        let difficulties = ["easy","medium","hard"];
        let selection = difficulties[Math.floor(Math.random() * difficulties.length)];
        setDifficultyStatus(selection);
        console.log(selection);
        newGrid = await handleCreate(difficultyStatus);
        copy2DArray(newGrid, initialGrid.current);
        setPuzzleStatus("unsolved");
        setGrid(newGrid);
        break;

      case "solve":
        newGrid = await handleSolve();
        setGrid(newGrid);
        break;
      case "clear":
        newGrid = getGrid();
        copy2DArray(newGrid, initialGrid.current);
        setGrid(newGrid);
        break;
      case "validate":
        const status = handleValidate();
        setPuzzleStatus(status);
        break;
      default:
        throw new Error("Invalid action");
    }
  }

  async function handleCreate(difficulty) {
    try {
      const response = await REST.getBoard(difficulty);
      const data = await response.json();
      let puzzle = {
        A1:0, A2:0, A3:0, A4:0, A5:0, A6:0, A7:0, A8:0, A9:0,
        B1:0, B2:0, B3:0, B4:0, B5:0, B6:0, B7:0, B8:0, B9:0,
        C1:0, C2:0, C3:0, C4:0, C5:0, C6:0, C7:0, C8:0, C9:0,
        D1:0, D2:0, D3:0, D4:0, D5:0, D6:0, D7:0, D8:0, D9:0,
        E1:0, E2:0, E3:0, E4:0, E5:0, E6:0, E7:0, E8:0, E9:0,
        F1:0, F2:0, F3:0, F4:0, F5:0, F6:0, F7:0, F8:0, F9:0,
        G1:0, G2:0, G3:0, G4:0, G5:0, G6:0, G7:0, G8:0, G9:0,
        H1:0, H2:0, H3:0, H4:0, H5:0, H6:0, H7:0, H8:0, H9:0,
        I1:0, I2:0, I3:0, I4:0, I5:0, I6:0, I7:0, I8:0, I9:0
      }

      for (const property in data.puzzle) {
        puzzle[property] =  data.puzzle[property];
      }

      let generatedpuzzle = "";

      for (const property in puzzle) {
        generatedpuzzle = generatedpuzzle + puzzle[property];
      }

      console.log(generatedpuzzle);
      return formatPuzzle(generatedpuzzle);
    } catch (error) {
      console.log(error);
    }
  }


  function formatPuzzle(puzzle){
    const formattedPuzzle = createArray(9, 9);
    for(let i=0; i<puzzle.length; i++) {
      const rowId = getRowId(i);
      const colId = getColId(i);
      formattedPuzzle[rowId][colId] = Number(puzzle[i]);
    }
    return formattedPuzzle;
  }

  function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

  function getRowId(i){
    return Math.floor(i/9);
  }

  function getColId(i){
    return (i%9);
  }

  function handleValidate() {
    let toBeSolvedGrid = getGrid();
    copy2DArray(grid, toBeSolvedGrid);
    if(isValidSolution(grid)==="unsolved")
    {
      console.log()
      if(solve(toBeSolvedGrid))
      {
        setPuzzleStatus("unsolved");
        return "unsolved";
      }
      else
      {
        setPuzzleStatus("broken");
        return "broken";
      }

    }
    else return isValidSolution(grid);
    
  }

  function isValidSolution(grid) {
    return SudokuUtil.isValidPuzzle(grid);
  }



  async function handleSolve() {

      return isSolvable();

  }

  function isSolvable() {
    let isValidSudoku = SudokuUtil.isValidPuzzle(grid);
    let toBeSolvedGrid = getGrid();
    copy2DArray(grid, toBeSolvedGrid);
    if (isValidSudoku !=="broken") {
      if(solve(toBeSolvedGrid))
      {
        setPuzzleStatus("solved");
        return toBeSolvedGrid;
      }
    } else {
      setPuzzleStatus("broken");
      return toBeSolvedGrid;
    }
  }

  function solve(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
            if (SudokuUtil.isValidPlace(grid, row, col, possibleNumber)) {
              grid[row][col] = possibleNumber;
              if (solve(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="Sudoku">
      <h3>Sudoku</h3>
      <Board
        puzzle={initialGrid.current}
        grid={grid}
        handleChange={handleChange}
      />
      <Interface handleInterface={handleInterface} status={puzzleStatus} difficultyStatus={difficultyStatus} />
    </div>
  );
}

export default Sudoku;
