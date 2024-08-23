import { useState } from "react"
import { v4 as uuid } from "uuid"
import { Contact, Education, Identity, WorkExperience } from "../sharedTypes"
import "../styles/Forms.css"

type ReactFormInputEvent = React.FormEvent<HTMLInputElement>
type SetContactState = React.Dispatch<React.SetStateAction<Contact>>
type SetIdentityState = React.Dispatch<React.SetStateAction<Identity>>
type SetEducationState = React.Dispatch<React.SetStateAction<Map<string, Education>>>
type SetSkillState = React.Dispatch<React.SetStateAction<Map<string, string>>>
type SetWorkState = React.Dispatch<React.SetStateAction<Map<string, WorkExperience>>>

interface FormsProps {
  contact: { contact: Contact; setContact: SetContactState }
  identity: { identity: Identity; setIdentity: SetIdentityState }
  education: { education: Map<string, Education>; setEducation: SetEducationState }
  skills: { skills: Map<string, string>; setSkills: SetSkillState }
  work: { workxp: Map<string, WorkExperience>; setWorkxp: SetWorkState }
}

interface HeaderProps {
  setIdentity: SetIdentityState
  setContact: SetContactState
  setEducation: SetEducationState
  setSkills: SetSkillState
  setWorkxp: SetWorkState
}

const Header = ({ setIdentity, setContact, setEducation, setSkills, setWorkxp }: HeaderProps) => (
  <header className="card">
    <h1 className="inter">CV Generator</h1>

    <p>
      built by{" "}
      <a href="http://github.com/tuhindas56/top-cv-application" target="_blank" rel="noopener noreferrer">
        Tuhin Das
      </a>
    </p>

    <button
      className="button"
      onClick={() => {
        setIdentity({ name: "", role: "" })
        setContact({ email: "", phone: "" })
        setEducation(new Map())
        setSkills(new Map())
        setWorkxp(new Map())
      }}
      style={{ display: "block", margin: "1rem 0 0 0", padding: "0" }}
    >
      Reset all inputs
    </button>
  </header>
)

const IdentityForm = ({ identity: { identity, setIdentity } }: { identity: FormsProps["identity"] }) => {
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

const ContactForm = ({ contact: { contact, setContact } }: { contact: FormsProps["contact"] }) => {
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

const EducationForm = ({ education: { education, setEducation } }: { education: FormsProps["education"] }) => {
  const [educationInputs, setEducationInputs] = useState({
    courseInput: "",
    durationFromInput: "",
    durationToInput: "",
    instituteInput: "",
  })
  const [date, setDate] = useState({ min: "", max: "" })
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
    setDate({ ...date, min: target.value })
    setEducationInputs({ ...educationInputs, durationFromInput: target.value })
  }

  const handleDurationToInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setDate({ ...date, max: target.value })
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
          max={date.max}
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
          min={date.min}
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

const SkillForm = ({ skills: { skills, setSkills } }: { skills: FormsProps["skills"] }) => {
  const [skillInput, setSkillInput] = useState("")
  const [editing, setEditing] = useState({ id: "", beingEdited: false })

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

  const handleSkillDelete = (id: string) => {
    const newSkills = new Map(skills)
    newSkills.delete(id)
    setSkills(newSkills)
  }

  const handleSkillEdit = (id: string) => {
    const prevSkill = skills.get(id)!
    setEditing({ id, beingEdited: true })
    setSkillInput(prevSkill)
  }

  const handleConfirmSkillEdit = (id: string) => {
    if (skillInput) {
      const newMap = new Map(skills)
      newMap.set(id, skillInput)

      setSkills(newMap)
      setSkillInput("")
      setEditing({ id: "", beingEdited: false })
    } else {
      alert("Fill required fields or cancel edit and delete item")
    }
  }

  const handleCancelSkillEdit = () => {
    setEditing({ id: "", beingEdited: false })
    setSkillInput("")
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
        {!editing.beingEdited ? (
          <button className="button" onClick={handleAddSkill}>
            + Add skill
          </button>
        ) : (
          <>
            <button className="button" type="submit" onClick={() => handleConfirmSkillEdit(editing.id)}>
              Confirm
            </button>
            <button className="button" type="button" onClick={handleCancelSkillEdit}>
              Cancel
            </button>
          </>
        )}
      </form>

      <ul>
        {Array.from(skills).map(([id, skill]) => (
          <li key={id} className="list-item">
            <span>{skill}</span>
            {!editing.beingEdited && (
              <div>
                <button className="button" onClick={() => handleSkillEdit(id)}>
                  Edit
                </button>
                {"|"}
                <button className="button" onClick={() => handleSkillDelete(id)}>
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

const WorkExperienceForm = ({ work: { workxp, setWorkxp } }: { work: FormsProps["work"] }) => {
  const [workInputs, setWorkInputs] = useState({
    workplace: "",
    role: "",
    durationFrom: "",
    durationTo: "",
    responsibilities: "",
  })
  const [editing, setEditing] = useState({ id: "", beingEdited: false })
  const [date, setDate] = useState({ min: "", max: "" })

  const handleAddWork = () => {
    if (
      workInputs.workplace &&
      workInputs.durationFrom &&
      workInputs.durationTo &&
      workInputs.role &&
      workInputs.responsibilities
    ) {
      const newMap = new Map(workxp)
      newMap.set(uuid(), {
        workplace: workInputs.workplace,
        durationFrom: workInputs.durationFrom,
        durationTo: workInputs.durationTo,
        role: workInputs.role,
        responsibilities: workInputs.responsibilities,
      })

      setWorkxp(newMap)
      setWorkInputs({
        workplace: "",
        durationFrom: "",
        durationTo: "",
        role: "",
        responsibilities: "",
      })
    }
  }

  const handleWorkplaceInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setWorkInputs({ ...workInputs, workplace: target.value })
  }

  const handleRoleInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setWorkInputs({ ...workInputs, role: target.value })
  }

  const handleDurationFromInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setDate({ ...date, min: target.value })
    setWorkInputs({ ...workInputs, durationFrom: target.value })
  }

  const handleDurationToInputChange = (event: ReactFormInputEvent) => {
    const target = event.target as HTMLInputElement
    setDate({ ...date, max: target.value })
    setWorkInputs({ ...workInputs, durationTo: target.value })
  }

  const handleResponsibilitiesInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement
    setWorkInputs({ ...workInputs, responsibilities: target.value })
  }

  const handleWorkDelete = (id: string) => {
    const newMap = new Map(workxp)
    newMap.delete(id)
    setWorkxp(newMap)
  }

  const handleWorkEdit = (id: string) => {
    setEditing({ id, beingEdited: true })
    const { workplace, durationFrom, durationTo, role, responsibilities } = workxp.get(id)!
    setWorkInputs({ workplace, durationFrom, durationTo, role, responsibilities })
  }

  const handleConfirmEditWork = (id: string) => {
    if (
      workInputs.workplace &&
      workInputs.durationFrom &&
      workInputs.durationTo &&
      workInputs.role &&
      workInputs.responsibilities
    ) {
      const newMap = new Map(workxp)
      newMap.set(id, {
        workplace: workInputs.workplace,
        durationFrom: workInputs.durationFrom,
        durationTo: workInputs.durationTo,
        role: workInputs.role,
        responsibilities: workInputs.responsibilities,
      })

      setWorkxp(newMap)
      setWorkInputs({
        workplace: "",
        durationFrom: "",
        durationTo: "",
        role: "",
        responsibilities: "",
      })
      setEditing({ id: "", beingEdited: false })
    }
  }

  const handleCancelEditWork = () => {
    setWorkInputs({
      workplace: "",
      durationFrom: "",
      durationTo: "",
      role: "",
      responsibilities: "",
    })
    setEditing({ id: "", beingEdited: false })
  }

  return (
    <div className="card">
      <h2>Work Experience</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="workplace" className="input__label">
          Workplace
        </label>
        <input
          className="input__field"
          type="text"
          name="workplace"
          id="workplace"
          placeholder="Youtube"
          onChange={(event) => handleWorkplaceInputChange(event)}
          value={workInputs.workplace}
        />

        <label htmlFor="workRole" className="input__label">
          Role
        </label>
        <input
          className="input__field"
          type="text"
          name="workRole"
          id="workRole"
          placeholder="Junior Frontend Developer"
          onChange={(event) => handleRoleInputChange(event)}
          value={workInputs.role}
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
          value={workInputs.durationFrom}
          max={date.max}
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
          value={workInputs.durationTo}
          min={date.min}
        />

        <label htmlFor="responsibility" className="input__label">
          Responsibilities
        </label>
        <textarea
          className="input__field"
          name="responsibility"
          id="responsibility"
          onChange={handleResponsibilitiesInputChange}
          value={workInputs.responsibilities}
          placeholder="To add a new bullet point, move to a new line"
          rows={6}
        ></textarea>

        {editing.beingEdited ? (
          <>
            <button className="button" type="submit" onClick={() => handleConfirmEditWork(editing.id)}>
              Confirm
            </button>
            <button className="button" type="button" onClick={handleCancelEditWork}>
              Cancel
            </button>
          </>
        ) : (
          <button className="button" onClick={handleAddWork}>
            + Add work experience
          </button>
        )}
      </form>

      <ul>
        {Array.from(workxp).map(([id, work]) => (
          <li key={id} className="list-item education-item">
            <div>
              <p>{work.workplace}</p>
            </div>

            {!editing.beingEdited && (
              <div>
                <button className="button" onClick={() => handleWorkEdit(id)}>
                  Edit
                </button>
                {"|"}
                <button className="button" onClick={() => handleWorkDelete(id)}>
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

const Forms = ({ identity, contact, education, skills, work }: FormsProps) => (
  <div className="inter form-container">
    <Header
      setIdentity={identity.setIdentity}
      setContact={contact.setContact}
      setEducation={education.setEducation}
      setSkills={skills.setSkills}
      setWorkxp={work.setWorkxp}
    />
    <IdentityForm identity={identity} />
    <ContactForm contact={contact} />
    <EducationForm education={education} />
    <SkillForm skills={skills} />
    <WorkExperienceForm work={work} />
  </div>
)

export default Forms
