import fs from "node:fs";
import path from "node:path";

export interface AboutSection {
  heading: string;
  paragraphs: string[];
}

/** About-page content — `content/about.json`, editable without touching code. */
export interface AboutContent {
  title: string;
  intro: string;
  sections: AboutSection[];
}

const ABOUT_FILE = path.join(process.cwd(), "content", "about.json");

export function getAbout(): AboutContent {
  const raw = fs.readFileSync(ABOUT_FILE, "utf-8");
  return JSON.parse(raw) as AboutContent;
}
