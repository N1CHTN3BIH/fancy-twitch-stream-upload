
var ini = function(){

    var localName = localStorage.getItem('name');
    var localColor = localStorage.getItem('color');
    var localDuration = localStorage.getItem('duration');
    var localImage = localStorage.getItem('image');
    var localProgressTextLoading = localStorage.getItem('uploadRunning');
    var localProgressFinished = localStorage.getItem('uploadFinished');

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

    if(localProgressTextLoading){
        $('#uploadRunning').val(localProgressTextLoading);
    }

    if(localProgressFinished){
        $('#uploadFinished').val(localProgressFinished);
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

$('button#save').on("click", function(){

    var name = $('#name').val();
    var color = $('#color').val();
    var duration = $('#duration').val();
    var image = $('#image').val();
    var uploadRunning = $('#uploadRunning').val();
    var uploadFinished = $('#uploadFinished').val();

    localStorage.setItem('name', name);
    localStorage.setItem('color', color);
    localStorage.setItem('duration', duration);
    localStorage.setItem('image', image);
    localStorage.setItem('uploadRunning', uploadRunning);
    localStorage.setItem('uploadFinished', uploadFinished);

    var url = '/fancy-twitch-stream-upload/index.html?customsettings' + '&' + name + '&' + color + '&' + image + '&' + duration + '&' + uploadFinished + '&' + uploadRunning;


    if(name.length >=1 && color.length >=1  && duration.length >=1  && image.length >=1 && uploadRunning.length >=1 && uploadFinished.lenght >=1){
        $('#link').html('<a href="' + window.getLatestUrl + '" target=_blank>' + name + ' < template, click here </a>');
        $('#error').html(' ');
    }else{
        $('#link').html(' ')
        $('#error').html('Please fill all the inputs..');
    }

    function addEntry() {
        var match = $('#name').val() && $('#color').val() && $('#duration').val() && $('#image').val() && $('#uploadRunning').val() && $('#uploadFinished').val()
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

    window.getLatestUrl = url;

    addEntry();
    ini();
    getSavedDesigns();
    generateUrlIFrame();
    iFrame();
    localStorage.setItem("firstVisit", false);

});


var iFrame = function(){


    if(window.getLatestUrl){
        $('.iframe').html('<iframe src="' + window.getLatestUrl + '" id="myFrame" frameborder="0" scrolling="yes" style="width: 1280px; height: 720px;"></iframe>')
    }

};

var generateUrlIFrame = function(){
    var parse = JSON.parse(localStorage.myDesigns);
    window.getLatestUrl = parse[parse.length -1].url;
};

generateUrlIFrame();



iFrame();
ini();
getSavedDesigns();
