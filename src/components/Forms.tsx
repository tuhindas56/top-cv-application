import { useState } from "react"
import { v4 as uuid } from "uuid"
import { ReactFormInputEvent } from "../App"
import { Contact, Education, Identity } from "../sharedTypes"
import "../styles/Forms.css"

type SetContactState = React.Dispatch<React.SetStateAction<Contact>>
type SetIdentityState = React.Dispatch<React.SetStateAction<Identity>>
type SetEducationState = React.Dispatch<React.SetStateAction<Map<string, Education>>>
type SetSkillState = React.Dispatch<React.SetStateAction<Map<string, string>>>

interface FormsProps {
  contact: { contact: Contact; setContact: SetContactState }
  identity: { identity: Identity; setIdentity: SetIdentityState }
  education: { education: Map<string, Education>; setEducation: SetEducationState }
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
        Phone no. (optional)
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

const EducationDetails = ({ education: { education, setEducation } }: { education: FormsProps["education"] }) => {
  const [educationInputs, setEducationInputs] = useState({
    courseInput: "",
    durationFromInput: "",
    durationToInput: "",
    instituteInput: "",
  })
  const [minDate, setMinDate] = useState("")
  const [editing, setEditing] = useState({ id: "", beingEdited: false })

  const handleInstituteInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setEducationInputs({ ...educationInputs, instituteInput: target.value })
  }

  const handleCourseInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setEducationInputs({ ...educationInputs, courseInput: target.value })
  }

  const handleDurationFromInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setMinDate(target.value)
    setEducationInputs({ ...educationInputs, durationFromInput: target.value })
  }

  const handleDurationToInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setEducationInputs({ ...educationInputs, durationToInput: target.value })
  }

  const handleAddEducation = () => {
    if (educationInputs.instituteInput && educationInputs.durationFromInput && educationInputs.durationToInput) {
      const newMap = new Map(education)
      newMap.set(uuid(), {
        course: educationInputs.courseInput,
        durationFrom: educationInputs.durationFromInput,
        durationTo: educationInputs.durationToInput,
        institute: educationInputs.instituteInput,
      })

      setEducation(newMap)
      setEducationInputs({
        courseInput: "",
        durationFromInput: "",
        durationToInput: "",
        instituteInput: "",
      })
    }
  }

  const handleEducationEdit = (id: string) => {
    setEditing({ id, beingEdited: true })
    const { course, durationFrom, durationTo, institute } = education.get(id)!
    setEducationInputs({
      courseInput: course,
      durationFromInput: durationFrom,
      durationToInput: durationTo,
      instituteInput: institute,
    })
  }

  const handleConfirmEditEducation = (id: string) => {
    if (educationInputs.instituteInput && educationInputs.durationFromInput && educationInputs.durationToInput) {
      const newMap = new Map(education)
      newMap.set(id, {
        course: educationInputs.courseInput,
        durationFrom: educationInputs.durationFromInput,
        durationTo: educationInputs.durationToInput,
        institute: educationInputs.instituteInput,
      })

      setEducation(newMap)
      setEducationInputs({
        courseInput: "",
        durationFromInput: "",
        durationToInput: "",
        instituteInput: "",
      })
      setEditing({ id: "", beingEdited: false })
    } else {
      alert("Fill required fields or cancel edit and delete item")
    }
  }

  const handleCancelEditEducation = () => {
    setEditing({ id: "", beingEdited: false })
    setEducationInputs({
      courseInput: "",
      durationFromInput: "",
      durationToInput: "",
      instituteInput: "",
    })
  }

  const handleEducationDelete = (id: string) => {
    const newMap = new Map(education)
    newMap.delete(id)
    setEducation(newMap)
  }

  return (
    <div className="card">
      <h2>Education</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="institute" className="input__label">
          Institute
        </label>
        <input
          className="input__field"
          type="text"
          name="institute"
          id="institute"
          placeholder="School/University"
          onChange={(event) => handleInstituteInputChange(event)}
          value={educationInputs.instituteInput}
        />

        <label htmlFor="course" className="input__label">
          Course (optional)
        </label>
        <input
          className="input__field"
          type="text"
          name="course"
          id="course"
          placeholder="Bachelor of Commerce"
          onChange={(event) => handleCourseInputChange(event)}
          value={educationInputs.courseInput}
        />

        <label htmlFor="durationFrom" className="input__label">
          From
        </label>
        <input
          className="input__field"
          type="date"
          name="durationFrom"
          id="durationFrom"
          onChange={(event) => handleDurationFromInputChange(event)}
          value={educationInputs.durationFromInput}
        />

        <label htmlFor="durationTo" className="input__label">
          To
        </label>
        <input
          className="input__field"
          type="date"
          name="durationTo"
          id="durationTo"
          onChange={(event) => handleDurationToInputChange(event)}
          value={educationInputs.durationToInput}
          min={minDate}
        />

        {editing.beingEdited ? (
          <>
            <button className="button" type="submit" onClick={() => handleConfirmEditEducation(editing.id)}>
              Confirm
            </button>
            <button className="button" type="button" onClick={handleCancelEditEducation}>
              Cancel
            </button>
          </>
        ) : (
          <button className="button" type="submit" onClick={handleAddEducation}>
            + Add education
          </button>
        )}
      </form>

      <ul>
        {Array.from(education).map(([id, education]) => (
          <li key={id} className="list-item education-item">
            <div>
              <p>{education.institute}</p>
            </div>

            {!editing.beingEdited && (
              <div>
                <button className="button" onClick={() => handleEducationEdit(id)}>
                  Edit
                </button>
                {"|"}
                <button className="button" onClick={() => handleEducationDelete(id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
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
    if (skillInput) {
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

const Forms = ({ identity, contact, education, skills }: FormsProps) => (
  <div className="inter form-container">
    <Header />
    <IdentityDetails identity={identity} />
    <ContactDetails contact={contact} />
    <EducationDetails education={education} />
    <SkillDetails skills={skills} />
    <WorkExperience />
  </div>
)

export default Forms
