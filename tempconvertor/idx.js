const textBox= document.getElementById("textBox");
const tofahrenhite=document.getElementById("tofahrenhite");
const tocelcius=document.getElementById("tocelcius");
const result=document.getElementById("result");

let temp;
function convert(){
if(tofahrenhite.checked){
temp=Number(textBox.value);
temp=temp*9/5+32;
result.textContent=temp.toFixed(2)+"deg. F";



}
else if(tocelcius.checked){
    temp=Number(textBox.value);
temp=(temp-32)*(5/9);
result.textContent=temp.toFixed(2)+"deg. Celcius";
}
else {
    result.textContent="select a unit";
}
}
