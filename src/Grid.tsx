import * as React from 'react';
import { ResizableAreaContext } from './ResizableArea'

interface IGridPropsBase {
    numRows: number,
    numCols: number,
    colWidths: number[],
    rowHeights: number[],
}
export type IGridProps = React.PropsWithChildren<IGridPropsBase>

 export const Grid: React.FC<IGridProps> = (props) => {
     const resizeContext = React.useContext(ResizableAreaContext);

     const renderCards = (): React.ReactElement[] => {
         const arr: React.ReactElement[] = new Array(props.numRows);
         for (let i = 0; i < props.numRows; i++) {
             arr[i] = renderCard(i)
         }
         return arr;
     }

     const renderCard = (j: number): React.ReactElement => {
         const cardRows: React.ReactElement[] = new Array(props.numCols);
         const maxColWidth = Math.max(...props.colWidths);

         for (let i = 0; i < props.numCols; i++)
         {
             const src = i % 2 ? 'cat.png' : 'dog.png';
             cardRows[i] = (
                 <div
                    style={{
                        width: maxColWidth,
                        flexDirection: 'row',
                        justifyItems: 'start',
                        justifyContent: 'space-between',
                        display: 'inline-block'
                    }}
                 >
                     <span>Row {j}, Col {i}</span>
                     <img style={{width: '30%'}}alt='animal' src={process.env.PUBLIC_URL + src} />
                 </div>
             )
         }

         return (
             <div
                style={{
                    background: 'purple',
                    borderColor: 'green',
                    gap: '10px',
                    borderWidth: '20px',
                    borderRadius: '10%',
                    boxShadow: '5px -5px 20px -6pc black',
                    flexDirection: 'column',
                    width: '95%'
                }}
             >
                 {cardRows}
             </div>
         );
     }

     const renderCols = (numCols: number, rowHeight: number): React.ReactElement => {
         const arr: React.ReactElement[] = new Array(numCols);
         for (let i = 0; i < numCols; i++) {
            const width = props.colWidths[i] || 100;
            const height = rowHeight || 50;
            const src = i % 2 ? 'cat.png' : 'dog.png';
            arr.push(
                    <td>
                        <img
                            alt='animal'
                            src={process.env.PUBLIC_URL + src}
                            style={{
                                width: width,
                                height: height,
                                background: 'red'}}
                        />
                    </td>)
         }

         return (
             <div style={{}}>
                <tr style={{flexWrap: 'nowrap', display: 'inline-block'}}>
                   {arr}
                 </tr>
             </div>
         );
     }

     const renderRows = (numRows: number, numCols: number): React.ReactElement => {
         const arr: React.ReactElement[] = new Array(numRows);
         for (let i = 0; i< numRows; i++) {
             arr.push(renderCols(numCols, props.rowHeights[i]));
         }

         return (
             <tbody>
                 {arr}
             </tbody>
         )
     }
     
     if (resizeContext.width > ((props.colWidths.length > 0) ? (.90 * props.colWidths.reduce((prev, curr) => prev + curr)) : (props.numCols * 100 * .90)))
     {
        return (
            <table style={{flexGrow: 5, justifyItems: 'stretch'}}>
                <thead>
                </thead>
                    { renderRows(props.numRows, props.numCols)}
            </table>
        );
    } else if (resizeContext.width > (props.colWidths.length > 0 ? (Math.max(...props.colWidths)) : 200)) {
        console.log(props.colWidths)
        return (
            <div style={{width: '95%', height: 'inherit', overflowY: 'scroll', rowGap: '10px',}}>
                {renderCards()}
            </div>
        )
    }
    else {
        // render small cards
        return(
            <div>Too Small To Render</div>
        )
    }
 }
