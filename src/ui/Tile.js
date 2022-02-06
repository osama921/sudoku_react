import React from "react";

function Tile({ puzzle, grid, handleChange }) {
  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      return (
        <input
          className={
              rowIndex===2 && colIndex ===3 ? 
              "tile specialborder" :

              rowIndex===2 && colIndex ===6 ?
              "tile specialborder" :

              rowIndex===5 && colIndex ===3 ?
              "tile specialborder" :

              rowIndex===5 && colIndex ===6 ?
              "tile specialborder" :


               colIndex === 3 || colIndex===6
              ? "tile tilecolborder"
              : rowIndex ===2 || rowIndex===5
              ? "tile tilerowborder" : "tile"
              
          }
          
          value={col === 0 ? "" : col}
          key={rowIndex + " " + colIndex}
          type="text"
          onChange={(e) => handleChange(rowIndex, colIndex, e)}
        />
      );
    });
  });
}

export default Tile;
