const Excel = require('exceljs');

function compareVotingCodes() {
    let voting_workbook = new Excel.Workbook();
    let reference_workbook = new Excel.Workbook();
    var codes = [];
    var referenceCodes = [];

    voting_workbook.xlsx.readFile("../../test.xlsx").then(workbook => {
        workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
        codes = codes.slice(1);
    });

    reference_workbook.xlsx.readFile("../../voting_codes.xlsx").then(workbook => {
        workbook.getWorksheet().getColumn("B").eachCell(content => referenceCodes.push(content.text));
    }).then(() => {
        codes.forEach(code => {
            if (referenceCodes.includes(code)) {
                console.log("Valid vote: " + code);
                referenceCodes = referenceCodes.filter(x => x !== code);
            } else {
                console.log("Invalid vote: " + code);
            }
        });
    });
}
compareVotingCodes();
