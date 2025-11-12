import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ClassicPro({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview classic pro" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "48px",
        color: "#111827",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, marginBottom: "4px", color: "#111827" }}>
              {r.full_name || "John Doe"}
            </h1>
            <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 600 }}>
              {r.professional_title || "Professional Title"}
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "#6B7280", textAlign: "right", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {r.email && <span>{r.email}</span>}
            {r.phone && <><span>|</span><span>{r.phone}</span></>}
            {r.location && <><span>|</span><span>{r.location}</span></>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {r.summary && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
            Professional Summary
          </h2>
          <p style={{ color: "#374151", margin: 0, lineHeight: 1.6 }}>
            {r.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "16px" }}>
            Professional Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <div>
                  <strong style={{ color: "#111827", fontSize: "13px" }}>{item.title || item.position}</strong>
                  <span style={{ color: "#6B7280", fontSize: "12px" }}> — {item.company}</span>
                </div>
                <span style={{ 
                  fontSize: "11px", 
                  color: "#ffffff", 
                  background: "#0F172A", 
                  padding: "2px 8px", 
                  borderRadius: "4px",
                  whiteSpace: "nowrap"
                }}>
                  {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                </span>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#374151" }}>
                  {item.bullets.map((bullet, bidx) => (
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
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
            Education
          </h2>
          {edu.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#111827" }}>{item.degree}</strong>
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
          <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
            Core Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
              return (
                <span key={idx} style={{ 
                  fontSize: "11px", 
                  padding: "4px 10px", 
                  background: "#F3F4F6", 
                  color: "#374151",
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
  );
}