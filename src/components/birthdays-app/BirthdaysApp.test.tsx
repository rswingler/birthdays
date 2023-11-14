import {getByTestId, render} from '@testing-library/react';
import React from 'react';
import MockedBirthdayContextProvider from '../../context-providers/MockedBirthdayContextProvider';
import {BIRTHDAY_CONTENT_TEST_ID, BirthdaysApp} from './BirthdaysApp';

describe("Birthdays App", () => {
  it("Should render", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element: HTMLAnchorElement = getByTestId(
      renderResult.container,
      BIRTHDAY_CONTENT_TEST_ID,
    );

    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
  });
});
