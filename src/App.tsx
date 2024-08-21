import { useState } from "react"
import "./styles/App.css"
import Forms from "./components/Forms"
import ResumePreview from "./components/ResumePreview"

export type ReactFormInputEvent = React.FormEvent<HTMLInputElement>

function App() {
  const [identity, setIdentity] = useState({ name: "", role: "" })
  const [contact, setContact] = useState({ email: "", phone: "" })
  const initialMap: Map<string, string> = new Map()
  const [skills, setSkills] = useState(initialMap)

  return (
    <div className="main-container">
      <Forms identity={{ identity, setIdentity }} contact={{ contact, setContact }} skills={{ skills, setSkills }} />
      <ResumePreview identity={identity} contact={contact} skills={skills} />
    </div>
  )
}

export default App
