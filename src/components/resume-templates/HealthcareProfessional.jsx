import React from "react";

export default function HealthcareProfessional({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Dr. Sarah Johnson, MD",
    title: personal.professional_title || resume?.title || "Board-Certified Internal Medicine Physician",
    contact: {
      email: personal.email || resume?.contact?.email || "sarah.johnson@hospital.org",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 345-6789",
      location: personal.location || resume?.contact?.location || "Boston, MA",
    },
    summary: personal.summary || resume?.summary || "Board-certified Internal Medicine physician with 12+ years providing compassionate, evidence-based care to diverse patient populations in academic medical settings. Expert in chronic disease management, preventive medicine, and quality improvement initiatives. Dedicated to advancing healthcare through clinical excellence, medical education, and continuous professional development while maintaining strong patient relationships built on trust and empathy.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Attending Physician, Internal Medicine",
        company: "Massachusetts General Hospital",
        location: "Boston, MA",
        dates: "2016 – Present",
        bullets: [
          "Provide comprehensive primary care to panel of 2,000+ patients, managing complex chronic conditions including diabetes, hypertension, and heart disease with focus on preventive medicine",
          "Lead quality improvement initiative reducing 30-day hospital readmissions by 25% through enhanced discharge planning and post-discharge follow-up protocols",
          "Mentor and supervise 15+ medical students and residents during clinical rotations, providing hands-on training in patient assessment, diagnosis, and treatment planning",
          "Collaborate with multidisciplinary care team including nurses, social workers, and specialists to develop comprehensive treatment plans ensuring optimal patient outcomes"
        ]
      },
      {
        role: "Internal Medicine Resident",
        company: "Johns Hopkins Hospital",
        location: "Baltimore, MD",
        dates: "2012 – 2015",
        bullets: [
          "Completed rigorous 3-year residency program with focus on hospital medicine, managing 200+ admissions annually across general internal medicine service",
          "Received 'Outstanding Resident Award' for clinical excellence, professionalism, and exceptional patient care during chief resident year",
          "Conducted clinical research on diabetes management protocols, resulting in publication in Journal of Internal Medicine and presentation at national conference",
          "Participated in morning report and grand rounds, presenting complex cases and leading discussions on evidence-based medicine practices"
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
      { degree: "Doctor of Medicine (M.D.)", institution: "Harvard Medical School", location: "Boston, MA", year: "2012", details: "Alpha Omega Alpha Honor Society" },
      { degree: "B.S. in Biology", institution: "Yale University", location: "New Haven, CT", year: "2008", details: "Summa Cum Laude, Pre-Med Track" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Internal Medicine", "Primary Care", "Chronic Disease Management", "Electronic Health Records (Epic)",
      "Quality Improvement", "Patient Education", "Preventive Medicine", "Clinical Research", "Medical Education", "Team Leadership"
    ],
    tools: ["Epic EHR", "UpToDate", "PubMed", "Microsoft Office", "REDCap", "Zoom Telemedicine"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Spanish", level: "Professional" },
      { lang: "French", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Board Certified in Internal Medicine - ABIM (2015)",
      "Advanced Cardiac Life Support (ACLS) (2023)",
      "Basic Life Support (BLS) Provider (2023)"
    ],
    achievements: [
      "Recognized with 'Excellence in Patient Care Award' for maintaining 98% patient satisfaction scores and exceptional clinical outcomes",
      "Published 5 peer-reviewed articles in leading medical journals on topics including diabetes management and preventive care strategies",
      "Developed patient education program reducing hospital readmissions by 30% and improving medication adherence from 65% to 89%"
    ],
    volunteer: [
      {
        role: "Volunteer Physician",
        org: "Boston Healthcare for the Homeless",
        period: "2016 - Present",
        description: "Provide free medical care to underserved homeless population, conducting 50+ patient visits annually"
      },
      {
        role: "Medical Mission Trip",
        org: "Doctors Without Borders",
        period: "2019, 2021",
        description: "Participated in 2-week medical missions to rural Guatemala, treating 200+ patients with limited resources"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Open Sans, system-ui, sans-serif", fontSize: "9.5px" }}
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Professional Summary</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Clinical Expertise</h3>
            <div className="space-y-0.5">
              {data.skills.map((skill, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {skill}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Systems & Tools</h3>
            <div className="space-y-0.5">
              {data.tools.map((tool, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {tool}</p>
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-1.5">Certifications & Licenses</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Clinical Experience</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Volunteer Experience</h3>
            {data.volunteer.map((vol, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[9px] text-gray-900">{vol.role}</p>
                  <span className="text-[8px] text-gray-500">{vol.period}</span>
                </div>
                <p className="text-[8.5px] text-teal-700 font-medium">{vol.org}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700">{vol.description}</p>
              </div>
            ))}
          </section>

          <hr className="border-teal-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-teal-600 font-semibold mb-2">Education & Training</h3>
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