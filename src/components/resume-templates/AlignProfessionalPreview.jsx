import React from "react";

export default function AlignProfessionalPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview align professional" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "28px 32px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header */}
      <header style={{ 
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "16px",
        paddingBottom: "16px",
        borderBottom: "1px solid #E5E7EB",
        marginBottom: "24px"
      }}>
        <div>
          <div style={{ fontWeight: "700", fontSize: "22px", marginBottom: "4px", color: "#111827" }}>
            {r.name || "John Doe"}
          </div>
          <div style={{ color: "#6B7280", fontSize: "14px" }}>
            {r.title || "Professional Title"}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px", color: "#6B7280" }}>
          {r.contact?.email && <div>{r.contact.email}</div>}
          {r.contact?.phone && <div>{r.contact.phone}</div>}
          {r.contact?.location && <div>{r.contact.location}</div>}
          {!r.contact && (
            <>
              <div>email@example.com</div>
              <div>+1 555-0000</div>
              <div>City</div>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Professional Summary
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Data-driven Business Analyst with 7+ years translating complex requirements into actionable insights. Expertise in requirements analysis, SQL, data modeling, and process optimization for enterprise clients."}
        </p>
      </section>

      {/* Experience with dotted lines */}
      <section style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
          Professional Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ 
            marginBottom: "14px",
            paddingBottom: "14px",
            borderBottom: idx < exp.length - 1 ? "1px dotted #E5E7EB" : "none",
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "12px"
          }}>
            <div>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
                {job.company}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
            <div style={{ textAlign: "right", fontSize: "10px", color: "#6B7280" }}>
              {job.dates}
            </div>
          </div>
        )) : (
          <>
            <div style={{ 
              marginBottom: "14px",
              paddingBottom: "14px",
              borderBottom: "1px dotted #E5E7EB",
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "12px"
            }}>
              <div>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Senior Business Analyst</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Tech Consulting Group</div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led requirements analysis for ERP system serving 5,000+ users</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Improved process efficiency by 30% through data modeling</li>
                </ul>
              </div>
              <div style={{ textAlign: "right", fontSize: "10px", color: "#6B7280" }}>2020 - Present</div>
            </div>
            <div style={{ 
              marginBottom: "14px",
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "12px"
            }}>
              <div>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Business Analyst</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Enterprise Solutions</div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Conducted gap analysis and process mapping for 15+ projects</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Created business intelligence dashboards used by executives</li>
                </ul>
              </div>
              <div style={{ textAlign: "right", fontSize: "10px", color: "#6B7280" }}>2017 - 2020</div>
            </div>
          </>
        )}
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
        {/* Education */}
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution} • {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>M.S. in Information Systems</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>State University • 2017</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Skills
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(skills.length > 0 ? skills : ["SQL", "Data Modeling", "Tableau", "Agile", "Process Mapping", "Requirements Analysis"]).map((skill, idx) => (
              <span key={idx} style={{ 
                fontSize: "10px",
                padding: "3px 8px",
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

      {/* Certifications & Languages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "CBAP • PMI-PBA"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "Russian (Native) • English (Fluent)"}
          </div>
        </section>
      </div>
    </div>
  );
}