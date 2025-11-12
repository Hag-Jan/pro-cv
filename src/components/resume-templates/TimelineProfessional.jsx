import React from "react";

export default function TimelineProfessional({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview timeline professional" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "48px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0, marginBottom: "6px", color: "#111827" }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ fontSize: "14px", color: "#64748B", fontWeight: 600, marginBottom: "12px" }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {[r.email, r.phone, r.location].filter(Boolean).join(" • ")}
        </div>
      </header>

      {/* Summary */}
      {r.summary && (
        <section style={{ marginBottom: "28px", padding: "16px", background: "#F9FAFB", borderRadius: "8px" }}>
          <p style={{ color: "#374151", margin: 0, textAlign: "center", fontSize: "12px" }}>
            {r.summary}
          </p>
        </section>
      )}

      {/* Experience Timeline */}
      {exp.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B", marginBottom: "20px", textAlign: "center" }}>
            Professional Experience
          </h2>
          <div style={{ position: "relative", paddingLeft: "120px", borderLeft: "2px solid #E5E7EB", marginLeft: "60px" }}>
            {exp.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "24px", position: "relative" }}>
                {/* Date on left */}
                <div style={{ 
                  position: "absolute", 
                  left: "-120px", 
                  top: "0", 
                  width: "100px",
                  textAlign: "right",
                  fontSize: "11px",
                  color: "#64748B",
                  fontWeight: 600,
                  fontFamily: "monospace"
                }}>
                  {item.dates || `${item.start_date || ''} - ${item.current ? 'Now' : item.end_date || ''}`}
                </div>
                
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "-25px",
                  top: "4px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#64748B",
                  border: "2px solid #ffffff"
                }} />

                {/* Content */}
                <div style={{ paddingLeft: "16px" }}>
                  <strong style={{ color: "#111827", fontSize: "13px", display: "block", marginBottom: "2px" }}>
                    {item.title || item.position}
                  </strong>
                  <div style={{ color: "#6B7280", fontSize: "12px", marginBottom: "8px" }}>
                    {item.company}
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: "18px", color: "#374151" }}>
                      {item.bullets.map((bullet, bidx) => (
                        <li key={bidx} style={{ marginBottom: "6px" }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Education */}
        {edu.length > 0 && (
          <section>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B", marginBottom: "12px" }}>
              Education
            </h2>
            {edu.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ color: "#111827", fontSize: "12px" }}>{item.degree}</strong>
                <div style={{ color: "#6B7280", fontSize: "11px" }}>
                  {item.institution}
                </div>
                <div style={{ color: "#6B7280", fontSize: "10px" }}>
                  {item.graduation_year || item.year}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B", marginBottom: "12px" }}>
              Skills
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((skill, idx) => {
                const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                return (
                  <span key={idx} style={{ 
                    fontSize: "11px", 
                    color: "#64748B",
                    padding: "4px 8px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "4px",
                    fontWeight: 500
                  }}>
                    {skillName}
                  </span>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}