import React from "react";

export default function AtlanticBlue({ resume = {} }) {
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
      display: "flex",
      fontSize: "11px",
      lineHeight: 1.5
    }}>
      {/* Dark Blue Sidebar - 35% */}
      <aside style={{
        width: "35%",
        background: "#2C3E50",
        color: "#fff",
        padding: "40px 24px"
      }}>
        {/* Profile Photo */}
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "#34495E",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            fontWeight: "700",
            color: "#7F8C8D"
          }}>
            {(personal.full_name || personal.name || "J").charAt(0)}
          </div>
        </div>

        {/* Name & Title */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px 0", lineHeight: 1.2 }}>
            {personal.full_name || personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "13px", color: "#95A5A6", margin: 0 }}>
            {personal.professional_title || personal.title || "Business Development Consultant"}
          </p>
        </div>

        {/* Contact */}
        <section style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", color: "#fff" }}>
            Profile
          </h3>
          <div style={{ fontSize: "10px", lineHeight: 1.8, color: "#BDC3C7" }}>
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📧</span>
              <span>{personal.email || "your.email@example.com"}</span>
            </div>
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📱</span>
              <span>{personal.phone || "+1 (555) 123-4567"}</span>
            </div>
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📍</span>
              <span>{personal.location || "San Francisco, CA"}</span>
            </div>
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🔗</span>
              <span>linkedin.com/in/yourname</span>
            </div>
          </div>
        </section>

        {/* Languages with Progress Bars */}
        <section style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", color: "#fff" }}>
            Languages
          </h3>
          {(langs.length > 0 ? langs : [
            { language: "English", proficiency: "Native", level: 5 },
            { language: "Spanish", proficiency: "Professional", level: 4 },
            { language: "French", proficiency: "Intermediate", level: 3 }
          ]).map((lang, idx) => {
            const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
            const level = lang.level || 4;
            return (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "10px", marginBottom: "4px", color: "#ECF0F1" }}>
                  {langName}
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                      width: "20%",
                      height: "6px",
                      borderRadius: "3px",
                      background: i <= level ? "#3498DB" : "#34495E"
                    }} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Awards */}
        <section>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", color: "#fff" }}>
            Awards
          </h3>
          <div style={{ fontSize: "10px", lineHeight: 1.8, color: "#BDC3C7" }}>
            {awards.length > 0 ? awards.map((award, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <div style={{ color: "#ECF0F1", fontWeight: "600" }}>
                  {typeof award === 'string' ? award : award.name}
                </div>
                {typeof award === 'object' && award.organization && (
                  <div style={{ fontSize: "9px" }}>{award.organization}, {award.year}</div>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ color: "#ECF0F1", fontWeight: "600" }}>Outstanding Business Student Award</div>
                  <div style={{ fontSize: "9px" }}>University of California, 2018</div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ color: "#ECF0F1", fontWeight: "600" }}>Top Performer Recognition</div>
                  <div style={{ fontSize: "9px" }}>Tech Solutions Inc., 2022</div>
                </div>
              </>
            )}
          </div>
        </section>
      </aside>

      {/* Main Content - 65% */}
      <main style={{ flex: 1, padding: "40px 32px", background: "#fff" }}>
        {/* Professional Experience */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2C3E50", marginBottom: "16px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
            Professional Experience
          </h2>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#2C3E50" }}>
                  {job.title || job.position}
                </strong>
                <span style={{ fontSize: "10px", color: "#7F8C8D" }}>
                  {job.dates}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: "#7F8C8D", marginBottom: "6px" }}>
                {job.company} | {job.location}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "13px", color: "#2C3E50" }}>Business Development Manager</strong>
                  <span style={{ fontSize: "10px", color: "#7F8C8D" }}>2021 - Present</span>
                </div>
                <div style={{ fontSize: "11px", color: "#7F8C8D", marginBottom: "6px" }}>
                  TechCorp Solutions | San Francisco, CA
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>Achieved 150% of annual sales quota by developing strategic partnerships</li>
                  <li style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>Led team of 8 professionals to exceed quarterly revenue targets by 30%</li>
                  <li style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>Developed and executed go-to-market strategy for new product line</li>
                </ul>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "13px", color: "#2C3E50" }}>Senior Sales Consultant</strong>
                  <span style={{ fontSize: "10px", color: "#7F8C8D" }}>2018 - 2021</span>
                </div>
                <div style={{ fontSize: "11px", color: "#7F8C8D", marginBottom: "6px" }}>
                  Global Enterprises Inc. | New York, NY
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>Managed client relationships generating $2M+ in annual revenue</li>
                  <li style={{ marginBottom: "4px", color: "#34495E", fontSize: "10px" }}>Implemented CRM system improving team efficiency by 40%</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2C3E50", marginBottom: "16px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
            Education
          </h2>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              <strong style={{ fontSize: "12px", color: "#2C3E50", display: "block" }}>
                {ed.degree}
              </strong>
              <div style={{ fontSize: "10px", color: "#7F8C8D" }}>
                {ed.institution} | {ed.year || ed.graduation_year}
              </div>
            </div>
          )) : (
            <div style={{ marginBottom: "14px" }}>
              <strong style={{ fontSize: "12px", color: "#2C3E50", display: "block" }}>
                Master of Business Administration
              </strong>
              <div style={{ fontSize: "10px", color: "#7F8C8D" }}>
                Harvard Business School | 2018
              </div>
              <div style={{ fontSize: "10px", color: "#7F8C8D", marginTop: "4px" }}>
                GPA: 3.8/4.0
              </div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <h2 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#2C3E50", marginBottom: "16px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
            Skills
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {(skills.length > 0 ? skills : [
              "Strategic thinking and problem-solving",
              "Relationship building and networking",
              "Communication and negotiation",
              "Team management and leadership",
              "Data analysis",
              "Project management",
              "Sales strategy",
              "Market research"
            ]).map((skill, idx) => (
              <div key={idx} style={{ fontSize: "10px", color: "#34495E", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                <span style={{ color: "#3498DB", fontWeight: "700" }}>•</span>
                <span>{typeof skill === 'string' ? skill : skill.name || skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}