import { useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import word from "./wordList.json"

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    const randomIndex = Math.floor(Math.random() * word.length)
    return word[randomIndex]
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  return (
    <div style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        margin: "0 auto"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign:"center"}}>Lose Win</div>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />
    </div>
  )
}

export default App
