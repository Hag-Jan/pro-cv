import React from "react";

export default function AcademicScholarNew({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Dr. Emily Zhang",
    title: personal.professional_title || "Assistant Professor of Neuroscience",
    contact: {
      email: personal.email || "emily.zhang@university.edu",
      phone: personal.phone || "+1 (555) 901-2345",
      location: personal.location || "Cambridge, MA",
    },
    summary: personal.summary || "Accomplished neuroscience researcher with 15+ years studying neural circuits and cognitive function. Expert in computational neuroscience with 28 peer-reviewed publications and $5M in secured grant funding. Passionate educator mentoring graduate students.",
    experience: r?.experience?.length > 0 ? r.experience : [
      {
        position: "Assistant Professor of Neuroscience",
        company: "Massachusetts Institute of Technology",
        dates: "2019 – Present",
        bullets: [
          "Lead independent research lab with 10 graduate students studying memory formation",
          "Secured $5M in NIH and NSF grants for computational neuroscience research",
          "Published 15 first-author papers in Nature Neuroscience, Cell, and Science"
        ],
      },
      {
        position: "Postdoctoral Research Fellow",
        company: "Harvard Medical School",
        dates: "2016 – 2019",
        bullets: [
          "Developed novel machine learning algorithms for analyzing neuroimaging data",
          "Collaborated with 3 international research groups on brain mapping projects"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "PhD Neuroscience", institution: "Stanford University", year: "2016" },
      { degree: "BS Biology", institution: "UC Berkeley", year: "2010" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "Computational Neuroscience", "Neuroimaging (fMRI, EEG)", "Python & MATLAB", "Machine Learning", "Grant Writing", "Scientific Writing", "Mentorship", "Data Analysis"
    ],
    publications: ["28 peer-reviewed publications in Nature, Science, Cell"],
    languages: r?.languages?.length > 0 ? r.languages : [
      { language: "English", level: "Native" },
      { language: "Mandarin", level: "Native" }
    ],
  };

  return (
    <div className="bg-white text-gray-900 p-10 w-[210mm] h-[297mm] mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Traditional Academic Header */}
      <header className="text-center mb-6 pb-4 border-b border-gray-400">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h1>
        <p className="text-sm text-gray-700 italic mb-2">{data.title}</p>
        <p className="text-xs text-gray-600">
          {data.contact.email} | {data.contact.phone} | {data.contact.location}
        </p>
      </header>

      {/* Academic Profile */}
      <section className="mb-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          Academic Profile
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Academic Appointments */}
      <section className="mb-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          Academic Appointments
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-bold text-sm text-gray-900">{exp.position}</p>
              <span className="text-xs text-gray-600 italic">{exp.dates}</span>
            </div>
            <p className="text-sm text-gray-700 italic mb-2">{exp.company}</p>
            <ul className="space-y-1 ml-4">
              {exp.bullets.map((b, j) => (
                <li key={j} className="text-sm text-gray-700 list-disc">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          Education
        </h3>
        {data.education.map((edu, i) => (
          <p key={i} className="text-sm text-gray-700 mb-1">
            <span className="font-bold">{edu.degree}</span>, {edu.institution}, {edu.year}
          </p>
        ))}
      </section>

      {/* Research Expertise */}
      <section className="mb-5">
        <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          Research Expertise
        </h3>
        <p className="text-sm text-gray-700">
          {data.skills.join("; ")}
        </p>
      </section>

      {/* Publications & Languages */}
      <div className="grid grid-cols-2 gap-6">
        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Publications
          </h3>
          {data.publications.map((pub, i) => (
            <p key={i} className="text-sm text-gray-700">{pub}</p>
          ))}
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Languages
          </h3>
          {data.languages.map((l, i) => (
            <p key={i} className="text-sm text-gray-700">
              {l.language} ({l.level})
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}