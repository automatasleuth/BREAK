"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Flag, HelpCircle, X } from "lucide-react"

type CellState = {
  revealed: boolean
  hasMine: boolean
  flagged: boolean
  adjacentMines: number
}

type GameState = "idle" | "playing" | "won" | "lost"
type Difficulty = "novice" | "advanced" | "break"

interface DifficultyConfig {
  label: string
  mineCount: number
  gridSize: number
}

interface MinesweeperGameProps {
  width?: number
  height?: number
  mineCount?: number
  className?: string
}

export function MinesweeperGame({ width = 7, height = 7, mineCount = 10, className = "" }: MinesweeperGameProps) {
  const [board, setBoard] = useState<CellState[][]>([])
  const [gameState, setGameState] = useState<GameState>("idle")
  const [flagMode, setFlagMode] = useState(false)
  const [flagsPlaced, setFlagsPlaced] = useState(0)
  const [timer, setTimer] = useState(0)
  const [showRules, setShowRules] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("advanced")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Difficulty configurations
  const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
    novice: { label: "Novice", mineCount: 5, gridSize: 7 },
    advanced: { label: "Advanced", mineCount: 10, gridSize: 7 },
    break: { label: "Break", mineCount: 15, gridSize: 7 },
  }

  // Get current difficulty config
  const currentConfig = difficultyConfigs[difficulty]
  const currentMineCount = currentConfig.mineCount
  const currentGridSize = currentConfig.gridSize

  // Initialize the game board
  const initializeBoard = useCallback(() => {
    // Create empty board
    const newBoard: CellState[][] = Array(currentGridSize)
      .fill(null)
      .map(() =>
        Array(currentGridSize)
          .fill(null)
          .map(() => ({
            revealed: false,
            hasMine: false,
            flagged: false,
            adjacentMines: 0,
          })),
      )

    // Place mines randomly
    let minesLeft = currentMineCount
    while (minesLeft > 0) {
      const x = Math.floor(Math.random() * currentGridSize)
      const y = Math.floor(Math.random() * currentGridSize)

      if (!newBoard[y][x].hasMine) {
        newBoard[y][x].hasMine = true
        minesLeft--
      }
    }

    // Calculate adjacent mines
    for (let y = 0; y < currentGridSize; y++) {
      for (let x = 0; x < currentGridSize; x++) {
        if (newBoard[y][x].hasMine) continue

        let count = 0
        // Check all 8 adjacent cells
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < currentGridSize && nx >= 0 && nx < currentGridSize && newBoard[ny][nx].hasMine) {
              count++
            }
          }
        }
        newBoard[y][x].adjacentMines = count
      }
    }

    setBoard(newBoard)
    setGameState("idle")
    setFlagsPlaced(0)
    setTimer(0)

    // Clear any existing timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [currentGridSize, currentMineCount])

  // Initialize on first render or when difficulty changes
  useEffect(() => {
    initializeBoard()

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [initializeBoard, difficulty])

  // Start the timer on first click
  const startTimer = useCallback(() => {
    if (gameState !== "playing" && gameState !== "idle") return

    // Only start timer if it's not already running
    if (!intervalRef.current) {
      setGameState("playing")
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
  }, [gameState])

  // Stop timer when game ends
  useEffect(() => {
    if (gameState === "won" || gameState === "lost") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gameState])

  // Reveal a cell and handle game logic
  const revealCell = (x: number, y: number) => {
    if (gameState === "won" || gameState === "lost" || board[y][x].revealed || board[y][x].flagged) return

    // Start timer on first click
    startTimer()

    const newBoard = [...board]

    // If it's a mine, game over
    if (newBoard[y][x].hasMine) {
      // Reveal all mines
      for (let y = 0; y < currentGridSize; y++) {
        for (let x = 0; x < currentGridSize; x++) {
          if (newBoard[y][x].hasMine) {
            newBoard[y][x].revealed = true
          }
        }
      }
      setBoard(newBoard)
      setGameState("lost")
      return
    }

    // Reveal the cell
    newBoard[y][x].revealed = true

    // If it's an empty cell (no adjacent mines), reveal adjacent cells recursively
    if (newBoard[y][x].adjacentMines === 0) {
      const revealAdjacent = (x: number, y: number) => {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue
            const ny = y + dy
            const nx = x + dx
            if (
              ny >= 0 &&
              ny < currentGridSize &&
              nx >= 0 &&
              nx < currentGridSize &&
              !newBoard[ny][nx].revealed &&
              !newBoard[ny][nx].flagged
            ) {
              newBoard[ny][nx].revealed = true
              if (newBoard[ny][nx].adjacentMines === 0) {
                revealAdjacent(nx, ny)
              }
            }
          }
        }
      }
      revealAdjacent(x, y)
    }

    setBoard(newBoard)

    // Check if player has won
    checkWinCondition(newBoard)
  }

  // Toggle flag on a cell
  const toggleFlag = (x: number, y: number) => {
    if (gameState === "won" || gameState === "lost" || board[y][x].revealed) return

    // Start timer on first flag
    startTimer()

    const newBoard = [...board]

    // If already flagged, remove flag
    if (newBoard[y][x].flagged) {
      newBoard[y][x].flagged = false
      setFlagsPlaced((prev) => prev - 1)
    }
    // If not flagged and we haven't used all flags, add flag
    else if (flagsPlaced < currentMineCount) {
      newBoard[y][x].flagged = true
      setFlagsPlaced((prev) => prev + 1)
    }

    setBoard(newBoard)

    // Check if player has won
    checkWinCondition(newBoard)
  }

  // Check if the player has won
  const checkWinCondition = (currentBoard: CellState[][]) => {
    // Win condition: all non-mine cells are revealed
    let allNonMinesRevealed = true

    for (let y = 0; y < currentGridSize; y++) {
      for (let x = 0; x < currentGridSize; x++) {
        if (!currentBoard[y][x].hasMine && !currentBoard[y][x].revealed) {
          allNonMinesRevealed = false
          break
        }
      }
      if (!allNonMinesRevealed) break
    }

    if (allNonMinesRevealed) {
      setGameState("won")

      // Flag all mines
      const newBoard = [...currentBoard]
      for (let y = 0; y < currentGridSize; y++) {
        for (let x = 0; x < currentGridSize; x++) {
          if (newBoard[y][x].hasMine) {
            newBoard[y][x].flagged = true
          }
        }
      }
      setBoard(newBoard)
      setFlagsPlaced(currentMineCount)
    }
  }

  // Handle cell click based on current mode
  const handleCellClick = (x: number, y: number) => {
    if (flagMode) {
      toggleFlag(x, y)
    } else {
      revealCell(x, y)
    }
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get cell content based on its state
  const getCellContent = (cell: CellState) => {
    if (!cell.revealed) {
      return cell.flagged ? <Flag className="h-4 w-4" /> : null
    }

    if (cell.hasMine) {
      return "💣"
    }

    if (cell.adjacentMines === 0) {
      return null
    }

    return cell.adjacentMines
  }

  // Get cell color based on its state
  const getCellColor = (cell: CellState, x: number, y: number) => {
    if (cell.revealed) {
      if (cell.hasMine) {
        return "bg-red-900 text-white"
      }
      return (x + y) % 2 === 0
        ? "bg-[#111111] text-gold hover:bg-[#111111]"
        : "bg-[#0A0A0A] text-gold hover:bg-[#0A0A0A]"
    }

    return (x + y) % 2 === 0 ? "bg-gold/20 hover:bg-gold/30 text-white" : "bg-gold/30 hover:bg-gold/40 text-white"
  }

  const resetGame = () => {
    initializeBoard()
  }

  // Change difficulty and reset game
  const changeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    // Game will reset due to the useEffect dependency on difficulty
  }

  return (
    <div className={`w-full h-full flex flex-col justify-between ${className}`}>
      {/* Game container with background */}
      <div className="w-full h-full flex flex-col bg-[#0A0A0A] rounded-xl overflow-hidden">
        {/* Game header with controls */}
        <div className="flex justify-center items-center py-4 px-2 space-x-3 bg-[#080808]">
          <div className="bg-[#111111] border border-[#1A1A1A] rounded px-2 py-1 text-sm flex items-center">
            <span className="text-gold mr-1">💣</span>
            <span className="text-gold">{currentMineCount - flagsPlaced}</span>
          </div>
          <div className="bg-[#111111] border border-[#1A1A1A] rounded px-2 py-1 text-sm flex items-center">
            <span className="text-gold mr-1">⏱️</span>
            <span className="text-gold">{formatTime(timer)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 w-8 p-0 rounded ${flagMode ? "bg-gold/30 text-white" : "bg-[#111111] text-gold"}`}
            onClick={() => setFlagMode(!flagMode)}
            title={flagMode ? "Flag Mode (active)" : "Flag Mode"}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded bg-[#111111] text-gold"
            onClick={resetGame}
            title="New Game"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded bg-[#111111] text-gold"
            onClick={() => setShowRules(true)}
            title="Rules & Difficulty"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>

        {/* Game board - centered and filling available space */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Game status message - positioned absolutely over the board */}
          {(gameState === "won" || gameState === "lost") && (
            <div
              className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full text-sm font-medium ${
                gameState === "won" ? "bg-gold/80 text-black" : "bg-red-900/80 text-white"
              }`}
            >
              {gameState === "won" ? "YOU WIN! 🎉" : "GAME OVER! 💥"}
            </div>
          )}

          {/* Rules and difficulty overlay - Redesigned to fit the container */}
          {showRules && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-[#0A0A0A] border border-gold/20 rounded-lg w-[300px] shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-[#080808] px-4 py-3 flex justify-between items-center border-b border-[#1A1A1A]">
                  <h3 className="text-gold font-bold">Minesweeper Rules</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-white"
                    onClick={() => setShowRules(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Rules content */}
                <div className="p-4">
                  <ul className="space-y-2 text-xs text-gray-300 mb-4">
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>Click on squares to reveal what's underneath.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>Numbers show how many mines are adjacent to that square.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>Use the flag button or right-click to mark suspected mines.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>Reveal all non-mine squares to win!</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>Be careful - clicking on a mine ends the game!</span>
                    </li>
                  </ul>

                  <h4 className="text-gold font-bold text-sm mb-2">Difficulty</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(difficultyConfigs) as Difficulty[]).map((diff) => (
                      <button
                        key={diff}
                        className={`py-1 px-2 rounded text-xs font-medium transition-colors ${
                          difficulty === diff ? "bg-gold text-black" : "bg-[#111111] text-gray-300 hover:bg-[#1A1A1A]"
                        }`}
                        onClick={() => {
                          changeDifficulty(diff)
                          setShowRules(false)
                        }}
                      >
                        {difficultyConfigs[diff].label}
                        <div className="text-[10px] mt-0.5 opacity-80">{difficultyConfigs[diff].mineCount} mines</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: `repeat(${currentGridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${currentGridSize}, minmax(0, 1fr))`,
            }}
          >
            {board.map((row, y) =>
              row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  className={`w-[42px] h-[42px] flex items-center justify-center text-sm font-medium rounded-md transition-colors ${getCellColor(
                    cell,
                    x,
                    y,
                  )}`}
                  onClick={() => handleCellClick(x, y)}
                  disabled={gameState === "won" || gameState === "lost" || cell.revealed}
                >
                  {getCellContent(cell)}
                </button>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
