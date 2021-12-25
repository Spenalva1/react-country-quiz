import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import gameOverImg from '../assets/game-over.svg';

interface GameOverProps {
  score: number;
  onGameRestart: () => void;
}

function GameOver({ score, onGameRestart }: GameOverProps) {
  return (
    <Stack gap="10" alignItems="center">
      <Image w="238px" src={gameOverImg} />
      <Box textAlign="center">
        <Text fontSize="4xl">Results</Text>
        <Text>
          You got{' '}
          <Text as="span" fontSize="3xl" color="#60BF88">
            {score}
          </Text>{' '}
          correct answers
        </Text>
      </Box>
      <Button variant="outline" borderColor="#2F527B" onClick={onGameRestart}>
        Try again
      </Button>
    </Stack>
  );
}

export default GameOver;
