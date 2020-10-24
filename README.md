# voting-vg
Vote counting React.js app for Västgöta Nation, Lund. 

Hosted at: https://davidjungermann.com/voting-vg/

A user can supply a .xlsx file containing unique voting codes, as well as a .xlsx file containing the actual votes, where each separate vote is tied to a specific voting code. The application will the tally the votes, and display the values. If something is incorrect, eg. incorrent number of votes in relation to votees or incorrect voting codes, the application will display the error, along with the affected votes, so that the error can be corrected. 

Built using React.js, Firebase Storage and Excel.js. 
