import * as React from 'react';

interface ITopSettings {
    onAddRow: () => void;
    onDeleteRow: () => void;
    onAddCol: () => void;
    onDeleteCol: () => void;
    onRandomizeColWidths: () => void;
    onResetColWidths: () => void;
    onRandomizeRowHeights: () => void;
    onResetRowHeights: () => void;
  }

export const TopSettings: React.FC<ITopSettings> = (props) => {
    return (
      <div
        style={{
            flexDirection: 'row'
        }}
      >
          <button onClick={props.onAddRow}>Add Row</button>
          <button onClick={props.onDeleteRow}>Delete Row</button>
          <button onClick={props.onAddCol}>Add Col</button>
          <button onClick={props.onDeleteCol}>Delete Col</button>
          <button onClick={props.onRandomizeColWidths}>Randomize Col Widths</button>
          <button onClick={props.onResetColWidths}>Reset Col Widths</button>
          <button onClick={props.onRandomizeRowHeights}>Randomize Row Heights</button>
          <button onClick={props.onResetRowHeights}>Reset Row Heights</button>
      </div>
    )
  }