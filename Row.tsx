import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './Cell';

interface RowProps {
    cells: string[];
    cellsStatus: ('wrong' | 'place' | 'right')[]; // Remover 'string' da união
    currentRow: number;
    currentCell: number;
    rowIndex: number;
}

const Row: React.FC<RowProps> = ({ cells, cellsStatus, rowIndex, currentCell, currentRow }) => {
    return (
        <View style={styles.row}>
            {cells.map((cell, cellIndex) => (
                <Cell
                    key={cellIndex}
                    value={cell}
                    status={cellsStatus[cellIndex]}
                    isActive={rowIndex === currentRow && cellIndex === currentCell}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 5,
    },
});

export default Row;