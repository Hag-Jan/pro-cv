import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Share2, 
  MessageSquare, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Clock,
  Sparkles,
  Send,
  UserPlus,
  Copy,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResumeCollaboration() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoadingCollaborators, setIsLoadingCollaborators] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareName, setShareName] = useState("");
  const [sharePermission, setSharePermission] = useState("comment");
  const [shareMessage, setShareMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isAnalyzingFeedback, setIsAnalyzingFeedback] = useState(false);
  const [feedbackSummary, setFeedbackSummary] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadCurrentUser();
    loadResumes();
  }, []);

  useEffect(() => {
    if (selectedResume) {
      loadCollaborators();
      loadComments();
    }
  }, [selectedResume]);

  const loadCurrentUser = async () => {
    try {
      const user = await base44.auth.me();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const loadResumes = async () => {
    try {
      const data = await base44.entities.Resume.list("-updated_date");
      setResumes(data);
      if (data.length > 0) {
        setSelectedResume(data[0]);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const loadCollaborators = async () => {
    if (!selectedResume) return;
    setIsLoadingCollaborators(true);
    try {
      const data = await base44.entities.ResumeCollaborator.filter({
        resume_id: selectedResume.id
      });
      setCollaborators(data);
    } catch (error) {
      console.error("Error loading collaborators:", error);
    }
    setIsLoadingCollaborators(false);
  };

  const loadComments = async () => {
    if (!selectedResume) return;
    setIsLoadingComments(true);
    try {
      const data = await base44.entities.ResumeComment.filter({
        resume_id: selectedResume.id
      }, "-created_date");
      setComments(data);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
    setIsLoadingComments(false);
  };

  const sendInvitation = async () => {
    if (!shareEmail.trim() || !selectedResume) {
      alert("Please enter an email address");
      return;
    }

    setIsSending(true);
    try {
      await base44.entities.ResumeCollaborator.create({
        resume_id: selectedResume.id,
        resume_owner: currentUser.email,
        collaborator_email: shareEmail.trim(),
        collaborator_name: shareName.trim() || shareEmail.trim(),
        permission: sharePermission,
        status: "pending",
        invitation_message: shareMessage.trim()
      });

      // Send email notification
      await base44.integrations.Core.SendEmail({
        to: shareEmail.trim(),
        subject: `${currentUser.full_name} shared a resume with you`,
        body: `${currentUser.full_name} has invited you to collaborate on their resume "${selectedResume.title}".\n\n${shareMessage}\n\nPermission: ${sharePermission}\n\nClick here to view: ${window.location.origin}`
      });

      alert("Invitation sent successfully!");
      setShowShareDialog(false);
      setShareEmail("");
      setShareName("");
      setShareMessage("");
      loadCollaborators();
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation. Please try again.");
    }
    setIsSending(false);
  };

  const removeCollaborator = async (collaboratorId) => {
    if (!confirm("Remove this collaborator?")) return;
    
    try {
      await base44.entities.ResumeCollaborator.delete(collaboratorId);
      loadCollaborators();
    } catch (error) {
      console.error("Error removing collaborator:", error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !selectedResume) return;

    try {
      await base44.entities.ResumeComment.create({
        resume_id: selectedResume.id,
        comment_text: newComment.trim(),
        comment_type: "suggestion",
        is_resolved: false
      });

      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const resolveComment = async (commentId) => {
    try {
      await base44.entities.ResumeComment.update(commentId, {
        is_resolved: true,
        resolved_by: currentUser.email,
        resolved_date: new Date().toISOString()
      });
      loadComments();
    } catch (error) {
      console.error("Error resolving comment:", error);
    }
  };

  const analyzeFeedback = async () => {
    if (comments.length === 0) {
      alert("No feedback to analyze yet");
      return;
    }

    setIsAnalyzingFeedback(true);
    try {
      const allComments = comments.map(c => c.comment_text).join("\n");
      
      const prompt = `Analyze these resume feedback comments and provide a structured summary:

FEEDBACK COMMENTS:
${allComments}

Provide:
1. Key themes and patterns in the feedback
2. Most mentioned improvement areas
3. Positive feedback highlights
4. Priority action items
5. Specific suggestions for implementation
6. Overall sentiment (positive/constructive/critical)`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            themes: {
              type: "array",
              items: { type: "string" },
              description: "Main themes in feedback"
            },
            improvement_areas: {
              type: "array",
              items: { type: "string" },
              description: "Areas needing improvement"
            },
            positive_feedback: {
              type: "array",
              items: { type: "string" },
              description: "Positive highlights"
            },
            priority_actions: {
              type: "array",
              items: { type: "string" },
              description: "Priority action items"
            },
            suggestions: {
              type: "array",
              items: { type: "string" },
              description: "Specific implementation suggestions"
            },
            sentiment: {
              type: "string",
              enum: ["positive", "constructive", "critical"],
              description: "Overall sentiment"
            },
            summary: {
              type: "string",
              description: "Executive summary"
            }
          }
        }
      });

      setFeedbackSummary(response);
    } catch (error) {
      console.error("Error analyzing feedback:", error);
      alert("Failed to analyze feedback. Please try again.");
    }
    setIsAnalyzingFeedback(false);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "constructive": return "bg-blue-100 text-blue-800";
      case "critical": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case "view": return <Eye className="w-4 h-4" />;
      case "comment": return <MessageSquare className="w-4 h-4" />;
      case "edit": return <Edit className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">Resume Collaboration</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Share your resume with mentors and colleagues for feedback
            </p>
          </div>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Share Resume</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Select Resume
                  </label>
                  <Select 
                    value={selectedResume?.id} 
                    onValueChange={(id) => setSelectedResume(resumes.find(r => r.id === id))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resumes.map((resume) => (
                        <SelectItem key={resume.id} value={resume.id}>
                          {resume.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    placeholder="colleague@email.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Name (Optional)
                  </label>
                  <Input
                    value={shareName}
                    onChange={(e) => setShareName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Permission Level
                  </label>
                  <Select value={sharePermission} onValueChange={setSharePermission}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>View Only - Can only view the resume</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="comment">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Comment - Can view and leave feedback</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="edit">
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit - Can make changes to the resume</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={sendInvitation}
                  disabled={isSending || !shareEmail.trim()}
                  className="w-full"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Resume Selector */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Current Resume:</label>
            <Select 
              value={selectedResume?.id} 
              onValueChange={(id) => setSelectedResume(resumes.find(r => r.id === id))}
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resumes.map((resume) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="collaborators" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="collaborators">
            <Users className="w-4 h-4 mr-2" />
            Collaborators ({collaborators.length})
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback ({comments.length})
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Analysis
          </TabsTrigger>
        </TabsList>

        {/* Collaborators Tab */}
        <TabsContent value="collaborators">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborators.map((collab) => (
              <Card key={collab.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {collab.collaborator_name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{collab.collaborator_name}</h3>
                        <p className="text-xs text-gray-500">{collab.collaborator_email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCollaborator(collab.id)}
                      className="h-6 w-6 p-0 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="flex items-center gap-1">
                      {getPermissionIcon(collab.permission)}
                      {collab.permission}
                    </Badge>
                    <Badge variant="outline" className={
                      collab.status === 'accepted' ? 'border-green-500 text-green-700' :
                      collab.status === 'pending' ? 'border-yellow-500 text-yellow-700' :
                      'border-red-500 text-red-700'
                    }>
                      {collab.status}
                    </Badge>
                  </div>

                  {collab.invitation_message && (
                    <p className="text-xs text-gray-600 mt-2 italic">
                      "{collab.invitation_message}"
                    </p>
                  )}

                  {collab.last_viewed && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Last viewed: {new Date(collab.last_viewed).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {collaborators.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Collaborators Yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Share your resume with mentors and colleagues to get feedback
                  </p>
                  <Button onClick={() => setShowShareDialog(true)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Resume
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <div className="space-y-6">
            {/* Add Comment */}
            <Card>
              <CardContent className="p-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add feedback or suggestions..."
                  rows={3}
                  className="mb-3"
                />
                <Button onClick={addComment} disabled={!newComment.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className={comment.is_resolved ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
                          {comment.created_by?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{comment.created_by}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.created_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {!comment.is_resolved && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resolveComment(comment.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>

                    <p className="text-gray-700 mb-2">{comment.comment_text}</p>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {comment.comment_type}
                      </Badge>
                      {comment.is_resolved && (
                        <Badge className="bg-green-500 text-white text-xs">
                          ✓ Resolved
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {comments.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No Feedback Yet
                    </h3>
                    <p className="text-gray-500">
                      Comments and suggestions will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* AI Analysis Tab */}
        <TabsContent value="analysis">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Feedback Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Let AI analyze all feedback and provide actionable insights and suggestions.
                </p>
                <Button
                  onClick={analyzeFeedback}
                  disabled={isAnalyzingFeedback || comments.length === 0}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  {isAnalyzingFeedback ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Feedback
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {feedbackSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Summary */}
                <Card className={getSentimentColor(feedbackSummary.sentiment)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-white/50">
                        {feedbackSummary.sentiment} Feedback
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{feedbackSummary.summary}</p>
                  </CardContent>
                </Card>

                {/* Priority Actions */}
                {feedbackSummary.priority_actions.length > 0 && (
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-900">
                        🎯 Priority Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {feedbackSummary.priority_actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-sm text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}

                {/* Themes */}
                {feedbackSummary.themes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Themes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {feedbackSummary.themes.map((theme, i) => (
                          <Badge key={i} className="bg-blue-100 text-blue-800">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Improvement Areas */}
                {feedbackSummary.improvement_areas.length > 0 && (
                  <Card className="border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-900">
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedbackSummary.improvement_areas.map((area, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-yellow-600 mt-1">→</span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Positive Feedback */}
                {feedbackSummary.positive_feedback.length > 0 && (
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-900">
                        ✓ Strengths Highlighted
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedbackSummary.positive_feedback.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Suggestions */}
                {feedbackSummary.suggestions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Implementation Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {feedbackSummary.suggestions.map((suggestion, i) => (
                          <li key={i} className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-sm text-gray-700">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}