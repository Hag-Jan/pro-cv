import React from "react";

export default function ProfessionalTwoColumn({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Sarah Mitchell",
    title: personal.professional_title || resume?.title || "Marketing Director",
    contact: {
      email: personal.email || resume?.contact?.email || "sarah.mitchell@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 567-8901",
      location: personal.location || resume?.contact?.location || "New York, NY",
    },
    summary: personal.summary || resume?.summary || "Strategic marketing leader with 10+ years driving brand growth and digital transformation for B2B SaaS companies. Expert in demand generation, content strategy, and marketing analytics with proven track record of delivering measurable ROI and building high-performing teams. Passionate about leveraging data-driven insights to create compelling marketing campaigns that accelerate revenue growth and strengthen market position.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Marketing Director",
        company: "HubSpot",
        location: "Boston, MA",
        dates: "2020 – Present",
        bullets: [
          "Led demand generation campaigns generating $25M qualified pipeline quarterly and driving 15K marketing qualified leads with 250% average ROI across paid, content, and event channels",
          "Built content marketing engine producing 100+ pieces monthly including blogs, whitepapers, and case studies, increasing organic traffic by 300% and establishing thought leadership",
          "Managed $3M annual marketing budget across 8+ channels optimizing spend allocation through continuous A/B testing and performance analysis, improving CAC by 35%",
          "Built and scaled marketing team from 3 to 12 professionals across content, digital, and analytics functions, implementing processes that improved team productivity by 45%"
        ]
      },
      {
        role: "Senior Marketing Manager",
        company: "Salesforce",
        location: "San Francisco, CA",
        dates: "2016 – 2020",
        bullets: [
          "Launched ABM program targeting Fortune 500 accounts, closing $10M in new business within first year and achieving 45% increase in account engagement and pipeline velocity",
          "Increased organic website traffic from 50K to 200K monthly visitors through comprehensive SEO optimization and content marketing strategies, reducing cost per lead by 60%",
          "Managed marketing automation platform (Marketo) for database of 500K contacts, implementing sophisticated lead scoring and nurture campaigns that improved conversion rates by 35%",
          "Coordinated 15+ industry conferences and virtual events annually attracting 5,000+ attendees, generating $8M in qualified pipeline and strengthening brand presence"
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
      { degree: "MBA Marketing", institution: "Northwestern University (Kellogg)", location: "Evanston, IL", year: "2015", details: "Marketing Strategy Concentration" },
      { degree: "B.A. in Communications", institution: "Boston University", location: "Boston, MA", year: "2011", details: "Summa Cum Laude, GPA: 3.9/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Digital Marketing", "Content Strategy", "SEO/SEM", "Marketing Automation",
      "Brand Management", "Analytics", "Team Leadership", "Campaign Management", "Budget Management", "ABM Strategy"
    ],
    tools: ["HubSpot", "Marketo", "Google Analytics", "Salesforce", "SEMrush", "Hootsuite", "Tableau", "Canva"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "French", level: "Professional" },
      { lang: "Spanish", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Google Ads Certification (2022)",
      "HubSpot Inbound Marketing (2021)",
      "Facebook Blueprint Certified (2020)"
    ],
    achievements: [
      "Won 'Marketing Campaign of the Year' award for integrated campaign generating $15M in new revenue and achieving 300% ROI",
      "Featured in Marketing Week as 'Top 40 Under 40' marketing leaders transforming B2B marketing strategies",
      "Built content marketing program from zero to 200K monthly readers, establishing company as industry thought leader"
    ],
    campaigns: [
      {
        name: "Product Launch Campaign",
        description: "Led go-to-market strategy for new product launch, coordinating cross-functional teams and executing integrated multi-channel campaign",
        results: "$5M revenue in first quarter, 10K new users"
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
        <h1 className="text-2xl font-extrabold leading-tight text-blue-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-blue-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-blue-200 bg-blue-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">Core Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-blue-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">Certifications</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-blue-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-blue-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-blue-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">Featured Campaigns</h3>
            {data.campaigns.map((campaign, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{campaign.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {campaign.description}
                </p>
                <p className="text-[8px] text-blue-700">
                  <span className="font-semibold">Results:</span> {campaign.results}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-blue-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">Education</h3>
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