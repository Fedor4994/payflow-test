"use client"

import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface User {
  id: number
  name: string
  email: string
  phone: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [expandedUsers, setExpandedUsers] = useState<number[]>([])
  const isMobile = useMediaQuery("(max-width: 700px)")

  const toggleUserDetails = (userId: number) => {
    setExpandedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex justify-center bg-[#eee] min-h-screen">
      <div className="relative w-full min-w-[500px] max-w-[800px] bg-white">
        {/* Header */}
        <header className="sticky top-0 h-[50px] w-full bg-white border-b border-[#999] z-10">
          <div className="h-full flex items-center px-4">
            <h1 className="font-bold">Header</h1>
          </div>
        </header>

        <div className="flex relative">
          {/* Main Content */}
          <main className="flex-grow min-h-[calc(100vh-100px)] p-4">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="border rounded p-3">
                  <div className="font-medium">{user.name}</div>
                  {expandedUsers.includes(user.id) && (
                    <div className="mt-2 text-sm text-gray-600">
                      <div>Email: {user.email}</div>
                      <div>Phone: {user.phone}</div>
                    </div>
                  )}
                  <button
                    onClick={() => toggleUserDetails(user.id)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    {expandedUsers.includes(user.id) ? "Hide Details" : "Show Details"}
                  </button>
                </li>
              ))}
            </ul>
          </main>

          {/* Sidebar */}
          <aside
            className={`w-[300px] border-l border-[#ccc] p-4 bg-white transition-all duration-250 
              ${isMobile ? "opacity-0 w-0 p-0 overflow-hidden" : "opacity-100 shadow-sidebar"}
            `}
          >
            <h2 className="font-bold mb-4">Sidebar</h2>
            <div className="space-y-2">
              <p>Sidebar content goes here</p>
              <p>More sidebar content</p>
              {/* Add more content to test scrolling if needed */}
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="py-2">
                  Sidebar item {i + 1}
                </p>
              ))}
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="fixed bottom-0 h-[50px] w-full max-w-[800px] bg-white border-t border-[#999] z-1000">
          <div className="h-full flex items-center px-4">
            <p>Footer</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

