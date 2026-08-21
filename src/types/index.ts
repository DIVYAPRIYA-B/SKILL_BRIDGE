export type Role = 'student' | 'industry' | 'admin';

export type Language = 'en' | 'ta';

export type AccessibilityMode = 'normal' | 'large' | 'high-contrast';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  name: string;
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  name: string;
  age: string;
  location: string;
  state: string;
  language: Language;
  degree: string;
  branch: string;
  graduationYear: string;
  college: string;
  skills: string[];
  careerInterest: string;
  workMode: 'remote' | 'onsite' | 'hybrid';
  preferredLocation: string;
  minStipend: string;
  duration: string;
  onboarded: boolean;
  resume: ResumeData;
}

export interface ResumeData {
  summary: string;
  skills: string[];
  projects: { title: string; description: string }[];
  education: { degree: string; college: string; year: string }[];
  experience: { role: string; company: string; duration: string; description: string }[];
  achievements: string[];
}

export interface CompanyProfile {
  userId: string;
  companyName: string;
  industry: string;
  location: string;
  website: string;
  description: string;
  size: string;
}

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  description: string;
  location: string;
  remote: boolean;
  stipend: number;
  duration: string;
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string;
  responsibilities: string[];
  benefits: string[];
  deadline: string;
  postedAt: string;
  status: 'active' | 'closed';
}

export type ApplicationStatus = 'applied' | 'under-review' | 'shortlisted' | 'interview' | 'selected' | 'rejected';

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  coverLetter: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore: number;
  interviewDate?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  experience: number;
  skills: string[];
  languages: string[];
  career: string;
  bio: string;
  avatar?: string;
}

export interface MentorRequest {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  status: 'pending' | 'accepted' | 'declined';
  requestedAt: string;
}

export interface RoadmapModule {
  week: number;
  title: string;
  topic: string;
  objectives: string[];
  estimatedHours: number;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
