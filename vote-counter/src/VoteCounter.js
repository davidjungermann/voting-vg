const Excel = require("exceljs");

async function initWorkbook(path) {
  let voting_workbook = new Excel.Workbook();
  return await voting_workbook.xlsx.readFile(path);
}

async function initVotes() {
  let codes = [];
  const workbook = await initWorkbook("../../test.xlsx");
  workbook
    .getWorksheet()
    .getColumn("B")
    .eachCell((content) => codes.push(content.text));
  return codes.slice(1);
}

async function initReferenceCodes() {
  let referenceCodes = [];
  const workbook = await initWorkbook("../../voting_codes.xlsx");
  workbook
    .getWorksheet()
    .getColumn("A")
    .eachCell((content) => referenceCodes.push(content.text));
  return referenceCodes;
}

async function compareVotingCodes() {
  let previousVoters = [];
  let codes = await initVotes();
  let referenceCodes = await initReferenceCodes();

  codes.forEach((code) => {
    if (referenceCodes.includes(code)) {
      previousVoters.push(code);
      console.log("Valid vote: " + code);
      referenceCodes = referenceCodes.filter((x) => x !== code);
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
  workbook
    .getWorksheet()
    .getRow(1)
    .eachCell((content) => {
      if (content.text !== "Tidstämpel" && content.text !== "Valkod") {
        columnHeaders[content.text] = [];
      }
    });
  return columnHeaders;
}

async function getVotes() {
  const workbook = await initWorkbook("../../test.xlsx");
  let worksheet = workbook.getWorksheet();
  let electionVotes = await getElections();
  for (i = 3; i <= worksheet.actualColumnCount; i++) {
    worksheet.getColumn(i).eachCell((cell) => {
      for (let prop in electionVotes) {
        if (cell.text.startsWith(prop)) {
          let votes = electionVotes[prop];
          votes.push(cell.text);
          electionVotes[prop] = votes;
        }
      }
    });
  }
  for (let prop in electionVotes) {
    electionVotes[prop].shift();
  }
  return electionVotes;
}

async function countVotes() {
  const votes = await getVotes();
  const results = {};
  for (let prop in votes) {
    votes[prop].map((vote) => {
      vote = vote.split(",");
      vote.forEach((vote) => {
        results[vote.trim()] = results[vote.trim()] + 1 || 1;
      });
    });
  }
  return results;
}

async function getElectionResults() {
  var isValid = await compareVotingCodes();
  var finalResults = await countVotes();
  console.log(finalResults);
}

getElectionResults();
