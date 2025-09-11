import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ExportButton = ({ currentViewData, allData, signature }) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "documents");
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  };

  const exportToPDF = (data, fileName) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Titre
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("documents REPORT", pageWidth / 2, 20, { align: "center" });
    
    // Date
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date d'export: ${currentDate}`, pageWidth / 2, 28, { align: "center" });
    
    // Nombre d'enregistrements
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nombre d'enregistrements: ${data.length}`, pageWidth / 2, 34, { align: "center" });
    
    // Tableau
    const headers = [['Nom', 'Decription']];
    const tableData = data.map(item => [
      item.name || '',
      item.description || '',
    ]);
    
    autoTable(doc, {
      head: headers,
      body: tableData,
      startY: 40,
      styles: { 
        cellPadding: 3, 
        fontSize: 10, 
        font: 'helvetica',
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }, 
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
      didDrawPage: function(data) {
        // Pied de page
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const pageNumber = `Page ${doc.internal.getNumberOfPages()}`;
        doc.text(pageNumber, pageWidth - 20, doc.internal.pageSize.getHeight() - 10);
        
        doc.setFontSize(8);
        doc.text("© " + new Date().getFullYear() + " - Système de gestion des paygrades", 15, doc.internal.pageSize.getHeight() - 10);
        
        // Ajout de la signature si elle existe
        if (signature) {
          const signatureHeight = 15; // Hauteur de la signature en mm
          const signatureWidth = 50; // Largeur de la signature en mm
          const signatureX = pageWidth - signatureWidth - 20; // Position X (à droite)
          const signatureY = doc.internal.pageSize.getHeight() - 30; // Position Y (au-dessus du pied de page)
          
          // Ajout de l'image de signature
          doc.addImage(signature, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
          
          // Ligne pour la signature
          doc.setDrawColor(150, 150, 150);
          doc.line(signatureX, signatureY + signatureHeight + 2, signatureX + signatureWidth, signatureY + signatureHeight + 2);
          
          // Texte "Signature électronique"
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text("Signature électronique", signatureX + signatureWidth/2, signatureY + signatureHeight + 5, { align: "center" });
        }
      }
    });
    
    // Filigrane
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(60);
      doc.setTextColor(245, 245, 245);
      doc.text("", pageWidth / 2, doc.internal.pageSize.getHeight() / 2, {
        align: "center",
        angle: 45
      });
    }
    
    doc.save(`${fileName}.pdf`);
  };

  const handleExport = (format, scope) => {
    const dataToExport = scope === 'view' ? currentViewData : allData;
    const fileName = scope === 'view' ? 'documents_current_page' : 'documents_all_data';
    
    const filteredData = dataToExport.map(item => ({
      name: item.name || 'N/A',
      description: item.description || 'N/A',
    }));
    
    format === 'excel' ? exportToExcel(filteredData, fileName) : exportToPDF(filteredData, fileName);
    setShowExportDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowExportDropdown(!showExportDropdown)}
        className="p-2 rounded-md !bg-white dark:!bg-[#1a202c] text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:!bg-gray-800 flex items-center transition-colors duration-200"
        title="Export options"
      >
        <FiDownload className="mr-1" />
        Export
      </button>
      
      {showExportDropdown && (
        <div className="absolute right-0 mt-2 w-48 !bg-white dark:!bg-[#1a202c] rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
          <div className="py-1">
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
              Export Current View
            </div>
            <button 
              onClick={() => handleExport('excel', 'view')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Excel (Current View)
            </button>
            <button 
              onClick={() => handleExport('pdf', 'view')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              PDF (Current View)
            </button>
            
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-600">
              Export All Data
            </div>
            <button 
              onClick={() => handleExport('excel', 'all')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Excel (All Data)
            </button>
            <button 
              onClick={() => handleExport('pdf', 'all')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              PDF (All Data)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;