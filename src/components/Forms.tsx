import { ReactFormInputEvent } from "../App"
import { Contact, Identity } from "../sharedTypes"
import "../styles/Forms.css"

interface FormsProps {
  contact: Contact
  identity: Identity
  setContact: SetContactState
  setIdentity: SetIdentityState
}

type SetContactState = React.Dispatch<React.SetStateAction<Contact>>
type SetIdentityState = React.Dispatch<React.SetStateAction<Identity>>

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

const IdentityDetails = ({ identity, setIdentity }: { identity: Identity; setIdentity: SetIdentityState }) => {
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

const ContactDetails = ({ contact, setContact }: { contact: Contact; setContact: SetContactState }) => {
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

const SkillDetails = () => {
  const handleClick = () => {
    alert("added")
  }
  return (
    <div className="card">
      <h2>Skills</h2>
      <button className="button" onClick={handleClick}>
        + Add skill
      </button>
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

const Forms = ({ identity, setIdentity, contact, setContact }: FormsProps) => (
  <div className="inter form-container">
    <Header />
    <IdentityDetails identity={identity} setIdentity={setIdentity} />
    <ContactDetails contact={contact} setContact={setContact} />
    <EducationDetails />
    <SkillDetails />
    <WorkExperience />
  </div>
)

export default Forms
