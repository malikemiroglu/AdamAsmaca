import { useEffect, useState, useCallback } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import word from "./wordList.json"
import { HangmanWordCategory } from "./HangmanWordCategory"

function getWord() {
  const randomIndex = Math.floor(Math.random() * word.length)
  return word[randomIndex]
}

function App() {
  const { words, category } = getWord()

  const [wordToGuess, setWordToGuess] = useState(words[Math.floor(Math.random() * words.length)]);

  const [currentCategory, setCurrentCategory] = useState(category)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

 const addGuessedLetter = useCallback((letter:string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const { key } = event
      if(!key.match(/^[a-z]$/)) return

      event.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [guessedLetters])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const { key } = event
      if(key !== "Enter") return

      event.preventDefault();
      setGuessedLetters([])
      setWordToGuess(word);
      setCurrentCategory(category)
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  },[])

  return (
    <div style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign:"center", marginBottom:"10px"}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try! - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWordCategory currentCategory={currentCategory} />
      <HangmanWord 
        reveal={isLoser} 
        guessedLetters={guessedLetters} 
        wordToGuess={wordToGuess} 
      />
      <div style={{ alignSelf: "stretch"}}>
        <Keyboard 
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} 
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
