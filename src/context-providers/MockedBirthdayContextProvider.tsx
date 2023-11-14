import React from 'react';
import {WikiData} from '../Types';
import {BirthdayContext, BirthdayContextInterface} from './BirthdayContextProvider';

interface MockedProviderProps {
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  getWikiData?: () => void;
  wikiData?: WikiData;
  hasLoadingError?: boolean;
  setHasLoadingError?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const noOp = () => {};

export default function MockedBirthdayContextProvider(props: MockedProviderProps) {

  const {
    isLoading = false,
    setIsLoading = noOp,
    getWikiData = noOp,
    wikiData = {births: []},
    hasLoadingError = false,
    setHasLoadingError = noOp,
    children
  } = props;

  const value: BirthdayContextInterface = {
    isLoading,
    setIsLoading,
    getWikiData,
    wikiData,
    hasLoadingError,
    setHasLoadingError
  }

  return (
    <BirthdayContext.Provider value={value}>
      {children}
    </BirthdayContext.Provider>
  );
}