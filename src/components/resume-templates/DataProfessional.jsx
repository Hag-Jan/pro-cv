import React from "react";

export default function DataProfessional({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Dr. Priya Patel",
    title: personal.professional_title || resume?.title || "Senior Data Scientist",
    contact: {
      email: personal.email || resume?.contact?.email || "priya.patel@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 901-2345",
      location: personal.location || resume?.contact?.location || "Seattle, WA",
    },
    summary: personal.summary || resume?.summary || "Data-driven Senior Data Scientist with 7+ years building production ML models and analytics solutions that drive business impact. PhD in Computer Science with expertise in Python, deep learning, big data technologies, and statistical modeling. Proven track record of deploying ML systems serving millions of users and generating measurable ROI through data-driven insights and predictive analytics.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Data Scientist",
        company: "Amazon",
        location: "Seattle, WA",
        dates: "2020 – Present",
        bullets: [
          "Developed recommendation engine using collaborative filtering and neural networks, increasing conversion rate by 25% and generating $15M in incremental annual revenue",
          "Built predictive models for customer churn using XGBoost and ensemble methods, saving $5M annually by identifying at-risk customers and enabling proactive retention strategies",
          "Led A/B testing framework implementation for 50+ experiments across product teams, establishing statistical rigor and increasing experiment velocity by 3x",
          "Deployed real-time fraud detection system processing 10M+ transactions daily with 98% accuracy, reducing fraud losses by 40% while minimizing false positives"
        ]
      },
      {
        role: "Data Scientist",
        company: "Microsoft",
        location: "Redmond, WA",
        dates: "2017 – 2020",
        bullets: [
          "Created NLP models for sentiment analysis processing 10M+ customer reviews monthly, providing actionable insights to product and marketing teams",
          "Deployed ML pipelines on Azure using MLOps best practices, reducing model deployment time from weeks to hours and ensuring 99.9% uptime",
          "Collaborated with product managers to define KPIs and success metrics for 15+ data science initiatives, ensuring alignment with business objectives",
          "Built automated reporting dashboards using Power BI and Python, saving 20 hours/week in manual reporting and enabling real-time decision making"
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
      { degree: "Ph.D. in Computer Science (Machine Learning)", institution: "Stanford University", location: "Stanford, CA", year: "2017", details: "Dissertation: Deep Learning for Time Series Forecasting" },
      { degree: "B.S. in Mathematics & Computer Science", institution: "University of California, Berkeley", location: "Berkeley, CA", year: "2012", details: "Honors, GPA: 3.9/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Python & R", "Machine Learning", "Deep Learning (TensorFlow, PyTorch)", "SQL & NoSQL",
      "Apache Spark", "Data Visualization", "A/B Testing", "Statistical Analysis", "MLOps", "Feature Engineering"
    ],
    tools: ["Jupyter", "Databricks", "Airflow", "Docker", "Git", "Tableau", "AWS SageMaker", "MLflow"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Fluent" },
      { lang: "Hindi", level: "Native" },
      { lang: "Gujarati", level: "Native" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "Google Professional Data Engineer (2021)",
      "AWS Machine Learning Specialty (2020)",
      "TensorFlow Developer Certificate (2019)"
    ],
    achievements: [
      "Published 8 peer-reviewed papers in top ML conferences (NeurIPS, ICML, KDD) with 500+ citations on Google Scholar",
      "Won 'Data Scientist of the Year' award for developing ML system that increased customer lifetime value by $20M annually",
      "Speaker at PyData Conference 2023, presenting on 'Production ML Best Practices' to audience of 300+ data scientists"
    ],
    projects: [
      {
        name: "Customer Lifetime Value Prediction",
        description: "Built ML model predicting 12-month CLV with 92% accuracy, enabling targeted marketing campaigns that increased ROI by 150%",
        tech: "Python, XGBoost, AWS SageMaker, PostgreSQL"
      },
      {
        name: "Real-Time Personalization Engine",
        description: "Deployed deep learning model for real-time content recommendations serving 5M users with sub-100ms latency",
        tech: "TensorFlow, Kubernetes, Redis, Apache Kafka"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Roboto, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-2xl font-extrabold leading-tight text-indigo-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-indigo-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-indigo-200 bg-indigo-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Technical Expertise</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-indigo-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Certifications</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-indigo-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Featured Projects</h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-indigo-700">
                  <span className="font-semibold">Tech:</span> {project.tech}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Education</h3>
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