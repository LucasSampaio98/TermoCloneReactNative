import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CellProps {
    value: string;
    status: 'wrong' | 'place' | 'right'; // Removido 'cell' e 'active' da união, pois eles são tratados separadamente
    isActive: boolean;
}

const Cell: React.FC<CellProps> = ({ value, status, isActive }) => {
    return (
        <View style={[styles.cell, styles[status], isActive && styles.active]}>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 4,
        margin: 5,
    },
    right: {
        backgroundColor: '#6aaa64',
        borderColor: '#6aaa64',
        color: 'white',
    },
    place: {
        backgroundColor: '#c9b458',
        borderColor: '#c9b458',
        color: 'white',
    },
    wrong: {
        backgroundColor: '#787c7e',
        borderColor: '#787c7e',
        color: 'white',
    },
    active: {
        borderColor: '#333',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Cell;