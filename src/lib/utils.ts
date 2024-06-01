import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomImageURL(
  randomId?: number,
  width = 400,
  height = 600,
) {
  const rand = randomId ?? Math.floor(Math.random() * 100) + 1;
  return `https://picsum.photos/${width}/${height}?random=${rand}`;
}

export const moveCursorToEndOfContentEditableElement = (elem: Element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(elem, elem.childNodes.length);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export function defined<T>(a: T): a is NonNullable<T> {
  return typeof a !== "undefined" && a !== null;
}

export const download = (blob: Blob | MediaSource, filename: string) => {
  const blobUrl = window.URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.download = filename;
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);
};

export const openInNewTab = (blob: Blob | MediaSource) => {
  const blobUrl = window.URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.target = "_blank";
  anchor.href = blobUrl;
  anchor.click();
  window.URL.revokeObjectURL(blobUrl);
};
