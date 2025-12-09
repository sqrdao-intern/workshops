import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH = 794; // 210mm
const A4_HEIGHT = 1123; // 297mm
const PDF_QUALITY = 2; // Higher quality for better rendering

/**
 * Wait for all images in an element to load
 */
function waitForImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');
  const imagePromises = Array.from(images).map((img) => {
    if (img.complete) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Continue even if image fails to load
      // Timeout after 5 seconds
      setTimeout(() => resolve(), 5000);
    });
  });
  return Promise.all(imagePromises).then(() => {});
}

/**
 * Generates a PDF from all slides in the presentation
 * @param slideIds Array of slide element IDs (e.g., ['slide-1', 'slide-2', ...])
 * @param filename Name for the downloaded PDF file
 */
export async function generatePresentationPDF(
  slideIds: string[],
  filename: string = 'presentation.pdf'
): Promise<void> {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [A4_WIDTH, A4_HEIGHT],
    });

    // Process each slide
    for (let i = 0; i < slideIds.length; i++) {
      const slideId = slideIds[i];
      const slideElement = document.getElementById(slideId);

      if (!slideElement) {
        console.warn(`Slide ${slideId} not found, skipping...`);
        continue;
      }

      // Scroll to slide to ensure it's in view
      slideElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      
      // Wait for scroll and images to load
      await new Promise((resolve) => setTimeout(resolve, 500));
      await waitForImages(slideElement);

      // Capture the slide as canvas
      const canvas = await html2canvas(slideElement, {
        scale: PDF_QUALITY,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: slideElement.scrollWidth,
        height: slideElement.scrollHeight,
        windowWidth: slideElement.scrollWidth,
        windowHeight: slideElement.scrollHeight,
      });

      // Calculate dimensions to fit A4 page while maintaining aspect ratio
      const slideAspectRatio = canvas.width / canvas.height;
      const pageAspectRatio = A4_WIDTH / A4_HEIGHT;

      let imgWidth: number;
      let imgHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (slideAspectRatio > pageAspectRatio) {
        // Slide is wider - fit to width
        imgWidth = A4_WIDTH;
        imgHeight = A4_WIDTH / slideAspectRatio;
        offsetY = (A4_HEIGHT - imgHeight) / 2;
      } else {
        // Slide is taller - fit to height
        imgHeight = A4_HEIGHT;
        imgWidth = A4_HEIGHT * slideAspectRatio;
        offsetX = (A4_WIDTH - imgWidth) / 2;
      }

      // Add new page for each slide (except the first)
      if (i > 0) {
        pdf.addPage([A4_WIDTH, A4_HEIGHT], 'portrait');
      }

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', offsetX, offsetY, imgWidth, imgHeight, undefined, 'FAST');
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

