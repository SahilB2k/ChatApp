"use client"
import { auth, provider } from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import "../styles/Auth.css"

const cookies = new Cookies()
export default function Auth(props) {
  const { setIsAuth } = props

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h1 className="auth-title">ChatConnect</h1>
        <p>Join thousands of users chatting in real-time across multiple rooms</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>

        <div className="auth-features">
          <div className="auth-feature">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="feature-text">Group Chats</div>
          </div>

          <div className="auth-feature">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="feature-text">Secure</div>
          </div>

          <div className="auth-feature">
            <div className="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="feature-text">Real-time</div>
          </div>
        </div>
      </div>
    </div>
  )
}

