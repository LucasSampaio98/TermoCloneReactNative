import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface HelpModalProps {
    show: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <Modal visible={show} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Como Jogar</Text>
                    <Text style={styles.text}>
                        Descubra a palavra certa em 6 tentativas. Depois de cada tentativa, as peças mostram o quão perto você está da solução.
                    </Text>

                    <View style={styles.example}>
                        <Text style={[styles.letter, styles.right]}>T</Text>
                        <Text style={styles.letter}>U</Text>
                        <Text style={styles.letter}>R</Text>
                        <Text style={styles.letter}>M</Text>
                        <Text style={styles.letter}>A</Text>
                    </View>
                    <Text style={styles.text}>
                        A letra <Text style={[styles.letter, styles.right]}>T</Text> faz parte da palavra e está na posição correta.
                    </Text>

                    <View style={styles.example}>
                        <Text style={styles.letter}>V</Text>
                        <Text style={styles.letter}>I</Text>
                        <Text style={[styles.letter, styles.place]}>O</Text>
                        <Text style={styles.letter}>L</Text>
                        <Text style={styles.letter}>A</Text>
                    </View>
                    <Text style={styles.text}>
                        A letra <Text style={[styles.letter, styles.place]}>O</Text> faz parte da palavra mas em outra posição.
                    </Text>

                    <View style={styles.example}>
                        <Text style={styles.letter}>P</Text>
                        <Text style={styles.letter}>U</Text>
                        <Text style={styles.letter}>L</Text>
                        <Text style={[styles.letter, styles.wrong]}>G</Text>
                        <Text style={styles.letter}>A</Text>
                    </View>
                    <Text style={styles.text}>
                        A letra <Text style={[styles.letter, styles.wrong]}>G</Text> não faz parte da palavra.
                    </Text>

                    <Text style={styles.text}>Os acentos são preenchidos automaticamente, e não são considerados nas dicas.</Text>
                    <Text style={styles.text}>As palavras podem possuir letras repetidas.</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 10,
    },
    example: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    letter: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
    },
    right: {
        backgroundColor: '#6aaa64',
        color: 'white',
    },
    place: {
        backgroundColor: '#c9b458',
        color: 'white',
    },
    wrong: {
        backgroundColor: '#787c7e',
        color: 'white',
    },
});

export default HelpModal;