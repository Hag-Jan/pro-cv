// Resume templates index - 17 professional ATS-optimized templates

// Core Professional Templates (14 templates)
import FlowSimplePro from './FlowSimplePro';
import ExecutiveMinimal from './ExecutiveMinimal';
import ModernTech from './ModernTech';
import CorporateClassic from './CorporateClassic';
import DataProfessional from './DataProfessional';
import MarketingMaven from './MarketingMaven';
import HealthcareProfessional from './HealthcareProfessional';
import AcademicScholar from './AcademicScholar';
import ProfessionalTwoColumn from './ProfessionalTwoColumn';
import MinimalATSClean from './MinimalATSClean';
import ModernExecutive from './ModernExecutive';
import CompactSeniorExecutive from './CompactSeniorExecutive';
import ProjectManagerPro from './ProjectManagerPro';
import HybridProfessionalPlus from './HybridProfessionalPlus';

// New Templates (3 templates)
import AtlanticProfessional from './AtlanticProfessional';
import SiliconValley from './SiliconValley';
import WallStreetClassic from './WallStreetClassic';

const TEMPLATES = {
  // Core 14 Professional ATS-Optimized Templates
  'flow-simple-pro': FlowSimplePro,
  'executive-minimal': ExecutiveMinimal,
  'modern-tech': ModernTech,
  'corporate-classic': CorporateClassic,
  'data-professional': DataProfessional,
  'marketing-maven': MarketingMaven,
  'healthcare-professional': HealthcareProfessional,
  'academic-scholar': AcademicScholar,
  'professional-two-column': ProfessionalTwoColumn,
  'minimal-ats-clean': MinimalATSClean,
  'modern-executive': ModernExecutive,
  'compact-senior-executive': CompactSeniorExecutive,
  'project-manager-pro': ProjectManagerPro,
  'hybrid-professional-plus': HybridProfessionalPlus,
  
  // New Templates
  'atlantic-professional': AtlanticProfessional,
  'silicon-valley': SiliconValley,
  'wall-street-classic': WallStreetClassic,
};

export function getTemplateComponent(templateId) {
  return TEMPLATES[templateId] || null;
}

export function getAvailableTemplates() {
  return Object.keys(TEMPLATES);
}

export function templateExists(templateId) {
  return templateId in TEMPLATES;
}

export default {
  getTemplateComponent,
  getAvailableTemplates,
  templateExists,
};