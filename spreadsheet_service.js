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


























