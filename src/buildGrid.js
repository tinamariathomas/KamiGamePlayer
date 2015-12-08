function createGridBox(color){
	if(color=='b')
		var $cssClass = "blueBox"
	else
		var $cssClass =""



    var $input = $('<input type="button" value="" class="blueBox" />');
    $input.appendTo($("body"));
}

function lineBreak(){
	var $input = $('<br/>');
    $input.appendTo($("body"));
}