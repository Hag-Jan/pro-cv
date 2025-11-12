import React from "react";

export default function ProjectManagerPro({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Marcus Thompson",
    title: personal.professional_title || resume?.title || "Senior Project Manager, PMP",
    contact: {
      email: personal.email || resume?.contact?.email || "marcus.thompson@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 234-5678",
      location: personal.location || resume?.contact?.location || "Chicago, IL",
    },
    summary: personal.summary || resume?.summary || "Results-oriented Senior Project Manager with 11+ years delivering complex IT and digital transformation projects on time and within budget. PMP-certified professional expert in agile methodologies, stakeholder management, risk mitigation, and leading cross-functional teams. Proven track record of managing multi-million dollar portfolios, implementing process improvements, and consistently exceeding client expectations across diverse industries.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Project Manager",
        company: "Accenture",
        location: "Chicago, IL",
        dates: "2019 – Present",
        bullets: [
          "Managed $15M portfolio of digital transformation projects across 5 concurrent initiatives, delivering all projects on time and 10% under budget with 98% client satisfaction",
          "Delivered 25+ enterprise projects with 98% on-time completion rate, managing teams of 20-50 professionals across development, QA, and business analysis functions",
          "Led Salesforce CRM implementation for Fortune 500 client with 5,000+ users, completing 6-month project in 4.5 months and achieving 95% user adoption within first month",
          "Established PMO framework and best practices adopted across organization, standardizing project processes and improving portfolio visibility for executive leadership"
        ]
      },
      {
        role: "Project Manager",
        company: "Deloitte Consulting",
        location: "Chicago, IL",
        dates: "2015 – 2019",
        bullets: [
          "Managed enterprise software implementations for Fortune 500 clients across healthcare, financial services, and retail sectors with budgets ranging from $2M-$8M",
          "Reduced project delivery time by 25% through process optimization, automation, and implementation of agile methodologies across 10+ project teams",
          "Achieved 95% client satisfaction rating across 15+ projects through proactive communication, risk management, and stakeholder engagement strategies",
          "Mentored 8 junior project managers on PMI methodologies, risk management, and stakeholder communication, with 6 successfully obtaining PMP certification"
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
      { degree: "MBA Project Management", institution: "Northwestern University (Kellogg)", location: "Evanston, IL", year: "2014", details: "Leadership & Operations Focus" },
      { degree: "B.S. in Business Administration", institution: "University of Illinois", location: "Champaign, IL", year: "2010", details: "Summa Cum Laude" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Agile/Scrum", "Project Planning", "Stakeholder Management", "Risk Management",
      "Budget Planning", "Jira & MS Project", "Team Leadership", "Change Management", "Process Improvement", "Vendor Management"
    ],
    tools: ["Jira", "MS Project", "Asana", "Confluence", "Smartsheet", "Tableau", "Salesforce", "Slack"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Spanish", level: "Professional" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "PMP - Project Management Institute (2016)",
      "Certified Scrum Master (CSM) (2018)",
      "SAFe Agilist Certification (2020)"
    ],
    achievements: [
      "Recognized with 'Excellence in Project Delivery' award for consistently delivering complex projects ahead of schedule and under budget",
      "Led change management initiative that improved project success rate from 75% to 95% across 50+ project portfolio",
      "Implemented risk management framework reducing project delays by 40% and budget overruns by 30% organization-wide"
    ],
    projects: [
      {
        name: "Enterprise CRM Implementation",
        description: "Led Salesforce implementation for 5,000+ users across 15 locations, managing $8M budget and coordinating 40-person team",
        results: "Delivered 2 months early, 15% under budget, 95% user adoption"
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
        <h1 className="text-2xl font-extrabold leading-tight text-teal-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-teal-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-teal-200 bg-teal-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Core Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-teal-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Certifications</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-teal-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-teal-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-teal-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Featured Projects</h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-teal-700">
                  <span className="font-semibold">Results:</span> {project.results}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-teal-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Education</h3>
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