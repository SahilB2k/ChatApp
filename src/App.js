"use client"

import { useRef, useState, useEffect } from "react"
import "./styles/App.css"
import Auth from "./components/Auth"
import Cookies from "universal-cookie"
import Chat from "./components/Chat"
import { auth } from "./firebase-config.js"
import ErrorBoundary from "./components/ErrorBoundry.js"

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const [userName, setUserName] = useState("")
  const roomInputRef = useRef(null)

  // Get user's display name when authenticated
  useEffect(() => {
    if (isAuth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUserName(user.displayName)
        }
      })

      return () => unsubscribe()
    }
  }, [isAuth])

  const handleLogout = () => {
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  const handleRoomSelect = (roomName) => {
    setRoom(roomName)
  }

  if (!isAuth) {
    return (
      <div className="app">
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <ErrorBoundary>
    <div className="app">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <div className="room-decoration"></div>
          
          <div className="room-header">
            <h2>Join a Chat Room</h2>
            <p className="welcome-message"> 
              Hello, <strong style={{ fontStyle: "normal", fontSize: "21px", color:"#4f4fbc"  }}>{userName}</strong> Choose a room to start chatting.
            </p>
          </div>

          <div className="input-group">
            <label>Enter Room name:</label>
            
            <input ref={roomInputRef} placeholder="e.g., general, tech, random" />
            <div className="input-icon">
              
            </div>
          </div>

          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
             
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
          <button className="logout-button" onClick={handleLogout}>
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>

          <div className="recent-rooms">
            <h3>Popular Rooms</h3>
            <div className="room-chips">
              <div className="room-chip" onClick={() => handleRoomSelect("general")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                general
              </div>
              <div className="room-chip" onClick={() => handleRoomSelect("tech")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                tech
              </div>
              <div className="room-chip" onClick={() => handleRoomSelect("music")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                music
              </div>
              <div className="room-chip" onClick={() => handleRoomSelect("gaming")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="12" x2="10" y2="12"></line>
                  <line x1="8" y1="10" x2="8" y2="14"></line>
                  <circle cx="15" cy="13" r="1"></circle>
                  <circle cx="18" cy="11" r="1"></circle>
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                </svg>
                gaming
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ErrorBoundary>
  )
}

export default App