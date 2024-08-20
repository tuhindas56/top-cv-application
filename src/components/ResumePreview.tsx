import "../styles/ResumePreview.css"

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

const ContactSection = () => (
  <section className="contact">
    <h3 className="jsf-sans">Contact</h3>

    <p className="phone inter">123-456-7890</p>
    <p className="email inter">youremail@example.com</p>
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

    <EducationQualification isSchool={false} />
    <EducationQualification isSchool={true} />
  </section>
)

const SkillsSection = () => (
  <section className="skill">
    <h3 className="jsf-sans">Skills</h3>

    <ul className="inter">
      <li>A skill</li>
      <li>Another skill</li>
      <li>Very valuable skill</li>
    </ul>
  </section>
)

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

    <WorkExperience />
    <WorkExperience />
    <WorkExperience />
  </section>
)

const ResumePreview = () => (
  <div className="resumepreview card">
    <h2 className="jsf-sans">John Davis</h2>

    <ContactSection />
    <EducationSection />
    <SkillsSection />
    <WorkExperienceSection />
  </div>
)

export default ResumePreview
