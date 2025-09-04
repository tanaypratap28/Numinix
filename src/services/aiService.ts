import { GEMINI_API_KEY } from '../config/geminiApiKey';

export interface AIResponse {
  solution: string;
  steps: string[];
  confidence: number;
  error?: string;
}

export async function solveMathProblem(question: string): Promise<AIResponse> {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `"You are MathMentor, a super-smart, friendly, and fun math assistant inside the Numinix app. Solve the user’s math question step by step. Give the answer clearly and also explain the
               reasoning in a simple, engaging way, using emojis and fun comments where appropriate. If the question can be visualized (like graphs, shapes, or patterns), describe it so it feels interactive. Keep the
                tone casual, encouraging, and inspiring, so users feel like they are learning with a cool mentor. What you have to do is you have to give solution like give mathematical step and in next line a one line 
                explanation this explaination should very small, make the mathematical solution different from othere later and at last you have to ask do you need more explaination if yes then explain in full detai."

✅ Optional Enhancements for Extra Cool Factor:

Gamified tone:
"Add little rewards or praise when the user gets it right, like: ‘🎉 Awesome! You nailed it!’"

Hints mode:
"If the user is stuck, give a small hint first, then the full solution."

Mini challenges:
"Suggest a slightly harder question after solving this one to keep it exciting." ${question}` }] }
          ]
        })
      }
    );

    const data = await response.json();
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return {
        solution: '',
        steps: [],
        confidence: 0.0,
        error: JSON.stringify(data)
      };
    }

    const rawSolution = data.candidates[0].content.parts[0].text;
    const cleaned = rawSolution.replace(/```/g, '').trim();
    const steps = cleaned.split('\n').filter((line: string) => line.trim() !== '');

    return {
      solution: cleaned,
      steps,
      confidence: data.candidates[0].confidence || 0.0
    };
  } catch (error: any) {
    return {
      solution: "AI solution will be available once the API is connected. For now, showing a sample solution format.",
      steps: [],
      confidence: 0.95,
      error: error?.message || String(error)
    };
  }
}

export async function generateQuestions(classLevel: number): Promise<any[]> {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate 20 math quiz questions for class ${classLevel} in JSON format with fields: id, question, options, correct_answer, explanation, difficulty, class_level, topic.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return [{ error: JSON.stringify(data) }];
    }

    let generatedQuestions: any[] = [];
    let rawText = data.candidates[0].content.parts[0].text || '[]';
    // Remove triple backticks and optional 'json' label
    rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
    // Remove trailing and leading backticks if present
    if (rawText.startsWith('```')) rawText = rawText.slice(3);
    if (rawText.endsWith('```')) rawText = rawText.slice(0, -3);
    try {
      generatedQuestions = JSON.parse(rawText);
    } catch (err) {
      generatedQuestions = [{ error: 'Parse error: ' + String(err) }];
    }

    return generatedQuestions;
  } catch (error: any) {
    return [{ error: error?.message || String(error) }];
  }
}
