import React from "react";

export default function FocusSidebarPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview focus sidebar" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6,
      display: "flex"
    }}>
      {/* Dark Sidebar */}
      <aside style={{ 
        width: "80px",
        background: "#1F2937",
        padding: "24px 12px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ 
          writingMode: "vertical-rl", 
          transform: "rotate(180deg)",
          fontSize: "20px",
          fontWeight: "700",
          letterSpacing: "0.05em"
        }}>
          {r.name || "JOHN DOE"}
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "28px 32px" }}>
        {/* Header */}
        <header style={{ marginBottom: "22px" }}>
          <div style={{ color: "#2563EB", fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
            {r.title || "Professional Title"}
          </div>
          <div style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.8 }}>
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
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            About
          </div>
          <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
            {r.summary || "Award-winning Brand Strategist with 10+ years building iconic brands for Fortune 500 companies. Expert in brand positioning, consumer insights, and integrated marketing campaigns that drive measurable business growth."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "10px" }}>
            Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>
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
                <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>Brand Strategist</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Global Agency • 2019 - Present</div>
                <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Developed brand strategy for 20+ Fortune 500 clients</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Led rebranding increasing brand equity by 35%</li>
                </ul>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block" }}>Marketing Manager</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Digital Studio • 2015 - 2019</div>
                <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Executed integrated campaigns across digital channels</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Increased customer engagement by 60%</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
          {/* Education */}
          <section>
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
                <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Marketing</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>Business School, 2015</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
              Skills
            </div>
            <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
              {(skills.length > 0 ? skills : ["Brand Strategy", "Market Research", "Consumer Insights", "Campaign Planning", "Creative Direction", "Positioning"]).map((skill, idx) => (
                <div key={idx}>• {typeof skill === 'string' ? skill : skill.name || skill}</div>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications & Languages */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Certifications
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {certs.length > 0 ? certs.join(" • ") : "Google Analytics • Brand Strategy Certified"}
            </div>
          </section>

          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Languages
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {langs.length > 0 ? langs.map((l, i) => {
                const name = typeof l === 'string' ? l : l.language;
                const prof = typeof l === 'object' ? l.proficiency : '';
                return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
              }) : "English (Native)"}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}