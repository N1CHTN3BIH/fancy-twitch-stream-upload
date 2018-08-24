
var ini = function(){

    var localName = localStorage.getItem('name');
    var localColor = localStorage.getItem('color');
    var localDuration = localStorage.getItem('duration');
    var localImage = localStorage.getItem('image');

    if(localName){
        $('#name').val(localName);
    }

    if(localColor){
        $('#color').val(localColor);
    }

    if(localDuration){
        $('#duration').val(localDuration);
    }

    if(localImage){
        $('#image').val(localImage);
    }

    if(!localStorage){
        $('#reset').hide();
    }else{
        $('#reset').show();
    }

}


var getSavedDesigns = function(){
    var ls = localStorage.myDesigns;
    var array = JSON.parse(ls);

    var match = $('#name').val() && $('#color').val() && $('#duration').val() && $('#image').val()

    if(match){
        var newHTML = [];
        $.each(array, function(index, value) {
            newHTML.push('<li><a href="' + value.url + '" target=_blank>' + value.name + '</a> <span id="' + index + '" style="float: right; cursor: pointer;"></span></li>');
        });
        $(".element").html(newHTML.join("")); 
    }

}

$('#kill').on("click", function(){
    localStorage.clear();
    location.reload();
});

$('#save').on('click', function(){

    var name = $('#name').val();
    var color = $('#color').val();
    var duration = $('#duration').val();
    var image = $('#image').val();

    localStorage.setItem('name', name);
    localStorage.setItem('color', color);
    localStorage.setItem('duration', duration);
    localStorage.setItem('image', image);

    var url = '/fancy-twitch-stream-upload/index.html?customsettings' + '&' + name + '&' + color + '&' + image + '&' + duration;


    if(name.length >=1 && color.length >=1  && duration.length >=1  && image.length >=1 ){
        $('#link').html('<a href="' + url + '" target=_blank>' + name + ' < template, click here </a>');
        $('#error').html(' ');
    }else{
        $('#link').html(' ')
        $('#error').html('Please fill all the inputs..');
    }

    function addEntry() {
        var match = $('#name').val() && $('#color').val() && $('#duration').val() && $('#image').val()
        var existingEntries = JSON.parse(localStorage.getItem("myDesigns"));
        if(existingEntries == null) existingEntries = [];
        var nameDesign = name;
        var urlDesign = url;
        var entry = {
            "name": nameDesign,
            "url": urlDesign
        };        

        if(match){
            localStorage.setItem("entry", JSON.stringify(entry));
            existingEntries.push(entry);
            localStorage.setItem("myDesigns", JSON.stringify(existingEntries));
        }
    };

    addEntry();
    ini();
    getSavedDesigns();

});

ini();
getSavedDesigns();
