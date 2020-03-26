const Excel = require('exceljs');

async function initWorksheet(path) {
    let voting_workbook = new Excel.Workbook();
    return await voting_workbook.xlsx.readFile(path);
}

async function initVotes() {
    let codes = [];
    const workbook = await initWorksheet("../../test.xlsx");
    workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
    return codes.slice(1);
}

async function initReferenceCodes() {
    let referenceCodes = [];
    const workbook = await initWorksheet("../../voting_codes.xlsx");
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

function getColumnHeaders() {
    
}
compareVotingCodes();
