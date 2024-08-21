import "../styles/ResumePreview.css"
import { Contact, Identity } from "../sharedTypes"

interface Duration {
  from: string
  to: string
}

interface EducationDetail {
  isSchool: boolean
  course: string
  duration: Duration
  school: string
  university: string
}

interface WorkExperienceDetail {
  company: string
  duration: Duration
  responsibilities: string[]
  role: string
}

const ContactSection = ({ contact }: { contact: Contact }) => (
  <section className="contact">
    <h3 className="jsf-sans">Contact</h3>

    <p className="email inter">{contact.email ? contact.email : "youremail@example.com"}</p>
    <p className="phone inter">{contact.phone ? contact.phone : "+1-XXX-XXX-XXXX"}</p>
  </section>
)

const EducationQualification = ({
  isSchool = false,
  course = "No course",
  duration = { from: "20XX", to: "20XX" },
  school = "Some cool high school",
  university,
}: EducationDetail) => (
  <div className="sub-section">
    <h4 className="jsf-sans">Educational Qualification</h4>

    <p className="jsf-sans">{isSchool ? "School" : "University"}</p>
    <p className="jsf-sans">{school || university}</p>

    {!isSchool && <p className="course inter">{course}</p>}
    <p className="duration jsf-sans">
      {duration.from} - {duration.to}
    </p>
  </div>
)

const EducationSection = () => (
  <section className="education">
    <h3 className="jsf-sans">Education</h3>

    {/* <EducationQualification isSchool={false} />
    <EducationQualification isSchool={true} /> */}
  </section>
)

const SkillsSection = ({ skills }: { skills: Map<string, string> }) => {
  const skillsArray = Array.from(skills)

  return (
    <section className="skill">
      <h3 className="jsf-sans">Skills</h3>

      {!skillsArray.length ? (
        <p className="inter">Skills appear here</p>
      ) : (
        <ul className="inter">
          {skillsArray.map(([id, skill]) => (
            <li key={id}>{skill}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

const WorkExperience = ({
  company = "Tempest",
  duration = { from: "20XX", to: "20XX" },
  responsibilities = ["slacked off", "also slacked off", "slacked off some more"],
  role = "Web Developer",
}: WorkExperienceDetail) => (
  <div className="sub-section">
    <h4 className="jsf-sans">{role}</h4>
    <p className="company jsf-sans">{company}</p>
    <p className="duration jsf-sans">
      {duration.from} - {duration.to}
    </p>

    <ul className="inter">
      {responsibilities.map((responsibility, index) => (
        <li key={index}>{responsibility}</li>
      ))}
    </ul>
  </div>
)

const WorkExperienceSection = () => (
  <section className="work">
    <h3 className="jsf-sans">Work Experience</h3>

    {/* <WorkExperience />
    <WorkExperience />
    <WorkExperience /> */}
  </section>
)

const ResumePreview = ({
  identity,
  contact,
  skills,
}: {
  identity: Identity
  contact: Contact
  skills: Map<string, string>
}) => (
  <div className="resumepreview card">
    <div className="name-and-role">
      <h2 className="jsf-sans">{identity.name ? identity.name : "Name"}</h2>
      <h3 className="jsf-sans role">{identity.role ? identity.role : "Role"}</h3>
    </div>

    <ContactSection contact={contact} />
    <EducationSection />
    <SkillsSection skills={skills} />
    <WorkExperienceSection />

    <button onClick={() => window.print()} className="button inter savecv">
      Save CV
    </button>
  </div>
)

export default ResumePreview
