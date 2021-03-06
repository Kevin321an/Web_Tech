var pSmall=5;
var pMedium= 10;
var pLarge= 15; 
var pXLarge= 20;
var pEachTopping = 0.50;
var pStuffedCrust = 2;
var taxOn=1.13;
var taxQB=1.149;
var taxMan=1.13;
var taxSa=1.1;


window.onload=function(){
	/*document.getElementById("submit").onclick=function(){
		
		
	}*/
};


//muliple select counter
function chMultiSelect(){
		var options = document.getElementById('topping').options, count = 0;
		for (var i=0; i < options.length; i++) {
		  if (options[i].selected) count++;
		}     
		
	return count;
};
//get value from province
function vOfprovince(pName){
var p= document.getElementById(pName);
	return p.options[p.selectedIndex].text;

}
// check the data from Radio
function chRadio(name){
	//alert(name);
	var type = document.getElementsByName(name);

	for (var i = 0, length = type.length; i < length; i++) {
    	if (type[i].checked) {
    		sizeValue=type[i].value;
       
        return sizeValue;
    		}
		}
		/*var size = document.getElementsByName('sizeOption');
		for (var i = 0, length = size.length; i < length; i++) {
    	if (size[i].checked) {
    		sizeValue=size[i].value;       
        break;
    		}
		}*/
};


//calculate the price
function subtotal(size, type, topping, province){
//alert(type);
var Ptype=(type==="STUFFED")?pStuffedCrust:0;

//alert(Ptype);

var PToping=(topping===0)?0:(0.5*(topping-1));
var taxRate= taxCalculate(province);
//alert(taxRate);
var total=(sizeCatch(size)+Ptype+PToping)*taxRate;

return Math.round(total * 100) / 100;

};


function sizeCatch(size){	

	switch(size){
		case "small":
		return pSmall;
		case "medium":
		return pMedium;
		case "large":
		return pLarge;
		case "XLarge":
		return pXLarge;	
		default:
	}

};

function taxCalculate(province){
	switch(province){
		case "Ontario":
		return taxOn;
		case "Quebec":
		return taxQB;
		case "Manitoba":
		return taxMan;
		case "Saskatchewan":
		return taxMan;
	}
}


 function checkForm(form)
  {   
  	if (!validation(form)) return false;
    	//get the value from left side
    var size=chRadio("sizeOption");
    if (!handleUndefined(size)) return false;
		var type=chRadio("typeOption");
		if (!handleUndefined(type)) return false;
		var toppingNum=(chMultiSelect());
		var province=vOfprovince("province");		

		var total= subtotal(size,type,toppingNum,province);
		

		//shoot the detail on the screen 
    alert("Your order detail: "+"\n" 
          +"Name: "+ form.name.value+"\n" 
          +"Street: "+ form.street.value+"\n" 
          +"Province: "+ form.province.value+"\n" 
          +"Telephone: "+ form.telephone.value+"\n" 
          +"Email: "+ form.email.value+"\n"          
          +"Pizza size: "+ size + "\n" 
          +"Pizza type: "+ type+"\n" 
          +"Number of Topping "+ toppingNum+"\n"
          +"Pizza type: "+ type+"\n" 
          +"Total: $"+ total+"\n" )



		  /*document.getElementById('errors').classList.remove('hidden');
		  document.getElementById("size").innerHTML="Pizza size: "+ size;
    	document.getElementById("type").innerHTML="Pizza type: "+ type;
    	document.getElementById("top").innerHTML="The number of topping you selected: "+ toppingNum;
    	document.getElementById("total").innerHTML="Total "+ total;*/


      //alert(total);
//process-form-data.php
 form.action = "./process-form-data.php";
 form.submit();
    return true;
  }





// handle the undefined type
  function handleUndefined(value){
  	if (typeof(value) == 'undefined'){
  		alert("please check if you choose the size and type");
  		return false;
  	}
  	else{
  		return true;
  	}
  }


  //validation
  function validation(form){

  	if(form.name.value == "") {
      alert("Error: name cannot be blank!");
      
      return false;
    } 
    if(form.address.value == "") {
      alert("Error: address  cannot be blank!");
      
      return false;
    } 
     if(form.city.value == "") {
      alert("Error: city cannot be blank!");
      
      return false;
    } 


  	//validation :email 
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!filter.test(form.email.value)) {
      alert("Error: Please check you email address!");
      //form.username.focus();
      return false;
    }

    //validation :postal

    var regex = new RegExp(/^[a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d$/i);
    if (!regex.test(Postal.value)){
    	alert("check you postal format")
    	 return false; 
    }
	//validation :telephone
    var pFilter = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if(!pFilter.test(telephone.value)) {
      alert("Error: Please check you Phone Number");
      //form.username.focus();
      return false;
    }

    return true;
        
  }

  //e.preventdfault () to stop submit 

/*
  // handles the click event for link 1, sends the query
function getOutput() {
  getRequest(
      'process-form-data.php', // URL for the PHP file
       drawOutput,  // handle successful request
       drawError    // handle error
  );
  return false;
}  
// handles drawing an error message
function drawError() {
    var container = document.getElementById('output');
    container.innerHTML = 'Bummer: there was an error!';
}
// handles the response, adds the html
function drawOutput(responseText) {
    var container = document.getElementById('output');
    container.innerHTML = responseText;
}
// helper function for cross-browser request object
function getRequest(url, success, error) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ? 
                success(req.responseText) : error(req.status);
        }
    }
    req.open("GET", url, true);
    req.send(null);
    return req;
}*/