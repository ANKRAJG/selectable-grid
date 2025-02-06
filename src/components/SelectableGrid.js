import React, { useCallback, useState } from 'react'

const SelectableGrid = ({ rows, cols }) => {
    const grid = [...Array(rows * cols).keys()];
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [isMouseDown, seIsMouseDown] = useState(false);

    const handleMouseDown = (boxNumber) => {
        seIsMouseDown(true);
        setSelectedBoxes([boxNumber]);
    };

    const handleMouseEnter = useCallback((boxNumber) => {
        if(isMouseDown) {
            const startBox = selectedBoxes[0];
            const endBox = boxNumber;

            const startRow = Math.floor((startBox-1)/cols);
            const startCol = (startBox-1) % cols;
            const endRow = Math.floor((endBox-1)/cols);
            const endCol = (endBox-1) % cols;

            const minRow = Math.min(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxRow = Math.max(startRow, endRow);
            const maxCol = Math.max(startCol, endCol);

            const selected = [];
            for(let row=minRow; row<=maxRow; row++) {
                for(let col=minCol; col<=maxCol; col++) {
                    selected.push(row * cols + col + 1);
                }
            }
            console.log(selected);
            setSelectedBoxes(selected);
        }
    }, [isMouseDown]);

    const handleMouseUp = () => {
        seIsMouseDown(false);
    };

  return (
    <div 
        className="grid"
        style={{ '--rows': rows, '--cols': cols }}
        onMouseUp={handleMouseUp}
    >
        {grid.map((_, index) => (
            <div key={index}
                className={`box ${selectedBoxes.includes(index+1) ? 'selected' : ''}`}
                onMouseDown={() => handleMouseDown(index+1)}
                onMouseEnter={() => handleMouseEnter(index+1)}
            >
                { index+1 }
                </div> 
        ))}
    </div>
  )
}

export default SelectableGrid;