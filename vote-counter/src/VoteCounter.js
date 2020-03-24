const Excel = require('exceljs');

async function readFile() {
    let voting_workbook = new Excel.Workbook();
    voting_workbook.xlsx.readFile("../../test.xlsx").then(workbook => {
        var test = workbook.getWorksheet()
        console.log(test.getColumn("B").eachCell(content => console.log(content.text)));
    }
    );
}
readFile();
