function createGridBox(color, DOMParentID, type) {
    var cssClass = matchCssStyle(color);
    var buttonTag = '<input type="button" value="" class="' + cssClass + ' ' + type + '" />';
    var buttonElement = $(buttonTag);
    buttonElement.appendTo($("#" + DOMParentID));
    return buttonElement;
}

function lineBreak(tag) {
    var $input = $('<br/>');
    $input.appendTo($("#" + tag));
}

function matchCssStyle(color) {
    switch (color) {
        case 'b':
            cssClass = "blueBox";
            break;
        case 'g':
            cssClass = "greenBox";
            break;
    }
    return cssClass;
}

function loadMainGrid(grid, tag) {

    $(grid).each(function (rowIndex, row) {
        $(row).each(function (columnIndex, element) {
            var button = createGridBox(element, tag, "puzzleBox");
            button.attr('id', rowIndex + '-' + columnIndex);
        })
        lineBreak(tag);
    })
}

function findDistinctColors(grid) {
    var colors = [];
    $(grid).each(function (index, row) {
        $(row).each(function (columnIndex, element) {
            if (($.inArray(element, colors)) == -1)
                colors.push(element)
        })
    })
    return colors;
}

function loadColorPalette(distinctColors) {
    $(distinctColors).each(function (index, color) {
        createGridBox(color, "colorPalette", "paletteBox");
    })
}


function setSelectedColor() {
    $('.paletteBox').on('click', function () {
        var classes = $(this).attr('class').split(' ');
        $('.paletteBox').removeClass('selected');
        $(this).addClass('selected');
        globalVar.selectedColor = classes[0];
    })
}

function onGridClick() {
    $('.puzzleBox').on('click', function () {
        if (globalVar.selectedColor.length == 0)
            alert('Please select a color from the palette');
        else {
            selectedBoxId = $(this).attr('id');
            listOfNeighbours = find4Neighbours(selectedBoxId);
            neighboursOfSameColor = filteredNeighbors(selectedBoxId, listOfNeighbours);
            

        }
    })
}

function find4Neighbours(selectedBoxId) {
    var currentRowIndex = parseInt(selectedBoxId.split('-')[0]);
    var currentColumnIndex = parseInt(selectedBoxId.split('-')[1]);

    var neighboringRows = [];
    var rowUp = currentRowIndex - 1;
    var rowDown = currentRowIndex + 1;
    if (isWithinArrayBounds(rowUp))
        neighboringRows.push(rowUp);
    if (isWithinArrayBounds(rowDown))
        neighboringRows.push(rowDown);

    var neighboringColumns = [];
    var columnRight = currentColumnIndex + 1;
    var columnLeft = currentColumnIndex - 1;
    if (isWithinArrayBounds(columnRight))
        neighboringColumns.push(columnRight);
    if (isWithinArrayBounds(columnLeft))
        neighboringColumns.push(columnLeft);

    var neighbors = [];

    $.each(neighboringRows, function (rowIndex, rowValue) {
        neighbors.push(rowValue + "-" + currentColumnIndex)
    })

    $.each(neighboringColumns, function (columnIndex, columnValue) {
        neighbors.push(currentRowIndex + "-" + columnValue)
    })

    return neighbors;
}

function isWithinArrayBounds(index) {
    return (index >= 0 && index < globalVar.size)
}

function filteredNeighbors(selectedBoxId, listOfNeighbours) {
    var color = $('#' + selectedBoxId).attr('class').split(' ')[0];
    alert('current color = ' + color);
    var filteredNeighbors = [];
    $.each(listOfNeighbours, function (index, boxID) {
        var neighborColor = $('#' + boxID).attr('class').split(' ')[0];
        if (neighborColor == color)
            filteredNeighbors.push(boxID);
    })
    return filteredNeighbors;
}

