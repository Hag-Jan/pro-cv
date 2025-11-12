import React from "react";

export default function PureATSPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview pure ats" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "40px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "13px",
      lineHeight: 1.8
    }}>
      {/* Pure Text Header */}
      <header style={{ marginBottom: "32px" }}>
        <div style={{ fontWeight: "700", fontSize: "28px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ fontSize: "16px", color: "#374151", marginBottom: "14px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 2 }}>
          {r.contact?.email && <div>{r.contact.email}</div>}
          {r.contact?.phone && <div>{r.contact.phone}</div>}
          {r.contact?.location && <div>{r.contact.location}</div>}
          {!r.contact && (
            <>
              <div>email@example.com</div>
              <div>+1 (555) 123-4567</div>
              <div>City, Country</div>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>
          PROFESSIONAL SUMMARY
        </div>
        <p style={{ fontSize: "13px", lineHeight: 1.8, color: "#374151", margin: 0 }}>
          {r.summary || "PhD Data Scientist with 8+ years building machine learning models and analytics solutions for fintech and healthcare industries. Specialized in Python, deep learning, and deploying ML systems at scale serving millions of users with measurable business impact."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "14px" }}>
          WORK EXPERIENCE
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "14px", color: "#111827" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
                {job.company} | {job.dates}
              </div>
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "14px", color: "#111827" }}>Senior Data Scientist</strong>
                <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>Tech Platform Inc. | 2019 - Present</div>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>Developed recommendation engine increasing user engagement by 25%</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>Built ML models processing 100M+ events daily with 99.9% accuracy</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>Led data science team of 8 engineers delivering predictive analytics</li>
              </ul>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "14px", color: "#111827" }}>Data Scientist</strong>
                <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>Fintech Startup | 2016 - 2019</div>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>Created fraud detection models saving $5M annually</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "13px" }}>Deployed ML pipelines on AWS using SageMaker</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>
          EDUCATION
        </div>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <strong style={{ fontSize: "13px", color: "#111827" }}>{ed.degree}</strong>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>{ed.institution} | {ed.year}</div>
          </div>
        )) : (
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ fontSize: "13px", color: "#111827" }}>Ph.D. in Machine Learning</strong>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>Stanford University | 2016</div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>
          SKILLS
        </div>
        <div style={{ fontSize: "13px", color: "#374151", lineHeight: 2 }}>
          {(skills.length > 0 ? skills : ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "SQL", "Spark", "A/B Testing", "Statistics"]).map((skill, idx) => (
            <span key={idx}>
              {typeof skill === 'string' ? skill : skill.name || skill}
              {idx < (skills.length || 9) - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        <section>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>
            CERTIFICATIONS
          </div>
          <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.8 }}>
            {certs.length > 0 ? certs.join(", ") : "AWS Machine Learning Specialty, TensorFlow Developer Certificate"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "10px" }}>
            LANGUAGES
          </div>
          <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.8 }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ', ' : ''}`;
            }) : "English (Native), Mandarin (Native)"}
          </div>
        </section>
      </div>
    </div>
  );
}