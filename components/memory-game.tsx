"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemoryGameProps {
  className?: string
  gridSize?: 4 | 6
  difficulty?: "easy" | "medium" | "hard"
}

type CardType = {
  id: number
  content: string
  flipped: boolean
  matched: boolean
}

export function MemoryGame({ className, gridSize = 4, difficulty = "medium" }: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)

  // Emojis for card content based on difficulty
  const easyEmojis = ["🌟", "🌈", "🌞", "🌙", "🌎", "🌹", "🍎", "🍋"]
  const mediumEmojis = [
    "🌟",
    "🌈",
    "🌞",
    "🌙",
    "🌎",
    "🌹",
    "🍎",
    "🍋",
    "🍉",
    "🍇",
    "🍓",
    "🍒",
    "🥝",
    "🍍",
    "🥥",
    "🥑",
    "🥦",
    "🌽",
  ]
  const hardEmojis = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
  ]

  // Initialize the game
  useEffect(() => {
    initializeGame()
  }, [gridSize, difficulty])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  // Initialize the game with cards
  const initializeGame = () => {
    const totalPairs = Math.pow(gridSize, 2) / 2
    let emojis: string[] = []

    // Select emojis based on difficulty
    switch (difficulty) {
      case "easy":
        emojis = easyEmojis.slice(0, totalPairs)
        break
      case "medium":
        emojis = mediumEmojis.slice(0, totalPairs)
        break
      case "hard":
        emojis = hardEmojis.slice(0, totalPairs)
        break
    }

    // Create pairs of cards
    const cardPairs = emojis.flatMap((emoji, index) => [
      { id: index * 2, content: emoji, flipped: false, matched: false },
      { id: index * 2 + 1, content: emoji, flipped: false, matched: false },
    ])

    // Shuffle the cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameStarted(false)
    setGameCompleted(false)
    setTimer(0)
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start the game on first click
    if (!gameStarted) {
      setGameStarted(true)
    }

    // Ignore click if game is completed or card is already flipped/matched
    if (gameCompleted || flippedCards.length >= 2) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    // Flip the card
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // Update the cards state
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((card) => card.id === firstId)
      const secondCard = cards.find((card) => card.id === secondId)

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // Match found
        setMatchedPairs((prev) => prev + 1)
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === firstId || card.id === secondId ? { ...card, matched: true } : card)),
        )
        setFlippedCards([])

        // Check if all pairs are matched
        if (matchedPairs + 1 === Math.pow(gridSize, 2) / 2) {
          setGameCompleted(true)
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => (card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Game stats */}
      <div className="flex justify-between w-full mb-4">
        <div className="bg-[#111111] border border-[#1A1A1A] rounded px-3 py-1 text-sm">
          <span className="text-text-secondary mr-1">Moves:</span>
          <span className="text-gold">{moves}</span>
        </div>
        <div className="bg-[#111111] border border-[#1A1A1A] rounded px-3 py-1 text-sm">
          <span className="text-text-secondary mr-1">Time:</span>
          <span className="text-gold">{formatTime(timer)}</span>
        </div>
        <div className="bg-[#111111] border border-[#1A1A1A] rounded px-3 py-1 text-sm">
          <span className="text-text-secondary mr-1">Pairs:</span>
          <span className="text-gold">
            {matchedPairs}/{Math.pow(gridSize, 2) / 2}
          </span>
        </div>
      </div>

      {/* Game completed message */}
      {gameCompleted && (
        <div className="bg-gold/20 border border-gold/30 rounded-lg p-4 mb-4 text-center">
          <h3 className="text-gold font-bold text-lg mb-1">Congratulations!</h3>
          <p className="text-text-secondary mb-2">
            You completed the game in {moves} moves and {formatTime(timer)}.
          </p>
          <Button onClick={initializeGame} className="bg-gold hover:bg-gold-hover text-black">
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </div>
      )}

      {/* Game grid */}
      <div
        className={cn("grid gap-2", gridSize === 4 ? "grid-cols-4" : "grid-cols-6")}
        style={{ maxWidth: gridSize === 4 ? "320px" : "480px" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg text-2xl font-bold cursor-pointer transition-all duration-300 transform",
              card.flipped || card.matched
                ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
                : "bg-[#111111] border-[#1A1A1A] hover:bg-[#1A1A1A]",
              card.matched && "bg-gradient-to-br from-gold/20 to-gold/30 border-gold/30",
              "border",
            )}
            onClick={() => handleCardClick(card.id)}
            style={{ width: gridSize === 4 ? "75px" : "60px", height: gridSize === 4 ? "75px" : "60px" }}
          >
            {(card.flipped || card.matched) && card.content}
          </div>
        ))}
      </div>

      {/* Game controls */}
      <div className="mt-4">
        <Button
          onClick={initializeGame}
          variant="outline"
          className="border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Game
        </Button>
      </div>
    </div>
  )
}
