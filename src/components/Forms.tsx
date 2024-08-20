import "../styles/Forms.css"

const Header = () => (
  <header className="card">
    <h1 className="inter">CV Generator</h1>
    <a href="http://github.com/tuhindas56/top-cv-application" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  </header>
)

const Name = () => (
  <form className="card">
    <h2>Identity</h2>

    <label className="input__label" htmlFor="name">
      Name
    </label>
    <input className="input__field" type="text" name="name" id="name" placeholder="John Doe" required />
  </form>
)

const ContactDetails = () => {
  return (
    <form className="card">
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
        required
      />

      <label className="input__label" htmlFor="phone">
        Phone no.
      </label>
      <input className="input__field" type="tel" id="phone" name="phone" placeholder="+1 XXX-XXX-XXXX" />
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

const Forms = () => (
  <div className="inter form-container">
    <Header />
    <Name />
    <ContactDetails />
    <EducationDetails />
    <SkillDetails />
    <WorkExperience />
  </div>
)

export default Forms
