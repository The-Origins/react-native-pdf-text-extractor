export default interface PdfTextExtractorModule {
  extractTextFromPdf(filePath: string): Promise<string>;
}

declare const _default: PdfTextExtractorModule;
export = _default;
