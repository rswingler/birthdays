import {
  fireEvent,
  getAllByTestId,
  getByTestId,
  queryByTestId,
  render,
} from "@testing-library/react";
import React from "react";
import MockedBirthdayContextProvider from "../../context-providers/MockedBirthdayContextProvider";
import { BIRTHDAY_TILE_TEST_ID } from "../birthday-tile/BirthdayTile";
import { BIRTHDAY_CONTENT_TEST_ID, BirthdaysApp } from "./BirthdaysApp";

describe("Birthdays App", () => {
  it("Should render component", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = getByTestId(
      renderResult.container,
      BIRTHDAY_CONTENT_TEST_ID,
    );

    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
  });

  it("Should render button", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const button = getByTestId(renderResult.container, "today-button");

    expect(button).toBeTruthy();
    expect(button).toBeInTheDocument();
  });

  it("Should execute button click", () => {
    const mockGetWikiData = jest.fn();
    const renderResult = render(
      <MockedBirthdayContextProvider getWikiData={mockGetWikiData}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const button = getByTestId(renderResult.container, "today-button");

    fireEvent.click(button);
    expect(mockGetWikiData).toBeCalledTimes(1);
  });

  it("Should render loading message when loading", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider isLoading={true}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = getByTestId(renderResult.container, "loading-message");

    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
  });

  it("Should not render loading message when not loading", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider isLoading={false}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = queryByTestId(renderResult.container, "loading-message");

    expect(element).not.toBeTruthy();
    expect(element).not.toBeInTheDocument();
  });

  it("Should not render birthday list when data is loading", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider isLoading={true}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = queryByTestId(renderResult.container, "birthday-list");

    expect(element).not.toBeTruthy();
    expect(element).not.toBeInTheDocument();
  });

  it("Should render birthday tiles when data is present", () => {
    const mockWikiData = {
      births: [
        {
          text: "Name",
          year: 1927,
          pages: [],
        },
      ],
    };
    const renderResult = render(
      <MockedBirthdayContextProvider wikiData={mockWikiData}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = getByTestId(renderResult.container, BIRTHDAY_TILE_TEST_ID);

    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
  });

  it("Should not render birthday tiles when data is not present", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = queryByTestId(
      renderResult.container,
      BIRTHDAY_TILE_TEST_ID,
    );

    expect(element).not.toBeTruthy();
    expect(element).not.toBeInTheDocument();
  });

  it("Should render birthday tiles ordered by year descending", () => {
    const mockWikiData = {
      births: [
        {
          text: "Name",
          year: 1927,
          pages: [],
        },
        {
          text: "Name",
          year: 2023,
          pages: [],
        },
      ],
    };
    const renderResult = render(
      <MockedBirthdayContextProvider wikiData={mockWikiData}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const elements = getAllByTestId(
      renderResult.container,
      BIRTHDAY_TILE_TEST_ID,
    );

    expect(elements.length).toEqual(2);
    expect(elements[0].innerHTML).toContain("2023");
    expect(elements[1].innerHTML).toContain("1927");
  });

  it("Should show error modal on error state", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider hasLoadingError={true}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = queryByTestId(renderResult.container, "error-modal");

    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
  });

  it("Should not show error modal without error state", () => {
    const renderResult = render(
      <MockedBirthdayContextProvider hasLoadingError={false}>
        <BirthdaysApp />
      </MockedBirthdayContextProvider>,
    );

    const element = queryByTestId(renderResult.container, "error-modal");

    expect(element).not.toBeTruthy();
    expect(element).not.toBeInTheDocument();
  });
});
