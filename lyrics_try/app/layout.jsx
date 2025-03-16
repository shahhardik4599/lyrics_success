import "./globals.css"

export const metadata = {
  title: "Lyrics Finder",
  description: "Find lyrics for your favorite songs",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

