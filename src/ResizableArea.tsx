import * as React from 'react';

interface IResizableConstraintsContext {
    width: number,
    height: number,
}
export const ResizableAreaContext = React.createContext<IResizableConstraintsContext>(
    {
        height: 0,
        width: 0,
    }
);

export interface IResizableArea {
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
    // overFlowResolution:
}
type ResizableAreaProps = React.PropsWithChildren<IResizableArea>;

const divClassNameString = 'ResizableAreaDiv'
export const ResizableArea: React.FC<ResizableAreaProps> = (props) => {
    const [dimensions, setDimensions] = React.useState<IResizableConstraintsContext>({width: 0, height: 0});
    const observerCallback: ResizeObserverCallback = React.useCallback((entries) => {
        if (entries.length > 1) {
            console.error("Observing too many things")
        } else {
            if (entries[0].contentRect.height !== dimensions.height || entries[0].contentRect.width !== dimensions.width){
                setDimensions({
                    height: entries[0].contentRect.height,
                    width: entries[0].contentRect.width,
                })
            }
        }
    }, [dimensions, setDimensions])
    
    React.useEffect(() => {
        const observer = new ResizeObserver(observerCallback);
        const containerComponent = document.getElementsByClassName(divClassNameString);
        observer.observe(containerComponent[0]);
        return () => {
          // Clean up the subscription
          observer?.disconnect();
        };
    });

    return (
    <ResizableAreaContext.Provider value={dimensions}>
        <div
            className = {divClassNameString}
            style = {{
                minWidth: props.minWidth,
                minHeight: props.minHeight,
                maxHeight: props.maxHeight,
                maxWidth: props.maxWidth,
                backgroundColor: '#eee',
                resize: 'both',
                overflow: 'hidden'
            }}
        >
            {props.children}
        </div>
    </ResizableAreaContext.Provider>
    );
}