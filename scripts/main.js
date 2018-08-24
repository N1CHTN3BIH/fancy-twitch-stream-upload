$( document ).ready(function() {


var firstVisit = localStorage.getItem("firstVisit");

if(!firstVisit){
	window.location.href = "admin.html";
}

//Hex manipulator
var pSBC = function (p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(to&&typeof(to)!="string"))return null; //ErrorCheck
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let l=d.length,RGB={};
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].split("(")[1]),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 or 4 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=-1;
            if(l==9||l==5)RGB[3]=r((RGB[2]/255)*10000)/10000,RGB[2]=RGB[1],RGB[1]=RGB[0],RGB[0]=d>>24&255;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.pSBCr(from),t=this.pSBCr(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb"+(f[3]>-1||t[3]>-1?"a(":"(")+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+r((t[0]-f[0])*p+f[0])*0x1000000+r((t[1]-f[1])*p+f[1])*0x10000+r((t[2]-f[2])*p+f[2])*0x100+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)).toString(16).slice(1,f[3]>-1||t[3]>-1?undefined:-2);
}


	var dataChunk = window.location.href.split('&');
	//HELLO DEAR TWITCH USER. Yes, right, you can change your headline and color down below :-) Have fun!
	//You don't have to give me credits, but I would apreciate it. A follow on twitch would be awesome too. Have fun with the countdown. :-)
	var headline = decodeURI(dataChunk[1]);
	// PLEASE ONLY HEX CODES! Use: http://www.color-hex.com/ and notice: your progressbar, font-shadow and background will be generated by 1 color!
	var backgroundColorProgressBar = '#' + dataChunk[2]; // CHANGE THIS COLOR, don't forget the hash (#);
	var color = pSBC(-0.8, backgroundColorProgressBar);
	var backgroundImage = dataChunk[3];

	$('html').css('background-image', 'url(' + backgroundImage + ')');


	//Below this, only for developers - I know its not best practise, but its working though. 

	var stringToNumber = dataChunk[4] + '00';
	var streamValue = parseInt(stringToNumber);
	$('#progressBar').css('background-color', color);
	$('.layer').css('background-color', backgroundColorProgressBar);

	$('.text-style-retro').html(headline).css('text-shadow', '2px 2px ' + backgroundColorProgressBar);

	function progress(timeleft, timetotal, $element) {
		var progressBarWidth = (timetotal-timeleft) * ($element.width()/timetotal);
		$element.find('div').animate({ width: progressBarWidth }, 200).css('background-color', backgroundColorProgressBar);


		if(timeleft > 0) {
			setTimeout(function() {
				progress(timeleft - 1, timetotal, $element);
			}, 1000);
		}

		var number1 = timetotal - timeleft;
		var number2 = timetotal;

		var percentageTime = (Math.floor((number1 / number2) * 100)); //w00t!

		$('#percentageTime').html(percentageTime + '%');

		if (percentageTime === 100) {
			$('.loading').fadeOut(function(){
				$('.finished').fadeIn();
			});
		}


	};

	progress(streamValue, streamValue, $('#progressBar'));

});
