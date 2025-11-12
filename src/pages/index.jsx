import Layout from "./Layout.jsx";

import Home from "./Home";

import Dashboard from "./Dashboard";

import Editor from "./Editor";

import Templates from "./Templates";

import JobMatcher from "./JobMatcher";

import About from "./About";

import Contact from "./Contact";

import Analytics from "./Analytics";

import TemplatePreview from "./TemplatePreview";

import Jobs from "./Jobs";

import News from "./News";

import Profile from "./Profile";

import JobDetails from "./JobDetails";

import PhotoEditor from "./PhotoEditor";

import PDFTools from "./PDFTools";

import CoverLetterGenerator from "./CoverLetterGenerator";

import CoverLetterLibrary from "./CoverLetterLibrary";

import InterviewCoach from "./InterviewCoach";

import AIResumeReview from "./AIResumeReview";

import ResumeCollaboration from "./ResumeCollaboration";

import SectionLibrary from "./SectionLibrary";

import TemplateCreator from "./TemplateCreator";

import MyTemplates from "./MyTemplates";

import TemplateBuilder from "./TemplateBuilder";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Dashboard: Dashboard,
    
    Editor: Editor,
    
    Templates: Templates,
    
    JobMatcher: JobMatcher,
    
    About: About,
    
    Contact: Contact,
    
    Analytics: Analytics,
    
    TemplatePreview: TemplatePreview,
    
    Jobs: Jobs,
    
    News: News,
    
    Profile: Profile,
    
    JobDetails: JobDetails,
    
    PhotoEditor: PhotoEditor,
    
    PDFTools: PDFTools,
    
    CoverLetterGenerator: CoverLetterGenerator,
    
    CoverLetterLibrary: CoverLetterLibrary,
    
    InterviewCoach: InterviewCoach,
    
    AIResumeReview: AIResumeReview,
    
    ResumeCollaboration: ResumeCollaboration,
    
    SectionLibrary: SectionLibrary,
    
    TemplateCreator: TemplateCreator,
    
    MyTemplates: MyTemplates,
    
    TemplateBuilder: TemplateBuilder,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Editor" element={<Editor />} />
                
                <Route path="/Templates" element={<Templates />} />
                
                <Route path="/JobMatcher" element={<JobMatcher />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/TemplatePreview" element={<TemplatePreview />} />
                
                <Route path="/Jobs" element={<Jobs />} />
                
                <Route path="/News" element={<News />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/JobDetails" element={<JobDetails />} />
                
                <Route path="/PhotoEditor" element={<PhotoEditor />} />
                
                <Route path="/PDFTools" element={<PDFTools />} />
                
                <Route path="/CoverLetterGenerator" element={<CoverLetterGenerator />} />
                
                <Route path="/CoverLetterLibrary" element={<CoverLetterLibrary />} />
                
                <Route path="/InterviewCoach" element={<InterviewCoach />} />
                
                <Route path="/AIResumeReview" element={<AIResumeReview />} />
                
                <Route path="/ResumeCollaboration" element={<ResumeCollaboration />} />
                
                <Route path="/SectionLibrary" element={<SectionLibrary />} />
                
                <Route path="/TemplateCreator" element={<TemplateCreator />} />
                
                <Route path="/MyTemplates" element={<MyTemplates />} />
                
                <Route path="/TemplateBuilder" element={<TemplateBuilder />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}