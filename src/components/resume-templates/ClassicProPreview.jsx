import React from "react";

export default function ClassicProPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview classic pro" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "28px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header */}
      <header style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #E5E7EB" }}>
        <div style={{ fontWeight: "700", fontSize: "22px", marginBottom: "4px" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "8px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "8px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>•</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>•</span>
          <span>{r.contact?.location || "City, Country"}</span>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Professional Summary
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Results-driven professional with proven track record in driving business growth and leading cross-functional teams. Expertise in strategic planning, process optimization, and delivering measurable outcomes."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
          Professional Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "13px", color: "#111827" }}>
                {job.position} — {job.company}
              </strong>
              <span style={{ fontSize: "11px", color: "#6B7280" }}>{job.dates}</span>
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "4px", color: "#374151" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Senior Manager — Tech Solutions Inc.</strong>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>2020 - Present</span>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151" }}>Led cross-functional team of 15 professionals achieving 30% productivity increase</li>
                <li style={{ marginBottom: "4px", color: "#374151" }}>Implemented strategic initiatives resulting in $2M cost savings annually</li>
              </ul>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Project Manager — Global Corp</strong>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>2017 - 2020</span>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151" }}>Managed portfolio of 10+ enterprise projects with $5M+ total budget</li>
                <li style={{ marginBottom: "4px", color: "#374151" }}>Delivered projects on time with 95% client satisfaction rating</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Education
        </div>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            <strong style={{ fontSize: "12px", color: "#111827" }}>{ed.degree}</strong>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>
              {ed.institution} • {ed.year}
            </div>
          </div>
        )) : (
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ fontSize: "12px", color: "#111827" }}>MBA, Business Administration</strong>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>Stanford University • 2017</div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Core Skills
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {(skills.length > 0 ? skills : ["Strategic Planning", "Team Leadership", "Project Management", "Data Analysis", "Process Optimization", "Stakeholder Management"]).map((skill, idx) => (
            <span key={idx} style={{ 
              fontSize: "11px", 
              padding: "4px 10px", 
              background: "#F3F4F6", 
              borderRadius: "4px",
              color: "#374151"
            }}>
              {typeof skill === 'string' ? skill : skill.name || skill}
            </span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Certifications
        </div>
        <div style={{ fontSize: "11px", color: "#374151" }}>
          {certs.length > 0 ? certs.map((cert, idx) => (
            <span key={idx}>{typeof cert === 'string' ? cert : cert.name || cert}{idx < certs.length - 1 ? ' • ' : ''}</span>
          )) : "PMP - Project Management Professional (2020) • Six Sigma Green Belt (2019)"}
        </div>
      </section>

      {/* Languages */}
      <section>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Languages
        </div>
        <div style={{ fontSize: "11px", color: "#374151" }}>
          {langs.length > 0 ? langs.map((lang, idx) => {
            const langName = typeof lang === 'string' ? lang : lang.language;
            const proficiency = typeof lang === 'object' ? lang.proficiency : '';
            return <span key={idx}>{langName} {proficiency && `(${proficiency})`}{idx < langs.length - 1 ? ' • ' : ''}</span>;
          }) : "English (Native) • Spanish (Professional)"}
        </div>
      </section>
    </div>
  );
}