import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/scripts/pdf.worker.min.js";

export const pdfHandler = async (pdfData) => {
  const pdfDoc = await pdfjs.getDocument({ data: pdfData }).promise;

  const numPages = pdfDoc.numPages;
  let wordCount = 0;

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    wordCount += text.split(/\s+/).length;
  }

  return {
    pageCount: numPages,
    wordCount: wordCount,
  };
};
