package com.pdftextextractor


import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise


import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader


import java.io.File
import java.io.IOException


class PdfTextExtractorModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName(): String {
        return "PdfTextExtractor"
    }


    @ReactMethod
    fun extractText(filePath: String, promise: Promise) {
        try {
            //Init PDF Box resources
            PDFBoxResourceLoader.init(reactContext)

            val file = File(filePath)
            if (!file.exists()) {
                promise.reject("ENOENT", "File not found: $filePath")
                return
            }
            PDDocument.load(file).use { document ->
                val stripper = PDFTextStripper()
                val text = stripper.getText(document)
                promise.resolve(text ?: "")
            }
        } catch (e: IOException) {
            promise.reject("E_PDF_READ", e.localizedMessage, e)
        } catch (e: Exception) {
            promise.reject("E_UNKNOWN", e.localizedMessage, e)
        }
    }
}