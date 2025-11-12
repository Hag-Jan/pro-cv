import React from "react";

export default function Stylish({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const achievements = r.achievements || [];
  const courses = r.courses || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "32px 36px",
      fontSize: "9px",
      lineHeight: 1.6,
      color: "#111827"
    }}>
      {/* Header with Name in Blue */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <div style={{ fontSize: "8px", color: "#9CA3AF", marginBottom: "4px" }}>
            📧 {personal.email || "your.email@example.com"} • 📱 {personal.phone || "+1 (555) 123-4567"}
          </div>
          <div style={{ fontSize: "8px", color: "#9CA3AF" }}>
            📍 {personal.location || "Boston, MA"} • 🔗 linkedin.com/in/yourname
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", margin: 0, color: "#3B82F6", textAlign: "right" }}>
            {personal.full_name || personal.name || "EMMA SMITH"}
          </h1>
          <p style={{ fontSize: "11px", color: "#6B7280", margin: "4px 0 0 0", textAlign: "right" }}>
            {personal.professional_title || personal.title || "Collections Associate | Client/Vendor Relations"}
          </p>
        </div>
      </header>

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "24px" }}>
        {/* Left Column */}
        <main>
          {/* Professional Summary */}
          <section style={{ marginBottom: "20px", padding: "12px", background: "#F9FAFB", borderRadius: "6px", borderLeft: "3px solid #3B82F6" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "6px" }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: "9px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
              {personal.summary || r.summary || "Detail-oriented collections professional with 8+ years managing client and vendor relationships. Expertise in accounts receivable, payment processing, and dispute resolution. Strong analytical and communication skills with proven track record of reducing outstanding balances and maintaining positive client relationships."}
            </p>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "10px", borderBottom: "2px solid #3B82F6", paddingBottom: "4px" }}>
              Experience
            </h3>
            {exp.length > 0 ? exp.map((job, idx) => (
              <div key={idx} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <strong style={{ fontSize: "10px", color: "#111827" }}>
                    {job.title || job.position}
                  </strong>
                  <span style={{ fontSize: "8px", color: "#6B7280" }}>
                    {job.dates}
                  </span>
                </div>
                <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>
                  {job.company}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "14px", margin: 0 }}>
                    {job.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Senior Collections Associate</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>2020 - Present</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Financial Services Inc.</div>
                  <ul style={{ paddingLeft: "14px", margin: 0 }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Managed portfolio of 500+ accounts totaling $15M in outstanding receivables</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Reduced days sales outstanding by 25% through proactive follow-up strategies</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Resolved complex payment disputes maintaining 95% client satisfaction</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Collections Specialist</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>2016 - 2020</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Business Solutions Corp</div>
                  <ul style={{ paddingLeft: "14px", margin: 0 }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Processed $8M+ in annual collections with 98% accuracy rate</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Developed payment plans for delinquent accounts improving recovery by 30%</li>
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Education */}
          <section>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "10px", borderBottom: "2px solid #3B82F6", paddingBottom: "4px" }}>
              Education
            </h3>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "10px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>
                  {ed.institution} | {ed.year || ed.graduation_year}
                </div>
              </div>
            )) : (
              <div style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "10px", color: "#111827" }}>B.A. in Business Administration</strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>Boston University | 2016</div>
              </div>
            )}
          </section>
        </main>

        {/* Right Boxes */}
        <aside>
          {/* Skills Horizontal */}
          <section style={{ marginBottom: "16px", padding: "12px", border: "1px solid #E5E7EB", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {(skills.length > 0 ? skills : [
                "Collections",
                "Account Management",
                "Negotiation",
                "Excel",
                "Communication"
              ]).map((skill, idx) => (
                <span key={idx} style={{
                  fontSize: "7px",
                  padding: "3px 8px",
                  background: "#EFF6FF",
                  borderRadius: "12px",
                  color: "#1E40AF"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </span>
              ))}
            </div>
          </section>

          {/* Strategic Planning */}
          <section style={{ marginBottom: "16px", padding: "12px", border: "1px solid #E5E7EB", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Strategic Planning
            </h3>
            <p style={{ fontSize: "7px", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>
              Expertise in developing collection strategies that balance revenue recovery with customer retention.
            </p>
          </section>

          {/* Training & Courses */}
          <section style={{ marginBottom: "16px", padding: "12px", border: "1px solid #E5E7EB", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Training & Courses
            </h3>
            <div style={{ fontSize: "7px", color: "#374151", lineHeight: 1.7 }}>
              {courses.length > 0 ? courses.map((c, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>• {typeof c === 'string' ? c : c.name}</div>
              )) : (
                <>
                  <div style={{ marginBottom: "4px" }}>• Advanced Collections Strategies</div>
                  <div style={{ marginBottom: "4px" }}>• Customer Relations Management</div>
                  <div style={{ marginBottom: "4px" }}>• Financial Analysis Workshop</div>
                </>
              )}
            </div>
          </section>

          {/* Languages */}
          <section style={{ padding: "12px", border: "1px solid #E5E7EB", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              Languages
            </h3>
            {(langs.length > 0 ? langs : [
              { language: "English", level: 5 },
              { language: "Spanish", level: 4 }
            ]).map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
              const level = lang.level || 3;
              return (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  <div style={{ fontSize: "8px", marginBottom: "2px", color: "#374151" }}>
                    {langName}
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        width: "16px",
                        height: "3px",
                        background: i <= level ? "#3B82F6" : "#E5E7EB"
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </aside>
      </div>
    </div>
  );
}