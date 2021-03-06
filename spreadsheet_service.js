// get name of spreadsheet

function getName(){

    const ss = SpreadsheetApp.getActive();
    const name = ss.getName();

    Logger.log(name)

}

// get data out of spreadsheet

function getData(){

 const ss = SpreadsheetApp.getActive();
 const sheet = ss.getActiveSheet(); // Sheet the cursor is in
 const data = sheet.getDataRange();
 const values = data.getValues();
  
 Logger.log(values)

}

/**

[
[Fruit, Cost, Quantity],
[Apple, 0.86, 4.0],
[Banana, 0.82, 2.0],
[Pear, 0.52, 7.0],
[Watermelon, 1.74, 2.0],
[Kiwi, 0.99, 3.0],
[Strawberry, 0.4, 25.0]
]

*/


// get data out more directly
function getData2(){

  const sheet = SpreadsheetApp.getActiveSheet();
  Logger.log(sheet.getDataRange().getValues());

}

// get sheet by name
function getData3(){

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("Sheet1");
  
  Logger.log(sheet1.getDataRange().getValues());

}



// get active data
function getData4(){

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("Sheet1");
  
  const active = sheet1.getActiveRange().getValues();
  
  Logger.log(active);
  
  // [[Fruit, Cost], [Apple, 0.86]]

}


// get A1:C4 data
function getData5(){

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("Sheet1");
  
  const data = sheet1.getRange("A1:C4").getValues();

  Logger.log(data);
  
  // [[Fruit, Cost, Quantity], [Apple, 0.86, 4.0], [Banana, 0.82, 2.0], [Pear, 0.52, 7.0]]

}


// get range of data by coordinates
function getData6(){

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("Sheet1");

  const data = sheet1.getRange(1, 1, 4, 1).getValues();
  
  // [[Fruit], [Apple], [Banana], [Pear]]
  
  const data2 = sheet1.getRange(3, 1, 4, 3).getValues();
  
  Logger.log(data2);
  
  // [[Banana, 0.82, 2.0], [Pear, 0.52, 7.0], [Watermelon, 1.74, 2.0], [Kiwi, 0.99, 3.0]]

  
}



/*************************************************************************************/


// calculate total for each row

function calculateRowTotal() {

  var ss = SpreadsheetApp.getActive();
  var sheet1 = ss.getSheetByName("Sheet1");
  
  var data = sheet1.getRange(2, 1, 6, 3).getValues();
  
//   Logger.log(data);
  
  data.forEach(function(row) {
    
    // Logger.log(row); // [Apple, 0.86, 4.0]
    
    // Logger.log(row[0]);
    // Logger.log(row[1]);
    // Logger.log(row[2]);
    
    var name = row[0];
    var cost = row[1];
    var quantity = row[2];
    
    var total = cost * quantity;
    
    // Logger.log(total);
    Logger.log(name + ": $" + total);
    
  });

}



/*************************************************************************************/


// add total for each row to Google Sheet

function addRowTotals() {

  var ss = SpreadsheetApp.getActive();
  var sheet1 = ss.getSheetByName("Sheet1");
  var lastRow = sheet1.getLastRow();
  
  var data = sheet1.getRange(2, 1, lastRow - 1, 3).getValues();

  Logger.log(data); 
  
  /**
  
  [
    [Apple, 0.86, 4.0],
    [Banana, 0.82, 2.0],
    [Pear, 0.52, 7.0],
    [Watermelon, 1.74, 2.0],
    [Kiwi, 0.99, 3.0],
    [Strawberry, 0.4, 25.0]
  ]
  
  */
  
  var totalsArray = [];
  
  data.forEach(function(row) {

    var name = row[0];
    var cost = row[1];
    var quantity = row[2];

    var total = cost * quantity;
    
    row.push(total);
    
    totalsArray.push([total]);

    Logger.log(row);

  });

  Logger.log(totalsArray);
  
  // paste data back into sheet
  
  sheet1.getRange(2, 4, lastRow - 1, 1).setValues(totalsArray);

}


/**********************************************************************************/

//add a custom menu

function onOpen() {

  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu("Custom Menu")
    .addItem("Add Row Totals", "addRowTotals")
    .addItem("Add Grand Total", "grandTotal")
    .addItem("Format Table", "formatTable")
    .addItem("Add Chart", "addChart")  
    .addToUi();

}


/**********************************************************************************/


//add grand total row

function grandTotal(){

  var ss = SpreadsheetApp.getActive();
  var sheet1 = ss.getSheetByName("Sheet1");
  var lastRow = sheet1.getLastRow();
  var lastColumn = sheet1.getLastColumn();
  
  sheet1.getRange(lastRow + 1, 1).setValue("Total");
  sheet1.getRange(lastRow + 1, lastColumn).setFormula("=sum(D2:D" + lastRow + ")");

}



/**********************************************************************************/


//format table

function formatTable(){

  var ss = SpreadsheetApp.getActive();
  var sheet1 = ss.getSheetByName("Sheet1");
  var lastRow = sheet1.getLastRow();
  var lastColumn = sheet1.getLastColumn();
  var dataRange = sheet1.getDataRange();
  
  //apply orange banding, add header or footer
  dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE, true, true);
  
  //format the last column as $
  sheet1.getRange(2, lastColumn, lastRow - 1, 1).setNumberFormat("$0.00");
  
  //make the row total bold
  sheet1.getRange(lastRow, 1, 1, lastColumn).setFontWeight("bold");

}


//Add a chart!!

function addChart(){

  var ss = SpreadsheetApp.getActive();
  var sheet1 = ss.getSheetByName("Sheet1");
  var lastRow = sheet1.getLastRow();
  var lastColumn = sheet1.getLastColumn();
  
  var totalChartLabels = sheet1.getRange(1, 1, lastRow - 1, 1);
  var totalChartValues = sheet1.getRange(1, lastColumn, lastRow - 1, 1);
  
  var totalsChart = sheet1.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(totalChartLabels)
    .addRange(totalChartValues)
    .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
    .setPosition(1, 5, 0, 0)
    .setOption("title", "Total Fruit Chart")
    .setNumHeaders(1)
    .build();
  
  sheet1.insertChart(totalsChart);
  
  
  
  
/*  var dataRange = sheet1.getRange("A1:B9");
  
  Logger.log(dataRange.getValues());
  
  var myNewChart = sheet1.newChart();
  
  myNewChart.addRange(dataRange)
    .setChartType(Charts.ChartType.BAR)
    .setPosition(1, 5, 0, 0)
    .setNumHeaders(1)
    .setOption("title", "Fruit Chart");
  
  sheet1.insertChart(myNewChart.build());
*/

}




























