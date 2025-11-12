import React from "react";

export default function AtlanticProfessional({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Michael Rodriguez",
    title: personal.professional_title || resume?.title || "Senior Product Manager",
    contact: {
      email: personal.email || resume?.contact?.email || "michael.rodriguez@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 789-4561",
      location: personal.location || resume?.contact?.location || "San Francisco, CA",
    },
    summary: personal.summary || resume?.summary || "Strategic Senior Product Manager with 8+ years leading B2B SaaS products from concept to launch. Expert in product strategy, roadmap planning, and cross-functional team leadership with proven track record of delivering products that drive revenue growth and customer satisfaction. Passionate about leveraging data-driven insights to build products that solve real customer problems and create competitive advantage.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Product Manager",
        company: "Atlassian",
        location: "San Francisco, CA",
        dates: "2020 – Present",
        bullets: [
          "Led product strategy for enterprise collaboration suite serving 10,000+ customers, resulting in 45% YoY revenue growth and $25M ARR",
          "Launched 3 major product features that increased user engagement by 60% and reduced churn rate from 8% to 4.5% over 18 months",
          "Managed cross-functional team of 15 engineers, designers, and analysts through agile development cycles, consistently delivering releases on schedule",
          "Conducted 100+ customer interviews and analyzed usage data to prioritize product roadmap, ensuring alignment with market needs and business objectives"
        ]
      },
      {
        role: "Product Manager",
        company: "Salesforce",
        location: "San Francisco, CA",
        dates: "2017 – 2020",
        bullets: [
          "Owned product lifecycle for CRM analytics platform generating $15M in annual revenue, working with engineering teams of 20+ members",
          "Increased product adoption by 35% through strategic feature development and improved onboarding experience based on user research insights",
          "Collaborated with sales and marketing teams to develop go-to-market strategies for 5 major product launches with average win rates of 40%",
          "Built product analytics framework tracking 50+ KPIs, enabling data-driven decision making and reducing feature development time by 25%"
        ]
      },
      {
        role: "Associate Product Manager",
        company: "LinkedIn",
        location: "Mountain View, CA",
        dates: "2016 – 2017",
        bullets: [
          "Supported product management for LinkedIn Learning platform with 15M+ users, assisting with feature prioritization and user testing",
          "Conducted competitive analysis and market research informing product strategy decisions for new course recommendation features",
          "Worked with engineering team to ship 10+ features improving course discovery and completion rates by 20%",
          "Analyzed user behavior data and A/B test results to optimize product experience and inform roadmap decisions"
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
      { degree: "MBA, Product Management", institution: "Stanford Graduate School of Business", location: "Stanford, CA", year: "2016" },
      { degree: "B.S. in Computer Science", institution: "UC Berkeley", location: "Berkeley, CA", year: "2013" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Product Strategy",
      "Roadmap Planning",
      "Agile/Scrum",
      "User Research",
      "Data Analysis",
      "A/B Testing",
      "SQL & Analytics",
      "Wireframing",
      "Jira & Confluence",
      "Stakeholder Management"
    ],
    strengths: [
      "Strategic Product Vision",
      "Cross-functional Leadership",
      "Customer-Centric Thinking",
      "Data-Driven Decision Making"
    ],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native", percentage: 100 },
      { lang: "Spanish", level: "Professional", percentage: 85 },
      { lang: "Mandarin", level: "Conversational", percentage: 60 }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency,
      percentage: lang.percentage || 100
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Certified Scrum Product Owner (CSPO)",
      "Google Analytics Certification",
      "Pragmatic Marketing Certified (PMC-III)"
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden flex"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Left Column - 70% Main Content */}
      <div className="w-[70%] pr-6">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 mb-1">{data.name}</h1>
          <p className="text-sm text-sky-600 font-semibold mb-2">{data.title}</p>
          <p className="text-[8.5px] text-gray-600">
            {data.contact.email} • {data.contact.phone} • {data.contact.location}
          </p>
        </header>

        <div className="border-b-2 border-sky-500 mb-4"></div>

        {/* Summary */}
        <section className="mb-5">
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-[9px] leading-[1.6] text-gray-700">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-5">
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-sky-500 w-1 h-4 mr-2"></span>
            Professional Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-[10px] text-gray-900">{exp.role}</h3>
                <span className="text-[8px] text-gray-500 font-medium">{exp.dates}</span>
              </div>
              <p className="text-[9px] text-sky-600 font-semibold mb-1.5">
                {exp.company} {exp.location && `• ${exp.location}`}
              </p>
              <ul className="list-disc list-inside space-y-0.5">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-[8.5px] leading-[1.5] text-gray-700 ml-2">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-4">
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-sky-500 w-1 h-4 mr-2"></span>
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold text-[9.5px] text-gray-900">{edu.degree}</p>
              <p className="text-[8.5px] text-gray-600">
                {edu.institution} • {edu.year}
              </p>
            </div>
          ))}
        </section>
      </div>

      {/* Right Sidebar - 30% */}
      <div className="w-[30%] bg-gradient-to-b from-sky-50 to-white pl-5 -mr-8 -mt-8 -mb-8 pr-8 pt-8 pb-8">
        {/* Skills */}
        <section className="mb-5">
          <h2 className="text-[10px] uppercase tracking-wider font-bold text-sky-700 mb-3 pb-2 border-b border-sky-200">
            Core Skills
          </h2>
          <div className="space-y-1.5">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2 flex-shrink-0"></div>
                <span className="text-[8.5px] text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths */}
        <section className="mb-5">
          <h2 className="text-[10px] uppercase tracking-wider font-bold text-sky-700 mb-3 pb-2 border-b border-sky-200">
            Key Strengths
          </h2>
          <div className="space-y-2">
            {data.strengths.map((strength, i) => (
              <div key={i} className="bg-white border border-sky-200 rounded-lg px-2 py-1.5">
                <p className="text-[8px] text-gray-800 font-medium text-center">{strength}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-5">
          <h2 className="text-[10px] uppercase tracking-wider font-bold text-sky-700 mb-3 pb-2 border-b border-sky-200">
            Languages
          </h2>
          <div className="space-y-2.5">
            {data.languages.map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[8.5px] font-semibold text-gray-800">{lang.lang}</span>
                  <span className="text-[7.5px] text-gray-500">{lang.level}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-4">
          <h2 className="text-[10px] uppercase tracking-wider font-bold text-sky-700 mb-3 pb-2 border-b border-sky-200">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2 mt-1 flex-shrink-0"></div>
                <span className="text-[8px] text-gray-800 leading-[1.4]">
                  {typeof cert === 'string' ? cert : cert.name || cert.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}