function createGridBox(color) {
    var cssClass;
    if (color == 'b')
        cssClass = "blueBox"
    else
        cssClass = "greenBox";
    var buttonTag = '<input type="button" value="" class="'+cssClass+'" />';
    var $input = $(buttonTag);
    $input.appendTo($("body"));
}

function lineBreak() {
    var $input = $('<br/>');
    $input.appendTo($("body"));
}