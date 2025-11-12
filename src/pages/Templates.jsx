
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  Sparkles,
  CheckCircle,
  Eye,
  ArrowRight,
  Filter,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTemplateComponent } from "../components/resume-templates/index";
import TemplatePreviewModal from "../components/templates/TemplatePreviewModal";

// Templates data - 17 professional ATS-optimized templates
const TEMPLATES_DATA = [
  {
    id: "flow-simple-pro",
    name: "Flow Simple Pro",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0F172A",
    font: "Inter",
    description: "Dense two-column layout with complete sections - modern professional format",
    resumeData: {
      name: "Jane Anderson",
      title: "Senior Software Engineer",
      contact: {
        email: "jane.anderson@example.com",
        phone: "+46 70 123 4567",
        location: "Stockholm, Sweden"
      },
      summary: "Experienced software engineer with 10+ years building scalable web apps using React, TypeScript and Node.js. Proven ability to lead product development, improve performance, and ship user-focused features.",
      experience: [
        {
          position: "Lead Frontend Engineer",
          company: "TechNova AG",
          dates: "2020 - Present",
          bullets: [
            "Led redesign of the company's SaaS platform using React & TypeScript, improving page-load performance by 35%",
            "Mentored and hired 6 frontend developers; introduced component-driven design and a reusable pattern library",
            "Improved testing coverage from 45% to 82% using Jest and Playwright end-to-end tests"
          ]
        },
        {
          position: "Frontend Developer",
          company: "SoftVision GmbH",
          dates: "2016 - 2020",
          bullets: [
            "Built modular UI components and a shared design system used by 4 product teams",
            "Reduced UI bundle size by 25% through code splitting and dynamic imports",
            "Collaborated with PMs and designers to ship features that increased user retention by 11%"
          ]
        }
      ],
      education: [
        {
          degree: "MSc Computer Science",
          institution: "ETH Zurich",
          year: "2014 - 2016"
        }
      ],
      skills: ["JavaScript", "React", "TypeScript", "Node.js", "Next.js", "AWS", "Testing", "CI/CD"],
      languages: [{ language: "English", proficiency: "Fluent" }, { language: "German", proficiency: "Intermediate" }],
      certifications: ["AWS Certified Solutions Architect — 2022"]
    }
  },
  {
    id: "executive-minimal",
    name: "Executive Minimal",
    description: "Clean, minimal design perfect for senior leadership and C-suite positions",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0F172A",
    font: "Plus Jakarta Sans",
    resumeData: {
      name: "Margaret Williams",
      title: "Chief Operating Officer",
      contact: { email: "margaret.williams@email.com", phone: "+1 (555) 456-7890", location: "New York, NY" },
      summary: "Visionary C-suite executive with 20+ years transforming global operations for Fortune 500 companies. Proven leader in driving $200M+ revenue growth through strategic planning and operational excellence.",
      experience: [
        {
          position: "Chief Operating Officer",
          company: "Global Enterprises Inc.",
          location: "New York, NY",
          dates: "2019 - Present",
          bullets: [
            "Spearheaded operational strategy for $2B global organization with 5,000+ employees across 20 countries",
            "Led digital transformation initiative generating $80M in annual cost savings"
          ]
        }
      ],
      education: [{ degree: "MBA, Executive Leadership", institution: "Wharton School, University of Pennsylvania", location: "Philadelphia, PA", year: "2008" }],
      skills: ["Strategic Planning", "P&L Management", "M&A Integration", "Digital Transformation", "Team Leadership", "Change Management", "Board Relations", "Global Operations"],
      languages: [{ language: "English", proficiency: "Native", level: 5 }, { language: "German", proficiency: "Professional", level: 4 }],
      certifications: ["Certified Six Sigma Master Black Belt", "Board Director Certification"]
    }
  },
  {
    id: "modern-tech",
    name: "Modern Tech",
    description: "Bold, contemporary layout ideal for software engineers and tech startups",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0EA5E9",
    font: "Inter",
    resumeData: {
      name: "David Kim",
      title: "Senior Full Stack Developer",
      contact: { email: "david.kim@email.com", phone: "+1 (555) 678-9012", location: "Austin, TX" },
      summary: "Innovative Senior Full Stack Developer with 6+ years building cutting-edge web applications using modern JavaScript frameworks. Specialized in React, Node.js, and cloud infrastructure.",
      experience: [
        {
          position: "Senior Full Stack Developer",
          company: "Tech Startup Inc.",
          location: "Austin, TX",
          dates: "2021 - Present",
          bullets: [
            "Built and deployed microservices handling 100M+ API requests monthly with 99.95% uptime",
            "Implemented real-time collaboration features using WebSockets, increasing user engagement by 65%"
          ]
        }
      ],
      education: [{ degree: "B.S. in Software Engineering", institution: "University of Texas at Austin", location: "Austin, TX", year: "2018" }],
      skills: ["React & Redux", "Node.js & Express", "TypeScript", "MongoDB & PostgreSQL", "AWS & Kubernetes", "Docker & CI/CD", "GraphQL", "Jest & Testing"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Korean", proficiency: "Native" }],
      certifications: ["AWS Certified Developer - Associate", "Google Cloud Professional"]
    }
  },
  {
    id: "corporate-classic",
    name: "Corporate Classic",
    description: "Time-tested traditional format perfect for finance and banking positions",
    category: "traditional",
    atsFriendly: true,
    primaryColor: "#1E40AF",
    font: "Times New Roman",
    resumeData: {
      name: "Robert Anderson",
      title: "Senior Financial Analyst",
      contact: { email: "robert.anderson@email.com", phone: "+1 (555) 789-0123", location: "New York, NY" },
      summary: "Detail-oriented Senior Financial Analyst with 12+ years in investment banking and corporate finance. CFA charterholder with expertise in financial modeling, valuation analysis, and M&A advisory.",
      experience: [
        {
          position: "Senior Financial Analyst",
          company: "Goldman Sachs",
          location: "New York, NY",
          dates: "2018 - Present",
          bullets: [
            "Manage equity research portfolio worth $800M across technology and healthcare sectors",
            "Conduct financial modeling and valuation analysis for 30+ M&A transactions totaling $5B+"
          ]
        }
      ],
      education: [{ degree: "MBA, Finance", institution: "Columbia Business School", location: "New York, NY", year: "2014" }],
      skills: ["Financial Modeling", "Valuation Analysis", "M&A Advisory", "Excel & VBA", "Bloomberg Terminal", "Risk Management", "DCF Analysis", "LBO Modeling"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Spanish", proficiency: "Professional" }],
      certifications: ["CFA (Chartered Financial Analyst)", "Series 7 & 63 Licenses"]
    }
  },
  {
    id: "data-professional",
    name: "Data Professional",
    description: "Structured format ideal for data scientists and ML engineers",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#7C3AED",
    font: "Roboto",
    resumeData: {
      name: "Priya Patel",
      title: "Senior Data Scientist",
      contact: { email: "priya.patel@email.com", phone: "+1 (555) 901-2345", location: "Seattle, WA" },
      summary: "Data-driven Senior Data Scientist with 7+ years building ML models and analytics solutions. PhD in Computer Science with expertise in Python, deep learning, and big data technologies.",
      experience: [
        {
          position: "Senior Data Scientist",
          company: "Amazon",
          location: "Seattle, WA",
          dates: "2020 - Present",
          bullets: [
            "Developed recommendation engine using collaborative filtering, increasing conversion rate by 25%",
            "Built predictive models for customer churn using XGBoost, saving $5M annually"
          ]
        }
      ],
      education: [{ degree: "Ph.D. in Computer Science (Machine Learning)", institution: "Stanford University", location: "Stanford, CA", year: "2017" }],
      skills: ["Python & R", "Machine Learning", "Deep Learning (TensorFlow, PyTorch)", "SQL & NoSQL", "Apache Spark", "Data Visualization", "A/B Testing", "Statistical Analysis"],
      languages: [{ language: "English", proficiency: "Fluent" }, { language: "Hindi", proficiency: "Native" }],
      certifications: ["Google Professional Data Engineer", "AWS Machine Learning Specialty"]
    }
  },
  {
    id: "marketing-maven",
    name: "Marketing Maven",
    description: "Eye-catching design perfect for marketing professionals",
    category: "creative",
    atsFriendly: true,
    primaryColor: "#F59E0B",
    font: "Plus Jakarta Sans",
    resumeData: {
      name: "Jessica Brown",
      title: "Senior Marketing Manager",
      contact: { email: "jessica.brown@email.com", phone: "+1 (555) 234-5678", location: "Chicago, IL" },
      summary: "Results-driven Senior Marketing Manager with 10+ years executing integrated campaigns that drive brand growth and revenue. Expert in digital marketing, content strategy, and marketing analytics.",
      experience: [
        {
          position: "Senior Marketing Manager",
          company: "HubSpot",
          location: "Boston, MA",
          dates: "2020 - Present",
          bullets: [
            "Lead demand generation campaigns generating $25M pipeline and 15K MQLs quarterly",
            "Manage $3M marketing budget across paid, content, and event channels with 250% ROI"
          ]
        }
      ],
      education: [{ degree: "MBA, Marketing", institution: "Northwestern University (Kellogg)", location: "Evanston, IL", year: "2014" }],
      skills: ["Digital Marketing", "Content Strategy", "Marketing Analytics", "SEO & SEM", "Marketing Automation", "Brand Management", "Social Media", "Campaign Management"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Spanish", proficiency: "Conversational" }],
      certifications: ["Google Ads Certification", "HubSpot Inbound Marketing Certified"]
    }
  },
  {
    id: "healthcare-professional",
    name: "Healthcare Professional",
    description: "Clean, trustworthy format ideal for medical professionals",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0891B2",
    font: "Open Sans",
    resumeData: {
      name: "Dr. Sarah Johnson",
      title: "Internal Medicine Physician",
      contact: { email: "sarah.johnson@hospital.org", phone: "+1 (555) 345-6789", location: "Boston, MA" },
      summary: "Board-certified Internal Medicine physician with 12+ years providing compassionate, evidence-based care to diverse patient populations. Expert in chronic disease management and preventive medicine.",
      experience: [
        {
          position: "Attending Physician, Internal Medicine",
          company: "Massachusetts General Hospital",
          location: "Boston, MA",
          dates: "2016 - Present",
          bullets: [
            "Provide primary care to 2,000+ patients, managing complex chronic conditions",
            "Lead quality improvement initiative reducing 30-day hospital readmissions by 25%"
          ]
        }
      ],
      education: [{ degree: "Doctor of Medicine (M.D.)", institution: "Harvard Medical School", location: "Boston, MA", year: "2012" }],
      skills: ["Internal Medicine", "Primary Care", "Chronic Disease Management", "Electronic Health Records (Epic)", "Quality Improvement", "Patient Education", "Preventive Medicine", "Clinical Research"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Spanish", proficiency: "Professional" }],
      certifications: ["Board Certified in Internal Medicine - ABIM", "Basic Life Support (BLS)"]
    }
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    description: "Research-focused format perfect for academic positions and PhDs",
    category: "traditional",
    atsFriendly: true,
    primaryColor: "#475569",
    font: "Georgia",
    resumeData: {
      name: "Dr. Emily Zhang",
      title: "Assistant Professor of Neuroscience",
      contact: { email: "emily.zhang@university.edu", phone: "+1 (555) 123-4567", location: "Cambridge, MA" },
      summary: "Accomplished neuroscience researcher with 18 peer-reviewed publications and $3M in secured NIH grant funding. Expert in computational neuroscience and neural circuit analysis.",
      experience: [
        {
          position: "Assistant Professor of Neuroscience",
          company: "Massachusetts Institute of Technology",
          location: "Cambridge, MA",
          dates: "2019 - Present",
          bullets: [
            "Lead independent research lab with 8 graduate students studying neural circuits",
            "Secured $3M in NIH and NSF grants for computational neuroscience research"
          ]
        }
      ],
      education: [{ degree: "Ph.D. in Neuroscience", institution: "Stanford University", location: "Stanford, CA", year: "2016" }],
      skills: ["Computational Neuroscience", "Machine Learning", "Python & MATLAB", "Neuroimaging (fMRI, EEG)", "Grant Writing", "Scientific Writing", "Data Analysis", "Mentorship"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Mandarin", proficiency: "Native" }],
      certifications: ["NIH Responsible Conduct of Research", "Teaching Certificate in Higher Education"]
    }
  },
  {
    id: "professional-two-column",
    name: "Professional Two Column",
    description: "Gray sidebar with white content area - modern professional design",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#6B7280",
    font: "Inter",
    resumeData: {
      name: "Sarah Mitchell",
      title: "Marketing Director",
      contact: { email: "sarah.mitchell@email.com", phone: "+1 (555) 567-8901", location: "New York, NY" },
      summary: "Strategic marketing leader with 10+ years driving brand growth and digital transformation. Expert in demand generation, content strategy, and marketing analytics with a proven track record of delivering measurable ROI.",
      experience: [
        {
          position: "Marketing Director",
          company: "HubSpot",
          location: "Boston, MA",
          dates: "2020 - Present",
          bullets: [
            "Led demand generation campaigns generating $25M pipeline quarterly",
            "Built content marketing engine producing 100+ pieces monthly"
          ]
        }
      ],
      education: [{ degree: "MBA Marketing", institution: "Northwestern University (Kellogg)", location: "Evanston, IL", year: "2015" }],
      skills: ["Digital Marketing", "Content Strategy", "SEO/SEM", "Marketing Automation", "Brand Management", "Analytics", "Team Leadership", "Campaign Management"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "French", proficiency: "Professional" }],
      certifications: ["Google Ads Certification", "HubSpot Inbound Marketing"]
    }
  },
  {
    id: "minimal-ats-clean",
    name: "Minimal ATS Clean",
    description: "Ultra-clean centered layout optimized for ATS parsing - perfect for tech professionals",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#374151",
    font: "Inter",
    resumeData: {
      name: "David Rodriguez",
      title: "Senior Software Engineer",
      contact: { email: "david.rodriguez@email.com", phone: "+1 (555) 456-7890", location: "Austin, TX" },
      summary: "Results-driven software engineer with 7+ years building scalable web applications. Expert in modern JavaScript frameworks, cloud infrastructure, and agile development methodologies.",
      experience: [
        {
          position: "Senior Software Engineer",
          company: "Microsoft",
          location: "Redmond, WA",
          dates: "2021 - Present",
          bullets: [
            "Architected microservices platform serving 5M+ users with 99.99% uptime",
            "Reduced API response time by 60% through caching optimization"
          ]
        }
      ],
      education: [{ degree: "BS Computer Science", institution: "University of Texas at Austin", location: "Austin, TX", year: "2018" }],
      skills: ["JavaScript/TypeScript", "React & Node.js", "Python", "AWS & Docker", "PostgreSQL", "GraphQL", "CI/CD", "Agile/Scrum"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Spanish", proficiency: "Professional" }],
      certifications: ["AWS Certified Solutions Architect", "Certified Scrum Master (CSM)"]
    }
  },
  {
    id: "modern-executive",
    name: "Modern Executive",
    description: "Dark banner header with executive-focused layout - ideal for C-suite positions",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0F172A",
    font: "Plus Jakarta Sans",
    resumeData: {
      name: "Margaret Chen",
      title: "Chief Operating Officer",
      contact: { email: "margaret.chen@email.com", phone: "+1 (555) 890-1234", location: "San Francisco, CA" },
      summary: "Visionary C-suite executive with 15+ years transforming global operations for Fortune 500 companies. Proven track record of driving $200M+ revenue growth through strategic planning and operational excellence.",
      experience: [
        {
          position: "Chief Operating Officer",
          company: "TechVentures Inc.",
          location: "San Francisco, CA",
          dates: "2019 - Present",
          bullets: [
            "Spearheaded operational strategy for $2B organization with 5,000+ employees",
            "Led digital transformation initiative generating $80M in annual cost savings"
          ]
        }
      ],
      education: [{ degree: "MBA Executive Leadership", institution: "Stanford GSB", location: "Stanford, CA", year: "2010" }],
      skills: ["Strategic Planning", "P&L Management", "Digital Transformation", "Team Leadership", "Change Management", "M&A Integration", "Board Relations", "Global Operations"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Mandarin", proficiency: "Professional" }],
      certifications: ["Six Sigma Master Black Belt", "Board Director Certification"]
    }
  },
  {
    id: "compact-senior-executive",
    name: "Compact Senior Executive",
    description: "Space-efficient executive format with bold borders - perfect for leadership roles",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#1F2937",
    font: "Inter",
    resumeData: {
      name: "James Patterson",
      title: "Chief Technology Officer",
      contact: { email: "james.patterson@email.com", phone: "+1 (555) 678-9012", location: "Seattle, WA" },
      summary: "Visionary technology executive with 18+ years leading engineering organizations and driving digital transformation. Expert in cloud architecture, team building, and scaling technical operations.",
      experience: [
        {
          position: "Chief Technology Officer",
          company: "CloudScale Systems",
          location: "Seattle, WA",
          dates: "2019 - Present",
          bullets: [
            "Built engineering org from 50 to 400+ supporting $300M ARR growth",
            "Led cloud migration reducing infrastructure costs by 50%"
          ]
        }
      ],
      education: [{ degree: "MS Computer Science", institution: "Stanford University", location: "Stanford, CA", year: "2006" }],
      skills: ["Cloud Architecture", "Engineering Leadership", "Product Strategy", "Team Building", "Agile/DevOps", "Strategic Planning", "Microservices", "Security"],
      languages: [{ language: "English", proficiency: "Native" }],
      certifications: ["AWS Solutions Architect Professional", "Certified Scrum Master"]
    }
  },
  {
    id: "project-manager-pro",
    name: "Project Manager Pro",
    description: "Professional sections perfect for project managers and PMP professionals",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0D9488",
    font: "Inter",
    resumeData: {
      name: "Marcus Thompson",
      title: "Senior Project Manager",
      contact: { email: "marcus.thompson@email.com", phone: "+1 (555) 234-5678", location: "Chicago, IL" },
      summary: "Results-oriented project manager with 11+ years delivering complex IT projects on time and within budget. Expert in agile methodologies, stakeholder management, and risk mitigation.",
      experience: [
        {
          position: "Senior Project Manager",
          company: "Accenture",
          location: "Chicago, IL",
          dates: "2019 - Present",
          bullets: [
            "Managed $15M portfolio of digital transformation projects across 5 concurrent initiatives",
            "Delivered 25+ projects with 98% on-time completion rate"
          ]
        }
      ],
      education: [{ degree: "MBA Project Management", institution: "Northwestern University", location: "Evanston, IL", year: "2014" }],
      skills: ["Agile/Scrum", "Project Planning", "Stakeholder Management", "Risk Management", "Budget Planning", "Jira & MS Project", "Team Leadership", "Change Management"],
      languages: [{ language: "English", proficiency: "Native" }],
      certifications: ["PMP - Project Management Institute", "Certified Scrum Master (CSM)"]
    }
  },
  {
    id: "hybrid-professional-plus",
    name: "Hybrid Professional Plus",
    description: "Split header design combining sidebar and main content - versatile professional layout",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#1F2937",
    font: "Inter",
    resumeData: {
      name: "Jennifer Carter",
      title: "Business Analyst",
      contact: { email: "jennifer.carter@email.com", phone: "+1 (555) 345-6789", location: "Toronto, Canada" },
      summary: "Strategic business analyst with 8+ years translating complex requirements into technical solutions. Expert in data analysis, process modeling, and stakeholder management.",
      experience: [
        {
          position: "Senior Business Analyst",
          company: "Royal Bank of Canada",
          location: "Toronto, Canada",
          dates: "2019 - Present",
          bullets: [
            "Led requirements gathering for enterprise CRM implementation serving 5,000+ users",
            "Created data models improving operational efficiency by 30%"
          ]
        }
      ],
      education: [{ degree: "MBA Information Systems", institution: "University of Toronto", location: "Toronto, Canada", year: "2015" }],
      skills: ["Requirements Analysis", "SQL & Data Analysis", "Process Modeling", "Business Intelligence", "Agile/Scrum", "Stakeholder Management", "Tableau", "JIRA"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "French", proficiency: "Professional" }],
      certifications: ["CBAP - Certified Business Analysis Professional", "PMI-PBA - Business Analysis"]
    }
  },
  {
    id: "atlantic-professional",
    name: "Atlantic Professional",
    category: "professional",
    atsFriendly: true,
    primaryColor: "#0EA5E9",
    font: "Inter",
    description: "Clean two-column layout (70/30) perfect for product managers and tech professionals",
    resumeData: {
      name: "Michael Rodriguez",
      title: "Senior Product Manager",
      contact: {
        email: "michael.rodriguez@email.com",
        phone: "+1 (555) 789-4561",
        location: "San Francisco, CA"
      },
      summary: "Strategic Senior Product Manager with 8+ years leading B2B SaaS products from concept to launch. Expert in product strategy, roadmap planning, and cross-functional team leadership.",
      experience: [
        {
          position: "Senior Product Manager",
          company: "Atlassian",
          location: "San Francisco, CA",
          dates: "2020 - Present",
          bullets: [
            "Led product strategy for enterprise collaboration suite serving 10,000+ customers",
            "Launched 3 major features increasing user engagement by 60%"
          ]
        }
      ],
      education: [
        { degree: "MBA, Product Management", institution: "Stanford GSB", location: "Stanford, CA", year: "2016" }
      ],
      skills: ["Product Strategy", "Roadmap Planning", "Agile/Scrum", "User Research", "Data Analysis", "A/B Testing", "SQL & Analytics", "Wireframing"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Spanish", proficiency: "Professional" }],
      certifications: ["Certified Scrum Product Owner (CSPO)", "Google Analytics Certification"]
    }
  },
  {
    id: "silicon-valley",
    name: "Silicon Valley",
    category: "creative",
    atsFriendly: true,
    primaryColor: "#14B8A6",
    font: "Inter",
    description: "Modern minimalist tech layout with colorful skill tags - perfect for developers",
    resumeData: {
      name: "Sarah Chen",
      title: "Full Stack Developer",
      contact: {
        email: "sarah.chen@email.com",
        phone: "+1 (555) 234-8901",
        location: "Palo Alto, CA",
        github: "github.com/sarahchen"
      },
      summary: "Creative Full Stack Developer with 5+ years building modern web applications using React, Node.js, and cloud technologies. Open source enthusiast with contributions to popular libraries.",
      experience: [
        {
          position: "Senior Full Stack Developer",
          company: "Stripe",
          location: "San Francisco, CA",
          dates: "2022 - Present",
          bullets: [
            "Built payment processing features handling $500M+ in annual transactions",
            "Developed real-time dashboard processing 10M+ events daily"
          ]
        }
      ],
      education: [
        { degree: "B.S. in Computer Science", institution: "Stanford University", location: "Stanford, CA", year: "2019" }
      ],
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL", "CI/CD"],
      languages: [{ language: "English", proficiency: "Native" }, { language: "Mandarin", proficiency: "Native" }],
      certifications: []
    }
  },
  {
    id: "wall-street-classic",
    name: "Wall Street Classic",
    category: "traditional",
    atsFriendly: true,
    primaryColor: "#8B5CF6",
    font: "Georgia",
    description: "Traditional single-column formal layout ideal for finance and banking professionals",
    resumeData: {
      name: "James R. Patterson, CFA",
      title: "Senior Financial Analyst",
      contact: {
        email: "james.patterson@email.com",
        phone: "+1 (212) 555-7890",
        location: "New York, NY"
      },
      summary: "Accomplished Senior Financial Analyst with 10+ years in investment banking and corporate finance. CFA charterholder with deep expertise in financial modeling, valuation analysis, and M&A advisory.",
      experience: [
        {
          position: "Senior Financial Analyst",
          company: "Goldman Sachs",
          location: "New York, NY",
          dates: "2018 - Present",
          bullets: [
            "Manage equity research portfolio worth $800M across technology sectors",
            "Conduct financial modeling for 30+ M&A transactions totaling $5B+"
          ]
        }
      ],
      education: [
        { degree: "MBA, Finance", institution: "Columbia Business School", location: "New York, NY", year: "2014" }
      ],
      skills: ["Financial Modeling", "DCF & LBO Analysis", "Excel & VBA", "Bloomberg Terminal", "Capital IQ", "M&A Advisory"],
      languages: [{ language: "English", proficiency: "Native" }],
      certifications: ["CFA (Chartered Financial Analyst)", "Series 7 & 63 Licenses", "FRM (Financial Risk Manager)"]
    }
  }
];

const CATEGORIES = [
  { id: "all", name: "All Templates", icon: Sparkles },
  { id: "professional", name: "Professional", icon: FileText },
  { id: "traditional", name: "Traditional", icon: CheckCircle },
  { id: "creative", name: "Creative", icon: Sparkles }
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Validation check for templates data
  useEffect(() => {
    if (!Array.isArray(TEMPLATES_DATA)) return;
    const missing = TEMPLATES_DATA.filter(t => {
      const r = t.resumeData || {};
      const hasSummary = typeof r.summary === "string" && r.summary.trim().length > 20;
      const hasExp = Array.isArray(r.experience) && r.experience.length > 0 && r.experience.some(e => Array.isArray(e.bullets) && e.bullets.length > 0);
      const hasEdu = Array.isArray(r.education) && r.education.length > 0;
      return !(hasSummary && hasExp && hasEdu);
    }).map(t => t.id || t.name);
    if (missing.length) console.warn("TEMPLATES_MISSING_CONTENT:", missing);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const filteredTemplates = TEMPLATES_DATA.filter((template) => {
    const matchesSearch = searchQuery === "" ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateId) => {
    navigate(createPageUrl("Editor") + `?template=${templateId}`);
  };

  const convertToResumeFormat = (resumeData) => {
    if (!resumeData) return {};
    return {
      personal_info: {
        full_name: resumeData.name,
        professional_title: resumeData.title,
        email: resumeData.contact?.email,
        phone: resumeData.contact?.phone,
        location: resumeData.contact?.location,
        summary: resumeData.summary,
      },
      experience: resumeData.experience?.map(exp => ({
        title: exp.position,
        company: exp.company,
        location: exp.location,
        current: exp.dates?.includes('Present'),
        bullets: exp.bullets || []
      })) || [],
      education: resumeData.education?.map(edu => ({
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        graduation_year: edu.year
      })) || [],
      skills: resumeData.skills || [],
      languages: resumeData.languages || [],
      certificates: resumeData.certifications || [],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Template
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            17 professional, ATS-friendly templates optimized for maximum interview success
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 rounded-2xl border-2 shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory.toLowerCase() === category.id.toLowerCase();
            const count = TEMPLATES_DATA.filter(t => category.id === "all" || t.category.toLowerCase() === category.id.toLowerCase()).length;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
                <Badge className={`ml-1 ${isSelected ? "bg-white/20 text-white" : "bg-gray-100"}`}>
                  {count}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Templates Grid - FlowCV Style: 3 per row, cleaner cards */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredTemplates.map((template) => {
              const TemplateComponent = getTemplateComponent(template.id);
              const resumeForTemplate = convertToResumeFormat(template.resumeData);

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 bg-white">
                    
                    {/* Large Preview - Scale 0.6 and centered */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" style={{ height: "500px" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "50%",
                          transform: "translateX(-50%) scale(0.6)",
                          transformOrigin: "top center",
                          width: "210mm",
                          height: "297mm",
                        }}
                      >
                        {TemplateComponent && <TemplateComponent resume={resumeForTemplate} />}
                      </div>

                      {/* Hover Overlay with Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-8 gap-3">
                        <Button
                          onClick={() => setPreviewTemplate(template)}
                          variant="outline"
                          size="lg"
                          className="w-full bg-white/95 hover:bg-white text-gray-900 font-semibold h-14 text-base"
                        >
                          <Eye className="w-5 h-5 mr-2" />
                          Full Preview
                        </Button>
                        <Button
                          onClick={() => handleUseTemplate(template.id)}
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-14 text-base shadow-lg"
                        >
                          Use This Template
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* Clean Template Info - Only name and badge */}
                    <div className="p-6 bg-white border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                        <Badge
                          className="capitalize text-xs px-3 py-1 font-medium"
                          style={{
                            backgroundColor: `${template.primaryColor}15`,
                            color: template.primaryColor,
                            border: `1px solid ${template.primaryColor}30`
                          }}
                        >
                          {template.category}
                        </Badge>
                      </div>
                      
                      {/* Quick Use Button (visible on mobile, hidden on hover for desktop) */}
                      <Button
                        onClick={() => handleUseTemplate(template.id)}
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold h-12 group-hover:hidden md:flex lg:hidden"
                      >
                        Use Template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-black mb-4">Not sure which template to choose?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Our AI can help you pick the perfect template based on your experience
          </p>
          <Link to={createPageUrl("AIResumeReview")}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-bold px-8 py-6 rounded-xl text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Get AI Recommendations
            </Button>
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onUse={() => handleUseTemplate(previewTemplate.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
