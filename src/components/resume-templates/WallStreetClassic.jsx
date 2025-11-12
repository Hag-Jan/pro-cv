import React from "react";

export default function WallStreetClassic({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "James R. Patterson, CFA",
    title: personal.professional_title || resume?.title || "Senior Financial Analyst",
    tagline: "Investment Banking • Financial Modeling • M&A Advisory",
    contact: {
      email: personal.email || resume?.contact?.email || "james.patterson@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (212) 555-7890",
      location: personal.location || resume?.contact?.location || "New York, NY",
      linkedin: "linkedin.com/in/jamespatterson"
    },
    summary: personal.summary || resume?.summary || "Accomplished Senior Financial Analyst with 10+ years of progressive experience in investment banking and corporate finance. CFA charterholder with deep expertise in financial modeling, valuation analysis, M&A advisory, and equity research. Proven track record of providing strategic financial guidance to C-suite executives and institutional investors, consistently delivering actionable insights that drive business growth, optimize capital allocation, and maximize shareholder value. Known for analytical rigor, attention to detail, and ability to communicate complex financial concepts to diverse stakeholders.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Financial Analyst",
        company: "Goldman Sachs",
        location: "New York, NY",
        dates: "2018 – Present",
        bullets: [
          "Manage equity research portfolio worth $800M across technology and healthcare sectors, providing investment recommendations that generated 15% average annual returns outperforming S&P 500 by 8%",
          "Conduct comprehensive financial modeling and valuation analysis for 30+ M&A transactions totaling $5B+, supporting deal structuring, due diligence, and negotiation processes",
          "Present investment recommendations and market insights to senior management and institutional clients through quarterly earnings calls, investor meetings, and research publications",
          "Built proprietary DCF and LBO models improving accuracy of valuation estimates by 25% and reducing analysis time from 3 days to 8 hours through automation"
        ]
      },
      {
        role: "Financial Analyst",
        company: "JPMorgan Chase",
        location: "New York, NY",
        dates: "2014 – 2018",
        bullets: [
          "Developed complex financial models for leveraged buyout transactions, supporting $2B+ in successful deal closures with average IRR of 18% and MOIC of 2.3x",
          "Prepared comprehensive pitch books and investment memos for C-suite executives, contributing to acquisition of 8 new Fortune 500 clients representing $500M+ in annual revenue",
          "Analyzed market trends and competitive dynamics for strategic decision-making, identifying investment opportunities that generated $50M in new revenue streams",
          "Collaborated with cross-functional teams including legal, operations, and risk management to evaluate investment opportunities and conduct due diligence on acquisition targets"
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
      { degree: "Master of Business Administration (MBA), Finance", institution: "Columbia Business School", location: "New York, NY", year: "2014", honors: "Beta Gamma Sigma Honor Society" },
      { degree: "Bachelor of Arts in Economics", institution: "University of Pennsylvania", location: "Philadelphia, PA", year: "2010", honors: "Summa Cum Laude, GPA: 3.95/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      honors: edu.honors || edu.details
    })),
    achievements: [
      { title: "Top Analyst Recognition", description: "Recognized as 'Top Analyst' for 3 consecutive years (2020-2022) for delivering highest-quality research reports and investment recommendations with 90%+ accuracy" },
      { title: "Published Research", description: "Published research report on emerging fintech trends cited by Wall Street Journal and featured in 15+ industry publications, establishing thought leadership" },
      { title: "Deal of the Year", description: "Led team that won 'Deal of the Year' award for structuring $1.2B cross-border M&A transaction in technology sector with complex regulatory considerations" }
    ],
    skills: [
      "Financial Modeling & Valuation",
      "DCF & LBO Analysis",
      "Excel & VBA Programming",
      "Bloomberg Terminal",
      "Capital IQ & FactSet",
      "Equity Research",
      "M&A Advisory",
      "Risk Management",
      "Due Diligence",
      "Python & SQL",
      "Tableau & Power BI",
      "Financial Statement Analysis"
    ],
    certifications: [
      "CFA (Chartered Financial Analyst) — CFA Institute, 2016",
      "Series 7 & 63 Licenses — FINRA",
      "Financial Risk Manager (FRM) — GARP, 2017"
    ],
    professional: [
      "CFA Institute — Member since 2016",
      "New York Society of Security Analysts — Member since 2018",
      "Financial Executives International — Member since 2019"
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-10 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Georgia, serif", fontSize: "9.5px" }}
    >
      {/* Header - Centered */}
      <header className="text-center mb-5 pb-4 border-b-2 border-purple-700">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
          {data.name}
        </h1>
        <p className="text-sm italic text-purple-700 font-medium mb-2" style={{ fontFamily: "Georgia, serif" }}>
          {data.tagline}
        </p>
        <div className="flex justify-center items-center gap-2 text-[8.5px] text-gray-600 flex-wrap">
          <span>{data.contact.email}</span>
          <span>•</span>
          <span>{data.contact.phone}</span>
          <span>•</span>
          <span>{data.contact.location}</span>
          <span>•</span>
          <span className="text-purple-700">{data.contact.linkedin}</span>
        </div>
      </header>

      {/* Summary of Qualifications */}
      <section className="mb-4">
        <h2 className="text-[12px] font-bold text-gray-900 mb-2 text-center uppercase tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
          Summary of Qualifications
        </h2>
        <p className="text-[9px] leading-[1.7] text-gray-700 text-justify" style={{ fontFamily: "Inter, sans-serif" }}>
          {data.summary}
        </p>
      </section>

      {/* Education - Prominent Position */}
      <section className="mb-4">
        <h2 className="text-[12px] font-bold text-gray-900 mb-2 text-center uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
          Education
        </h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2.5">
            <p className="font-bold text-[9.5px] text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>
              {edu.degree}
            </p>
            <p className="text-[9px] text-gray-700 italic" style={{ fontFamily: "Georgia, serif" }}>
              {edu.institution}, {edu.location} • {edu.year}
            </p>
            {edu.honors && (
              <p className="text-[8.5px] text-purple-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {edu.honors}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Key Achievements - 2 columns */}
      <section className="mb-4">
        <h2 className="text-[12px] font-bold text-gray-900 mb-3 text-center uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
          Key Achievements
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {data.achievements.map((achievement, i) => (
            <div key={i} className="mb-1">
              <p className="font-bold text-[9px] text-purple-700 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                {achievement.title}
              </p>
              <p className="text-[8px] leading-[1.5] text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-4">
        <h2 className="text-[12px] font-bold text-gray-900 mb-3 text-center uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
          Professional Experience
        </h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-bold text-[10px] text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>
                {exp.role}
              </h3>
              <span className="text-[8.5px] text-gray-600 font-medium italic" style={{ fontFamily: "Georgia, serif" }}>
                {exp.dates}
              </span>
            </div>
            <p className="text-[9px] text-purple-700 font-semibold mb-1.5 italic" style={{ fontFamily: "Georgia, serif" }}>
              {exp.company} • {exp.location}
            </p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              {exp.bullets.map((bullet, j) => (
                <li key={j} className="text-[8.5px] leading-[1.6] text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Technical Skills & Certifications - 2 columns */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <section>
          <h2 className="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            {data.skills.map((skill, i) => (
              <p key={i} className="text-[8px] text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                • {skill}
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
            Certifications
          </h2>
          {data.certifications.map((cert, i) => (
            <p key={i} className="text-[8px] text-gray-700 mb-0.5 leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
              • {cert}
            </p>
          ))}
          <h2 className="text-[11px] font-bold text-gray-900 mb-2 mt-3 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontFamily: "Georgia, serif" }}>
            Professional Affiliations
          </h2>
          {data.professional.map((org, i) => (
            <p key={i} className="text-[8px] text-gray-700 mb-0.5 leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
              • {org}
            </p>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-[7.5px] text-gray-500 mt-3 pt-2 border-t border-gray-200" style={{ fontFamily: "Georgia, serif" }}>
        <p>References available upon request</p>
      </footer>
    </div>
  );
}