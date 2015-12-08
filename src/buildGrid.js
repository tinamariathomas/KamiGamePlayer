function createGridBox(color) {
    var cssClass = matchCssStyle(color);
    var buttonTag = '<input type="button" value="" class="' + cssClass + '" />';
    var $input = $(buttonTag);
    $input.appendTo($("body"));
}

function lineBreak() {
    var $input = $('<br/>');
    $input.appendTo($("body"));
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

function loadMainGrid(grid){
    $(grid).each(function (rowIndex, row) {
        $(row).each(function (columnIndex, element) {
            createGridBox(element);
        })
        lineBreak();

    })
}