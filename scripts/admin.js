
$('#save').on('click', function(){

    var name = $('#name').val();
    var color = $('#color').val();
    var duration = $('#duration').val();
    var image = $('#image').val();

    var url = '/fancy-twitch-stream-upload/index.html?customsettings' + '&' + name + '&' + color + '&' + image + '&' + duration; 

    if(name.length >=1 && color.length >=1  && duration.length >=1  && image.length >=1 ){
            $('#link').html('<a href="' + url + '" target=_blank>' + url + '</a>');
            $('#error').html(' ');
    }else{
            $('#link').html(' ')
            $('#error').html('Please fill all the inputs..');
    }
});
