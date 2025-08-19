import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import Board from './Board';
import HelpModal from './HelpModal';

function App() {
  const [cells, setCells] = useState<string[][]>(Array(6).fill(null).map(() => Array(5).fill('')));
  const [cellsStatus, setCellsStatus] = useState<('wrong' | 'place' | 'right')[][]>(Array(6).fill(null).map(() => Array(5).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set<string>());
  const [message, setMessage] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const initGame = () => {
    setTargetWord(getRandomWord());
    setCells(Array(6).fill(null).map(() => Array(5).fill('')));
    setCellsStatus(Array(6).fill(null).map(() => Array(5).fill('')));
    setCurrentRow(0);
    setCurrentCell(0);
    setGameOver(false);
    setUsedLetters(new Set());
    setMessage('');
  };

  const getRandomWord = () => {
    const words = [
      "ABRIR", "AMIGO", "BANHO", "CAIXA", "DIZER",
      "FALAR", "GOSTO", "HORAS", "JOGAR", "LIVRO",
      "NOITE", "OCUPA", "PAPEL", "QUASE",
      "RADIO", "SABER", "TARDE", "UNIDO", "VIVER"
    ];
    return words[Math.floor(Math.random() * words.length)];
  };

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'Enter') {
      const guess = cells[currentRow].join('');
      if (guess.length === 5) {
        checkGuess();
      } else {
        setMessage('Preencha todas as letras!');
        setTimeout(() => setMessage(''), 2000);
      }
    } else if (key === 'Backspace') {
      if (currentCell > 0) {
        const newCells = [...cells];
        newCells[currentRow][currentCell - 1] = '';
        setCells(newCells);
        setCurrentCell(currentCell - 1);
      }
    } else if (/^[A-Za-z]$/.test(key) && currentCell < 5) {
      const newCells = [...cells];
      newCells[currentRow][currentCell] = key.toUpperCase();
      setCells(newCells);
      if (currentCell < 4) {
        setCurrentCell(currentCell + 1);
      } else {
        checkGuess(); // Automaticamente checa a palavra quando a última letra é inserida
      }
    }
  };

  const checkGuess = () => {
    const guess = cells[currentRow].join('').toUpperCase();
    const targetLetters = targetWord.split('');

    if (guess === targetWord) {
      setCellsStatus(prevStatus => {
        const newStatus = [...prevStatus];
        newStatus[currentRow] = Array(5).fill('right');
        return newStatus;
      });
      setMessage('Acertou!');
      setGameOver(true);
      setTimeout(initGame, 2000);
    } else {
      let newStatus = Array(5).fill('wrong');
      // Primeiro, verifica as letras na posição correta
      for (let i = 0; i < 5; i++) {
        if (cells[currentRow][i].toUpperCase() === targetLetters[i]) {
          newStatus[i] = 'right';
          targetLetters[i] = ''; // Marca como verificada
        }
      }
      // Depois, verifica as letras que estão na palavra mas na posição errada
      for (let i = 0; i < 5; i++) {
        if (newStatus[i] !== 'right') {
          const index = targetLetters.indexOf(cells[currentRow][i].toUpperCase());
          if (index !== -1) {
            newStatus[i] = 'place';
            targetLetters[index] = ''; // Marca como verificada
          }
        }
      }

      setCellsStatus(prevStatus => {
        const newStatusArray = [...prevStatus];
        newStatusArray[currentRow] = newStatus;
        return newStatusArray;
      });

      // Atualiza letras usadas
      const newUsedLetters = new Set(usedLetters);
      cells[currentRow].forEach((letter, index) => {
        if (newStatus[index] === 'wrong' && !targetWord.includes(letter.toUpperCase())) {
          newUsedLetters.add(letter.toUpperCase());
        }
      });
      setUsedLetters(newUsedLetters);

      // Verifica condição de derrota
      if (currentRow === 5) {
        setMessage(`Tente novamente! A palavra era ${targetWord}`);
        setGameOver(true);
        setTimeout(initGame, 2000);
      } else {
        setCurrentRow(currentRow + 1);
        setCurrentCell(0);
      }
    }
  };

  const handleTextChange = (text: string) => {
    const upperText = text.toUpperCase();
    setInputValue(upperText);

    // Atualiza as células com a nova entrada
    const newCells = [...cells];
    for (let i = 0; i < 5; i++) {
      newCells[currentRow][i] = upperText[i] || '';
    }
    setCells(newCells);

    // Se a entrada tiver exatamente 5 letras, simula pressionar Enter
    if (upperText.length === 5) {
      handleKeyPress('Enter');
    }
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Termo Clone</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleTextChange}
        maxLength={5}
        keyboardType="ascii-capable"
        onSubmitEditing={() => handleKeyPress('Enter')}
        blurOnSubmit={false}
        autoCapitalize="characters"
      />
      <Board
        cells={cells}
        cellsStatus={cellsStatus}
        currentRow={currentRow}
        currentCell={currentCell}
        handleKeyPress={handleKeyPress}
        checkGuess={checkGuess}
        usedLetters={usedLetters}
        gameOver={gameOver}
      />
      <Text style={styles.usedLetters}>Letras não presentes: {Array.from(usedLetters).join(', ')}</Text>
      <Button title="?" onPress={() => setShowModal(true)} />
      {showModal && <HelpModal onClose={() => setShowModal(false)} show={true} />}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  usedLetters: {
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#6aaa64',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});

export default App;