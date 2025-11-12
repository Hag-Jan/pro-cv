import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function EnhancvPreview({ resume, sectionsOrder, customization }) {
  const colors = customization?.colors || {
    primary: "#14B8A6",
    secondary: "#0D9488",
    background: "#FFFFFF"
  };

  const fonts = customization?.fonts || {
    heading: "Rubik",
    body: "Lato",
    headingSize: 14,
    bodySize: 11,
    lineHeight: 1.6,
    letterSpacing: "normal"
  };

  const spacing = customization?.spacing || {
    section: 12,
    lineSpacing: "normal",
    padding: 16,
    margins: "normal"
  };

  const design = customization?.design || {
    headerStyle: "standard",
    dividerStyle: "thin",
    skillStyle: "pill",
    dateFormat: "Jan 2021",
    backgroundPattern: "none",
    visualElements: true
  };

  const personal = resume.personal_info || {};

  const renderSection = (sectionId) => {
    const data = resume[sectionId];
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    const sectionHeadingStyle = {
      fontSize: "13px",
      fontWeight: "700",
      color: colors.primary,
      marginBottom: "12px",
      fontFamily: fonts.heading,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    };

    switch(sectionId) {
      case 'personal_info':
        return null;

      case 'experience':
        return (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Work Experience</h2>
            <div style={{ borderLeft: `3px solid ${colors.primary}`, paddingLeft: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {data.map((exp, idx) => (
                  <div key={idx}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "4px" }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: "12px", 
                          fontWeight: "700", 
                          color: colors.primary,
                          marginBottom: "2px",
                          fontFamily: fonts.heading 
                        }}>
                          {exp.company}
                        </h3>
                        <p style={{ 
                          fontSize: "11px", 
                          color: "#374151",
                          fontFamily: fonts.body,
                          fontWeight: "600"
                        }}>
                          {exp.title}
                        </p>
                      </div>
                      <span style={{ 
                        fontSize: "9px", 
                        color: "#6B7280", 
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        marginLeft: "12px"
                      }}>
                        {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                      </span>
                    </div>
                    {exp.location && (
                      <p style={{ 
                        fontSize: "9px", 
                        color: "#9CA3AF",
                        marginBottom: "6px"
                      }}>
                        {exp.location}
                      </p>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul style={{ 
                        listStyle: "disc", 
                        listStylePosition: "outside", 
                        paddingLeft: "20px",
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "4px",
                        fontSize: "10px",
                        color: "#374151",
                        lineHeight: "1.6",
                        fontFamily: fonts.body
                      }}>
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "2px" }}>
                    <h3 style={{ 
                      fontSize: "11px", 
                      fontWeight: "700", 
                      color: colors.primary,
                      fontFamily: fonts.heading
                    }}>
                      {edu.institution}
                    </h3>
                    <span style={{ 
                      fontSize: "9px", 
                      color: "#6B7280", 
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      marginLeft: "12px"
                    }}>
                      {edu.graduation_year}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: "11px", 
                    fontWeight: "600",
                    color: "#374151",
                    fontFamily: fonts.body
                  }}>
                    {edu.degree}
                  </p>
                  {edu.location && (
                    <p style={{ 
                      fontSize: "9px", 
                      color: "#9CA3AF",
                      marginTop: "2px"
                    }}>
                      {edu.location}
                    </p>
                  )}
                  {edu.gpa && (
                    <p style={{ 
                      fontSize: "9px", 
                      color: "#6B7280",
                      marginTop: "2px"
                    }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.map((skill, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    fontSize: "10px",
                    fontWeight: "500",
                    padding: "6px 12px",
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary,
                    borderRadius: "20px",
                    border: `1px solid ${colors.primary}30`,
                    fontFamily: fonts.body
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.map((proj, idx) => (
                <div key={idx}>
                  <h3 style={{ 
                    fontSize: "11px", 
                    fontWeight: "700", 
                    color: "#111827",
                    marginBottom: "4px",
                    fontFamily: fonts.heading
                  }}>
                    {proj.name}
                  </h3>
                  <p style={{ 
                    fontSize: "10px", 
                    color: "#374151", 
                    lineHeight: "1.6",
                    marginBottom: "4px",
                    fontFamily: fonts.body
                  }}>
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {proj.technologies.map((tech, tidx) => (
                        <span key={tidx} style={{ 
                          fontSize: "9px", 
                          color: "#6B7280",
                          backgroundColor: "#F3F4F6",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontFamily: fonts.body
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certificates':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.map((cert, idx) => (
                <div key={idx}>
                  <h3 style={{ 
                    fontSize: "11px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: fonts.heading
                  }}>
                    {cert.name}
                  </h3>
                  <p style={{ 
                    fontSize: "9px", 
                    color: "#6B7280",
                    fontFamily: fonts.body
                  }}>
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {data.map((lang, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ 
                    fontSize: "10px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: fonts.body
                  }}>
                    {lang.language}
                  </span>
                  <span style={{ 
                    fontSize: "10px", 
                    color: "#6B7280",
                    fontFamily: fonts.body
                  }}>
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'interests':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Interests</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.map((interest, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    fontSize: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#F3F4F6",
                    color: "#374151",
                    borderRadius: "20px",
                    fontWeight: "500",
                    fontFamily: fonts.body
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'awards':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Awards</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.map((award, idx) => (
                <div key={idx}>
                  <h3 style={{ 
                    fontSize: "11px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: fonts.heading
                  }}>
                    {award.title}
                  </h3>
                  <p style={{ 
                    fontSize: "9px", 
                    color: "#6B7280",
                    fontFamily: fonts.body
                  }}>
                    {award.issuer} • {award.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'publications':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>Publications</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.map((pub, idx) => (
                <div key={idx}>
                  <h3 style={{ 
                    fontSize: "11px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: fonts.heading
                  }}>
                    {pub.title}
                  </h3>
                  <p style={{ 
                    fontSize: "9px", 
                    color: "#6B7280",
                    fontFamily: fonts.body
                  }}>
                    {pub.publisher} • {pub.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'references':
        return data && data.length > 0 ? (
          <div style={{ marginBottom: `${spacing.section}px` }}>
            <h2 style={sectionHeadingStyle}>References</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.map((ref, idx) => (
                <div key={idx}>
                  <h3 style={{ 
                    fontSize: "11px", 
                    fontWeight: "600", 
                    color: "#111827",
                    fontFamily: fonts.heading
                  }}>
                    {ref.name}
                  </h3>
                  <p style={{ 
                    fontSize: "10px", 
                    color: "#374151",
                    fontFamily: fonts.body
                  }}>
                    {ref.position} • {ref.company}
                  </p>
                  <p style={{ 
                    fontSize: "9px", 
                    color: "#6B7280",
                    fontFamily: fonts.body
                  }}>
                    {ref.email} • {ref.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  const getBackgroundPattern = () => {
    const patterns = {
      none: {},
      dots: { 
        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
        backgroundSize: "16px 16px"
      },
      grid: { 
        backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      },
      stripes: { 
        backgroundImage: "linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb)",
        backgroundSize: "20px 20px"
      },
      hexagons: { 
        backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }
    };
    return patterns[design.backgroundPattern] || {};
  };

  return (
    <div 
      className="w-full min-h-[297mm] shadow-lg"
      style={{ 
        backgroundColor: colors.background,
        fontFamily: fonts.body,
        ...getBackgroundPattern()
      }}
    >
      {/* PROFESSIONAL HEADER SECTION - Full-width colored */}
      <div style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: 'white',
        padding: '32px',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* Optional circular photo */}
          {personal.profile_photo && (
            <img 
              src={personal.profile_photo}
              alt={personal.full_name}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                flexShrink: 0
              }}
            />
          )}

          {/* Name and contact info */}
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: "32px",
              fontWeight: "900",
              color: "white",
              marginBottom: "6px",
              fontFamily: fonts.heading,
              letterSpacing: "-0.5px"
            }}>
              {personal.full_name || 'Your Name'}
            </h1>
            
            {personal.professional_title && (
              <p style={{ 
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                marginBottom: "16px",
                fontFamily: fonts.body
              }}>
                {personal.professional_title}
              </p>
            )}

            {/* Contact info with icons - inline */}
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "20px",
              fontSize: "13px",
              color: "white"
            }}>
              {personal.email && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Mail style={{ width: "14px", height: "14px" }} />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone style={{ width: "14px", height: "14px" }} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin style={{ width: "14px", height: "14px" }} />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Linkedin style={{ width: "14px", height: "14px" }} />
                  <span>LinkedIn</span>
                </div>
              )}
              {personal.website && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Globe style={{ width: "14px", height: "14px" }} />
                  <span>Website</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary (if exists) */}
      {personal.summary && (
        <div style={{ 
          padding: "16px 32px",
          backgroundColor: "#FAFAFA",
          borderBottom: "1px solid #E5E7EB"
        }}>
          <p style={{ 
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#374151",
            fontFamily: fonts.body
          }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* BODY SECTION - Two-Column Grid (65% / 35%) */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "65% 35%",
        gap: "24px",
        padding: "32px"
      }}>
        {/* LEFT COLUMN (65%) - Main content */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: `${spacing.section}px`,
          paddingRight: "12px",
          borderRight: "1px solid #E5E7EB"
        }}>
          {sectionsOrder
            .filter(id => ['experience', 'education', 'skills', 'projects'].includes(id))
            .map(sectionId => (
              <div key={sectionId}>
                {renderSection(sectionId)}
              </div>
            ))}
        </div>

        {/* RIGHT COLUMN (35%) - Supporting content */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: `${spacing.section}px`
        }}>
          {sectionsOrder
            .filter(id => !['personal_info', 'experience', 'education', 'skills', 'projects'].includes(id))
            .map(sectionId => (
              <div key={sectionId}>
                {renderSection(sectionId)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}