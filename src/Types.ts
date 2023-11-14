import { CSSProperties } from "react";

export type ReactStyleMap = { [key: string]: CSSProperties };

export interface WikiData {
  births: WikiInfo[];
}

export interface WikiInfo {
  text: string;
  year: number;
  pages: WikiPage[];
}

export interface WikiPage {
  content_urls: WikiURLs;
  description: string;
  extract: string;
  normalizedtitle: string;
  originalimage: WikiImage;
}

export interface WikiURLs {
  desktop: WikiUrlInfo;
  mobile: WikiUrlInfo;
}

export interface WikiUrlInfo {
  page: string;
  talk: string;
}

export interface WikiImage {
  source: string;
  height: number;
  width: number;
}
