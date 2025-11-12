import React from "react";

export default function StrategicATSPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview strategic ats" style={{
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
      lineHeight: 1.7
    }}>
      {/* Header */}
      <header style={{ marginBottom: "28px" }}>
        <div style={{ fontWeight: "700", fontSize: "26px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#374151", fontSize: "15px", fontWeight: "600", marginBottom: "14px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.8 }}>
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
      <section style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Professional Summary
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {r.summary || "Strategic professional with 12+ years driving operational excellence and business transformation. Expertise in supply chain optimization, team leadership, and delivering cost-saving initiatives that enhance organizational performance and competitive advantage."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Work Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "18px" }}>
            <div style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "13px", color: "#111827" }}>
                {job.company} — {job.position}
              </strong>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                {job.dates}
              </div>
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Global Manufacturing Corp — Supply Chain Director</strong>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>2018 - Present</div>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>Oversee $500M procurement budget across 30+ countries</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>Reduced supply chain costs by $80M through strategic sourcing initiatives</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>Improved on-time delivery from 72% to 94% across global network</li>
              </ul>
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Fortune 500 Company — Operations Manager</strong>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>2014 - 2018</div>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>Managed daily operations for $50M business unit with 200+ employees</li>
                <li style={{ marginBottom: "6px", color: "#374151", fontSize: "12px" }}>Implemented lean manufacturing principles reducing waste by 35%</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Education
        </div>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <strong style={{ fontSize: "12px", color: "#111827" }}>{ed.degree}</strong>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>{ed.institution} — {ed.year}</div>
          </div>
        )) : (
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ fontSize: "12px", color: "#111827" }}>MBA, Supply Chain Management</strong>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>Northwestern University — 2014</div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Skills
        </div>
        <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.8 }}>
          {(skills.length > 0 ? skills : ["Supply Chain Management", "Logistics", "Procurement", "Vendor Management", "ERP Systems", "Analytics"]).map((skill, idx) => (
            <span key={idx}>
              {typeof skill === 'string' ? skill : skill.name || skill}
              {idx < (skills.length || 6) - 1 ? ' • ' : ''}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <section>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Certifications
          </div>
          <div style={{ fontSize: "11px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "CSCP • CPIM • Six Sigma Black Belt"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Languages
          </div>
          <div style={{ fontSize: "11px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "English (Native) • Mandarin (Professional)"}
          </div>
        </section>
      </div>
    </div>
  );
}