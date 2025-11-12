import React from "react";

export default function Mercury({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const awards = r.awards || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "40px 48px",
      fontSize: "11px",
      lineHeight: 1.6,
      color: "#1F2937"
    }}>
      {/* Centered Header */}
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "400", margin: "0 0 4px 0" }}>
          {personal.full_name || personal.name || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 20px 0" }}>
          {personal.professional_title || personal.title || "Business Development Consultant"}
        </p>
        
        {/* Profile Photo */}
        <div style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "#F3F4F6",
          margin: "0 auto 20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "700",
          color: "#9CA3AF"
        }}>
          {(personal.full_name || personal.name || "Y").charAt(0)}
        </div>
      </header>

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Left Column */}
        <div>
          {/* Contact */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "10px" }}>
              Contact
            </h3>
            <div style={{ fontSize: "10px", color: "#4B5563", lineHeight: 1.8 }}>
              <div>{personal.email || "your.email@example.com"}</div>
              <div>{personal.phone || "+1 (555) 123-4567"}</div>
              <div>{personal.location || "San Francisco, CA"}</div>
            </div>
          </section>

          {/* Work Experience */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Work Experience
            </h3>
            {exp.length > 0 ? exp.slice(0, 2).map((job, idx) => (
              <div key={idx} style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "11px", color: "#1F2937", display: "block" }}>
                  {job.title || job.position}
                </strong>
                <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>
                  {job.company} | {job.dates}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    {job.bullets.slice(0, 2).map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "3px", color: "#4B5563" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "14px" }}>
                  <strong style={{ fontSize: "11px", color: "#1F2937", display: "block" }}>Business Development Manager</strong>
                  <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>Tech Solutions | 2021 - Present</div>
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Achieved 150% of sales quota through strategic partnerships</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Led team of 8 professionals exceeding revenue targets</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <strong style={{ fontSize: "11px", color: "#1F2937", display: "block" }}>Sales Consultant</strong>
                  <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>Global Corp | 2018 - 2021</div>
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Managed client relationships generating $2M+ annually</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Implemented CRM improving efficiency by 40%</li>
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Education */}
          <section>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Education
            </h3>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "11px", color: "#1F2937" }}>{ed.degree}</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>
                  {ed.institution} | {ed.year || ed.graduation_year}
                </div>
              </div>
            )) : (
              <div style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "11px", color: "#1F2937" }}>MBA, Business Administration</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>Stanford University | 2018</div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Skills in Two Columns */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Skills
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
              {(skills.length > 0 ? skills : [
                "Strategic thinking",
                "Team leadership",
                "Communication",
                "Data analysis",
                "Project management",
                "Negotiation",
                "Sales strategy",
                "Market research"
              ]).map((skill, idx) => (
                <div key={idx} style={{ fontSize: "9px", color: "#4B5563", display: "flex", alignItems: "flex-start", gap: "4px" }}>
                  <span style={{ color: "#000", fontWeight: "700" }}>•</span>
                  <span>{typeof skill === 'string' ? skill : skill.name || skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Languages with Stars */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "10px" }}>
              Languages
            </h3>
            {(langs.length > 0 ? langs : [
              { language: "English", proficiency: "Native", level: 5 },
              { language: "Spanish", proficiency: "Professional", level: 4 }
            ]).map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
              const level = lang.level || 4;
              return (
                <div key={idx} style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "#1F2937" }}>{langName}</span>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} style={{ color: i <= level ? "#000" : "#D1D5DB", fontSize: "10px" }}>★</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Awards */}
          <section>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#1F2937", marginBottom: "10px" }}>
              Awards
            </h3>
            <div style={{ fontSize: "10px", color: "#4B5563", lineHeight: 1.8 }}>
              {awards.length > 0 ? awards.map((award, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  • {typeof award === 'string' ? award : `${award.name}, ${award.organization}, ${award.year}`}
                </div>
              )) : (
                <>
                  <div style={{ marginBottom: "8px" }}>• Outstanding Business Student Award, UC Berkeley, 2018</div>
                  <div style={{ marginBottom: "8px" }}>• Top Sales Performer, TechCorp, 2022</div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}