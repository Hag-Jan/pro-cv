import React from "react";

export default function ExecutiveMinimal({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Margaret Williams",
    title: personal.professional_title || resume?.title || "Chief Operating Officer",
    contact: {
      email: personal.email || resume?.contact?.email || "margaret.williams@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 456-7890",
      location: personal.location || resume?.contact?.location || "New York, NY",
    },
    summary: personal.summary || resume?.summary || "Visionary C-suite executive with 20+ years transforming global operations for Fortune 500 companies. Proven track record of driving $200M+ revenue growth through strategic planning, operational excellence, and digital transformation initiatives. Expert in P&L management, M&A integration, and building high-performing leadership teams that deliver exceptional business results across diverse industries.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Chief Operating Officer",
        company: "Global Enterprises Inc.",
        dates: "2019 – Present",
        bullets: [
          "Spearheaded operational strategy for $2B global organization with 5,000+ employees across 20 countries, achieving 35% improvement in operational efficiency",
          "Led digital transformation initiative generating $80M in annual cost savings through automation, process optimization, and technology modernization",
          "Directed 3 strategic acquisitions totaling $450M, successfully integrating operations and achieving 120% of projected synergies within 18 months",
          "Built and mentored executive leadership team of 12 senior directors overseeing sales, marketing, product, engineering, and customer success functions"
        ]
      },
      {
        role: "Vice President of Operations",
        company: "Fortune 100 Corporation",
        dates: "2014 – 2019",
        bullets: [
          "Managed P&L of $500M business unit with 1,200+ employees, delivering 45% revenue growth and 15% EBITDA margin improvement over 5 years",
          "Drove market expansion into 8 new international markets, establishing operations and generating $120M in new annual revenue",
          "Implemented lean Six Sigma methodologies reducing cycle time by 40% and operational costs by $25M annually",
          "Led talent development program resulting in 85% internal promotion rate for director-level positions"
        ]
      }
    ]).map(exp => ({
      role: exp.role || exp.title || exp.position,
      company: exp.company,
      dates: exp.dates,
      bullets: exp.bullets || []
    })),
    education: (r?.education?.length > 0 ? r.education : resume?.education?.length > 0 ? resume.education : [
      { degree: "MBA, Executive Leadership", institution: "Wharton School, University of Pennsylvania", year: "2008" },
      { degree: "B.S. in Industrial Engineering", institution: "Georgia Institute of Technology", year: "1998" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year || edu.graduation_year
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Strategic Planning", "P&L Management", "M&A Integration", "Digital Transformation", 
      "Team Leadership", "Change Management", "Board Relations", "Global Operations", "Process Optimization", "Talent Development"
    ],
    tools: ["Salesforce", "SAP", "Tableau", "Microsoft Dynamics", "Asana", "Power BI"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "German", level: "Professional" },
      { lang: "French", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Certified Six Sigma Master Black Belt (2015)",
      "Board Director Certification — NACD (2018)"
    ],
    achievements: [
      "Recognized as 'Top 50 Most Influential Women in Business' by Fortune Magazine (2022)",
      "Led organizational restructuring reducing overhead by 30% while improving employee engagement scores from 65% to 89%",
      "Keynote speaker at Global Operations Summit 2023, presenting on digital transformation best practices to audience of 2,000+ executives"
    ],
    board: [
      { role: "Board Member", org: "TechGrowth Advisory Board", period: "2021 - Present" },
      { role: "Advisor", org: "Women in Leadership Foundation", period: "2019 - Present" }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-2xl font-extrabold leading-tight text-cyan-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-cyan-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-cyan-200 bg-cyan-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Executive Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Core Competencies</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-cyan-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Board & Advisory</h3>
            {data.board.map((item, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-[8.5px] font-semibold text-gray-900">{item.role}</p>
                <p className="text-[8px] text-gray-600">{item.org}</p>
                <p className="text-[7.5px] text-gray-500">{item.period}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Leadership Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-cyan-700 font-medium mb-1">{exp.company}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-cyan-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-cyan-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
                <p className="text-[8.5px] text-gray-600">{edu.institution} • {edu.year}</p>
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