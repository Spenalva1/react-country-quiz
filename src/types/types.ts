export type QuestionType = 'flag' | 'capital';

export interface IQuestionOption {
  name: string;
  correct: boolean;
}

export interface IQuestion {
  type: QuestionType;
  options: IQuestionOption[];
  question: string;
  flag: string | null;
}
