var currentColumn = 1;

        function showColumn(columnNumber) {
            // Hide all columns
            for (var i = 1; i <= 5; i++) {
                document.getElementById('column' + i).style.display = 'none';
                document.getElementById('column' + i + 'Btn').classList.remove('highlight');
            }

            // Show the selected column
            var column = document.getElementById('column' + columnNumber);
            column.style.display = 'flex';

            // Apply flex styles only to certain columns
            if (columnNumber === 2) {
                column.style.flexDirection = 'row';
                column.style.flexWrap = 'wrap';
                column.style.justifyContent = 'space-evenly';
            }
            else if (columnNumber === 1) {
                column.style.justifyContent = 'center';
                column.style.alignItems = 'center';
            }
            else if (columnNumber === 3 || columnNumber === 4 || columnNumber === 5) {
                column.style.flexDirection = 'column';
                column.style.justifyContent = 'center';
                column.style.alignItems = 'center';
            }

            // Highlight the current button
            document.getElementById('column' + columnNumber + 'Btn').classList.add('highlight');

            currentColumn = columnNumber;
        }

        function showNextColumn() {
            // Increment current column number
            currentColumn++;

            // If the current column exceeds the total number of columns, reset to the first column
            if (currentColumn > 5) {
                currentColumn = 1;
            }

            // Show the current column
            showColumn(currentColumn);
        }

        // Initially, show the first column
        showColumn(1);