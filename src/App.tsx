import { Center, Container, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import bgImage from './assets/background.png';
import Question from './components/Question';
import { getQuestion } from './lib/getQuestion';
import { IQuestion } from './types/types';

function App() {
  const [question, setQuestion] = useState<IQuestion>(() => getQuestion());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  console.log(question.options.find((option) => option.correct));

  const onQuestionAnswered = (answeredCorectly: boolean) => {
    if (answeredCorectly) {
      setScore((prev) => prev + 1);
      setTimeout(() => {
        setQuestion(getQuestion());
      }, 1000);
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <Center
      backgroundImage={bgImage}
      backgroundPosition="center"
      objectFit="cover"
      height="100vh"
      userSelect="none"
    >
      <Container>
        <Stack direction="column">
          <Text color="white" fontWeight="bold" fontSize={['2xl', '4xl']}>
            COUNTRY QUIZ
          </Text>
          <Question
            onQuestionAnswered={onQuestionAnswered}
            question={question}
          />
          {isGameOver && <Text>game over: {score}</Text>}
        </Stack>
      </Container>
    </Center>
  );
}

export default App;
