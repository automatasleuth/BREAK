"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, RotateCcw, Timer, Trophy, Zap, ArrowLeft, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { MinesweeperGame } from "@/components/minesweeper-game"
import Image from "next/image"

type GameType = "selection" | "memory" | "minesweeper" | "word" | "pattern"

export default function StimulatePage() {
  const [selectedGame, setSelectedGame] = useState<GameType>("selection")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const handleBackToSelection = () => {
    setSelectedGame("selection")
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <Brain className="mr-3 h-6 w-6 text-green-400" />
          Stimulate
        </h1>
        <p className="text-text-secondary">
          Engage your brain with puzzles and mental challenges to boost cognitive function.
        </p>
      </div>

      {selectedGame === "selection" ? (
        // Game selection view
        <div className="space-y-8">
          {/* Featured Games Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-gold" />
              <span>Featured Games</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Memory Game Card */}
              <GameCardNew
                title="Memory Game"
                description="Test and improve your memory"
                imagePlaceholder="memory-game"
                category="Memory"
                duration="5 min"
                xp={25}
                color="green"
                onClick={() => setSelectedGame("memory")}
              />

              {/* Minesweeper Game Card */}
              <GameCardNew
                title="Minesweeper"
                description="Clear the board without mines"
                imageSrc="/images/minesweeper-icon.png"
                category="Strategy"
                duration="5 min"
                xp={25}
                color="gold"
                onClick={() => setSelectedGame("minesweeper")}
              />

              {/* Word Puzzle Card */}
              <GameCardNew
                title="Word Puzzle"
                description="Challenge your vocabulary"
                imagePlaceholder="word-puzzle"
                category="Language"
                duration="5 min"
                xp={25}
                color="blue"
                onClick={() => setSelectedGame("word")}
              />

              {/* Pattern Match Card */}
              <GameCardNew
                title="Pattern Match"
                description="Identify visual patterns"
                imagePlaceholder="pattern-match"
                category="Visual"
                duration="5 min"
                xp={25}
                color="purple"
                onClick={() => setSelectedGame("pattern")}
              />
            </div>
          </div>

          {/* Brain Benefits Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="mr-2 h-5 w-5 text-gold" />
              <span>Brain Benefits</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BenefitItem
                title="Improved Memory"
                description="Strengthens recall and recognition abilities"
                color="green"
              />
              <BenefitItem
                title="Enhanced Focus"
                description="Trains sustained attention and concentration"
                color="gold"
              />
              <BenefitItem title="Mental Agility" description="Improves cognitive processing speed" color="blue" />
              <BenefitItem
                title="Pattern Recognition"
                description="Enhances visual processing and problem-solving"
                color="purple"
              />
            </div>
          </div>
        </div>
      ) : (
        // Game view with back button
        <div>
          <Button
            variant="outline"
            size="sm"
            className="mb-4 bg-black border-[#1A1A1A] text-white hover:bg-[#222222]"
            onClick={handleBackToSelection}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {selectedGame === "memory" && <MemoryGame />}
              {selectedGame === "minesweeper" && <MinesweeperGame className="h-full" />}
              {selectedGame === "word" && <ComingSoonGame title="Word Puzzle" />}
              {selectedGame === "pattern" && <ComingSoonGame title="Pattern Match" />}
            </div>

            <div className="space-y-6">
              <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
                <CardHeader>
                  <CardTitle className="flex items-center text-gold">
                    <Trophy className="mr-2 h-5 w-5 text-gold" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-text-secondary">Best Time</p>
                        <p className="font-medium">00:45</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Games Played</p>
                        <p className="font-medium">12</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-text-secondary">Win Rate</p>
                        <p className="font-medium">75%</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">XP Earned</p>
                        <p className="font-medium text-gold">250 XP</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
                <CardHeader>
                  <CardTitle className="flex items-center text-gold">
                    <Zap className="mr-2 h-5 w-5 text-gold" />
                    Game Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedGame === "memory" && (
                      <>
                        <BenefitListItem text="Improves short-term memory" />
                        <BenefitListItem text="Enhances concentration" />
                        <BenefitListItem text="Develops visual recognition" />
                        <BenefitListItem text="Boosts attention to detail" />
                      </>
                    )}
                    {selectedGame === "minesweeper" && (
                      <>
                        <BenefitListItem text="Develops logical reasoning" />
                        <BenefitListItem text="Improves decision making" />
                        <BenefitListItem text="Enhances pattern recognition" />
                        <BenefitListItem text="Trains risk assessment" />
                      </>
                    )}
                    {selectedGame === "word" && (
                      <>
                        <BenefitListItem text="Expands vocabulary" />
                        <BenefitListItem text="Improves language skills" />
                        <BenefitListItem text="Enhances word recognition" />
                        <BenefitListItem text="Boosts verbal reasoning" />
                      </>
                    )}
                    {selectedGame === "pattern" && (
                      <>
                        <BenefitListItem text="Strengthens visual processing" />
                        <BenefitListItem text="Develops abstract thinking" />
                        <BenefitListItem text="Improves problem-solving" />
                        <BenefitListItem text="Enhances cognitive flexibility" />
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function GameCardNew({
  title,
  description,
  imagePlaceholder,
  imageSrc,
  category,
  duration,
  xp,
  color = "gold",
  onClick,
}: {
  title: string
  description: string
  imagePlaceholder?: string
  imageSrc?: string
  category: string
  duration: string
  xp: number
  color?: "green" | "gold" | "blue" | "purple"
  onClick: () => void
}) {
  // Map of colors to gradient and accent colors
  const colorMap: Record<string, { bgColor: string; accentColor: string; hoverBg: string }> = {
    green: {
      bgColor: "bg-[#0A1A0A]",
      accentColor: "text-green-400",
      hoverBg: "group-hover:bg-[#0F2A0F]",
    },
    gold: {
      bgColor: "bg-[#1A1500]",
      accentColor: "text-gold",
      hoverBg: "group-hover:bg-[#2A2200]",
    },
    blue: {
      bgColor: "bg-[#0A1A2A]",
      accentColor: "text-blue-400",
      hoverBg: "group-hover:bg-[#0F253A]",
    },
    purple: {
      bgColor: "bg-[#1A0A1A]",
      accentColor: "text-purple-400",
      hoverBg: "group-hover:bg-[#2A152A]",
    },
  }

  const { bgColor, accentColor, hoverBg } = colorMap[color]

  return (
    <div
      className={`rounded-xl overflow-hidden border border-[#1A1A1A] ${bgColor} transition-all duration-300 cursor-pointer group`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {imageSrc ? (
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 ${bgColor} ${hoverBg} transition-colors duration-300`}
          >
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              width={120}
              height={120}
              className="w-auto h-auto max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ) : (
          <div
            className={`absolute inset-0 flex items-center justify-center ${bgColor} ${hoverBg} transition-colors duration-300`}
          >
            <p className="text-xs text-white/50">Image: {imagePlaceholder}</p>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 rounded-full p-3">
            <Play className={`h-8 w-8 ${accentColor}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-1 ${accentColor}`}>{title}</h3>
        <p className="text-sm text-white/70 mb-3">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${accentColor} border-opacity-30 bg-black/30`}>
              {category}
            </span>
            <span className="text-xs text-white/50">{duration}</span>
          </div>
          <div className={`text-xs font-medium ${accentColor}`}>+{xp} XP</div>
        </div>
      </div>
    </div>
  )
}

function BenefitItem({
  title,
  description,
  color,
}: {
  title: string
  description: string
  color: "green" | "gold" | "blue" | "purple"
}) {
  const colorClasses = {
    green: "from-green-500/10 to-green-500/5 border-green-500/20",
    gold: "from-gold/10 to-gold/5 border-gold/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
  }

  return (
    <div className={`p-4 rounded-lg bg-gradient-to-br ${colorClasses[color]} border`}>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  )
}

function BenefitListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-green-400"></div>
      <p className="text-sm">{text}</p>
    </li>
  )
}

function ComingSoonGame({ title }: { title: string }) {
  return (
    <Card className="bg-[#0A0A0A] border-[#1A1A1A] h-full">
      <CardHeader>
        <CardTitle className="text-gold">{title}</CardTitle>
        <CardDescription>Coming soon</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[400px]">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-medium mb-2">Under Construction</h3>
        <p className="text-text-secondary text-center max-w-md">
          We're working hard to bring you this exciting new game. Check back soon!
        </p>
      </CardContent>
    </Card>
  )
}

function MemoryGame() {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const emojis = {
    easy: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    medium: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
    hard: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔"],
  }

  const difficultyConfig = {
    easy: { pairs: 8, cols: 4 },
    medium: { pairs: 12, cols: 6 },
    hard: { pairs: 16, cols: 8 },
  }

  // Initialize game on mount and when difficulty changes
  useState(() => {
    initializeGame()
  })

  const initializeGame = () => {
    const { pairs } = difficultyConfig[difficulty]
    const selectedEmojis = emojis[difficulty].slice(0, pairs)

    // Create pairs of cards
    const cardPairs = [...selectedEmojis, ...selectedEmojis].map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }))

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setTimer(0)
    setGameCompleted(false)
    setGameStarted(false)
  }

  const handleCardClick = (index: number) => {
    // Placeholder for card click handler
    console.log("Card clicked:", index)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const { cols } = difficultyConfig[difficulty]

  return (
    <Card className="bg-[#0A0A0A] border-[#1A1A1A] h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-gold">Memory Game</CardTitle>
          <CardDescription>Match pairs of cards to win</CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Timer className="h-4 w-4 mr-1 text-gold/70" />
            <span className="text-sm font-mono">{formatTime(timer)}</span>
          </div>
          <div className="flex items-center">
            <Brain className="h-4 w-4 mr-1 text-gold/70" />
            <span className="text-sm">{moves} moves</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <Button
              key={level}
              variant="outline"
              size="sm"
              className={cn(
                "border-[#1A1A1A] bg-black text-white hover:bg-[#222222]",
                difficulty === level && "border-green-400/30 bg-green-400/10 text-green-400",
              )}
              onClick={() => {
                setDifficulty(level)
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="border-[#1A1A1A] bg-black text-white hover:bg-[#222222] ml-auto"
            onClick={initializeGame}
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Reset
          </Button>
        </div>

        {gameCompleted && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-center">
            <p className="font-medium text-green-400">Congratulations! You won!</p>
            <p className="text-sm text-text-secondary">
              Completed in {formatTime(timer)} with {moves} moves
            </p>
          </div>
        )}

        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-medium mb-2">Memory Game</h3>
            <p className="text-text-secondary max-w-md mb-4">
              Test your memory by matching pairs of cards. The faster you match all pairs, the higher your score!
            </p>
            <Button onClick={initializeGame} className="bg-green-500 hover:bg-green-600 text-black">
              Start Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
