function roll(){
    const num=document.getElementById("dicecounter").value;
    const diceresult=document.getElementById("diceresult");
    const diceimage=document.getElementById("diceimage");
    const values=[];
    const images=[];

    for(let i=0;i<num;i++){
        let val=Math.floor(Math.random()*6)+1;
        values.push(val);
        images.push(`<img src="diceimages/${val}.png">`);

    }
    diceresult.textContent=`dices: ${values.join(",")}`;
    diceimage.innerHTML=images.join(" ");




}