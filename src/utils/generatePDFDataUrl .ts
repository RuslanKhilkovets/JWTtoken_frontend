import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';



async function generatePDFDataUrl(textContent: any) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit); 

  const page = pdfDoc.addPage();

  const fontBytes = await fetch('https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2').then((res) => res.arrayBuffer());
  const font = await pdfDoc.embedFont(fontBytes);
  

  const textWidth = 100;


  page.drawText(textContent, {
    x: textWidth,
    y: page.getHeight() - 50,
    size: 12,
    color: rgb(0, 0, 0),
    font, 
  });

  const pdfBytes = await pdfDoc.save(); 

  const pdfDataUrl = `data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(pdfBytes)))}`;
  return pdfDataUrl;
}

export default generatePDFDataUrl; 