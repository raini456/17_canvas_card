(function () {

    window.myCard = {};

    myCard.objects = {};

    myCard.objects.wrapper = null;
    myCard.objects.canvas = null;
    myCard.objects.wrapperText = null;
    myCard.objects.inputText = null;
    myCard.objects.btnText = null;
    myCard.objects.selectFontSize=null;

    

    myCard.styles = {};

    myCard.ctx = null;
    myCard.styles={};
    myCard.styles.fontSize=25;
    myCard.styles.fontFamily='arial';
    myCard.fn = {};

    myCard.init = function (cfg) {
        myCard.objects.canvas = document.querySelector('[data-role="myCard"] canvas');
        /**
         * Speicherung der Canvas-Dimensionen
         * **/
        
        myCard.objects.canvas.width = cfg.width;//600
        myCard.objects.canvas.height = cfg.height;//600
        /**
         * Zuweisung der Canvas-Dimensionen
         * **/
        
        myCard.objects.canvas.style.width = cfg.width + 'px';//600
        myCard.objects.canvas.style.height = cfg.height + 'px';//600


        myCard.ctx = myCard.objects.canvas.getContext('2d');
        myCard.ctx.translate(-0.5, -0.5);
        
        myCard.objects.wrapperText=document.querySelector('[data-role="myCard"] [data-mycard="text"]');
        myCard.objects.wrapperText.coords ={
           top:parseInt(css(myCard.objects.wrapperText, 'top')),
           left:parseInt(css(myCard.objects.wrapperText, 'left')),
           bottom:parseInt(css(myCard.objects.wrapperText, 'bottom')),
           right:parseInt(css(myCard.objects.wrapperText, 'right')),
           width:parseInt(css(myCard.objects.wrapperText, 'width')),
           height:parseInt(css(myCard.objects.wrapperText, 'height'))
        };
        myCard.objects.wrapperText.style.height=myCard.styles.fontSize + 'px';
        window.addEventListener('keydown', myCard.moveText);
        
        /**Textfeld**/
        myCard.objects.inputText=document.querySelector('[data-role="myCard"] [data-mycard="text"] input');
        myCard.objects.inputText.style.fontSize = myCard.styles.fontSize + 'px';
        myCard.objects.inputText.style.fontFamily = myCard.styles.fontFamily;
        /**Button auswählen**/
        myCard.objects.btnText=document.querySelector('[data-role="myCard"] [data-mycard="text"] button');
        myCard.objects.btnText.addEventListener('click', myCard.drawText);
        
        //Text Font-Size
        myCard.objects.selectFontSize=document.querySelector('[data-role="myCard"] [data-mycard="textOptions"] select');
        myCard.objects.selectFontSize.addEventListener('change', myCard.setFontSize);
        
    };
    myCard.setFontSize =function(){
        myCard.styles.fontSize = this.value;
        myCard.objects.inputText.style.fontSize= this.value + 'px';
        myCard.objects.inputText.style.height= myCard.styles.fontSize;
        myCard.objects.wrapperText.style.height= this.value + 'px';
        myCard.objects.wrapperText.coords.height= this.value;
        //myCard.objects.inputText.focus(); /*ändert den Fokus des Cursors auf das Input-Feld*/
        this.blur();//Nimmt den Fokus vom Element weg  ...
    }
    myCard.moveText=function(e){ 
        var T=myCard.objects.wrapperText;
        switch(e.keyCode){
            case 37:
                T.coords.left--;    
                break;
            case 38:
                T.coords.bottom++;    
                break;
            case 39:
                T.coords.left++;    
                break;
            case 40:
                T.coords.bottom--;    
                break;
            default:break
        }
        T.style.left = T.coords.left + 'px';
        T.style.bottom = T.coords.bottom + 'px';
        
    }
    myCard.drawText = function(e){
        var T = myCard.objects.wrapperText;
        var C = myCard.objects.canvas;
        var text=myCard.objects.inputText.value.trim();        
        myCard.ctx.font = myCard.styles.fontSize + 'px '+ myCard.styles.fontFamily;
        myCard.ctx.fillStyle= '#000';
        myCard.ctx.textBaseline="middle";
        myCard.objects.inputText.style.height=myCard.styles.fontSize + 'px';;
        var x= T.coords.left;
        var y = C.height - T.coords.bottom - (myCard.styles.fontSize/2);
        myCard.ctx.fillText(text, x, y);        
        myCard.objects.inputText.value="";        
        console.log(text);
        
    };
    var css = function(elem, prop){
        return window.getComputedStyle(elem, null).getPropertyValue(prop);
    }


})();
