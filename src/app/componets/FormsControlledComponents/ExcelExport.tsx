import * as XLSX from "xlsx";

function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
}

function download_excel_file(workbook: XLSX.WorkBook, fileName: string) {
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
    });

    const blob = new Blob([s2ab(excelBuffer)], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default function export_to_excel(
    listToImport: any[],
    headers: string[],
    fileName: string
) {
    const worksheet = XLSX.utils.json_to_sheet(listToImport, { header: headers });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    download_excel_file(workbook, fileName);
}