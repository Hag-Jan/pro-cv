import React from "react";

export default function CorporateClassic({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Robert Anderson",
    title: personal.professional_title || resume?.title || "Senior Financial Analyst",
    contact: {
      email: personal.email || resume?.contact?.email || "robert.anderson@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 789-0123",
      location: personal.location || resume?.contact?.location || "New York, NY",
    },
    summary: personal.summary || resume?.summary || "Detail-oriented Senior Financial Analyst with 12+ years in investment banking and corporate finance. CFA charterholder with deep expertise in financial modeling, valuation analysis, M&A advisory, and equity research. Proven track record of providing strategic financial guidance to C-suite executives and institutional investors, consistently delivering actionable insights that drive business growth and maximize shareholder value.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Financial Analyst",
        company: "Goldman Sachs",
        location: "New York, NY",
        dates: "2018 – Present",
        bullets: [
          "Manage equity research portfolio worth $800M across technology and healthcare sectors, providing investment recommendations that generated 15% average annual returns",
          "Conduct comprehensive financial modeling and valuation analysis for 30+ M&A transactions totaling $5B+, supporting deal structuring and negotiation processes",
          "Present investment recommendations and market insights to senior management and institutional clients through quarterly earnings calls and investor meetings",
          "Built proprietary DCF and LBO models improving accuracy of valuation estimates by 25% and reducing analysis time from 3 days to 8 hours"
        ]
      },
      {
        role: "Financial Analyst",
        company: "JPMorgan Chase",
        location: "New York, NY",
        dates: "2012 – 2018",
        bullets: [
          "Developed complex financial models for leveraged buyout transactions, supporting $2B+ in successful deal closures with average IRR of 18%",
          "Prepared comprehensive pitch books and investment memos for C-suite executives, contributing to acquisition of 8 new Fortune 500 clients",
          "Analyzed market trends and competitive dynamics for strategic decision-making, identifying opportunities that generated $50M in new revenue",
          "Collaborated with cross-functional teams to evaluate investment opportunities and conduct due diligence on potential acquisition targets"
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
      { degree: "MBA, Finance", institution: "Columbia Business School", location: "New York, NY", year: "2014", details: "Beta Gamma Sigma Honor Society" },
      { degree: "B.A. in Economics", institution: "University of Pennsylvania", location: "Philadelphia, PA", year: "2009", details: "Summa Cum Laude, GPA: 3.95/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Financial Modeling", "Valuation Analysis", "M&A Advisory", "Excel & VBA",
      "Bloomberg Terminal", "Risk Management", "DCF Analysis", "LBO Modeling", "Equity Research", "Due Diligence"
    ],
    tools: ["Bloomberg Terminal", "FactSet", "Capital IQ", "Excel VBA", "Python", "SQL", "Tableau"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Spanish", level: "Professional" },
      { lang: "Mandarin", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "CFA (Chartered Financial Analyst) — 2016",
      "Series 7 & 63 Licenses — FINRA",
      "Financial Risk Manager (FRM) — 2017"
    ],
    achievements: [
      "Recognized as 'Top Analyst' for 3 consecutive years (2020-2022) for delivering highest-quality research reports and investment recommendations",
      "Published research report on emerging fintech trends cited by Wall Street Journal and featured in 15+ industry publications",
      "Led team that won 'Deal of the Year' award for structuring $1.2B cross-border M&A transaction in technology sector"
    ],
    professional: [
      { org: "CFA Institute", role: "Member", year: "2016 - Present" },
      { org: "New York Society of Security Analysts", role: "Member", year: "2018 - Present" }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Times New Roman, serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3 text-center">
        <h1 className="text-2xl font-bold leading-tight text-amber-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-amber-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-amber-200 bg-amber-50/20">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Professional Summary</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Core Competencies</h3>
            <div className="space-y-0.5">
              {data.skills.map((skill, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {skill}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Tools & Software</h3>
            <div className="space-y-0.5">
              {data.tools.map((tool, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {tool}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-amber-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5">Professional Affiliations</h3>
            {data.professional.map((item, i) => (
              <div key={i} className="mb-1">
                <p className="text-[8.5px] font-semibold text-gray-900">{item.org}</p>
                <p className="text-[8px] text-gray-600">{item.role} • {item.year}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-amber-700 font-semibold mb-1 italic">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-amber-200 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-amber-200 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
                <p className="text-[8.5px] text-gray-600 italic">
                  {edu.institution} {edu.location && `• ${edu.location}`} • {edu.year}
                </p>
                {edu.details && (
                  <p className="text-[8px] text-gray-500">{edu.details}</p>
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