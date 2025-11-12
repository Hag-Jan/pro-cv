import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search, Calendar, Briefcase, Download, Trash2, Edit, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ResumeLoader from "@/components/common/ResumeLoader";

export default function CoverLetterLibrary() {
  const [coverLetters, setCoverLetters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCoverLetters();
  }, []);

  const loadCoverLetters = async () => {
    setIsLoading(false);
    try {
      const letters = await base44.entities.CoverLetter.list("-generation_date");
      setCoverLetters(letters);
    } catch (error) {
      console.error("Error loading cover letters:", error);
    }
    setIsLoading(false);
  };

  const deleteLetter = async (id) => {
    if (!confirm("Are you sure you want to delete this cover letter?")) return;
    
    try {
      await base44.entities.CoverLetter.delete(id);
      setCoverLetters(coverLetters.filter(letter => letter.id !== id));
    } catch (error) {
      console.error("Error deleting cover letter:", error);
    }
  };

  const downloadLetter = (letter) => {
    const blob = new Blob([letter.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${letter.company_name}_${letter.job_title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredLetters = coverLetters.filter(letter => 
    letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <ResumeLoader />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cover Letter Library</h1>
            <p className="text-gray-600 text-lg">
              Manage your AI-generated cover letters
            </p>
          </div>
          <Link to={createPageUrl("CoverLetterGenerator")}>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <Plus className="w-5 h-5 mr-2" />
              New Cover Letter
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by job title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Cover Letters Grid */}
      {filteredLetters.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? "No cover letters found" : "No cover letters yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Try adjusting your search" : "Create your first AI-powered cover letter"}
            </p>
            {!searchTerm && (
              <Link to={createPageUrl("CoverLetterGenerator")}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Cover Letter
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLetters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {letter.title}
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {letter.tone}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{letter.job_title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(letter.generation_date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {letter.content.substring(0, 150)}...
                    </p>
                  </div>

                  {letter.highlighted_skills?.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {letter.highlighted_skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-blue-200 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                        {letter.highlighted_skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                            +{letter.highlighted_skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group-hover:bg-blue-50 group-hover:border-blue-200"
                      onClick={() => downloadLetter(letter)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteLetter(letter.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}