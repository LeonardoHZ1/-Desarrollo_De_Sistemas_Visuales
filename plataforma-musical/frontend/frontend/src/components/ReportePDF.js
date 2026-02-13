import jsPDF from "jspdf";
import "jspdf-autotable";

export const generarReportePDF = (data, tipo) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(`Reporte de ${tipo}`, 14, 20);

  const columns = ["ID", "Título/Nombre", "Detalle"];
  const rows = data.map(item => [
    item._id.slice(-6),
    item.title || item.name,
    item.artist || item.email
  ]);

  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 30,
  });

  doc.save(`Reporte_${tipo}.pdf`);
};