import './Resume.css'
import heroImg from './assets/OIP.jpg'

const resume = {
  name: 'M.Abhiram',
  title: 'Full Stack Developer',
  email: 'madalaabhiram129@gmail.com',
  phone: '6305145801',
  location: 'India',
  github: 'github.com/MadalaAbhiram',
  linkedin: 'linkedin.com/in/Madala Abhiram',
  summary:
    'Passionate full stack developer with experience building modern web applications. I love turning ideas into clean, performant products.',
  techStack: [
    {
      category: 'Frontend',
      icon: '🖥️',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite'],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      items: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
      category: 'Database',
      icon: '🗄️',
      items: ['MongoDB', 'MySQL'],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify'],
    },
    {
      category: 'Currently Learning',
      icon: '📚',
      items: ['TypeScript', 'Docker', 'Next.js', 'Tailwind CSS', 'Linux'],
    },
  ],

  // ── Academic career ──────────────────────────────────
  academic: [
    // 10th
    {
      type: 'school',
      level: '10th',
      school: 'WiseWoods Viswabharathi High School',
      board: 'CBSE Board',
      passedOut: '2023',
      cgpaYears: null,
    },
    // 12th / Intermediate
    {
      type: 'intermediate',
      level: 'Intermediate ',
      school: 'Narayana Junior College',
      board: 'State Board',
      passedOut: '2025',
      cgpaYears: null,
    },
    // University / Degree
    {
      type: 'university',
      level: 'B.Tech — Computer Science & Engineering',
      school: 'State Engineering University',
      board: null,
      percentage: null,
      // Add / remove years as needed
      cgpaYears: [
        { year: '1st Year', cgpa: '9.45' },
      ],
    },
  ],

  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js',
    'Python', 'PostgreSQL', 'MongoDB', 'Docker',
    'Git', 'AWS', 'Figma', 'REST APIs',
  ],
  languages: [
    { lang: 'Telugu', level: 'Native' },
    { lang: 'English', level: 'Good' },
    { lang: 'German', level: 'Intermediate' },
  ],
}

// Icon per academic level
const levelIcon = { school: '🏫', intermediate: '🎒', university: '🎓' }

export default function Resume() {
  return (
    <div className="cv-page">
      {/* ── Sidebar ── */}
      <aside className="cv-sidebar">
        <img src={heroImg} alt={resume.name} className="cv-avatar" />
        <h1 className="cv-name">{resume.name}</h1>
        <p className="cv-title">{resume.title}</p>

        <section className="cv-section">
          <h2 className="cv-section-title">Contact</h2>
          <ul className="cv-contact-list">
            <li>
              <span className="cv-icon" aria-hidden="true">✉</span>
              <a href={`mailto:${resume.email}`}>{resume.email}</a>
            </li>
            <li>
              <span className="cv-icon" aria-hidden="true">📞</span>
              {resume.phone}
            </li>
            <li>
              <span className="cv-icon" aria-hidden="true">📍</span>
              {resume.location}
            </li>
            <li>
              <span className="cv-icon" aria-hidden="true">🐙</span>
              <a href={`https://${resume.github}`} target="_blank" rel="noreferrer">
                {resume.github}
              </a>
            </li>
            <li>
              <span className="cv-icon" aria-hidden="true">💼</span>
              <a href={`https://${resume.linkedin}`} target="_blank" rel="noreferrer">
                {resume.linkedin}
              </a>
            </li>
          </ul>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Skills</h2>
          <div className="cv-skills">
            {resume.skills.map((s) => (
              <span key={s} className="cv-skill-tag">{s}</span>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">Languages</h2>
          <ul className="cv-lang-list">
            {resume.languages.map(({ lang, level }) => (
              <li key={lang}>
                <span className="cv-lang-name">{lang}</span>
                <span className="cv-lang-level">{level}</span>
              </li>
            ))}
          </ul>
        </section>

        <button
          className="cv-download-btn"
          onClick={() => window.print()}
          aria-label="Download resume as PDF"
        >
          ↓ Download PDF
        </button>
      </aside>

      {/* ── Main content ── */}
      <main className="cv-main">
        <section className="cv-section">
          <h2 className="cv-section-title">About Me</h2>
          <p className="cv-summary">{resume.summary}</p>
        </section>

        {/* ── What I've Learned ── */}
        <section className="cv-section">
          <h2 className="cv-section-title">What I've Learned</h2>
          <div className="cv-tech-grid">
            {resume.techStack.map((group) => (
              <div key={group.category} className="cv-tech-card">
                <h3 className="cv-tech-category">
                  <span aria-hidden="true">{group.icon}</span> {group.category}
                </h3>
                <div className="cv-tech-tags">
                  {group.items.map((item) => (
                    <span key={item} className={`cv-tech-tag ${group.category === 'Currently Learning' ? 'learning' : ''}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Academic Career ── */}
        <section className="cv-section">
          <h2 className="cv-section-title">Academic Career</h2>
          <div className="cv-timeline">
            {resume.academic.map((edu, i) => (
              <article key={i} className="cv-timeline-item">
                <div className="cv-timeline-dot ac-dot" aria-hidden="true" />
                <div className="cv-timeline-body">

                  {/* Header row */}
                  <div className="cv-job-header">
                    <div>
                      <h3 className="cv-job-role">
                        <span className="ac-level-icon" aria-hidden="true">
                          {levelIcon[edu.type]}
                        </span>
                        {edu.level}
                      </h3>
                      <span className="cv-job-company">{edu.school}</span>
                      {edu.board && (
                        <span className="ac-board">{edu.board}</span>
                      )}
                    </div>
                    <span className="cv-job-period">Passed out {edu.passedOut}</span>
                  </div>

                  {/* Percentage badge (10th / 12th) */}
                  {edu.percentage && (
                    <div className="ac-score-row">
                      <span className="ac-score-label">Percentage</span>
                      <span className="ac-score-value">{edu.percentage}</span>
                    </div>
                  )}

                  {/* Year-wise CGPA table (university) */}
                  {edu.cgpaYears && (
                    <div className="ac-cgpa-block">
                      <p className="ac-cgpa-heading">Year-wise CGPA</p>
                      <div className="ac-cgpa-grid">
                        {edu.cgpaYears.map(({ year, cgpa }) => (
                          <div key={year} className="ac-cgpa-card">
                            <span className="ac-cgpa-year">{year}</span>
                            <span className="ac-cgpa-val">{cgpa}</span>
                            {/* Visual bar */}
                            <div className="ac-cgpa-bar-track" aria-hidden="true">
                              <div
                                className="ac-cgpa-bar-fill"
                                style={{ width: `${(parseFloat(cgpa) / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
