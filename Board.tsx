import React from 'react';
import { StyleSheet, View } from 'react-native';
import Row from './Row';

interface BoardProps {
    cells: string[][];
    cellsStatus: ('wrong' | 'place' | 'right')[][];
    currentRow: number;
    currentCell: number;
    handleKeyPress?: (key: string) => void; // Opcional, se não for usado diretamente no Board
    checkGuess?: () => void; // Opcional, se não for usado diretamente no Board
    usedLetters: Set<string>;
    gameOver: boolean;
}

const Board: React.FC<BoardProps> = ({ cells, cellsStatus, currentRow, currentCell }) => {
    return (
        <View style={styles.board}>
            {cells.map((row, rowIndex) => (
                <Row
                    key={rowIndex}
                    cells={row}
                    cellsStatus={cellsStatus[rowIndex]}
                    currentRow={currentRow}
                    currentCell={currentCell}
                    rowIndex={rowIndex}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        gap: 5,
        marginBottom: 20,
    },
});

export default Board;