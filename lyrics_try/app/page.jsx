"use client"

import { useState } from "react"
import LyricsModal from "./components/lyrics-modal"
import LyricsBackground from "./components/lyrics-background"
import AudioWave from "./components/audio-wave"

export default function Home() {
  const [singer, setSinger] = useState("")
  const [song, setSong] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!singer || !song) return

    setIsLoading(true)

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate no lyrics found to show the modal
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error searching lyrics:", error)
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Lyrics Animation Background */}
      <LyricsBackground />

      {/* Audio Wave - positioned to align with the form */}
      <div className="fixed inset-x-0 h-40 z-0" style={{ top: "calc(47%" }}>
        <AudioWave />
      </div>

      <div className="w-full max-w-3xl space-y-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">Song Popularity Predictor</h1>
          <p className="text-white/80 mt-2 drop-shadow-md">Predict song’s popularity based on its lyrics</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="singer" className="block text-white font-medium">
                Singer/Artist Name
              </label>
              <input
                id="singer"
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
                placeholder="Enter singer or artist name"
                required
                className="w-full px-3 py-2 bg-white/20 text-white placeholder:text-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="song" className="block text-white font-medium">
                Song Name
              </label>
              <input
                id="song"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Enter song name"
                required
                className="w-full px-3 py-2 bg-white/20 text-white placeholder:text-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Find Lyrics"}
          </button>
        </form>
      </div>

      <LyricsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} singer={singer} song={song} />
    </main>
  )
}

