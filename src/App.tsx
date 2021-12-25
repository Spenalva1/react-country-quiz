import { Box, Center, Container, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import bgImage from './assets/background.png';
import GameOver from './components/GameOver';
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
      setQuestion(getQuestion());
    } else {
      setIsGameOver(true);
    }
  };

  const onGameRestart = () => {
    setScore(0);
    setIsGameOver(false);
    setQuestion(getQuestion());
  };

  return (
    <Center
      backgroundImage={bgImage}
      backgroundPosition="center"
      objectFit="cover"
      height="100vh"
      userSelect="none"
    >
      <Container maxW="465px">
        <Stack direction="column">
          <Text
            as="h1"
            color="white"
            fontWeight="bold"
            fontSize={['2xl', '4xl']}
          >
            COUNTRY QUIZ
          </Text>
          <Box
            py={[8, 12]}
            px="8"
            backgroundColor="white"
            color="#2F527B"
            borderRadius="3xl"
            position="relative"
          >
            {!isGameOver && (
              <Question
                onQuestionAnswered={onQuestionAnswered}
                question={question}
              />
            )}
            {isGameOver && (
              <GameOver score={score} onGameRestart={onGameRestart} />
            )}
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}

export default App;
