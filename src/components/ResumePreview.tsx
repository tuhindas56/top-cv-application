import { getYear } from "date-fns"
import "../styles/ResumePreview.css"
import { Contact, Education, Identity, WorkExperience } from "../sharedTypes"

const ContactSection = ({ contact }: { contact: Contact }) => (
  <section className="contact">
    <h3 className="jsf-sans">Contact</h3>

    <p className="email inter">{contact.email ? contact.email : "Your email appears here"}</p>
    {contact.phone && <p className="phone inter">{contact.phone}</p>}
  </section>
)

const EducationQualification = ({ course, durationFrom, durationTo, institute }: Education) => (
  <li className="sub-section">
    <h4 className="jsf-sans">Educational Qualification</h4>

    <p className="jsf-sans institute">{institute}</p>

    {course && <p className="course bold">{course}</p>}

    <p className="duration jsf-sans">
      {getYear(durationFrom)} - {getYear(durationTo)}
    </p>
  </li>
)

const EducationSection = ({ education }: { education: Map<string, Education> }) => {
  const educationArray = Array.from(education)

  return (
    <section className="education">
      <h3 className="jsf-sans">Education</h3>

      {!educationArray.length ? (
        <p className="inter">Qualifications appear here</p>
      ) : (
        <ul className="inter">
          {educationArray.map(([id, { course, durationFrom, durationTo, institute }]) => (
            <EducationQualification
              key={id}
              course={course}
              durationFrom={durationFrom}
              durationTo={durationTo}
              institute={institute}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

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

const WorkExperienceDetail = ({ work }: { work: WorkExperience }) => (
  <div className="sub-section">
    <h4 className="jsf-sans">{work.role}</h4>
    <p className="company jsf-sans">{work.workplace}</p>
    <p className="duration jsf-sans">
      {getYear(work.durationFrom)} -{" "}
      {getYear(work.durationTo) === getYear(new Date()) ? "Present" : getYear(work.durationTo)}
    </p>

    <ul className="inter">
      {work.responsibilities.split("\n").map((responsibility: string, index: number) => (
        <li key={index}>{responsibility}</li>
      ))}
    </ul>
  </div>
)

const WorkExperienceSection = ({ workxp }: { workxp: Map<string, WorkExperience> }) => {
  const workArray = Array.from(workxp)

  return (
    <section className="work">
      <h3 className="jsf-sans">Work Experience</h3>

      {!workArray.length ? (
        <p className="inter">Work history appears here</p>
      ) : (
        workArray.map(([id, work]) => <WorkExperienceDetail key={id} work={work} />)
      )}
    </section>
  )
}

const ResumePreview = ({
  identity,
  contact,
  education,
  skills,
  workxp,
}: {
  identity: Identity
  contact: Contact
  education: Map<string, Education>
  skills: Map<string, string>
  workxp: Map<string, WorkExperience>
}) => (
  <div className="resumepreview card">
    <div className="name-and-role">
      <h2 className="jsf-sans">{identity.name ? identity.name : "Name"}</h2>
      <h3 className="jsf-sans role">{identity.role ? identity.role : "Role"}</h3>
    </div>

    <ContactSection contact={contact} />
    <EducationSection education={education} />
    <SkillsSection skills={skills} />
    <WorkExperienceSection workxp={workxp} />

    <button onClick={() => window.print()} className="button inter savecv">
      Save CV
    </button>
  </div>
)

export default ResumePreview
