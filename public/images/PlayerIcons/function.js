function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function showPop(data1,data2){

	switch (data1){
    	case "box":        	
            var elem;
            var box;
            var show=true;
            if(data2=="home"){
            	elem = document.getElementById('box_home');
                box = document.getElementById('boxh');
                if (elem.style.backgroundColor=="darkgrey")
                	show=false;
                popHider('home');
            }
            if(data2=="away"){
            	elem = document.getElementById('box_away');
                box = document.getElementById('boxa');
                if (elem.style.backgroundColor=="darkgrey")
                	show=false;
                popHider('away');
            }
            
            if (show) {
				box.style.visibility='visible';
                elem.style.backgroundColor="darkgrey";
           	}
            break;
        case "out":
        	var elem;
            var box;
            var show=true;
            if(data2=="home"){
            	elem = document.getElementById('out_home');
                box = document.getElementById('outh');
                if (elem.style.backgroundColor=="darkgrey")
                	show=false;
                popHider('home');
            }
            if(data2=="away"){
            	elem = document.getElementById('out_away');
                box = document.getElementById('outa');
                if (elem.style.backgroundColor=="darkgrey")
                	show=false;
                popHider('away');
            }
            
            if (show) {
				box.style.visibility='visible';
                elem.style.backgroundColor="darkgrey";
           	}
            break;        
            case "stat":
        	break;
        default:
        	break;
    }
}

function popHider(data){
	if(data=='home'){
    	document.getElementById('box_home').style.backgroundColor="grey";
        document.getElementById('out_home').style.backgroundColor="grey";
		document.getElementById('boxh').style.visibility='hidden';
    	document.getElementById('outh').style.visibility='hidden';
    }
    if(data=='away'){
    	document.getElementById('box_away').style.backgroundColor="grey";
        document.getElementById('out_away').style.backgroundColor="grey";
    	document.getElementById('boxa').style.visibility='hidden';
    	document.getElementById('outa').style.visibility='hidden';
	}
}

function populate(data1,array){
	switch(data1){
    	case 'home':
        	var elem;
            //sta cosa la farebbe un ciclo for
            elem = document.getElementById('bh0.0');
            elem.innerHTML = "<img src='./Images/PlayerIcons/"+ array[0]->Img +"' id='"+ array[0]->ID+ "' onmouseover='' />";
        break;
        case 'away':
        break;
        default:
        break;
    }
}