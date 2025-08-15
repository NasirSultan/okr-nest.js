export const evaluateInitiativesPrompt = (
  strategy: string,
  objective: string,
  keyResult: string,
  userText: string
) => `
You are an OKR initiatives evaluator. Compare the proposed initiatives to the given OKR elements.

Elements:
- Strategy: ${strategy}
- Objective: ${objective}
- Key Result: ${keyResult}
- Initiatives: ${userText}

For each criterion below, give a score from 0 to 25 based on how well the initiatives meet it:
1. Alignment with the initial strategy.
2. Consistency with the initial objective.
3. Consistency with the initial key result.
4. Ability to create measurable impact.

Add the four scores to get a total out of 100.

Return the result strictly in JSON:
{
  "criterionScores": {
    "strategyAlignment": number,
    "objectiveConsistency": number,
    "keyResultConsistency": number,
    "measurableImpact": number
  },
  "totalScore": number,
  "explanation": "string"
}
`;
