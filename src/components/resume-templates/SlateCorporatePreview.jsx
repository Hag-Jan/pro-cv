import React from "react";

export default function SlateCorporatePreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview slate corporate" style={{
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
      {/* Wide Top Banner */}
      <header style={{ 
        background: "#1F2937",
        padding: "32px 40px",
        color: "#fff"
      }}>
        <div style={{ 
          fontFamily: "Georgia, serif",
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "6px"
        }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ 
          fontSize: "15px",
          color: "#D1D5DB",
          fontWeight: "600",
          marginBottom: "12px"
        }}>
          {r.title || "Corporate Professional"}
        </div>
        <div style={{ fontSize: "11px", color: "#D1D5DB", display: "flex", gap: "12px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>•</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>•</span>
          <span>{r.contact?.location || "City"}</span>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: "32px 40px" }}>
        {/* Summary */}
        <section style={{ marginBottom: "28px" }}>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "10px"
          }}>
            Executive Profile
          </div>
          <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
            {r.summary || "Strategic CFO with 20+ years driving financial strategy and M&A for $2B+ public companies. CPA with extensive expertise in financial planning, capital markets, risk management, and investor relations across global organizations."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "28px" }}>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "14px"
          }}>
            Professional Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>
                  {job.company}
                </span>
                <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                  {job.dates}
                </span>
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>Chief Financial Officer</strong>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Fortune 500 Manufacturing</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>2017 - Present</span>
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Oversee financial operations for $2.5B organization with 8,000+ employees</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led successful IPO raising $400M with 25% first-day gain</li>
                </ul>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>VP of Finance</strong>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: "600" }}>Global Corporation</span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF" }}>2012 - 2017</span>
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Managed FP&A for $800M business unit</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led 5+ acquisitions totaling $200M in deal value</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "24px" }}>
          {/* Education */}
          <section>
            <div style={{ 
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "10px"
            }}>
              Education
            </div>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}, {ed.year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Finance</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>Chicago Booth, 2004</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section>
            <div style={{ 
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "10px"
            }}>
              Core Competencies
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(skills.length > 0 ? skills : ["Financial Strategy", "M&A", "FP&A", "Risk Management", "Treasury", "Investor Relations"]).map((skill, idx) => (
                <span key={idx} style={{ 
                  fontSize: "10px",
                  padding: "4px 10px",
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  color: "#374151"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications & Languages */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          <section>
            <div style={{ 
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "8px"
            }}>
              Certifications
            </div>
            <div style={{ fontSize: "11px", color: "#4B5563" }}>
              {certs.length > 0 ? certs.join(", ") : "CPA, CFA Charterholder"}
            </div>
          </section>

          <section>
            <div style={{ 
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "8px"
            }}>
              Languages
            </div>
            <div style={{ fontSize: "11px", color: "#4B5563" }}>
              {langs.length > 0 ? langs.map((l, i) => {
                const name = typeof l === 'string' ? l : l.language;
                const prof = typeof l === 'object' ? l.proficiency : '';
                return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ', ' : ''}`;
              }) : "English (Native)"}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}