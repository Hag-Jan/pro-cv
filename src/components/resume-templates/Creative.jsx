import React from "react";

export default function Creative({ resume = {} }) {
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
      fontSize: "9px",
      lineHeight: 1.5
    }}>
      {/* Curved Navy Header */}
      <header style={{
        background: "#1E3A8A",
        color: "#fff",
        padding: "28px 32px 40px 32px",
        borderRadius: "0 0 50% 50% / 0 0 40px 40px",
        position: "relative"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 4px 0" }}>
              {personal.full_name || personal.name || "AVA JOHNSON"}
            </h1>
            <p style={{ fontSize: "11px", opacity: 0.9, margin: 0 }}>
              {personal.professional_title || personal.title || "Associate Administrator | Utility Asset Management | CRM Solutions"}
            </p>
          </div>
          <div style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            background: "#E5E7EB",
            marginLeft: "20px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "700",
            color: "#9CA3AF"
          }}>
            {(personal.full_name || personal.name || "A").charAt(0)}
          </div>
        </div>
        <div style={{ fontSize: "9px", marginTop: "12px", opacity: 0.9 }}>
          📧 {personal.email || "your.email@example.com"} • 📱 {personal.phone || "+1 (555) 123-4567"} • 📍 {personal.location || "Denver, CO"}
        </div>
      </header>

      {/* Two Columns */}
      <div style={{ display: "flex", padding: "24px 32px", gap: "24px" }}>
        {/* Left Column - 60% */}
        <main style={{ flex: "0 0 60%" }}>
          {/* Summary */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              Summary
            </h3>
            <p style={{ fontSize: "9px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
              {personal.summary || r.summary || "Detail-oriented professional with 6+ years managing utility asset databases and CRM systems. Expert in data analysis, process optimization, and cross-functional collaboration. Proven ability to streamline operations and enhance system efficiency through technical expertise and strategic planning."}
            </p>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "10px" }}>
              Experience
            </h3>
            {exp.length > 0 ? exp.slice(0, 3).map((job, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
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
                  <ul style={{ paddingLeft: "12px", margin: 0, fontSize: "8px" }}>
                    {job.bullets.slice(0, 2).map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "3px", color: "#4B5563" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Utility Asset Administrator</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>2021 - Present</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Energy Solutions Inc.</div>
                  <ul style={{ paddingLeft: "12px", margin: 0, fontSize: "8px" }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Managed utility asset database serving 50K+ customers with 99.5% accuracy</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Implemented CRM optimization reducing processing time by 40%</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Data Analyst</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>2018 - 2021</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Tech Corp</div>
                  <ul style={{ paddingLeft: "12px", margin: 0, fontSize: "8px" }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563" }}>Analyzed operational data identifying cost-saving opportunities</li>
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Education */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "10px" }}>
              Education
            </h3>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "10px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>
                  {ed.institution} | {ed.year || ed.graduation_year}
                </div>
              </div>
            )) : (
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "10px", color: "#111827" }}>B.S. in Business Administration</strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>University of Colorado | 2018</div>
              </div>
            )}
          </section>

          {/* Languages */}
          <section>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              Languages
            </h3>
            {(langs.length > 0 ? langs : [
              { language: "English", level: 5 },
              { language: "Spanish", level: 3 }
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
                        width: "15px",
                        height: "4px",
                        background: i <= level ? "#1E3A8A" : "#E5E7EB"
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>

        {/* Right Column - 40% */}
        <aside style={{ flex: "0 0 40%" }}>
          {/* Key Achievements */}
          <section style={{ marginBottom: "18px", background: "#F9FAFB", padding: "12px", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              🏆 Key Achievements
            </h3>
            <div style={{ fontSize: "8px", lineHeight: 1.7, color: "#374151" }}>
              {achievements.length > 0 ? achievements.map((ach, idx) => (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  • {typeof ach === 'string' ? ach : ach.description}
                </div>
              )) : (
                <>
                  <div style={{ marginBottom: "6px" }}>• Improved database accuracy by 35% through systematic audits</div>
                  <div style={{ marginBottom: "6px" }}>• Led CRM migration project completing 2 months ahead of schedule</div>
                  <div style={{ marginBottom: "6px" }}>• Reduced customer service response time by 45%</div>
                </>
              )}
            </div>
          </section>

          {/* Skills Boxes */}
          <section style={{ marginBottom: "18px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(skills.length > 0 ? skills : [
                "Database Management",
                "CRM Systems",
                "Data Analysis",
                "Process Optimization",
                "Project Management",
                "Excel/SQL"
              ]).map((skill, idx) => (
                <span key={idx} style={{
                  fontSize: "8px",
                  padding: "5px 10px",
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  borderRadius: "4px",
                  color: "#1E3A8A",
                  fontWeight: "600"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </span>
              ))}
            </div>
          </section>

          {/* Training & Courses */}
          <section style={{ marginBottom: "18px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              📚 Training & Courses
            </h3>
            <div style={{ fontSize: "8px", color: "#374151", lineHeight: 1.8 }}>
              {courses.length > 0 ? courses.map((course, idx) => (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  • {typeof course === 'string' ? course : course.name}
                </div>
              )) : (
                <>
                  <div style={{ marginBottom: "6px" }}>• Advanced Database Administration, 2023</div>
                  <div style={{ marginBottom: "6px" }}>• Salesforce CRM Certification, 2022</div>
                  <div style={{ marginBottom: "6px" }}>• Agile Project Management, 2021</div>
                </>
              )}
            </div>
          </section>

          {/* Interests */}
          <section>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#1E3A8A", marginBottom: "8px" }}>
              ❤️ Interests
            </h3>
            <div style={{ fontSize: "8px", color: "#374151", lineHeight: 1.8 }}>
              <div>• Renewable energy technologies</div>
              <div>• Sustainable development</div>
              <div>• Hiking and outdoor activities</div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}