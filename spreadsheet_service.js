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