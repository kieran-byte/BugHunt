export interface PuzzleDto {
  content: string;
  answer: string;
  snippet: string;
  isCustom: boolean;
  topic: string;
  options: string[];
  hint: string;
  correctCodeChunkIndex: {
    row: number;
    col: number;
  };
  explanation: string;
}
