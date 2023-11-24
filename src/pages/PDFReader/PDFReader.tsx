import { useParams } from 'react-router-dom';


import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'


import '@react-pdf-viewer/core/lib/styles/index.css'; 
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; 


import cl from './PDFReader.module.scss';



function PDFPage() {
  const { data } = useParams<{ data: string }>();

  
  if (!data) {
    return <div>Error: PDF data not provided</div>;
  }

  return (
    <div className={cl.Pdf_Viewer}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={data} plugins={[defaultLayoutPlugin()]}/>
      </Worker>
    </div>
  );
}

export default PDFPage;