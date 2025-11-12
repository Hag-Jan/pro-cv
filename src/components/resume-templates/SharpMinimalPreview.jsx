import React from "react";

export default function SharpMinimalPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview sharp minimal" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "28px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Centered Header */}
      <header style={{ 
        textAlign: "center", 
        marginBottom: "28px",
        paddingBottom: "20px",
        borderBottom: "2px solid #111827"
      }}>
        <div style={{ fontWeight: "700", fontSize: "26px", marginBottom: "6px", color: "#111827", letterSpacing: "-0.02em" }}>
          {r.name || "JOHN DOE"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {[r.contact?.email, r.contact?.phone, r.contact?.location].filter(Boolean).join(" | ") || "email@example.com | +1 555-0000 | City"}
        </div>
      </header>

      {/* Summary */}
      <section style={{ 
        marginBottom: "24px",
        paddingBottom: "24px",
        borderBottom: "1px solid #E5E7EB"
      }}>
        <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0, textAlign: "center" }}>
          {r.summary || "Analytical professional with proven expertise in financial analysis and investment strategies. Track record of managing portfolios and delivering consistent returns through data-driven decision making and market analysis."}
        </p>
      </section>

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
        {/* Left: Experience */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "14px" }}>
            Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ 
              marginBottom: "14px",
              paddingBottom: "14px",
              borderBottom: idx < exp.length - 1 ? "1px solid #F3F4F6" : "none"
            }}>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>
                {job.company}
              </div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "6px" }}>
                {job.dates}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  {job.bullets.slice(0, 2).map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "3px", color: "#374151" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #F3F4F6" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Investment Analyst</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Capital Partners</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "6px" }}>2020 - Present</div>
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Manage €300M equity portfolio with 15% annualized returns</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Developed quantitative models for sector analysis</li>
                </ul>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Financial Analyst</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Investment Bank</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "6px" }}>2017 - 2020</div>
                <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Conducted financial modeling and valuation analysis</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Supported 10+ M&A transactions totaling $500M</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Right: Education & Skills */}
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
                <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>M.S. in Finance</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>London School of Economics</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF" }}>2017</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "10px" }}>
              Skills
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(skills.length > 0 ? skills : ["Financial Modeling", "Equity Analysis", "Valuation", "Python", "Bloomberg Terminal", "Portfolio Management"]).map((skill, idx) => (
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
                  <div>• CFA Level II Candidate</div>
                  <div>• Bloomberg Certified</div>
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
                  <div>German (Fluent)</div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}