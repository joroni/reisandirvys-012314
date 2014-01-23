window.onload = SetDefaultValue();
 
function EnterText() {
    baseurl = document.getElementById("baseurl");
	if(myTextField.value != ""){
	    alert("You Entered: " + baseurl.value);
	}else {
	    alert("Please enter some text!");
	    }
}
 /*
function ClearText() {
    ClearTextField = document.getElementById("myText");
	if (ClearTextField.value > "") {
	    ClearTextField.value = "";
	}else {
	    alert("Please enter some text!");
	}
}
 */