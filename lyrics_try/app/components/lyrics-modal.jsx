"use client"

import { useState } from "react"

export default function LyricsModal({ isOpen, onClose, singer, song }) {
  const [lyrics, setLyrics] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!lyrics) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitResult({ success: true, message: "Lyrics submitted successfully!" })
      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
        setLyrics("")
        setSubmitResult(null)
      }, 2000)
    } catch (error) {
      setSubmitResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Submit Lyrics</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Singer/Artist</label>
              <p className="font-medium">{singer}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Song</label>
              <p className="font-medium">{song}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lyrics" className="block font-medium">
              Lyrics
            </label>
            <textarea
              id="lyrics"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter the song lyrics here"
              className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {submitResult && (
            <div
              className={`p-3 rounded-md ${submitResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {submitResult.message}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Lyrics"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

