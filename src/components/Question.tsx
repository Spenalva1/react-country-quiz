import { Box, Image, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IQuestion, IQuestionOption } from '../types/types';
import questionCorner from '../assets/question-corner.svg';

interface QuestionProps {
  question: IQuestion;
  onQuestionAnswered: (answeredCorrectly: boolean) => void;
}

function Question({ question, onQuestionAnswered }: QuestionProps) {
  const [optionSelected, setOptionSelected] = useState<{
    isSelected: boolean;
    option: IQuestionOption | null;
  }>({ isSelected: false, option: null });

  useEffect(() => {
    setOptionSelected({ isSelected: false, option: null });
  }, [question]);

  const getOptionHoverStyle = useCallback(() => {
    if (optionSelected.isSelected) return {};
    return {
      bg: '#F9A826',
      borderColor: '#F9A826',
      color: 'white',
    };
  }, [optionSelected.isSelected]);

  const getOptionActiveStyle = useCallback(() => {
    if (optionSelected.isSelected) return {};
    return {
      bg: '#e58f06',
      borderColor: '#e58f06',
    };
  }, [optionSelected.isSelected]);

  const getBackgroundStyle = useCallback(
    (option: IQuestionOption) => {
      if (optionSelected.isSelected && option.correct) return '#60BF88';
      if (optionSelected.isSelected && optionSelected.option === option)
        return '#EA8282';
      return 'white';
    },
    [optionSelected]
  );

  const getBorderColor = useCallback(
    (option: IQuestionOption) => {
      if (optionSelected.isSelected && option.correct) return '#60BF88';
      if (optionSelected.isSelected && optionSelected.option === option)
        return '#EA8282';
      return 'rgba(96, 102, 208, 0.7)';
    },
    [optionSelected]
  );

  const onOptionSelected = (option: IQuestionOption) => {
    if (optionSelected.isSelected) return;
    setOptionSelected({
      isSelected: true,
      option,
    });
    onQuestionAnswered(option.correct);
  };

  return (
    <Stack
      py="16"
      px="8"
      backgroundColor="white"
      w="465px"
      color="#2F527B"
      position="relative"
      gap="3"
      borderRadius="3xl"
    >
      <Image
        width="160px"
        position="absolute"
        top="0"
        right="0"
        transform="translateY(-65%)"
        src={questionCorner}
      />
      {question.type === 'flag' && question.flag && (
        <Image
          borderRadius="lg"
          boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
          width="85px"
          fit="fill"
          src={question.flag}
        />
      )}
      <Text fontWeight="bold" fontSize="2xl">
        {question.question}
      </Text>
      <Stack gap="4">
        {question.options.map((option, i) => (
          <Box
            cursor={optionSelected.isSelected ? 'auto' : 'pointer'}
            onClick={() => onOptionSelected(option)}
            key={option.name}
            display="flex"
            alignItems="center"
            color={
              optionSelected.isSelected &&
              (option.correct || optionSelected.option === option)
                ? 'white'
                : '#6066D0'
            }
            borderWidth="2px"
            borderStyle="solid"
            borderColor={getBorderColor(option)}
            px="5"
            py="2"
            borderRadius="2xl"
            bg={getBackgroundStyle(option)}
            _hover={getOptionHoverStyle()}
            _active={getOptionActiveStyle()}
          >
            <Text mr={10} fontSize="2xl">
              {String.fromCharCode(65 + i)}
            </Text>
            <Text fontSize="xl" flex="1">
              {option.name}
            </Text>
            {optionSelected.isSelected && option.correct && (
              <Box
                w="25px"
                h="25px"
                p="2"
                border="2px solid white"
                borderRadius="full"
                position="relative"
              >
                <CheckIcon
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%) scale(0.8)"
                />
              </Box>
            )}
            {optionSelected.isSelected &&
              !option.correct &&
              optionSelected.option === option && (
                <Box
                  w="25px"
                  h="25px"
                  p="2"
                  border="2px solid white"
                  borderRadius="full"
                  position="relative"
                >
                  <CloseIcon
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%) scale(0.7)"
                  />
                </Box>
              )}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default Question;
