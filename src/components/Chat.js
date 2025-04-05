"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore"
import { auth, db } from "../firebase-config.js"
import "../styles/Chat.css"

export default function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = collection(db, "messages")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    )

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        messages.push({ ...data, id: doc.id })
      })
      setMessages(messages)
    })

    return () => unsubscribe()
  }, [room])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    setIsTyping(false)

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || "Unknown",
      room,
    })

    setNewMessage("")
  }

  const groupMessagesByDate = () => {
    const groups = {}
    messages.forEach((message) => {
      const date = message.createdAt?.toDate
        ? new Date(message.createdAt.toDate()).toDateString()
        : "Pending"
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    return groups
  }

  const messageGroups = groupMessagesByDate()

  return (
    <div className="chat-app">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="room-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div className="chat-header-info">
            <h2>{room}</h2>
            <p>{messages.length} messages</p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="header-button">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="leave-button" onClick={() => window.location.reload()}>
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Leave
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {Object.keys(messageGroups).map((date) => (
          <React.Fragment key={date}>
            <div className="date-divider">{date}</div>
            {messageGroups[date].map((message) => (
              <div
                key={message.id}
                className={`message ${message.user === auth.currentUser?.displayName ? "sent" : "received"}`}
              >
                <div className={`avatar ${message.user === auth.currentUser?.displayName ? "sent" : "received"}`}>
                  {message.user?.charAt(0).toUpperCase()}
                </div>
                <div className="message-bubble">
                  <div className="message-content">{message.text}</div>
                  <div className="message-info">
                    {message.user} •{" "}
                    {message.createdAt?.toDate
                      ? message.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : "Sending..."}
                    {message.user === auth.currentUser?.displayName && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isTyping && (
        <div className="typing-indicator">
          Someone is typing
          <div className="typing-dots">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="new-message-form">
        <div className="message-input-container">
          <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
        </div>
        <button type="submit" className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  )
}
