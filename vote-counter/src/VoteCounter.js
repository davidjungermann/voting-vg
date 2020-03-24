async function readFile() {
    const Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile("../../test.xlsx").then(workbook => {
        var test = workbook.getWorksheet()
        console.log(test.getColumn("B").eachCell(content => console.log(content.text)));
    }
    );
}
readFile();
