import React from "react";

export default function PrecisionExecPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview precision exec" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "32px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header */}
      <header style={{ marginBottom: "24px" }}>
        <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "4px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#0EA5E9", fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>
          {r.title || "Executive Professional"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "12px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>•</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>•</span>
          <span>{r.contact?.location || "City"}</span>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Executive Profile
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Strategic executive leader with 15+ years driving organizational transformation and revenue growth. Proven track record in scaling operations, building high-performing teams, and delivering measurable business results across Fortune 500 companies."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "14px" }}>
          Professional Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block" }}>
                  {job.position}
                </strong>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>{job.company}</span>
              </div>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginLeft: "16px", whiteSpace: "nowrap" }}>
                {job.dates}
              </span>
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "13px", color: "#111827", display: "block" }}>Chief Operating Officer</strong>
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>Global Enterprises Inc.</span>
                </div>
                <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginLeft: "16px", whiteSpace: "nowrap" }}>2019 - Present</span>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led operational strategy for $500M organization with 2,000+ employees</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Achieved 35% revenue growth through strategic expansion initiatives</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Reduced operational costs by $20M annually through process optimization</li>
              </ul>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "13px", color: "#111827", display: "block" }}>Vice President of Operations</strong>
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>Fortune 100 Corporation</span>
                </div>
                <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", marginLeft: "16px", whiteSpace: "nowrap" }}>2015 - 2019</span>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Managed P&L of $200M business unit with 800+ employees</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Increased operational efficiency by 40% through lean methodologies</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
        {/* Education */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "12px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "11px", color: "#6B7280" }}>{ed.institution} • {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "12px", color: "#111827" }}>MBA, Executive Leadership</strong>
              <div style={{ fontSize: "11px", color: "#6B7280" }}>Wharton School • 2014</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Core Competencies
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {(skills.length > 0 ? skills : ["Strategic Planning", "P&L Management", "Team Leadership", "Change Management", "M&A Integration", "Board Relations"]).map((skill, idx) => (
              <div key={idx} style={{ 
                fontSize: "10px", 
                padding: "6px 10px", 
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                color: "#374151",
                textAlign: "center"
              }}>
                {typeof skill === 'string' ? skill : skill.name || skill}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications & Languages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "Board Director Certification • Six Sigma Master Black Belt"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "English (Native) • Spanish (Professional)"}
          </div>
        </section>
      </div>
    </div>
  );
}