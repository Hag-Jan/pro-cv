import React from "react";

export default function CorporateEdgePreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview corporate edge" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Top Bar Header */}
      <header style={{ 
        background: "#F3F4F6",
        padding: "24px 32px",
        borderBottom: "2px solid #E5E7EB"
      }}>
        <div style={{ fontWeight: "700", fontSize: "26px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "12px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>{r.contact?.location || "City"}</span>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: "32px" }}>
        {/* Summary */}
        <section style={{ marginBottom: "28px" }}>
          <div style={{ 
            fontSize: "12px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "0.05em", 
            color: "#111827", 
            marginBottom: "10px",
            borderBottom: "2px solid #E5E7EB",
            paddingBottom: "6px"
          }}>
            Executive Summary
          </div>
          <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
            {r.summary || "High-performing executive with 16+ years building and scaling revenue organizations. Proven expertise in enterprise sales, team development, strategic partnerships, and driving $400M+ ARR growth for leading technology companies."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "28px" }}>
          <div style={{ 
            fontSize: "12px", 
            fontWeight: "700", 
            textTransform: "uppercase", 
            letterSpacing: "0.05em", 
            color: "#111827", 
            marginBottom: "14px",
            borderBottom: "2px solid #E5E7EB",
            paddingBottom: "6px"
          }}>
            Professional Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>
                  {job.company}
                </span>
                <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
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
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>VP of Sales</strong>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Enterprise SaaS Inc.</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>2018 - Present</span>
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Built sales organization of 150+ AEs generating $400M+ ARR</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Increased average deal size by 65% through strategic account management</li>
                </ul>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>Sales Director</strong>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Tech Solutions Corp</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>2014 - 2018</span>
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led team of 30 account executives achieving 140% of quota</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Closed $50M+ in annual revenue through enterprise deals</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Right: Education, Skills, Certs, Languages */}
        <div>
          {/* Education */}
          <section style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "10px" }}>
              Education
            </div>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
                  {ed.degree}
                </strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{ed.year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>MBA, Business Admin</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>Stanford GSB</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF" }}>2014</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "10px" }}>
              Skills
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(skills.length > 0 ? skills : ["Enterprise Sales", "Team Leadership", "Revenue Operations", "Strategic Planning", "Salesforce CRM", "Negotiation"]).map((skill, idx) => (
                <div key={idx} style={{ 
                  fontSize: "10px",
                  color: "#374151",
                  paddingLeft: "10px",
                  borderLeft: "2px solid #E5E7EB"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "8px" }}>
              Certifications
            </div>
            <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
              {certs.length > 0 ? certs.map((cert, idx) => (
                <div key={idx}>• {typeof cert === 'string' ? cert : cert.name || cert}</div>
              )) : (
                <>
                  <div>• Salesforce Certified Admin</div>
                  <div>• Strategic Account Mgmt</div>
                </>
              )}
            </div>
          </section>

          {/* Languages */}
          <section>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "8px" }}>
              Languages
            </div>
            <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
              {langs.length > 0 ? langs.map((l, i) => {
                const name = typeof l === 'string' ? l : l.language;
                const prof = typeof l === 'object' ? l.proficiency : '';
                return <div key={i}>{name}{prof ? ` (${prof})` : ''}</div>;
              }) : (
                <>
                  <div>English (Native)</div>
                  <div>Spanish (Conversational)</div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}