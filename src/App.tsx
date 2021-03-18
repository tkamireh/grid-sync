import React from 'react';
import './App.css';
import { ResizableArea } from './ResizableArea'
import { Grid } from './Grid'
import { TopSettings } from './TopSettings';

function App() {
  const [numRows, setNumRows] = React.useState(3);
  const [numCols, setNumCols] = React.useState(3);
  const [colWidths, setColWidths] = React.useState<number[]>([]);
  const [rowHeights, setRowHeights] = React.useState<number[]>([]);

  const onAddRow = React.useCallback(() => {setNumRows(Math.max(numRows + 1, 0))}, [numRows]);
  const onDeleteRow = React.useCallback(() => {setNumRows(Math.max(numRows - 1, 0))}, [numRows]);
  const onAddCol = React.useCallback(() => {setNumCols(Math.max(numCols + 1, 0))}, [numCols]);
  const onDeleteCol = React.useCallback(() => {setNumCols(Math.max(numCols - 1, 0))}, [numCols]);

  const onResetColWidths = React.useCallback(() => {
    setColWidths([]);
  }, [setColWidths]);

  const onRandomizeColWidths = React.useCallback(() => {
    console.log('Randomizing');
    let arr: number[] = new Array(numCols);
    for (let i = 0; i < numCols; i++) {
      arr[i] = (Math.random());
    }
    const total: number = arr.reduce((prev, curr) => prev + curr);
    setColWidths(arr.map((val) => val / total * 100 * (Math.random() * 10)));
  }, [numCols, setColWidths]);

  const onResetRowHeights = React.useCallback(() => {
    setRowHeights([]);
  }, [setRowHeights]);

  const onRandomizeRowHeights = React.useCallback(() => {
    console.log('Randomizing');
    let arr: number[] = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
      arr[i] = (Math.random());
    }
    const total: number = arr.reduce((prev, curr) => prev + curr);
    setRowHeights(arr.map((val) => val / total * 100 * (Math.random() * 10)));
  }, [numRows, setRowHeights])

  return (
    <div className="App">
      <TopSettings 
        onAddRow={onAddRow}
        onDeleteRow={onDeleteRow}
        onAddCol={onAddCol}
        onDeleteCol={onDeleteCol}
        onRandomizeColWidths={onRandomizeColWidths}
        onResetColWidths={onResetColWidths}
        onRandomizeRowHeights={onRandomizeRowHeights}
        onResetRowHeights={onResetRowHeights}
      />
      <ResizableArea
        minWidth={100}
        maxWidth={600}
        minHeight={100}
        maxHeight={400}
      >
        I'm inside the ResizableArea
        <Grid
          numRows={numRows}
          numCols={numCols}
          colWidths={colWidths}
          rowHeights={rowHeights}
        />
      </ResizableArea>
    </div>
  );
}

export default App;
