import React from "react";

export default function MarketingMaven({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Jessica Brown",
    title: personal.professional_title || resume?.title || "Senior Marketing Manager",
    contact: {
      email: personal.email || resume?.contact?.email || "jessica.brown@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 234-5678",
      location: personal.location || resume?.contact?.location || "Chicago, IL",
    },
    summary: personal.summary || resume?.summary || "Results-driven Senior Marketing Manager with 10+ years executing integrated campaigns that drive brand growth and revenue acceleration. Expert in digital marketing, content strategy, marketing analytics, and team leadership. Proven track record of building high-performing marketing teams, managing multi-million dollar budgets with exceptional ROI, and delivering measurable business impact through data-driven marketing strategies.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Marketing Manager",
        company: "HubSpot",
        location: "Boston, MA",
        dates: "2020 – Present",
        bullets: [
          "Lead demand generation campaigns generating $25M pipeline and 15K marketing qualified leads quarterly, achieving 250% ROI across paid, content, and event channels",
          "Manage $3M annual marketing budget across 8+ channels including SEM, social media, content marketing, and events, optimizing spend allocation based on performance data",
          "Built and scaled high-performing team of 8 marketing professionals across content, digital, and analytics functions, improving team productivity by 40%",
          "Launched ABM program targeting 100 enterprise accounts, resulting in $10M in closed-won revenue within first year and 45% increase in account engagement"
        ]
      },
      {
        role: "Marketing Manager",
        company: "Salesforce",
        location: "San Francisco, CA",
        dates: "2015 – 2020",
        bullets: [
          "Developed and executed content marketing strategy producing 100+ pieces of content monthly, increasing organic traffic by 300% and generating 50K new leads annually",
          "Increased organic website traffic from 50K to 200K monthly visitors through comprehensive SEO optimization strategies and content marketing initiatives",
          "Managed marketing automation platform (Marketo) for database of 500K contacts, implementing lead scoring and nurture campaigns that improved MQL-to-SQL conversion by 35%",
          "Coordinated 15+ virtual and in-person events annually attracting 5,000+ attendees, generating $8M in qualified pipeline"
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
      { degree: "MBA, Marketing", institution: "Northwestern University (Kellogg)", location: "Evanston, IL", year: "2014", details: "Marketing Strategy Concentration" },
      { degree: "B.A. in Communications", institution: "University of Illinois", location: "Champaign, IL", year: "2009", details: "Magna Cum Laude, GPA: 3.8/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Digital Marketing", "Content Strategy", "Marketing Analytics", "SEO & SEM",
      "Marketing Automation", "Brand Management", "Social Media", "Campaign Management", "Team Leadership", "Budget Management"
    ],
    tools: ["HubSpot", "Marketo", "Google Analytics", "Salesforce", "SEMrush", "Hootsuite", "Tableau", "Canva"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Spanish", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Google Ads Certification (2022)",
      "HubSpot Inbound Marketing Certified (2021)",
      "Facebook Blueprint Certified (2020)"
    ],
    achievements: [
      "Won 'Marketing Campaign of the Year' award for integrated campaign that generated $15M in new revenue and achieved 300% ROI",
      "Featured in Marketing Week magazine as 'Top 40 Under 40' marketing leaders transforming B2B marketing",
      "Built content marketing program from zero to 200K monthly readers, establishing company as thought leader in SaaS industry"
    ],
    campaigns: [
      {
        name: "'Future of Work' Content Series",
        description: "Launched multi-channel content campaign generating 50K leads and $12M pipeline through webinars, ebooks, and social media",
        results: "300% ROI, 25% increase in brand awareness"
      },
      {
        name: "Product Launch Campaign",
        description: "Led go-to-market strategy for new product launch, coordinating cross-functional teams and executing integrated campaign",
        results: "$5M revenue in first quarter, 10K new users"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", fontSize: "9.5px" }}
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Featured Campaigns</h3>
            {data.campaigns.map((campaign, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{campaign.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {campaign.description}
                </p>
                <p className="text-[8px] text-teal-700">
                  <span className="font-semibold">Results:</span> {campaign.results}
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