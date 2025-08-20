import { NativeModules } from "react-native";

const { PdfTextExtractor } = NativeModules;

if (!PdfTextExtractor) {
  throw new Error(
    "PdfTextExtractor native module not found. Make sure the package is linked and you rebuilt the app."
  );
}

export default {
  /**
   * Extract text from a PDF file path on the Android filesystem.
   * @param {string} filePath absolute path to the PDF file
   * @returns {Promise<string>} resolved with the extracted text
   */
  extractTextFromPdf: (filePath) => PdfTextExtractor.extractText(filePath),
};
