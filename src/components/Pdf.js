import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

function Pdf(props) {
    const [numPages, setNumPages] = useState();


    useEffect(() => {
        
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    console.log();
    return (
        <div>
            <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map(page => {
                        return (
                            <Page
                                pageNumber={page}
                                renderTextLayer={false}
                                renderAnnotationLayer={false} />
                        )
                    })}
            </Document>
        </div>
    );
}
export default Pdf;