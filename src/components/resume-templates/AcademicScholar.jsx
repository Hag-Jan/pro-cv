import React from "react";

export default function AcademicScholar({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Dr. Emily Zhang",
    title: personal.professional_title || resume?.title || "Assistant Professor of Neuroscience",
    contact: {
      email: personal.email || resume?.contact?.email || "emily.zhang@university.edu",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 123-4567",
      location: personal.location || resume?.contact?.location || "Cambridge, MA",
    },
    summary: personal.summary || resume?.summary || "Accomplished neuroscience researcher with 18 peer-reviewed publications and $3M in secured NIH grant funding. Expert in computational neuroscience, neural circuit analysis, and machine learning applications to neuroscience research. Dedicated to advancing scientific knowledge through rigorous research, fostering next-generation scientists through mentorship, and promoting diversity and inclusion in STEM fields.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Assistant Professor of Neuroscience",
        company: "Massachusetts Institute of Technology",
        location: "Cambridge, MA",
        dates: "2019 – Present",
        bullets: [
          "Lead independent research laboratory with 8 graduate students and 2 postdocs studying neural circuits underlying learning and memory formation",
          "Secured $3M in competitive grant funding from NIH and NSF for computational neuroscience research, ranking in top 5% of funded proposals nationally",
          "Published 10 first-author papers in top-tier journals including Nature Neuroscience, Neuron, and Cell, accumulating 800+ citations on Google Scholar",
          "Teach graduate-level courses in computational neuroscience and machine learning with average student evaluation scores of 4.8/5.0"
        ]
      },
      {
        role: "Postdoctoral Research Fellow",
        company: "Harvard Medical School",
        location: "Boston, MA",
        dates: "2016 – 2019",
        bullets: [
          "Developed novel machine learning algorithms for analyzing large-scale neuroimaging datasets, published in Science and featured in MIT Technology Review",
          "Collaborated with 5 laboratories across 3 institutions on multi-site neuroimaging study involving 500+ participants and $5M in funding",
          "Mentored 3 graduate students and 2 undergraduate researchers, with 2 students subsequently admitted to top PhD programs",
          "Presented research findings at 10+ international conferences including Society for Neuroscience and Organization for Human Brain Mapping"
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
      { degree: "Ph.D. in Neuroscience", institution: "Stanford University", location: "Stanford, CA", year: "2016", details: "Dissertation: Deep Learning for Neural Circuit Analysis" },
      { degree: "B.S. in Neuroscience & Computer Science", institution: "MIT", location: "Cambridge, MA", year: "2010", details: "Phi Beta Kappa, Summa Cum Laude" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Computational Neuroscience", "Machine Learning", "Python & MATLAB", "Neuroimaging (fMRI, EEG)",
      "Grant Writing", "Scientific Writing", "Data Analysis", "Mentorship", "Teaching", "R Programming"
    ],
    tools: ["Python", "MATLAB", "R", "FSL", "SPM", "Git", "LaTeX", "ImageJ"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Mandarin", level: "Native" },
      { lang: "French", level: "Intermediate" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "NIH Responsible Conduct of Research (2019)",
      "Teaching Certificate in Higher Education (2020)",
      "CITI Human Subjects Research Training (2023)"
    ],
    achievements: [
      "Recipient of prestigious NIH Director's Early Independence Award (K99/R00), one of 20 awarded nationally",
      "Research featured on cover of Nature Neuroscience and highlighted in press releases by MIT and NIH",
      "Named 'Rising Star in Neuroscience' by Society for Neuroscience, recognizing exceptional early-career contributions"
    ],
    publications: [
      "Zhang E., et al. (2023). 'Deep learning reveals neural signatures of conscious perception.' Nature Neuroscience, 26(4), 543-558. (250 citations)",
      "Zhang E., et al. (2022). 'Computational framework for decoding neural activity patterns.' Neuron, 110(8), 1234-1249. (180 citations)",
      "Zhang E., et al. (2021). 'Machine learning uncovers novel brain connectivity patterns.' Science, 374(6572), 1234-1239. (300 citations)"
    ],
    grants: [
      { title: "NIH R01: Neural Mechanisms of Learning", amount: "$2.5M", period: "2022-2027" },
      { title: "NSF Career Award: Computational Neuroscience", amount: "$500K", period: "2021-2026" }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Georgia, serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3 text-center">
        <h1 className="text-2xl font-bold leading-tight text-indigo-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-indigo-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-indigo-200 bg-indigo-50/20">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Research Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Research Expertise</h3>
            <div className="space-y-0.5">
              {data.skills.map((skill, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {skill}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Tools & Software</h3>
            <div className="space-y-0.5">
              {data.tools.map((tool, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {tool}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-indigo-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Training & Certificates</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-1.5">Grant Funding</h3>
            {data.grants.map((grant, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-[8.5px] font-semibold text-gray-900">{grant.title}</p>
                <p className="text-[8px] text-gray-600">{grant.amount} • {grant.period}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-2">Academic Appointments</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-indigo-700 font-semibold mb-1 italic">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-indigo-200 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-indigo-200 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-2">Selected Publications</h3>
            {data.publications.map((pub, i) => (
              <p key={i} className="text-[8px] leading-[1.45] text-gray-700 mb-1.5">{pub}</p>
            ))}
          </section>

          <hr className="border-indigo-200 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-700 font-bold mb-2">Education</h3>
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
        <p className="text-center">Complete publication list and references available upon request</p>
      </footer>
    </div>
  );
}