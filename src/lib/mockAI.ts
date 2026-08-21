import type { StudentProfile, Internship, Application } from '@/types';
import { skillRequirements, studentSkillLevels } from '@/data/demoData';

export function isTamil(text: string): boolean {
  const tamilRange = /[\u0B80-\u0BFF]/;
  return tamilRange.test(text);
}

export function getStudentSkillLevel(studentId: string, skill: string): number {
  return studentSkillLevels[studentId]?.[skill] ?? (skill ? 40 : 0);
}

export function calculateSkillGap(studentId: string, targetRole: string) {
  const reqs = skillRequirements[targetRole] ?? [];
  return reqs.map(({ skill, weight }) => {
    const level = getStudentSkillLevel(studentId, skill);
    return { skill, level, weight };
  });
}

export function calculateOverallReadiness(studentId: string, targetRole: string): number {
  const gaps = calculateSkillGap(studentId, targetRole);
  if (!gaps.length) return 0;
  const total = gaps.reduce((sum, g) => sum + g.weight, 0);
  const weighted = gaps.reduce((sum, g) => sum + (g.level * g.weight) / 100, 0);
  return Math.round((weighted / total) * 100);
}

export function calculateInternshipMatch(student: StudentProfile, internship: Internship): { score: number; reason: string } {
  let score = 50;
  const reasons: string[] = [];

  const studentSkills = student.skills ?? [];
  const reqSkills = internship.requiredSkills ?? [];
  const matched = reqSkills.filter((s) => studentSkills.includes(s));
  const matchRatio = reqSkills.length ? matched.length / reqSkills.length : 0;
  score += matchRatio * 35;
  if (matched.length) reasons.push(`Strong ${matched.join(', ')} match.`);

  const missing = reqSkills.filter((s) => !studentSkills.includes(s));
  if (missing.length === 1) reasons.push(`${missing[0]} is your main skill gap.`);
  else if (missing.length > 1) reasons.push(`${missing.slice(0, 2).join(' and ')} are areas to develop.`);

  if (student.careerInterest && internship.role.toLowerCase().includes(student.careerInterest.toLowerCase().split(' ')[0])) {
    score += 8;
    reasons.push('Aligns with your career interest.');
  } else if (student.careerInterest) {
    const careerKey = student.careerInterest.toLowerCase();
    const roleKey = internship.role.toLowerCase();
    const overlap = careerKey.split(' ').some((w) => w.length > 3 && roleKey.includes(w));
    if (overlap) { score += 5; }
  }

  if (internship.remote && (student.workMode === 'remote' || student.workMode === 'hybrid')) {
    score += 5;
    reasons.push('Remote-friendly option suits your preference.');
  }
  if (!internship.remote && student.workMode === 'onsite') {
    score += 3;
  }

  if (student.preferredLocation && internship.location.toLowerCase().includes(student.preferredLocation.toLowerCase())) {
    score += 5;
    reasons.push('Located in your preferred area.');
  } else if (internship.remote) {
    score += 2;
  }

  score = Math.min(99, Math.max(40, Math.round(score)));
  return { score, reason: reasons.join(' ') || 'General profile compatibility.' };
}

export function getTopRecommendations(student: StudentProfile, internships: Internship[], limit = 10) {
  return internships
    .filter((i) => i.status === 'active')
    .map((i) => ({ internship: i, ...calculateInternshipMatch(student, i) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function generateAIResponse(question: string, student: StudentProfile | null, internships: Internship[] = [], applications: Application[] = []): string {
  const q = question.toLowerCase().trim();
  const tamil = isTamil(question);

  if (tamil) {
    if (q.includes('java') || question.includes('ஜாவா')) {
      return 'Java Developer ஆக வேலை பெற Core Java, OOP, SQL, Git, Spring Boot மற்றும் REST API ஆகியவற்றை கற்றுக்கொள்வது நல்லது. உங்கள் தற்போதைய profile அடிப்படையில் Spring Boot மற்றும் REST API உங்கள் முக்கிய skill gaps. இவற்றை கவனித்தால் நீங்கள் விரைவில் job-ready ஆகுவீர்கள்.';
    }
    if (q.includes('internship') || q.includes('இன்டர்ன்') || q.includes('வாய்ப்பு')) {
      const recs = student ? getTopRecommendations(student, internships, 3) : [];
      if (recs.length) {
        return `உங்கள் profile அடிப்படையில் சிறந்த இன்டர்ன்ஷிப் பரிந்துரைகள்:\n\n${recs.map((r, i) => `${i + 1}. ${r.internship.role} - ${r.internship.companyName} (${r.score}% match)`).join('\n')}\n\nஇவற்றில் உங்கள் திறமைகளுக்கு ஏற்றவாறு விண்ணப்பிக்கலாம்.`;
      }
      return 'தற்போது வாய்ப்புகள் உள்ளன. Opportunities பக்கத்தில் பார்க்கவும்.';
    }
    if (q.includes('skill') || q.includes('திறன்')) {
      return 'உங்கள் திறமைகளை மேம்படுத்த Skill Gap Analyzer பயன்படுத்தவும். அது உங்கள் பலம் மற்றும் பலவீனங்களை காட்டும். பிறகு Learning Roadmap உருவாக்கலாம்.';
    }
    if (q.includes('resume') || q.includes('சுயவிவரம்')) {
      return 'உங்கள் சுயவிவரத்தில் உங்கள் சாதனைகளை எண்களுடன் சேர்க்கவும். உதாரணம்: "30% செயல்திறன் மேம்பாடு". Resume Assistant பக்கத்தில் மேலும் பரிந்துரைகள் உள்ளன.';
    }
    if (q.includes('roadmap') || q.includes('வரைபடம்') || q.includes('plan') || q.includes('திட்டம்')) {
      return 'உங்களுக்கான 6-வார கற்றல் திட்டத்தை Learning Roadmap பக்கத்தில் உருவாக்கலாம். அது வாராவாரம் கற்க வேண்டிய தலைப்புகளை காட்டும்.';
    }
    return 'நான் உங்கள் தொழில் மற்றும் கற்றல் உதவியாளர். Java, இன்டர்ன்ஷிப், திறமைகள், சுயவிவரம் பற்றி கேளுங்கள்.';
  }

  if (q.includes('java')) {
    return 'You already have a strong foundation in Java. To become job-ready, focus next on Spring Boot, REST APIs, SQL, Git and project development. These are your key skill gaps based on your profile. I recommend generating a learning roadmap for Java Developer to see a step-by-step plan.';
  }
  if (q.includes('internship') || q.includes('opportunity')) {
    const recs = student ? getTopRecommendations(student, internships, 3) : [];
    if (recs.length) {
      return `Based on your profile, here are your top internship matches:\n\n${recs.map((r, i) => `${i + 1}. ${r.internship.role} at ${r.internship.companyName} — ${r.score}% match\n   ${r.reason}`).join('\n\n')}\n\nVisit the Top 10 page to see all recommendations.`;
    }
    return 'There are great opportunities available. Check the Opportunities page to browse and filter internships by location, role, and stipend.';
  }
  if (q.includes('skill')) {
    return 'Your current strengths are Java and SQL. To become job-ready, focus on improving Spring Boot, REST API, Git, and Testing. Use the Skill Gap Analyzer to see a detailed breakdown and generate a personalized learning roadmap.';
  }
  if (q.includes('why') && q.includes('not') && (q.includes('intern') || q.includes('job'))) {
    return 'Based on your profile, here are a few reasons you might not be getting responses:\n\n1. Spring Boot and REST API are key skills for Java roles — focus on building projects with these.\n2. Add measurable results to your resume (e.g., "Improved performance by 30%").\n3. Apply to internships with a match score above 80% — your Top 10 page has great options.\n4. Consider connecting with a mentor for industry insights.';
  }
  if (q.includes('resume')) {
    return 'Your resume score is 78/100. To improve it:\n\n1. Add measurable results to your project descriptions (e.g., "Served 500+ users").\n2. Mention your Smart Rental System project — it matches the Java/Full Stack internship category.\n3. Add a "Skills" section with proficiency levels.\n4. Include any certifications or online courses.\n\nVisit the Resume Assistant page for detailed suggestions.';
  }
  if (q.includes('spring boot') || q.includes('springboot')) {
    return 'Spring Boot is a Java framework that makes building web applications and REST APIs fast and easy. Think of it as a ready-made toolkit: instead of configuring everything manually, Spring Boot sets up sensible defaults so you can focus on writing your application logic. Start by creating a simple REST API that returns JSON data.';
  }
  if (q.includes('roadmap') || q.includes('plan') || q.includes('learning')) {
    return 'I can generate a personalized 6-week learning roadmap for you. Visit the Learning Roadmap page, select your target role (e.g., Java Developer), and I\'ll create a week-by-week plan with objectives, estimated time, and progress tracking.';
  }
  if (q.includes('mentor')) {
    return 'Mentors can accelerate your career by providing industry insights, code reviews, and guidance. Visit the Mentors page to find mentors matching your career interest and language. You can filter by career, industry, and experience.';
  }
  if (q.includes('improve') || q.includes('better')) {
    return 'Here are 3 ways to improve your career readiness:\n\n1. Complete your learning roadmap — you\'re at 42% progress.\n2. Apply to 2-3 high-match internships this week.\n3. Connect with a mentor in your target field.';
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello${student ? ` ${student.name}` : ''}! I'm your SkillBridge AI Assistant. I can help you with:\n\n• Career guidance and skill recommendations\n• Internship suggestions based on your profile\n• Learning roadmaps\n• Resume improvement tips\n• Questions about technologies like Spring Boot\n\nWhat would you like to know?`;
  }
  return 'I can help you with career guidance, skill development, internship recommendations, learning roadmaps, and resume improvement. Try asking:\n\n• "What skills should I learn to become a Java developer?"\n• "Which internship is best for me?"\n• "How can I improve my resume?"\n• "Create a learning plan for me"';
}
