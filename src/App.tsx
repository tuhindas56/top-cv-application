import { useState } from "react"
import "./styles/App.css"
import Forms from "./components/Forms"
import ResumePreview from "./components/ResumePreview"

export type ReactFormInputEvent = React.FormEvent<HTMLInputElement>

function App() {
  const [identity, setIdentity] = useState({ name: "", role: "" })
  const [contact, setContact] = useState({ email: "", phone: "" })

  return (
    <div className="main-container">
      <Forms identity={identity} setIdentity={setIdentity} contact={contact} setContact={setContact} />
      <ResumePreview identity={identity} contact={contact} />
    </div>
  )
}

export default App
