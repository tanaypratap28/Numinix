const AI_API_ID = 'GYQUJJ22YW';

export interface AIResponse {
  solution: string;
  steps: string[];
  confidence: number;
}

export async function solveMathProblem(question: string): Promise<AIResponse> {
  try {
   
    const response = await fetch('http://localhost:3001/api/ai-solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      console.error('Proxy API error:', response.status, response.statusText);
      throw new Error('Failed to get solution from proxy server');
    }
    const data = await response.json();
    console.log('Proxy API response:', data);
    // Use the response as-is
    return data;
  } catch (error) {
    // Fallback mock response for development
    return {
      solution: "AI solution will be available once the API is connected. For now, showing a sample solution format.",
      steps: [
        
      ],
      confidence: 0.95
    };
  }
}

export async function generateQuestions(topic: string, difficulty: string, count: number = 5): Promise<any[]> {
  // This will be implemented when AI generation feature is ready
  return [];
}