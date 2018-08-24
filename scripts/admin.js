
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

ini();

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
        $('#link').html('<a href="' + url + '" target=_blank>' + url + '</a>');
        $('#error').html(' ');
    }else{
        $('#link').html(' ')
        $('#error').html('Please fill all the inputs..');
    }
    ini();
});
