import { useState } from "react"
import "./styles/App.css"
import Forms from "./components/Forms"
import ResumePreview from "./components/ResumePreview"

export type ReactFormInputEvent = React.FormEvent<HTMLInputElement>

function App() {
  const [identity, setIdentity] = useState({ name: "", role: "" })
  const [contact, setContact] = useState({ email: "", phone: "" })
  const [skills, setSkills] = useState(new Map())
  const [education, setEducation] = useState(new Map())

  return (
    <div className="main-container">
      <Forms
        identity={{ identity, setIdentity }}
        contact={{ contact, setContact }}
        education={{ education, setEducation }}
        skills={{ skills, setSkills }}
      />
      <ResumePreview identity={identity} contact={contact} education={education} skills={skills} />
    </div>
  )
}

export default App
