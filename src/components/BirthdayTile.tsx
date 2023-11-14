import React from "react";
import logo from "../logo.svg";
import { ReactStyleMap, WikiInfo } from "../Types";

export interface BirthdayTileProps {
  info: WikiInfo;
}

export const BIRTHDAY_TILE_TEST_ID = "birthday-tile";

export function BirthdayTile({ info }: BirthdayTileProps): React.ReactElement {
  return (
    <div data-testid={BIRTHDAY_TILE_TEST_ID} style={styles.container}>
      <img
        src={info?.pages[0]?.originalimage?.source ?? logo}
        style={{ width: 140, objectFit: "cover" }}
      />
      <div className={"flex-col"} style={{ padding: "5px 15px" }}>
        <div style={{ fontWeight: "bold" }}>
          ({info.year}) {info.text}
        </div>
        <br />
        <div>{info?.pages[0]?.extract}</div>
        <br />
        <a
          href={info?.pages[0]?.content_urls.desktop.page}
          target="_blank"
          style={{ width: "fit-content" }}
        >
          Full Bio
        </a>
      </div>
    </div>
  );
}

const styles: ReactStyleMap = {
  container: {
    width: "90%",
    maxWidth: 800,
    background: "white",
    padding: 10,
    margin: 10,
    marginBottom: 20,
    display: "flex",
    boxShadow: "2px 2px 4px rgba(0,0,0,0.4)",
  },
};
