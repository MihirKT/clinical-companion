import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt';
  includeMetadata?: boolean;
  includeTimestamp?: boolean;
}

/**
 * Export document to PDF
 */
export async function exportToPDF(
  content: string,
  title: string,
  options?: ExportOptions
) {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add header
    pdf.setFontSize(18);
    pdf.text(title, 20, 20);

    // Add timestamp if requested
    if (options?.includeTimestamp) {
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    }

    // Add content
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    const lines = pdf.splitTextToSize(content, maxWidth);
    let yPosition = options?.includeTimestamp ? 40 : 30;

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });

    pdf.save(`${title}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
}

/**
 * Export document to plain text
 */
export function exportToTXT(content: string, title: string) {
  try {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
  } catch (error) {
    console.error('TXT export failed:', error);
    throw error;
  }
}

/**
 * Export document to DOCX (using simple HTML + CSS approach)
 * Note: Requires docx library for full DOCX support
 */
export function exportToDocx(content: string, title: string) {
  try {
    // For now, create a simple document structure
    const docContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body { font-family: "Calibri", sans-serif; }
        h1 { font-size: 24pt; }
        p { font-size: 11pt; line-height: 1.5; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${content.replace(/\n/g, '</p><p>')}</p>
    </body>
    </html>`;

    const element = document.createElement('a');
    const file = new Blob([docContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.docx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
  } catch (error) {
    console.error('DOCX export failed:', error);
    throw error;
  }
}

/**
 * Export document with specified format
 */
export async function exportDocument(
  content: string,
  title: string,
  format: 'pdf' | 'docx' | 'txt' = 'pdf',
  options?: ExportOptions
) {
  switch (format) {
    case 'pdf':
      return exportToPDF(content, title, options);
    case 'docx':
      return exportToDocx(content, title);
    case 'txt':
      return exportToTXT(content, title);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}
