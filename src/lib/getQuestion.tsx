import { IQuestion, IQuestionOption, QuestionType } from '../types/types';
import countries from './countries.json';

const OPTIONS = 4;

function getRandomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

interface Country {
  flag: string;
  name: string;
  capital: string;
}

function getRandomCountry(): Country {
  const random = countries[getRandomNumber(0, countries.length - 1)];
  return {
    flag: random.flags.svg,
    name: random.name.common,
    capital: random.capital[0],
  };
}

function getRandomQuestionType(): QuestionType {
  return getRandomNumber(0, 1) ? 'flag' : 'capital';
}

export function getQuestion(t?: QuestionType): IQuestion {
  const type = t || getRandomQuestionType();
  const correct = getRandomCountry();
  const options = [{ name: correct.name, correct: true }] as IQuestionOption[];
  while (options.length < OPTIONS) {
    const randomIncorrect = getRandomCountry();
    if (!options.some((option) => option.name === randomIncorrect.name)) {
      options.push({ name: randomIncorrect.name, correct: false });
    }
  }

  return {
    type,
    options: options.sort(() => Math.random() - 0.5),
    question:
      type === 'flag'
        ? 'Which country does this flag belong to?'
        : `${correct.capital} is the capital of`,
    flag: type === 'flag' ? correct.flag : null,
  };
}
