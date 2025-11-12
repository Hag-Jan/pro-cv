import React from "react";

export default function StrategicATS({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview strategic ATS" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "64px 72px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "13px",
        lineHeight: 1.7
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0, marginBottom: "8px", color: "#0F172A" }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ fontSize: "16px", color: "#374151", fontWeight: 600, marginBottom: "16px" }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.8 }}>
          {r.email && <div>{r.email}</div>}
          {r.phone && <div>{r.phone}</div>}
          {r.location && <div>{r.location}</div>}
        </div>
      </header>

      {/* Summary */}
      {r.summary && (
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Professional Summary
          </h2>
          <p style={{ color: "#374151", margin: 0 }}>{r.summary}</p>
        </section>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Work Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#0F172A", fontSize: "14px" }}>
                  {item.company} — {item.title || item.position}
                </strong>
                <div style={{ color: "#6B7280", fontSize: "12px", marginTop: "4px" }}>
                  {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                </div>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#374151" }}>
                  {item.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "8px", lineHeight: 1.7 }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Education
          </h2>
          {edu.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#0F172A", fontSize: "13px" }}>{item.degree}</strong>
              <div style={{ color: "#6B7280", fontSize: "12px" }}>
                {item.institution} — {item.graduation_year || item.year}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Skills
          </h2>
          <div style={{ color: "#374151" }}>
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
              return (
                <span key={idx}>
                  {skillName}
                  {idx < skills.length - 1 ? ' • ' : ''}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}