import { useState } from "react"
import { v4 as uuid } from "uuid"
import "./styles/App.css"
import Forms from "./components/Forms"
import ResumePreview from "./components/ResumePreview"

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
    workplace: "XYZ Tech Solutions",
    role: "Junior Frontend Developer",
    durationFrom: "2022-01-01",
    durationTo: "2024-01-01",
    responsibilities:
      "Developed responsive web apps with HTML, CSS, and React, boosting user engagement by 30% \n Collaborated on UI/UX design, increasing site accessibility by 20%",
  })
  initialWorkxp.set(uuid(), {
    workplace: "Web Innovators Ltd.",
    role: "Full-Stack Developer",
    durationFrom: "2019-06-01",
    durationTo: "2021-12-01",
    responsibilities:
      "Built scalable web apps using Node.js and MongoDB, cutting server load times by 40% \n Led a 4-member team on an e-commerce platform, increasing client revenue by 25%",
  })
  initialWorkxp.set(uuid(), {
    workplace: "CodeCraft Technologies",
    role: " Back-End Developer",
    durationFrom: "2016-01-01",
    durationTo: "2017-01-01",
    responsibilities:
      "Developed RESTful APIs with Python/Django, enabling smooth front-end integration \n Optimized database queries, improving response times by 35%",
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
