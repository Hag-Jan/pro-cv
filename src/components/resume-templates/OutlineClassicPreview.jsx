import React from "react";

export default function OutlineClassicPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview outline classic" style={{
      width: "210mm",
      height: "297mm",
      background: "#F9FAFB",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "24px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header Card */}
      <header style={{ 
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <div style={{ fontWeight: "700", fontSize: "22px", marginBottom: "4px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#2563EB", fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "10px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>•</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>•</span>
          <span>{r.contact?.location || "City"}</span>
        </div>
      </header>

      {/* Summary Card */}
      <section style={{ 
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Professional Summary
        </div>
        <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Strategic HR Director with 12+ years driving talent strategy and organizational development. Expert in talent acquisition, performance management, employee relations, and building high-performing cultures for 2,000+ employee organizations."}
        </p>
      </section>

      {/* Experience Card */}
      <section style={{ 
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
          Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: idx < exp.length - 1 ? "12px" : 0 }}>
            <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>
              {job.position}
            </strong>
            <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>
              {job.company} • {job.dates}
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "3px", color: "#374151" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>HR Director</strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Tech Company • 2018 - Present</div>
              <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                <li style={{ marginBottom: "3px", color: "#374151" }}>Led talent acquisition hiring 500+ employees annually</li>
                <li style={{ marginBottom: "3px", color: "#374151" }}>Increased employee engagement scores by 40%</li>
              </ul>
            </div>
            <div>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>HR Manager</strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Consulting Firm • 2014 - 2018</div>
              <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                <li style={{ marginBottom: "3px", color: "#374151" }}>Managed performance management system for 800+ employees</li>
                <li style={{ marginBottom: "3px", color: "#374151" }}>Developed leadership training program adopted company-wide</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        {/* Education Card */}
        <section style={{ 
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}, {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, HR Management</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>Cornell University, 2014</div>
            </div>
          )}
        </section>

        {/* Skills Card */}
        <section style={{ 
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Skills
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {(skills.length > 0 ? skills : ["Talent Strategy", "Employee Relations", "Performance Mgmt", "HRIS", "Recruitment", "Organizational Dev"]).map((skill, idx) => (
              <span key={idx} style={{ 
                fontSize: "10px",
                padding: "3px 7px",
                background: "#F3F4F6",
                borderRadius: "3px",
                color: "#374151"
              }}>
                {typeof skill === 'string' ? skill : skill.name || skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications & Languages Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <section style={{ 
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            {certs.length > 0 ? certs.join(" • ") : "SHRM-SCP • CPHR"}
          </div>
        </section>

        <section style={{ 
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "English (Native)"}
          </div>
        </section>
      </div>
    </div>
  );
}