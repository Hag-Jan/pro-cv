import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, Brain, Target, TrendingUp, Play, Pause, RotateCcw, CheckCircle, AlertCircle, Lightbulb, Users, Code, Briefcase, MessageSquare, Award, Clock, Zap, Upload, StopCircle, Volume2, Download, Save, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeLoader from "@/components/common/ResumeLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const interviewCategories = [
  { id: "behavioral", label: "Behavioral", icon: Users, color: "blue" },
  { id: "technical", label: "Technical", icon: Code, color: "purple" },
  { id: "situational", label: "Situational", icon: Target, color: "green" },
  { id: "competency", label: "Competency", icon: Award, color: "orange" },
];

const commonQuestions = {
  behavioral: [
    "Tell me about yourself",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work here?",
    "Tell me about a time you faced a challenge at work",
    "Describe a situation where you had to work with a difficult team member",
    "What's your greatest professional achievement?",
    "Where do you see yourself in 5 years?",
    "Why are you leaving your current job?",
  ],
  technical: [
    "Explain your technical expertise in your primary skill",
    "How do you stay updated with industry trends?",
    "Describe a complex technical problem you solved",
    "What's your development/work process?",
    "How do you handle technical disagreements with team members?",
    "Explain a technical concept to a non-technical person",
  ],
  situational: [
    "How would you handle a tight deadline you can't meet?",
    "What would you do if you disagree with your manager?",
    "How would you prioritize multiple urgent tasks?",
    "How would you handle receiving harsh criticism?",
    "What would you do if you made a mistake that affected the team?",
  ],
  competency: [
    "Demonstrate your leadership abilities",
    "How do you handle pressure and stress?",
    "Describe your problem-solving approach",
    "How do you manage conflicts?",
    "What's your communication style?",
  ],
};

export default function InterviewCoach() {
  const [activeMode, setActiveMode] = useState("practice");
  const [selectedCategory, setSelectedCategory] = useState("behavioral");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [simulationJob, setSimulationJob] = useState("");
  const [simulationCompany, setSimulationCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [simulationQuestions, setSimulationQuestions] = useState([]);
  const [currentSimulationIndex, setCurrentSimulationIndex] = useState(0);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Recording features
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordedSessions, setRecordedSessions] = useState([]);
  const [playingSession, setPlayingSession] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    loadRecordedSessions();
  }, []);

  const loadRecordedSessions = () => {
    const saved = localStorage.getItem('interview_recordings');
    if (saved) {
      setRecordedSessions(JSON.parse(saved));
    }
  };

  const saveRecordedSessions = (sessions) => {
    localStorage.setItem('interview_recordings', JSON.stringify(sessions));
    setRecordedSessions(sessions);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectRandomQuestion = () => {
    const questions = commonQuestions[selectedCategory];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserAnswer("");
    setFeedback(null);
    setTimer(0);
    setIsTimerRunning(true);
    setAudioBlob(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setIsTimerRunning(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsTimerRunning(true);
      } else {
        mediaRecorderRef.current.pause();
        setIsTimerRunning(false);
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setIsTimerRunning(false);
    }
  };

  const saveRecording = () => {
    if (audioBlob && currentQuestion) {
      const newSession = {
        id: Date.now(),
        question: currentQuestion,
        answer: userAnswer,
        duration: timer,
        timestamp: new Date().toISOString(),
        audioUrl: URL.createObjectURL(audioBlob),
        score: feedback?.overall_score || 0
      };
      const updatedSessions = [...recordedSessions, newSession];
      saveRecordedSessions(updatedSessions);
      alert("Recording saved successfully!");
    }
  };

  const deleteRecording = (id) => {
    const updatedSessions = recordedSessions.filter(s => s.id !== id);
    saveRecordedSessions(updatedSessions);
  };

  const playRecording = (session) => {
    setPlayingSession(session);
  };

  const analyzeAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Please provide an answer first");
      return;
    }

    setIsAnalyzing(true);
    setIsTimerRunning(false);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `As an expert interview coach, analyze this interview answer with extreme detail and provide comprehensive feedback.

Question: ${currentQuestion}
Category: ${selectedCategory}
${jobDescription ? `Job Description Context: ${jobDescription}` : ''}
Candidate's Answer: ${userAnswer}
Time taken: ${formatTime(timer)}

Provide ultra-detailed analysis on:

1. Overall Score (0-100) based on completeness, relevance, and delivery

2. STAR Method Adherence:
   - Situation: How clearly was the context/background described? (0-100)
   - Task: Was the responsibility/challenge clearly stated? (0-100)
   - Action: Were specific actions described in detail? (0-100)
   - Result: Were outcomes quantified and impactful? (0-100)
   - Overall STAR Score: (0-100)
   - STAR Feedback: Specific suggestions for each component

3. Confidence Assessment:
   - Confidence Level: (0-100) based on language strength, hesitation words, certainty
   - Assertiveness: Rate the decisiveness of statements
   - Body Language Indicators: What the language suggests about confidence
   - Improvement Tips: How to sound more confident

4. Phrasing Analysis:
   - Weak Phrases Found: List any filler words, hedging language, or weak expressions
   - Strong Phrases Used: Highlight powerful expressions used
   - Suggested Replacements: Provide 5-7 specific phrase improvements with before/after examples
   - Power Words to Add: Suggest impactful words to include

5. Content Quality:
   - Relevance: How well does it answer the question? (0-100)
   - Depth: Level of detail and insight provided (0-100)
   - Specificity: Use of concrete examples and metrics (0-100)
   - Structure: Logical flow and organization (0-100)

6. Key Strengths: 5-7 specific things done exceptionally well

7. Critical Improvements: 5-7 areas needing significant work

8. Rewritten "Perfect" Answer: Show an exemplary version using STAR method

9. Tactical Tips: 7-10 actionable, specific tips for this type of question

10. Red Flags: Any concerning elements that might hurt candidacy

Be extremely detailed, constructive, and specific in all feedback.`,
        response_json_schema: {
          type: "object",
          properties: {
            overall_score: { type: "number", minimum: 0, maximum: 100 },
            star_method: {
              type: "object",
              properties: {
                situation_score: { type: "number" },
                task_score: { type: "number" },
                action_score: { type: "number" },
                result_score: { type: "number" },
                overall_star_score: { type: "number" },
                star_feedback: { type: "string" }
              }
            },
            confidence_assessment: {
              type: "object",
              properties: {
                confidence_level: { type: "number" },
                assertiveness: { type: "string" },
                body_language_indicators: { type: "string" },
                improvement_tips: { type: "array", items: { type: "string" } }
              }
            },
            phrasing_analysis: {
              type: "object",
              properties: {
                weak_phrases: { type: "array", items: { type: "string" } },
                strong_phrases: { type: "array", items: { type: "string" } },
                suggested_replacements: { 
                  type: "array", 
                  items: { 
                    type: "object",
                    properties: {
                      before: { type: "string" },
                      after: { type: "string" },
                      explanation: { type: "string" }
                    }
                  }
                },
                power_words: { type: "array", items: { type: "string" } }
              }
            },
            content_quality: {
              type: "object",
              properties: {
                relevance: { type: "number" },
                depth: { type: "number" },
                specificity: { type: "number" },
                structure: { type: "number" }
              }
            },
            key_strengths: { type: "array", items: { type: "string" } },
            critical_improvements: { type: "array", items: { type: "string" } },
            perfect_answer: { type: "string" },
            tactical_tips: { type: "array", items: { type: "string" } },
            red_flags: { type: "array", items: { type: "string" } }
          }
        }
      });

      setFeedback(response);
      setSessionHistory(prev => [...prev, {
        question: currentQuestion,
        answer: userAnswer,
        score: response.overall_score,
        time: timer,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error("Error analyzing answer:", error);
      alert("Failed to analyze answer. Please try again.");
    }

    setIsAnalyzing(false);
  };

  const generateMockInterview = async () => {
    if (!simulationJob.trim() || !simulationCompany.trim()) {
      alert("Please provide both job title and company name");
      return;
    }

    setIsGeneratingQuestions(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a highly realistic mock interview for:

Job Title: ${simulationJob}
Company: ${simulationCompany}
${jobDescription ? `Job Description: ${jobDescription}` : ''}

Create 10 comprehensive interview questions that would be asked for this specific role. Include:
- 3 behavioral questions tailored to the role and company culture
- 3 technical/competency questions specific to the job requirements
- 2 situational questions relevant to the industry and role challenges
- 2 company/culture fit questions based on the company

For each question provide:
- The exact question as the interviewer would ask it
- Question category/type
- What the interviewer is really looking for in the answer
- Key points a strong answer should cover
- Common mistakes candidates make with this question
- Ideal answer length (30 sec, 1 min, 2 min, etc.)

Make questions realistic and appropriate for the seniority level implied by the job title.`,
        response_json_schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  category: { type: "string" },
                  what_they_want: { type: "string" },
                  key_points: { type: "array", items: { type: "string" } },
                  common_mistakes: { type: "array", items: { type: "string" } },
                  ideal_length: { type: "string" }
                }
              }
            }
          }
        }
      });

      setSimulationQuestions(response.questions || []);
      setCurrentSimulationIndex(0);
      setCurrentQuestion(response.questions[0]?.question || "");
      setUserAnswer("");
      setFeedback(null);
      setActiveMode("simulation");
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate interview questions. Please try again.");
    }
    setIsGeneratingQuestions(false);
  };

  const nextSimulationQuestion = () => {
    if (currentSimulationIndex < simulationQuestions.length - 1) {
      setCurrentSimulationIndex(prev => prev + 1);
      setCurrentQuestion(simulationQuestions[currentSimulationIndex + 1].question);
      setUserAnswer("");
      setFeedback(null);
      setTimer(0);
      setIsTimerRunning(true);
      setAudioBlob(null);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">AI Interview Coach</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice interviews with AI-powered feedback, recording, and tailored mock interviews
          </p>
        </motion.div>

        {/* Mode Selection */}
        <Tabs value={activeMode} onValueChange={setActiveMode} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="practice">Quick Practice</TabsTrigger>
            <TabsTrigger value="simulation">Mock Interview</TabsTrigger>
            <TabsTrigger value="recordings">My Recordings</TabsTrigger>
          </TabsList>

          {/* Practice Mode */}
          <TabsContent value="practice">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Category Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Select Question Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {interviewCategories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? "default" : "outline"}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setCurrentQuestion("");
                            setFeedback(null);
                          }}
                          className={`h-auto py-4 flex flex-col items-center gap-2 ${
                            selectedCategory === cat.id ? 'bg-purple-600 hover:bg-purple-700' : ''
                          }`}
                        >
                          <cat.icon className="w-5 h-5" />
                          <span className="text-sm">{cat.label}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {!currentQuestion && (
                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-8 text-center">
                      <Zap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Ready to Practice?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Get a random {selectedCategory} interview question
                      </p>
                      <Button
                        size="lg"
                        onClick={selectRandomQuestion}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Generate Question
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Current Question with Recording */}
                {currentQuestion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge variant="outline" className="border-purple-300 text-purple-700">
                                {activeMode === "simulation" 
                                  ? `Question ${currentSimulationIndex + 1}/${simulationQuestions.length}`
                                  : selectedCategory}
                              </Badge>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                {formatTime(timer)}
                              </div>
                              {isRecording && (
                                <Badge className="bg-red-500 animate-pulse">
                                  <Mic className="w-3 h-3 mr-1" />
                                  Recording
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl text-gray-900">
                              {currentQuestion}
                            </CardTitle>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCurrentQuestion("");
                              setUserAnswer("");
                              setFeedback(null);
                              setTimer(0);
                              setIsTimerRunning(false);
                              setAudioBlob(null);
                              stopRecording();
                            }}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Recording Controls */}
                        <div className="flex gap-2 flex-wrap">
                          {!isRecording && !audioBlob && (
                            <Button
                              onClick={startRecording}
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Mic className="w-4 h-4 mr-2" />
                              Start Recording
                            </Button>
                          )}
                          {isRecording && (
                            <>
                              <Button
                                onClick={pauseRecording}
                                variant="outline"
                                size="sm"
                              >
                                {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                                {isPaused ? 'Resume' : 'Pause'}
                              </Button>
                              <Button
                                onClick={stopRecording}
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <StopCircle className="w-4 h-4 mr-2" />
                                Stop
                              </Button>
                            </>
                          )}
                          {audioBlob && (
                            <>
                              <Button
                                onClick={() => {
                                  const audio = new Audio(URL.createObjectURL(audioBlob));
                                  audio.play();
                                }}
                                variant="outline"
                                size="sm"
                                className="border-green-300 text-green-600 hover:bg-green-50"
                              >
                                <Volume2 className="w-4 h-4 mr-2" />
                                Play Recording
                              </Button>
                              <Button
                                onClick={saveRecording}
                                variant="outline"
                                size="sm"
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                            </>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Answer
                          </label>
                          <Textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onFocus={() => !isTimerRunning && !isRecording && setIsTimerRunning(true)}
                            placeholder="Type your answer here... Aim for 1-2 minutes of content."
                            rows={8}
                            className="resize-none"
                          />
                        </div>

                        <Button
                          onClick={analyzeAnswer}
                          disabled={isAnalyzing || !userAnswer.trim()}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Brain className="w-5 h-5 mr-2" />
                              Get Detailed AI Feedback
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Enhanced Feedback Section */}
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Overall Score */}
                    <Card className={`${getScoreBgColor(feedback.overall_score)} border-2`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Overall Performance</span>
                          <span className={`text-4xl font-bold ${getScoreColor(feedback.overall_score)}`}>
                            {feedback.overall_score}%
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={feedback.overall_score} className="h-3 mb-4" />
                      </CardContent>
                    </Card>

                    {/* STAR Method Analysis */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                          <Target className="w-5 h-5" />
                          STAR Method Adherence
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">Situation</span>
                              <span>{feedback.star_method.situation_score}%</span>
                            </div>
                            <Progress value={feedback.star_method.situation_score} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">Task</span>
                              <span>{feedback.star_method.task_score}%</span>
                            </div>
                            <Progress value={feedback.star_method.task_score} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">Action</span>
                              <span>{feedback.star_method.action_score}%</span>
                            </div>
                            <Progress value={feedback.star_method.action_score} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">Result</span>
                              <span>{feedback.star_method.result_score}%</span>
                            </div>
                            <Progress value={feedback.star_method.result_score} />
                          </div>
                        </div>
                        <div className="pt-3 border-t">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-900">Overall STAR Score</span>
                            <span className={`text-2xl font-bold ${getScoreColor(feedback.star_method.overall_star_score)}`}>
                              {feedback.star_method.overall_star_score}%
                            </span>
                          </div>
                          <p className="text-sm text-blue-700">{feedback.star_method.star_feedback}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Confidence Assessment */}
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-800">
                          <Award className="w-5 h-5" />
                          Confidence Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Confidence Level</span>
                            <span className={`text-xl font-bold ${getScoreColor(feedback.confidence_assessment.confidence_level)}`}>
                              {feedback.confidence_assessment.confidence_level}%
                            </span>
                          </div>
                          <Progress value={feedback.confidence_assessment.confidence_level} className="mb-2" />
                          <p className="text-sm text-gray-600">{feedback.confidence_assessment.body_language_indicators}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">How to Sound More Confident:</h4>
                          <ul className="space-y-1">
                            {feedback.confidence_assessment.improvement_tips.map((tip, i) => (
                              <li key={i} className="text-sm text-purple-700 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Phrasing Analysis */}
                    <Card className="bg-orange-50 border-orange-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-800">
                          <MessageSquare className="w-5 h-5" />
                          Phrasing Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {feedback.phrasing_analysis.weak_phrases.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-red-700 mb-2">⚠️ Weak Phrases to Avoid:</h4>
                            <div className="flex flex-wrap gap-2">
                              {feedback.phrasing_analysis.weak_phrases.map((phrase, i) => (
                                <Badge key={i} variant="outline" className="border-red-300 text-red-700">
                                  {phrase}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {feedback.phrasing_analysis.strong_phrases.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2">✓ Strong Phrases Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {feedback.phrasing_analysis.strong_phrases.map((phrase, i) => (
                                <Badge key={i} className="bg-green-100 text-green-800">
                                  {phrase}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-semibold mb-3">💡 Suggested Phrase Improvements:</h4>
                          <div className="space-y-3">
                            {feedback.phrasing_analysis.suggested_replacements.map((replacement, i) => (
                              <div key={i} className="bg-white p-3 rounded-lg border">
                                <div className="grid md:grid-cols-2 gap-2 mb-2">
                                  <div>
                                    <span className="text-xs text-red-600 font-medium">❌ Before:</span>
                                    <p className="text-sm italic text-gray-700">"{replacement.before}"</p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-green-600 font-medium">✓ After:</span>
                                    <p className="text-sm font-medium text-gray-900">"{replacement.after}"</p>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600">{replacement.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {feedback.phrasing_analysis.power_words.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">🔥 Power Words to Incorporate:</h4>
                            <div className="flex flex-wrap gap-2">
                              {feedback.phrasing_analysis.power_words.map((word, i) => (
                                <Badge key={i} className="bg-blue-100 text-blue-800">
                                  {word}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Content Quality Scores */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Content Quality Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Relevance</span>
                            <span>{feedback.content_quality.relevance}%</span>
                          </div>
                          <Progress value={feedback.content_quality.relevance} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Depth</span>
                            <span>{feedback.content_quality.depth}%</span>
                          </div>
                          <Progress value={feedback.content_quality.depth} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Specificity</span>
                            <span>{feedback.content_quality.specificity}%</span>
                          </div>
                          <Progress value={feedback.content_quality.specificity} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Structure</span>
                            <span>{feedback.content_quality.structure}%</span>
                          </div>
                          <Progress value={feedback.content_quality.structure} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Strengths & Improvements Side by Side */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            Key Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {feedback.key_strengths.map((strength, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-700 text-sm">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-red-50 border-red-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-800">
                            <AlertCircle className="w-5 h-5" />
                            Critical Improvements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {feedback.critical_improvements.map((improvement, i) => (
                              <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Red Flags */}
                    {feedback.red_flags && feedback.red_flags.length > 0 && (
                      <Card className="bg-red-100 border-red-300">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-900">
                            <AlertCircle className="w-5 h-5" />
                            🚩 Red Flags to Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {feedback.red_flags.map((flag, i) => (
                              <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                                <span className="font-bold">⚠️</span>
                                {flag}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Perfect Answer */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                          <Lightbulb className="w-5 h-5" />
                          Exemplary Answer (STAR Method)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {feedback.perfect_answer}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Tactical Tips */}
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-800">
                          <Zap className="w-5 h-5" />
                          Tactical Tips for Success
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feedback.tactical_tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-purple-700 text-sm">
                              <span className="font-bold text-purple-800">{i + 1}.</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Session Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Session Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <p className="text-3xl font-bold text-purple-600">
                        {sessionHistory.length}
                      </p>
                      <p className="text-sm text-gray-600">Questions Practiced</p>
                    </div>
                    
                    {sessionHistory.length > 0 && (
                      <>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-3xl font-bold text-blue-600">
                            {Math.round(sessionHistory.reduce((acc, h) => acc + h.score, 0) / sessionHistory.length)}%
                          </p>
                          <p className="text-sm text-gray-600">Average Score</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Recent Performance</p>
                          <div className="space-y-2">
                            {sessionHistory.slice(-5).reverse().map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                <span className="text-gray-600 truncate flex-1 mr-2">
                                  {item.question.substring(0, 30)}...
                                </span>
                                <Badge className={`${getScoreBgColor(item.score)}`}>
                                  {item.score}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* STAR Method Card */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">STAR Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-blue-900">Situation</p>
                      <p className="text-gray-700">Set the context for your story</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Task</p>
                      <p className="text-gray-700">Describe your responsibility</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Action</p>
                      <p className="text-gray-700">Explain what you did</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Result</p>
                      <p className="text-gray-700">Share the outcome and impact</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mock Interview Mode */}
          <TabsContent value="simulation">
            <div className="max-w-4xl mx-auto">
              {simulationQuestions.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Tailored Mock Interview Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={simulationJob}
                        onChange={(e) => setSimulationJob(e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={simulationCompany}
                        onChange={(e) => setSimulationCompany(e.target.value)}
                        placeholder="e.g., Google, Microsoft, etc."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description (Optional but Recommended)
                      </label>
                      <Textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the complete job description here for highly tailored questions..."
                        rows={8}
                        className="resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Including the job description helps generate more relevant and specific interview questions
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={generateMockInterview}
                      disabled={isGeneratingQuestions}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isGeneratingQuestions ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating Tailored Interview...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Mock Interview
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Continue with simulation questions like in practice mode */}
                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardHeader>
                      <CardTitle>
                        Mock Interview: {simulationJob} at {simulationCompany}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">
                          Question {currentSimulationIndex + 1} of {simulationQuestions.length}
                        </span>
                        <Progress 
                          value={((currentSimulationIndex + 1) / simulationQuestions.length) * 100} 
                          className="w-48"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  {/* Rest of the simulation content similar to practice mode */}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Recordings Tab */}
          <TabsContent value="recordings">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      Saved Interview Recordings
                    </span>
                    <Badge variant="outline">{recordedSessions.length} recordings</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recordedSessions.length === 0 ? (
                    <div className="text-center py-12">
                      <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No recordings yet</h3>
                      <p className="text-gray-500">Start practicing and record your sessions to review later</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recordedSessions.map((session) => (
                        <Card key={session.id} className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-1">{session.question}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(session.duration)}
                                  </span>
                                  <span>Score: {session.score}%</span>
                                  <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => playRecording(session)}
                                >
                                  <Volume2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteRecording(session.id)}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            {playingSession?.id === session.id && (
                              <div className="mt-4">
                                <audio 
                                  ref={audioRef}
                                  src={session.audioUrl}
                                  controls
                                  className="w-full"
                                  autoPlay
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}