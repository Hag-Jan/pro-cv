import React from "react";

export default function DataProfessionalNew({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Dr. Priya Singh",
    title: personal.professional_title || "Senior Data Scientist",
    contact: {
      email: personal.email || "priya.singh@email.com",
      phone: personal.phone || "+1 (555) 890-1234",
      location: personal.location || "Boston, MA",
    },
    summary: personal.summary || "Data-driven scientist with 8+ years developing ML models and analytics solutions. PhD in Statistics with expertise in predictive modeling, deep learning, and big data technologies. Published researcher with 12 peer-reviewed papers.",
    experience: r?.experience?.length > 0 ? r.experience : [
      {
        position: "Senior Data Scientist",
        company: "Amazon Web Services",
        dates: "2020 – Present",
        bullets: [
          "Developed recommendation engine using collaborative filtering, increasing conversion by 25%",
          "Built churn prediction models using XGBoost saving $8M annually",
          "Led team of 5 data scientists on NLP projects processing 100M+ documents"
        ],
      },
      {
        position: "Data Scientist",
        company: "Google",
        dates: "2017 – 2020",
        bullets: [
          "Created sentiment analysis models for customer feedback achieving 92% accuracy",
          "Deployed ML pipelines on GCP using Kubeflow and TensorFlow Extended"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "PhD Statistics & Machine Learning", institution: "MIT", year: "2017" },
      { degree: "MS Applied Mathematics", institution: "Stanford University", year: "2013" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "Python & R", "Machine Learning", "Deep Learning (TensorFlow, PyTorch)", "SQL & NoSQL", "Apache Spark", "Data Visualization", "Statistical Analysis", "A/B Testing", "NLP", "Cloud (AWS/GCP)"
    ],
    publications: r?.publications?.length > 0 ? r.publications : [
      "Neural Networks for Time Series Forecasting (Journal of ML Research, 2022)",
      "Bayesian Methods in Healthcare Analytics (Nature Data Science, 2021)"
    ]
  };

  return (
    <div className="bg-white text-gray-900 p-10 w-[210mm] h-[297mm] mx-auto font-sans">
      {/* Header */}
      <header className="mb-6 pb-4 border-b-2 border-indigo-900">
        <h1 className="text-2xl font-bold text-indigo-900 mb-1">{data.name}</h1>
        <p className="text-sm text-gray-700 font-semibold mb-2">{data.title}</p>
        <p className="text-xs text-gray-600">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
      </header>

      {/* Research Profile */}
      <section className="mb-5">
        <h3 className="text-xs uppercase tracking-widest text-indigo-900 font-bold mb-2">
          Research Profile
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Professional Experience */}
      <section className="mb-5">
        <h3 className="text-xs uppercase tracking-widest text-indigo-900 font-bold mb-3">
          Professional Experience
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-bold text-sm text-gray-900">{exp.position}</p>
              <span className="text-xs text-gray-500">{exp.dates}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
            <ul className="space-y-1">
              {exp.bullets.map((b, j) => (
                <li key={j} className="text-xs text-gray-700 flex items-start">
                  <span className="mr-2">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Grid: Education + Skills */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-indigo-900 font-bold mb-2">
            Education
          </h3>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
              <p className="text-xs text-gray-600">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-indigo-900 font-bold mb-2">
            Technical Expertise
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.slice(0, 8).map((s, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Publications */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-indigo-900 font-bold mb-2">
          Selected Publications
        </h3>
        <ul className="space-y-1">
          {data.publications.map((pub, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{pub}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}