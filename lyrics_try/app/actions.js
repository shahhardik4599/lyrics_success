"use server"

const BASE_URL = "http://172.20.10.5:3000"; // Your backend server

// Function to fetch lyrics using the expected API format
export async function searchLyrics(singer, song) {
  try {
    const response = await fetch(`${BASE_URL}/get_lyrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_name: song,  // Use correct key expected by API
        performer: singer, // Use correct key expected by API
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) return null; // No lyrics found
      throw new Error("Failed to fetch lyrics");
    }

    const data = await response.json();
    return {
      lyrics: data.lyrics,
      successRate: data.successRate, // Assuming API returns this
    };
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return null;
  }
}

// Function to submit lyrics if not found
export async function submitLyrics(formData) {
  try {
    const singer = formData.get("singer");
    const song = formData.get("song");
    const lyrics = formData.get("lyrics");

    const response = await fetch(`${BASE_URL}/submit_lyrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ song_name: song, performer: singer, lyrics }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit lyrics");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting lyrics:", error);
    return { success: false, error: "Failed to submit lyrics" };
  }
}
