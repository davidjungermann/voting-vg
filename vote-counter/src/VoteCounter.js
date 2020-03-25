const Excel = require('exceljs');

async function initVotes() {
    let voting_workbook = new Excel.Workbook();
    let codes = [];

    const workbook = await voting_workbook.xlsx.readFile("../../test.xlsx");
    workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
    return codes.slice(1);
}

async function initReferenceCodes() {
    let reference_workbook = new Excel.Workbook();
    let referenceCodes = [];

    const workbook = await reference_workbook.xlsx.readFile("../../voting_codes.xlsx");
    workbook.getWorksheet().getColumn("B").eachCell(content => referenceCodes.push(content.text));
    return referenceCodes;
}
async function compareVotingCodes() {
    let codes = await initVotes();
    let referenceCodes = await initReferenceCodes();

    codes.forEach(code => {
        if (referenceCodes.includes(code)) {
            console.log("Valid vote: " + code);
            referenceCodes = referenceCodes.filter(x => x !== code);
        } else {
            console.log("Invalid vote: " + code);
        }
    });
}
compareVotingCodes();
