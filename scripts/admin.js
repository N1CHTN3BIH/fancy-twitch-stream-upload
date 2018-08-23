var select = document.querySelector("#optionsId");
var selectOption = select.options[select.selectedIndex];
var lastSelected = localStorage.getItem('streamValue');

if(lastSelected) {
    select.value = lastSelected; 
}else{
    localStorage.setItem('streamValue', 500);
}



$('#save').on('click', function(){

    var value = $( "#optionsId option:selected" ).val();
    
    localStorage.setItem('streamValue', value);

    lastSelected = value;


    select.onchange = function () {
     lastSelected = select.options[select.selectedIndex].value;
     console.log(lastSelected);
     localStorage.setItem('streamValue', lastSelected);
 }

});


function store_data() {

    var img = new Image();
    img.src =  URL; //js global var

    img.onload = function( ) {

        var canvas  =  document.getElementById( 'myCanvas'); 
        canvas.setAttribute( "width", img.width );
        canvas.setAttribute( "height", img.height );

        var context  =  canvas.getContext( '2d' );
        context.drawImage( img, 0, 0 );
        canvas.style.width = "100%"; 
        var data = canvas.toDataURL("image/png");
        localStorage.setItem( "data", data );
    }

}