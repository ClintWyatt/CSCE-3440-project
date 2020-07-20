const numRows = 39;
const numCols = 58;
var table = '<table id="graph">';

for (i = 0; i < numRows; i++) {
  table += "<tr>";
  for (j = 0; j < numCols; j++) {
    table += '<td class="redOnHover blueOnClick greenOnInactive" onclick="changeSelected(this)"></td>';
  }
  table += "</tr>";
}
table += "</table>";

document.write(table);