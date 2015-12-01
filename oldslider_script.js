var slideWidth=1900;


var sliderTimer;


$(document).ready(function(){
		
	$(function(){

		
      var slideWidth=$('.viewport').width();

      $( '.slide img' ).css('margin-left',-(($( '.slide img' ).width() - slideWidth)/2));

      //СЛАЙДЕР 
      $('.slidewrapper').width($('.slidewrapper').children().size()*slideWidth);
        sliderTimer=setInterval(nextSlide,5000);
        $('.viewport').hover(function(){    // навели курсор, очистили таймер
            clearInterval(sliderTimer);
        },function(){
            sliderTimer=setInterval(nextSlide,5000);
        });
        
        $('.dot').click(function(){    
          clearInterval(sliderTimer); // 
          sliderTimer=setInterval(nextSlide,5000);
        
          var curCircle=$('.dot.active').index();   //узнать индекс текущего активного класса   
          
          $('.dot.active').removeClass('active');
          $(this).addClass('active');
          
          var n=$('.dot').index(this);    //узнать индекс нового активного класса
          certainSlide(n, curCircle);  
        });

        $( window ).resize(function() {
          var slideWidth=$('.viewport').width();

          $( '.slide img' ).css('margin-left',-(($( '.slide img' ).width() - slideWidth)/2));
          clearInterval(sliderTimer);

          $('.slidewrapper').width($('.slidewrapper').children().size()*slideWidth);
          $('.slidewrapper').data('current',"0");
          $('.slidewrapper').css('left',"0");



          
          //clearInterval(sliderTimer);
          //sliderTimer=setInterval(nextSlide,5000);
          nextSlide();
          sliderTimer=setInterval(nextSlide,5000);
          
        });
  });
});


        

    function nextSlide(){
      var slideWidth=$('.viewport').width();
      //$( '.slide img' ).css('margin-left',-(($( '.slide img' ).width() - slideWidth)/2));
      //$('.slidewrapper').width($('.slidewrapper').children().size()*slideWidth);

    var currentSlide=parseInt($('.slidewrapper').data('current'));
      
    currentSlide++;
    if(currentSlide>=$('.slidewrapper').children().size())
    {
        $('.slidewrapper').css('left',-(currentSlide-2)*slideWidth); 
        $('.slidewrapper').append($('.slidewrapper').children().first().clone()); // копирует первый слайд (первое li) и добаляет его в конец, 4-ым слайдом 
        $('.slidewrapper').children().first().remove(); // 1-ый слайд удаляет
               
        currentSlide--;                        
    }
        
    $('.slidewrapper').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
   
    
    // добавлено
    var cS=parseInt($('.toggles').data('current1'));
    cS++;
    if(cS>=$('.toggles').children().size())
    {
        cS=0;   
    }
    $('.dot.active').removeClass('active');
    $('.dot').eq(cS).addClass('active');
    
    $('.toggles').data('current1',cS);

   
    
     
    
    
}

function prevSlide(){
    var currentSlide=parseInt($('.slidewrapper').data('current'));
    currentSlide--;
    if(currentSlide<0)
    {
        $('.slidewrapper').css('left',-(currentSlide+2)*slideWidth);  
        $('.slidewrapper').prepend($('.slidewrapper').children().last().clone());  // добавляет минус 1-ый слайд в начало 
        $('.slidewrapper').children().last().remove();  //  последний слайд удаляет
        currentSlide++;   
    }
    
    $('.slidewrapper').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
    
    
    // добавлено
    var cS=parseInt($('.toggles').data('current1'));
    cS--;
    if(cS<0)
    {
        cS=$('.toggles').children().size()-1;   
    }
    $('.dot.active').removeClass('active');
    $('.dot').eq(cS).addClass('active');
    
    $('.toggles').data('current1',cS);
}


function certainSlide(n, curCircle){
    
    var activCS=n;  //новый активный слайд, dot
    var prevCS=curCircle; // предыдущий активный слайд, dot

    var currentSlide=parseInt($('.slidewrapper').data('current'));
    var cS=parseInt($('.toggles').data('current1'));

    var slideWidth=$('.viewport').width();
    
    if(activCS>prevCS)  // новый активный больше предыдущего (идем вперед)
    {
      

      var i;
      for (i = 0; i < (activCS - prevCS); i++) {
       
        
        currentSlide++;
        if(currentSlide>=$('.slidewrapper').children().size())
        {
            //$('.slidewrapper').css('left',-(currentSlide-2)*slideWidth); 
            $('.slidewrapper').append($('.slidewrapper').children().first().clone());
            $('.slidewrapper').children().first().remove();
                   
            currentSlide--;                        
        }
        
        cS++;
        if(cS>=$('.toggles').children().size())
        {
            cS=0;   
        }    
            
      }//for

      $('.slidewrapper').css('left',-(currentSlide-1)*slideWidth);  
      $('.slidewrapper').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
      $('.toggles').data('current1',cS);

    }// вперед

    if(activCS<prevCS)  // новый активный меньше предыдущего (НАЗАД)
    {
      

      var i;
      for (i = 0; i < (prevCS - activCS); i++) {
       
        
        currentSlide--;
        if(currentSlide<0)
        {
            $('.slidewrapper').css('left',-(currentSlide+2)*slideWidth);  
            $('.slidewrapper').prepend($('.slidewrapper').children().last().clone());
            $('.slidewrapper').children().last().remove();
            currentSlide++;   
        }
        
        cS--;
        if(cS<0)
        {
            cS=$('.toggles').children().size()-1;   
        }
            
      }//for

      //$('.slidewrapper').css('left',-(currentSlide+2)*slideWidth);
      $('.slidewrapper').animate({left: -currentSlide*slideWidth},500).data('current',currentSlide);
      $('.toggles').data('current1',cS);


    }// назад

    $( '.slide img' ).css('margin-left',-(($( '.slide img' ).width() - slideWidth)/2));
}//certainSlide


      






		
