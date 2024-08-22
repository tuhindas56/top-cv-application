import { useState } from "react"
import { v4 as uuid } from "uuid"
import "./styles/App.css"
import Forms from "./components/Forms"
import ResumePreview from "./components/ResumePreview"

export type ReactFormInputEvent = React.FormEvent<HTMLInputElement>

function App() {
  const initialIdentity = { name: "Avery Davis", role: "Web Developer" }

  const initialContact = { email: "averydavis@email.com", phone: "+1 234-567-890" }

  const initialEducation = new Map()
  initialEducation.set(uuid(), {
    durationFrom: "2010-01-01",
    durationTo: "2022-01-01",
    institute: "Odin School of Projects",
  })
  initialEducation.set(uuid(), {
    course: "Bachelor of Odin",
    durationFrom: "2022-01-01",
    durationTo: "2024-01-01",
    institute: "Odin University",
  })

  const initialSkills = new Map()
  initialSkills.set(uuid(), "ReactJS")
  initialSkills.set(uuid(), "TypeScript")
  initialSkills.set(uuid(), "Webpack")
  initialSkills.set(uuid(), "ViteJS")

  const initialWorkxp = new Map()
  initialWorkxp.set(uuid(), {
    workplace: "The Odin Project",
    role: "Database Admin",
    durationFrom: "2021-01-01",
    durationTo: "2022-01-01",
    responsibilities: "Deleted a database \n Rewrote main git branch",
  })
  initialWorkxp.set(uuid(), {
    workplace: "That New Startup",
    role: "Junior Frontend Developer",
    durationFrom: "2022-01-01",
    durationTo: "2023-01-01",
    responsibilities: "Wrote tightly coupled code \n Called a directory a 'folder' \n Force pushed commits",
  })
  initialWorkxp.set(uuid(), {
    workplace: "McDonalds",
    role: "Cashier",
    durationFrom: "2023-01-01",
    durationTo: "2024-01-01",
    responsibilities: "Greeted people \n Took orders \n Had leftover fries",
  })

  const [identity, setIdentity] = useState(initialIdentity)
  const [contact, setContact] = useState(initialContact)
  const [education, setEducation] = useState(initialEducation)
  const [skills, setSkills] = useState(initialSkills)
  const [workxp, setWorkxp] = useState(initialWorkxp)

  return (
    <div className="main-container">
      <Forms
        identity={{ identity, setIdentity }}
        contact={{ contact, setContact }}
        education={{ education, setEducation }}
        skills={{ skills, setSkills }}
        work={{ workxp, setWorkxp }}
      />
      <ResumePreview identity={identity} contact={contact} education={education} skills={skills} workxp={workxp} />
    </div>
  )
}

export default App
