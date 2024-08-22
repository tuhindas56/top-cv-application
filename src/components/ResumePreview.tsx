import "../styles/ResumePreview.css"
import { Contact, Education, Identity } from "../sharedTypes"

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
      {durationFrom} - {durationTo}
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

// const WorkExperienceDetail = ({
//   company = "Tempest",
//   duration = { from: "20XX", to: "20XX" },
//   responsibilities = ["slacked off", "also slacked off", "slacked off some more"],
//   role = "Web Developer",
// }: WorkExperience) => (
//   <div className="sub-section">
//     <h4 className="jsf-sans">{role}</h4>
//     <p className="company jsf-sans">{company}</p>
//     <p className="duration jsf-sans">
//       {duration.from} - {duration.to}
//     </p>

//     <ul className="inter">
//       {responsibilities.map((responsibility, index) => (
//         <li key={index}>{responsibility}</li>
//       ))}
//     </ul>
//   </div>
// )

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
  education,
  skills,
}: {
  identity: Identity
  contact: Contact
  education: Map<string, Education>
  skills: Map<string, string>
}) => (
  <div className="resumepreview card">
    <div className="name-and-role">
      <h2 className="jsf-sans">{identity.name ? identity.name : "Name"}</h2>
      <h3 className="jsf-sans role">{identity.role ? identity.role : "Role"}</h3>
    </div>

    <ContactSection contact={contact} />
    <EducationSection education={education} />
    <SkillsSection skills={skills} />
    <WorkExperienceSection />

    <button onClick={() => window.print()} className="button inter savecv">
      Save CV
    </button>
  </div>
)

export default ResumePreview
