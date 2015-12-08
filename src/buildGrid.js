function createGridBox(color, tag) {
    var cssClass = matchCssStyle(color);
    var buttonTag = '<input type="button" value="" class="' + cssClass + '" />';
    var $input = $(buttonTag);
    $input.appendTo($("#" + tag));
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
            createGridBox(element, tag);
        })
        lineBreak(tag);
    })
}

function findDistinctColors(grid) {
    var colors = [];
    $(grid).each(function (index, row) {
        $(row).each(function (columnIndex, element) {
            if (($.inArray(element, colors))==-1)
                colors.push(element)
        })
    })
    return colors;
}

function loadColorPalette(distinctColors){
    $(distinctColors).each(function(index,color){
        createGridBox(color,"colorPalette");
    })
}