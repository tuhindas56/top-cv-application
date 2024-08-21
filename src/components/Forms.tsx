import { useState } from "react"
import { v4 as uuid } from "uuid"
import { ReactFormInputEvent } from "../App"
import { Contact, Identity } from "../sharedTypes"
import "../styles/Forms.css"

type SetContactState = React.Dispatch<React.SetStateAction<Contact>>
type SetIdentityState = React.Dispatch<React.SetStateAction<Identity>>
type SetSkillState = React.Dispatch<React.SetStateAction<Map<string, string>>>

interface FormsProps {
  contact: { contact: Contact; setContact: SetContactState }
  identity: { identity: Identity; setIdentity: SetIdentityState }
  skills: { skills: Map<string, string>; setSkills: SetSkillState }
}

const Header = () => (
  <header className="card">
    <h1 className="inter">CV Generator</h1>

    <a href="http://github.com/tuhindas56/top-cv-application" target="_blank" rel="noopener noreferrer">
      Source
    </a>
    {" | "}
    <a
      href="https://www.canva.com/p/templates/EAFC-9sdKHg-black-and-white-minimalist-simple-design-freelancer-resume/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Design
    </a>
  </header>
)

const IdentityDetails = ({ identity: { identity, setIdentity } }: { identity: FormsProps["identity"] }) => {
  const handleNameChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setIdentity({ ...identity, name: target.value })
  }

  const handleRoleChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setIdentity({ ...identity, role: target.value })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="card">
      <h2>Identity</h2>

      <label className="input__label" htmlFor="name">
        Name
      </label>
      <input
        className="input__field"
        type="text"
        name="name"
        id="name"
        placeholder="John Doe"
        onChange={handleNameChange}
        value={identity.name}
      />

      <label className="input__label" htmlFor="role">
        Role
      </label>
      <input
        className="input__field"
        type="text"
        name="role"
        id="role"
        placeholder="Web Developer"
        onChange={handleRoleChange}
        value={identity.role}
      />
    </form>
  )
}

const ContactDetails = ({ contact: { contact, setContact } }: { contact: FormsProps["contact"] }) => {
  const handleEmailChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setContact({ ...contact, email: target.value })
  }

  const handlePhoneChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setContact({ ...contact, phone: target.value })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="card">
      <h2>Contact</h2>

      <label className="input__label" htmlFor="email">
        Email address
      </label>
      <input
        className="input__field"
        type="email"
        name="email"
        id="email"
        placeholder="youremail@example.com"
        onChange={handleEmailChange}
        value={contact.email}
      />

      <label className="input__label" htmlFor="phone">
        Phone no.
      </label>
      <input
        className="input__field"
        type="tel"
        id="phone"
        name="phone"
        placeholder="+1 XXX-XXX-XXXX"
        onChange={handlePhoneChange}
        value={contact.phone}
      />
    </form>
  )
}

const EducationDetails = () => {
  const handleClick = () => {
    alert("added")
  }
  return (
    <div className="card">
      <h2>Education</h2>

      <button className="button" onClick={handleClick}>
        + Add education
      </button>

      <form className="education-form hidden">
        <select name="levelofeducation" id="levelofeducation">
          <option value="school">School</option>
          <option value="college">College</option>
          <option value="university">University</option>
        </select>
      </form>
    </div>
  )
}

const SkillDetails = ({ skills: { skills, setSkills } }: { skills: FormsProps["skills"] }) => {
  const [skillInput, setSkillInput] = useState("")

  const handleSkillInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setSkillInput(target.value)
  }

  const handleAddSkill = () => {
    if (skillInput && !skills.has(skillInput)) {
      const newMap = new Map(skills)
      newMap.set(uuid(), skillInput)

      setSkills(newMap)
      setSkillInput("")
    }
  }

  const handleSkillEdit = (id: string) => {
    const newValue = prompt("Edit skill", skills.get(id))
    if (newValue === "") {
      handleSkillDelete(id)
    } else if (newValue === null) {
      alert("Edit cancelled")
    } else {
      const newSkills = new Map(skills)
      newSkills.set(id, newValue)
      setSkills(newSkills)
    }
  }

  const handleSkillDelete = (id: string) => {
    const newSkills = new Map(skills)
    newSkills.delete(id)
    setSkills(newSkills)
  }

  return (
    <div className="card">
      <h2>Skills</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="skill" className="input__label">
          Add a Skill
        </label>
        <input
          className="input__field"
          type="text"
          name="skill"
          id="skill"
          placeholder="JavaScript"
          onChange={handleSkillInputChange}
          value={skillInput}
        />
        <button className="button" onClick={handleAddSkill}>
          + Add skill
        </button>
      </form>

      <ul>
        {Array.from(skills).map(([id, skill]) => (
          <li key={id} className="list-item">
            <span>{skill}</span>
            <div>
              <button className="button" onClick={() => handleSkillEdit(id)}>
                Edit
              </button>
              {"|"}
              <button className="button" onClick={() => handleSkillDelete(id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const WorkExperience = () => {
  const handleClick = () => {
    alert("added")
  }
  return (
    <div className="card">
      <h2>Work Experience</h2>
      <button className="button" onClick={handleClick}>
        + Add work experience
      </button>
    </div>
  )
}

const Forms = ({ identity, contact, skills }: FormsProps) => (
  <div className="inter form-container">
    <Header />
    <IdentityDetails identity={identity} />
    <ContactDetails contact={contact} />
    <EducationDetails />
    <SkillDetails skills={skills} />
    <WorkExperience />
  </div>
)

export default Forms
