var currentColumn = 1;

function showColumn(columnNumber) {
    // Hide all columns
    for (var i = 1; i <= 3; i++) {
        document.getElementById('column' + i).style.display = 'none';
    }

    // Show the selected column
    var column = document.getElementById('column' + columnNumber);
    column.style.display = 'flex';
    
    // Apply flex styles only to the second column
    if (columnNumber === 2) {
        column.style.flexDirection = 'row';
        column.style.flexWrap = 'wrap';
        column.style.justifyContent = 'space-evenly';
    }
    if (columnNumber === 1) {
        
        column.style.flexWrap = 'wrap';
        column.style.justifyContent = 'space-berween';
        column.style.alignitems = 'center';
    }

    currentColumn = columnNumber;
}

function showNextColumn() {
    // Increment current column number
    currentColumn++;

    // If current column exceeds the total number of columns, reset to the first column
    if (currentColumn > 3) {
        currentColumn = 1;
    }

    // Show the current column
    showColumn(currentColumn);
}

// Initially, show the first column
showColumn(1);
