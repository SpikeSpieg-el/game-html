var currentColumn = 1;

function showColumn(columnNumber) {
    // Hide all columns
    for (var i = 1; i <= 3; i++) {
        document.getElementById('column' + i).style.display = 'none';
    }

    // Show the selected column
    document.getElementById('column' + columnNumber).style.display = 'block';

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
