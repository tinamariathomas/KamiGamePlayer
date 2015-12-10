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
        var button = createGridBox(color, "colorPalette", "paletteBox");
        button.attr('id', color);
    })
}


function setSelectedColor() {
    $('.paletteBox').on('click', function () {
        $('.paletteBox').removeClass('selected');
        $(this).addClass('selected');

        globalVar.selectedColor = getCssColorClass($(this).attr('id'));
    })
}

function onGridClick() {
    $('.puzzleBox').on('click', function () {
        if (globalVar.selectedColor.length == 0)
            alert('Please select a color from the palette');
        else {
            var baseColor = getCssColorClass($(this).attr('id'));
            if (globalVar.selectedColor != baseColor) {

                globalVar.numberOfClicks = globalVar.numberOfClicks + 1;
                $('#numberOfClicks').text(globalVar.numberOfClicks);
                var selectedBoxId = []
                var nextBoxes = []

                selectedBoxId.push($(this).attr('id'));
                do {
                    $.each(selectedBoxId, function (index, boxID) {
                        nextBoxes = nextBoxes.concat(updateColor(boxID, baseColor))
                    })
                    selectedBoxId = nextBoxes;
                    nextBoxes = [];
                } while (selectedBoxId.length > 0);
            }
        }
        var isDone = isGridASingleColor();
        if (isDone == true)
            alert("Game finished : Number of moves taken = " + globalVar.numberOfClicks);
    })
}

function updateColor(selectedBoxId, baseColor) {
    listOfNeighbours = find4Neighbours(selectedBoxId);

    neighboursOfSameColor = filteredNeighbors(listOfNeighbours, baseColor);
    $('#' + selectedBoxId).removeClass(getCssColorClass(selectedBoxId))
    $('#' + selectedBoxId).addClass(globalVar.selectedColor)

    $.each(neighboursOfSameColor, function (index, boxID) {
        $('#' + boxID).removeClass(getCssColorClass(boxID))
        $('#' + boxID).addClass(globalVar.selectedColor)

    })
    return neighboursOfSameColor;
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

function filteredNeighbors(listOfNeighbours, baseColor) {
    var filteredNeighbors = [];
    $.each(listOfNeighbours, function (index, boxID) {
        if ($('#' + boxID).hasClass(baseColor))
            filteredNeighbors.push(boxID);
    })
    return filteredNeighbors;
}

function getCssColorClass(selectedBoxId) {
    var availableStyleColors = ['blueBox', 'greenBox'];
    var classes = $('#' + selectedBoxId).attr('class').split(' ');
    var color = '';
    $.each(classes, function (index, styleClass) {
        if ($.inArray(styleClass, availableStyleColors) > -1)
            color = styleClass;
    })
    return color;
}

function isGridASingleColor() {
    var allColors = []
    $('.puzzleBox').each(function () {
        var currentColor = getCssColorClass($(this).attr('id'));
        if ($.inArray(currentColor, allColors) == -1)
            allColors.push(currentColor);
    })
    return (allColors.length==1);
}
