import React from "react";

export default function HybridProfessionalPlus({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Jennifer Carter",
    title: personal.professional_title || resume?.title || "Senior Business Analyst",
    contact: {
      email: personal.email || resume?.contact?.email || "jennifer.carter@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 345-6789",
      location: personal.location || resume?.contact?.location || "Toronto, Canada",
    },
    summary: personal.summary || resume?.summary || "Strategic Senior Business Analyst with 8+ years translating complex business requirements into technical solutions that drive organizational success. Expert in data analysis, process modeling, stakeholder management, and agile methodologies. Proven track record of bridging communication between business and technical teams, implementing process improvements, and delivering solutions that increase efficiency and reduce costs.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Business Analyst",
        company: "Royal Bank of Canada",
        location: "Toronto, Canada",
        dates: "2019 – Present",
        bullets: [
          "Led requirements gathering for enterprise CRM implementation serving 5,000+ users, conducting 100+ stakeholder interviews and documenting 200+ use cases",
          "Created comprehensive data models and process flows improving operational efficiency by 30% and reducing manual data entry by 500 hours monthly",
          "Collaborated with cross-functional teams to define business logic and technical requirements for 15+ major features, ensuring alignment with strategic objectives",
          "Reduced project rework by 40% through implementation of rigorous requirements validation process and stakeholder sign-off procedures"
        ]
      },
      {
        role: "Business Analyst",
        company: "TD Bank",
        location: "Toronto, Canada",
        dates: "2016 – 2019",
        bullets: [
          "Analyzed complex business processes and identified optimization opportunities, implementing changes that saved $2M annually in operational costs",
          "Developed SQL queries and Tableau dashboards for executive reporting, providing real-time insights into KPIs and enabling data-driven decision making",
          "Facilitated requirements workshops with business stakeholders and technical teams, ensuring clear understanding and alignment across all parties",
          "Achieved 95% stakeholder satisfaction rating through effective communication, proactive problem-solving, and delivery of high-quality documentation"
        ]
      }
    ]).map(exp => ({
      role: exp.role || exp.title || exp.position,
      company: exp.company,
      location: exp.location,
      dates: exp.dates,
      bullets: exp.bullets || []
    })),
    education: (r?.education?.length > 0 ? r.education : resume?.education?.length > 0 ? resume.education : [
      { degree: "MBA Information Systems", institution: "University of Toronto (Rotman)", location: "Toronto, Canada", year: "2015", details: "Business Analytics Concentration" },
      { degree: "B.S. in Computer Science", institution: "McGill University", location: "Montreal, Canada", year: "2011", details: "Magna Cum Laude" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Requirements Analysis", "SQL & Data Analysis", "Process Modeling", "Business Intelligence",
      "Agile/Scrum", "Stakeholder Management", "Tableau", "JIRA", "Documentation", "UAT"
    ],
    tools: ["SQL Server", "Tableau", "Jira", "Confluence", "Visio", "Excel", "Power BI", "Lucidchart"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "French", level: "Professional" },
      { lang: "Mandarin", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "CBAP - Certified Business Analysis Professional (2020)",
      "PMI-PBA - Business Analysis Certification (2019)",
      "Certified Scrum Product Owner (CSPO) (2021)"
    ],
    achievements: [
      "Won 'Business Analyst of the Year' award for delivering high-impact solutions that generated $3M in cost savings",
      "Led process improvement initiative reducing average project delivery time from 8 months to 5 months across 20+ projects",
      "Developed requirements management framework adopted as standard practice across 50-person business analysis team"
    ],
    projects: [
      {
        name: "Enterprise Data Warehouse Migration",
        description: "Led business analysis for migration of legacy data warehouse to cloud platform, documenting 500+ data sources and mapping requirements",
        results: "Completed on time, improved query performance by 60%"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-2xl font-extrabold leading-tight text-indigo-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-indigo-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-indigo-200 bg-indigo-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Core Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-indigo-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-indigo-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Featured Projects</h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-indigo-700">
                  <span className="font-semibold">Results:</span> {project.results}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
                <p className="text-[8.5px] text-gray-600">
                  {edu.institution} {edu.location && `• ${edu.location}`} • {edu.year}
                </p>
                {edu.details && (
                  <p className="text-[8px] text-gray-500 italic">{edu.details}</p>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-[7.5px] text-gray-500 mt-2">
        <p className="text-center">References available upon request</p>
      </footer>
    </div>
  );
}