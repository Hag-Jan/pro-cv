import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bell, TrendingUp, Calendar, ExternalLink, Search, Clock, Users, BookOpen, Briefcase, Target, Lightbulb, GraduationCap, FileText, Star } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ResumeLoader from "@/components/common/ResumeLoader";

const careerAdviceCategories = [
  { id: "resume", label: "Resume Building", icon: FileText, color: "blue" },
  { id: "interview", label: "Interview Prep", icon: Users, color: "green" },
  { id: "career", label: "Career Development", icon: TrendingUp, color: "purple" },
  { id: "job-search", label: "Job Searching", icon: Briefcase, color: "orange" },
];

export default function News() {
  const [news, setNews] = useState([]);
  const [careerAdvice, setCareerAdvice] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("news");
  const [selectedAdviceCategory, setSelectedAdviceCategory] = useState("all");

  const loadNews = useCallback(async () => {
    setIsLoadingNews(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Fetch the top 12 trending news articles about the job market, career advice, and skills development. Use your access to the internet to find real, current articles from today. For each article, provide a title, a 2-3 sentence summary, the source name, the original article URL, the publication date, and assign a relevant category. The categories are: 'Hiring Trends', 'Salary Insights', 'Remote Work', 'AI Impact', 'Skill Development', 'Industry News'.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  summary: { type: "string" },
                  source: { type: "string" },
                  url: {type: "string"},
                  published_date: { type: "string", format: "date" },
                  category: { type: "string", enum: ['Hiring Trends', 'Salary Insights', 'Remote Work', 'AI Impact', 'Skill Development', 'Industry News'] },
                  read_time: { type: "number" }
                },
                required: ["title", "summary", "source", "url", "published_date", "category", "read_time"]
              }
            }
          }
        }
      });
      if (response.articles) {
        setNews(response.articles);
      }
    } catch (error) {
      console.error("Error loading news:", error);
    }
    setIsLoadingNews(false);
  }, []);

  const loadCareerAdvice = useCallback(async () => {
    setIsLoadingAdvice(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate 16 comprehensive career advice articles covering these categories:
        1. Resume Building (4 articles): Tips on creating ATS-friendly resumes, formatting, keyword optimization, and showcasing achievements
        2. Interview Preparation (4 articles): Common interview questions, behavioral interviews, technical interviews, and post-interview follow-up
        3. Career Development (4 articles): Skill development, career transitions, networking strategies, and personal branding
        4. Job Searching Strategies (4 articles): Job board tactics, LinkedIn optimization, company research, and application tracking
        
        For each article provide:
        - A compelling title
        - A detailed 4-5 sentence description
        - 3-5 key takeaways (as an array of strings)
        - Estimated read time in minutes
        - Difficulty level (beginner/intermediate/advanced)
        - The category it belongs to`,
        response_json_schema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string", enum: ["resume", "interview", "career", "job-search"] },
                  key_takeaways: { type: "array", items: { type: "string" } },
                  read_time: { type: "number" },
                  difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] }
                },
                required: ["title", "description", "category", "key_takeaways", "read_time", "difficulty"]
              }
            }
          }
        }
      });
      if (response.articles) {
        setCareerAdvice(response.articles);
      }
    } catch (error) {
      console.error("Error loading career advice:", error);
    }
    setIsLoadingAdvice(false);
  }, []);

  useEffect(() => {
    loadNews();
    loadCareerAdvice();
  }, [loadNews, loadCareerAdvice]);

  const newsCategories = [
    { id: "all", label: "All News", icon: Bell },
    { id: "Hiring Trends", label: "Hiring", icon: TrendingUp },
    { id: "Salary Insights", label: "Salaries", icon: Users },
    { id: "Remote Work", label: "Remote", icon: Clock },
    { id: "AI Impact", label: "AI Impact", icon: TrendingUp },
    { id: "Skill Development", label: "Skills", icon: Users }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Hiring Trends": "bg-blue-100 text-blue-800",
      "Salary Insights": "bg-green-100 text-green-800",
      "Remote Work": "bg-purple-100 text-purple-800",
      "AI Impact": "bg-orange-100 text-orange-800",
      "Skill Development": "bg-indigo-100 text-indigo-800",
      "Industry News": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getAdviceCategoryColor = (category) => {
    const colors = {
      resume: "bg-blue-100 text-blue-800 border-blue-200",
      interview: "bg-green-100 text-green-800 border-green-200",
      career: "bg-purple-100 text-purple-800 border-purple-200",
      "job-search": "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      advanced: "bg-red-100 text-red-700"
    };
    return colors[difficulty] || "bg-gray-100 text-gray-700";
  };

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAdvice = careerAdvice.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedAdviceCategory === "all" || article.category === selectedAdviceCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoadingNews && isLoadingAdvice) {
    return <ResumeLoader />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">News & Career Advice</h1>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <TrendingUp className="w-4 h-4 mr-1" />
            Live Updates
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          Stay updated with the latest industry news and expert career advice to accelerate your professional growth.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("news")}
          className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
            activeTab === "news"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <Bell className="w-4 h-4 inline mr-2" />
          Industry News
        </button>
        <button
          onClick={() => setActiveTab("advice")}
          className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
            activeTab === "advice"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2" />
          Career Advice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={activeTab === "news" ? "Search news articles..." : "Search career advice..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {activeTab === "news" && (
            <Button onClick={loadNews} variant="outline" className="border-blue-200 hover:bg-blue-50">
              Refresh News
            </Button>
          )}
          {activeTab === "advice" && (
            <Button onClick={loadCareerAdvice} variant="outline" className="border-blue-200 hover:bg-blue-50">
              Refresh Advice
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {activeTab === "news" ? (
            newsCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))
          ) : (
            <>
              <Button
                variant={selectedAdviceCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAdviceCategory("all")}
                className={`${selectedAdviceCategory === "all" ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                All Topics
              </Button>
              {careerAdviceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedAdviceCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAdviceCategory(category.id)}
                  className={`${selectedAdviceCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Content Grid */}
      {activeTab === "news" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 group flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{article.source}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(article.published_date), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min read
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                  >
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAdvice.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 group hover:border-blue-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getAdviceCategoryColor(article.category)}>
                      {careerAdviceCategories.find(c => c.id === article.category)?.label}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(article.difficulty)} variant="outline">
                        {article.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {article.read_time} min
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">
                    {article.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-600" />
                      Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {article.key_takeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Guide
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "news" && filteredNews.length === 0) || 
        (activeTab === "advice" && filteredAdvice.length === 0)) && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}