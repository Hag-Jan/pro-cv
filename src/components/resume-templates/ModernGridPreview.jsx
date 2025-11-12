import React from "react";

export default function ModernGridPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview modern grid" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "24px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6,
      display: "grid",
      gridTemplateColumns: "30% 1fr",
      gap: "24px"
    }}>
      {/* Left Sidebar */}
      <aside style={{ paddingRight: "16px", borderRight: "1px solid #E5E7EB" }}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px", color: "#111827" }}>
            {r.name || "John Doe"}
          </div>
          <div style={{ color: "#2563EB", fontSize: "13px", fontWeight: "600" }}>
            {r.title || "Professional"}
          </div>
        </div>

        {/* Contact */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Contact
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            <div>{r.contact?.email || "email@example.com"}</div>
            <div>{r.contact?.phone || "+1 555-0000"}</div>
            <div>{r.contact?.location || "City, Country"}</div>
          </div>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Skills
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            {(skills.length > 0 ? skills : ["Leadership", "Strategy", "Analytics", "Communication", "Problem Solving"]).map((skill, idx) => (
              <div key={idx}>• {typeof skill === 'string' ? skill : skill.name || skill}</div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            {certs.length > 0 ? certs.map((cert, idx) => (
              <div key={idx}>• {typeof cert === 'string' ? cert : cert.name || cert}</div>
            )) : (
              <>
                <div>• PMP (2020)</div>
                <div>• Agile Certified (2019)</div>
              </>
            )}
          </div>
        </section>

        {/* Languages */}
        <section>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
            {langs.length > 0 ? langs.map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : lang.language;
              const proficiency = typeof lang === 'object' ? lang.proficiency : 'Fluent';
              return <div key={idx}>{langName} ({proficiency})</div>;
            }) : (
              <>
                <div>English (Native)</div>
                <div>French (Professional)</div>
              </>
            )}
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main>
        {/* Summary */}
        <section style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", fontWeight: "600", marginBottom: "8px" }}>
            Profile
          </div>
          <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
            {r.summary || "Dynamic professional with extensive experience in leading high-performing teams and delivering strategic initiatives. Proven ability to drive organizational growth through innovative solutions and data-driven decision making."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", fontWeight: "600", marginBottom: "10px" }}>
            Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>
                {job.company} • {job.dates}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "3px", color: "#374151" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>Senior Consultant</strong>
                <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>Advisory Group • 2019 - Present</div>
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Advised Fortune 500 clients on digital transformation strategies</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Led teams of 8+ consultants on enterprise-level projects</li>
                </ul>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>Business Analyst</strong>
                <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>Tech Corp • 2016 - 2019</div>
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Analyzed business requirements and delivered technical solutions</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Improved operational efficiency by 25% through process optimization</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", fontWeight: "600", marginBottom: "8px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution} • {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>Master of Business Administration</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>Harvard Business School • 2016</div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}