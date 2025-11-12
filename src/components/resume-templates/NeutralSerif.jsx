import React from "react";

export default function NeutralSerif({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview neutral serif" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "64px 72px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "13px",
        lineHeight: 1.8
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "36px", textAlign: "center" }}>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: 400, 
          fontStyle: "italic",
          margin: 0, 
          marginBottom: "12px", 
          color: "#374151",
          fontFamily: "Georgia, serif"
        }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ 
          fontSize: "14px", 
          color: "#6B7280", 
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "20px",
          fontFamily: "Georgia, serif"
        }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 2 }}>
          {r.email && <div>{r.email}</div>}
          {r.phone && <div>{r.phone}</div>}
          {r.location && <div>{r.location}</div>}
        </div>
      </header>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "36px" }} />

      {/* Summary */}
      {r.summary && (
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 600,
            color: "#374151", 
            marginBottom: "16px",
            fontFamily: "Georgia, serif"
          }}>
            Professional Summary
          </h2>
          <p style={{ color: "#4B5563", margin: 0, textAlign: "justify" }}>{r.summary}</p>
        </section>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 600,
            color: "#374151", 
            marginBottom: "20px",
            fontFamily: "Georgia, serif"
          }}>
            Professional Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "24px" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong style={{ color: "#374151", fontSize: "14px", fontFamily: "Georgia, serif" }}>
                  {item.title || item.position}
                </strong>
                <div style={{ color: "#6B7280", fontSize: "12px", fontStyle: "italic", marginTop: "4px" }}>
                  {item.company} • {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                </div>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "24px", color: "#4B5563" }}>
                  {item.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "8px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 600,
            color: "#374151", 
            marginBottom: "16px",
            fontFamily: "Georgia, serif"
          }}>
            Education
          </h2>
          {edu.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#374151", fontSize: "13px" }}>{item.degree}</strong>
              <div style={{ color: "#6B7280", fontSize: "12px", fontStyle: "italic" }}>
                {item.institution}, {item.graduation_year || item.year}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 600,
            color: "#374151", 
            marginBottom: "16px",
            fontFamily: "Georgia, serif"
          }}>
            Professional Skills
          </h2>
          <div style={{ color: "#4B5563", lineHeight: 2 }}>
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
              return (
                <span key={idx}>
                  {skillName}
                  {idx < skills.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}