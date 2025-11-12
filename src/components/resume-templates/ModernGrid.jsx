import React from "react";
import { Mail, Phone, MapPin, Award, Globe } from "lucide-react";

export default function ModernGrid({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  const languages = resume.languages || [];
  
  return (
    <div 
      aria-label="A4 preview modern grid" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#F8FAFC",
        padding: "32px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6,
        display: "flex",
        gap: "24px"
      }}
    >
      {/* Left Column - 32% */}
      <aside style={{ width: "32%", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Name Card */}
        <div style={{ 
          background: "#ffffff", 
          border: "1px solid #E5E7EB", 
          borderRadius: "12px", 
          padding: "16px",
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)"
        }}>
          <h1 style={{ fontSize: "20px", fontWeight: 600, margin: 0, marginBottom: "4px", color: "#111827" }}>
            {r.full_name || "John Doe"}
          </h1>
          <div style={{ fontSize: "13px", color: "#2563EB", fontWeight: 600 }}>
            {r.professional_title || "Professional"}
          </div>
        </div>

        {/* Contact Card */}
        <div style={{ 
          background: "#ffffff", 
          border: "1px solid #E5E7EB", 
          borderRadius: "12px", 
          padding: "16px",
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)"
        }}>
          <h3 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6B7280", marginBottom: "12px", letterSpacing: "0.05em" }}>
            Contact
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", color: "#374151" }}>
            {r.email && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail style={{ width: "14px", height: "14px", color: "#2563EB" }} />
                <span style={{ wordBreak: "break-all" }}>{r.email}</span>
              </div>
            )}
            {r.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone style={{ width: "14px", height: "14px", color: "#2563EB" }} />
                <span>{r.phone}</span>
              </div>
            )}
            {r.location && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin style={{ width: "14px", height: "14px", color: "#2563EB" }} />
                <span>{r.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Card */}
        {skills.length > 0 && (
          <div style={{ 
            background: "#ffffff", 
            border: "1px solid #E5E7EB", 
            borderRadius: "12px", 
            padding: "16px",
            boxShadow: "0 6px 18px rgba(16,24,40,0.06)"
          }}>
            <h3 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6B7280", marginBottom: "12px", letterSpacing: "0.05em" }}>
              Skills
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {skills.slice(0, 8).map((skill, idx) => {
                const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                return (
                  <div key={idx} style={{ fontSize: "11px", color: "#374151" }}>
                    • {skillName}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Languages Card */}
        {languages.length > 0 && (
          <div style={{ 
            background: "#ffffff", 
            border: "1px solid #E5E7EB", 
            borderRadius: "12px", 
            padding: "16px",
            boxShadow: "0 6px 18px rgba(16,24,40,0.06)"
          }}>
            <h3 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6B7280", marginBottom: "12px", letterSpacing: "0.05em" }}>
              Languages
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {languages.map((lang, idx) => {
                const langName = typeof lang === 'string' ? lang : lang.language;
                const proficiency = typeof lang === 'object' ? lang.proficiency : '';
                return (
                  <div key={idx} style={{ fontSize: "11px", color: "#374151" }}>
                    <strong>{langName}</strong> {proficiency && `— ${proficiency}`}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </aside>

      {/* Right Column - 68% */}
      <main style={{ width: "68%", display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Summary */}
        {r.summary && (
          <section>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "10px" }}>
              Profile
            </h2>
            <p style={{ color: "#374151", margin: 0 }}>{r.summary}</p>
          </section>
        )}

        {/* Experience */}
        {exp.length > 0 && (
          <section>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "14px" }}>
              Experience
            </h2>
            {exp.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "14px" }}>
                <div style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#111827", fontSize: "13px" }}>{item.title || item.position}</strong>
                  <div style={{ color: "#6B7280", fontSize: "11px" }}>
                    {item.company} • {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                  </div>
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "16px", color: "#374151" }}>
                    {item.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "4px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {edu.length > 0 && (
          <section>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "10px" }}>
              Education
            </h2>
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
      </main>
    </div>
  );
}