import React from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function PrecisionExec({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview precision exec" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "48px 56px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0, marginBottom: "6px", color: "#111827" }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ fontSize: "14px", color: "#0EA5E9", fontWeight: 600, marginBottom: "12px" }}>
          {r.professional_title || "Executive Professional"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "12px" }}>
          {r.email && <span>{r.email}</span>}
          {r.phone && <span>•</span>}
          {r.phone && <span>{r.phone}</span>}
          {r.location && <span>•</span>}
          {r.location && <span>{r.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {r.summary && (
        <section style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{ width: "4px", height: "14px", background: "#0EA5E9", borderRadius: "2px" }} />
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", margin: 0 }}>
              Executive Summary
            </h2>
          </div>
          <p style={{ color: "#374151", margin: 0 }}>{r.summary}</p>
        </section>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Briefcase style={{ width: "14px", height: "14px", color: "#0EA5E9" }} />
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", margin: 0 }}>
              Professional Experience
            </h2>
          </div>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: "#111827", fontSize: "13px", display: "block" }}>
                    {item.title || item.position}
                  </strong>
                  <span style={{ color: "#6B7280", fontSize: "12px" }}>{item.company}</span>
                </div>
                <span style={{ 
                  fontSize: "11px", 
                  color: "#6B7280",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  marginLeft: "16px"
                }}>
                  {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                </span>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#374151" }}>
                  {item.bullets.slice(0, 3).map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "6px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <GraduationCap style={{ width: "14px", height: "14px", color: "#0EA5E9" }} />
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", margin: 0 }}>
              Education
            </h2>
          </div>
          {edu.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#111827", fontSize: "12px" }}>{item.degree}</strong>
              <div style={{ color: "#6B7280", fontSize: "11px" }}>
                {item.institution} • {item.graduation_year || item.year}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Award style={{ width: "14px", height: "14px", color: "#0EA5E9" }} />
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", margin: 0 }}>
              Core Competencies
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
              return (
                <div key={idx} style={{ 
                  fontSize: "11px", 
                  color: "#374151",
                  padding: "6px 12px",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontWeight: 500
                }}>
                  {skillName}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}