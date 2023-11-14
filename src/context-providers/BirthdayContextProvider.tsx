import moment from "moment";
import React, { useContext, useState } from "react";
import { WikiData } from "../Types";

export interface BirthdayContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getWikiData: () => void;
  wikiData: WikiData;
  hasLoadingError: boolean;
  setHasLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BirthdayContext =
  React.createContext<BirthdayContextInterface>(null);

export function BirthdayContextProvider({ children }): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wikiData, setWikiData] = useState<WikiData>(null);
  const [hasLoadingError, setHasLoadingError] = useState<boolean>(false);

  function getWikiData(): void {
    setIsLoading(true);
    setHasLoadingError(false);
    const now = moment();
    const currentMonth = now.format("MM");
    const currentDay = now.format("DD");
    fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${currentMonth}/${currentDay}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setWikiData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasLoadingError(true);
        console.error("Error:", error);
      });
  }

  return (
    <BirthdayContext.Provider
      value={{
        isLoading,
        setIsLoading,
        getWikiData,
        wikiData,
        hasLoadingError,
        setHasLoadingError,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

// Custom hook for convenience;
export function useBirthdayContext(): BirthdayContextInterface {
  return useContext(BirthdayContext);
}
