"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})
const client = new QueryClient

export default function RootLayout({children}) {
  return (
		<QueryClientProvider client={client}>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</QueryClientProvider>
  )
}
