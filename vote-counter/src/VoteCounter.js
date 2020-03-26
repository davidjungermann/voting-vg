const Excel = require('exceljs');

async function initWorkbook(path) {
    let voting_workbook = new Excel.Workbook();
    return await voting_workbook.xlsx.readFile(path);
}

async function initVotes() {
    let codes = [];
    const workbook = await initWorkbook("../../test.xlsx");
    workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
    return codes.slice(1);
}

async function initReferenceCodes() {
    let referenceCodes = [];
    const workbook = await initWorkbook("../../voting_codes.xlsx");
    workbook.getWorksheet().getColumn("B").eachCell(content => referenceCodes.push(content.text));
    return referenceCodes;
}

async function compareVotingCodes() {
    let previousVoters = [];
    let codes = await initVotes();
    let referenceCodes = await initReferenceCodes();

    codes.forEach(code => {
        if (referenceCodes.includes(code)) {
            previousVoters.push(code);
            console.log("Valid vote: " + code);
            referenceCodes = referenceCodes.filter(x => x !== code);
        } else if (previousVoters.includes(code)) {
            console.log("Invalid vote, has voted more than once: " + code);
        } else {
            console.log("Invalid vote, not registered as a voter: " + code);
        }
    });
}

async function getElections() {
    var columnHeaders = {};
    const workbook = await initWorkbook("../../test.xlsx");
    workbook.getWorksheet().getRow(1).eachCell(content => {
        if (content.text !== "Tidstämpel" && content.text !== "Valkod") {
            columnHeaders[content.text] = [];
        }
    });
    return columnHeaders;
}

async function countVotes() {
    const workbook = await initWorkbook("../../test.xlsx");
    let worksheet = workbook.getWorksheet();
    var elections = await getElections();
    for (i = 3; i <= worksheet.actualColumnCount; i++) {
        worksheet.getColumn(i).eachCell(cell => {

            for (prop in elections) {
                if (cell.text.startsWith(prop)) {
                    console.log(prop + " har följande röster: " + cell.text)
                }
            }
        });
    }
    console.log(elections);
}

countVotes();