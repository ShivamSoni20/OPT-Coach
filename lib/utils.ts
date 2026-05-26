export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatMinutesLabel(minutes: number) {
  if (minutes <= 1) {
    return "1 min";
  }

  return `${minutes} min`;
}

export function getNextQuestionCount(text: string, currentCount: number) {
  if (text.includes("<brain_data_ready>true</brain_data_ready>")) {
    return 5;
  }

  const markers: Array<[string, number]> = [
    ["Q5", 4],
    ["Question 5", 4],
    ["Q4", 3],
    ["Question 4", 3],
    ["Q3", 2],
    ["Question 3", 2],
    ["Q2", 1],
    ["Question 2", 1],
    ["Q1", 0],
    ["Question 1", 0]
  ];

  for (const [marker, answered] of markers) {
    if (text.includes(marker)) {
      return Math.max(currentCount, answered);
    }
  }

  return currentCount;
}

export function parseBrainReady(text: string) {
  return text.includes("<brain_data_ready>true</brain_data_ready>");
}
