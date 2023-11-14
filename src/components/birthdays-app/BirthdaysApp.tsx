import moment from "moment";
import React from "react";
import { useBirthdayContext } from "../../context-providers/BirthdayContextProvider";
import { ReactStyleMap } from "../../Types";
import { BirthdayTile } from "../BirthdayTile";

export const BIRTHDAY_CONTENT_TEST_ID = "birthdays-content";

export function BirthdaysApp(): React.ReactElement {
  const { getWikiData, wikiData, isLoading, hasLoadingError } =
    useBirthdayContext();

  return (
    <div
      data-testid={BIRTHDAY_CONTENT_TEST_ID}
      style={{
        width: "100%",
        cursor: isLoading ? "wait" : "default",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="content" style={{ width: "100%", maxWidth: 1000 }}>
        <h1>Famous Birthdays Today: {moment().format("MMMM DD")}</h1>
        <button onClick={getWikiData}>Get Today's Birthdays</button>
        {!isLoading ? (
          <div className={"birthday-list"} style={{ width: "100%" }}>
            {wikiData?.births
              .sort((a, b) => b.year - a.year)
              .map((info, index) => <BirthdayTile key={index} info={info} />)}
          </div>
        ) : (
          <div style={{ padding: 20, fontWeight: "bold" }}>Loading...</div>
        )}
      </div>
      {hasLoadingError && (
        <div style={styles.errorModal}>A loading error occurred</div>
      )}
    </div>
  );
}

const styles: ReactStyleMap = {
  errorModal: {
    top: "20%",
    border: "1px solid red",
    background: "#ffdada",
    color: "#ff0000",
    position: "fixed",
    padding: 20,
  },
};
