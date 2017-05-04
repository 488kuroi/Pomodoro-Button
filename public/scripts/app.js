// audio silly things
var track = new Audio();
var audioTool = function( userEvent ) {
  // track.loop = false;
  // track.stop();
  switch ( userEvent ){
    case 'start':
      track.src = '../343130_5121236-lq.mp3';
      track.loop = true;
    break;
    case 'done':
      track.src = '../recreation005.wav';
      track.loop = false;
    break;
    case 'fail':
      track.src = '../household038.wav';
      track.loop = false;
    break;
    default:
      // track.stop();
      track = false;
    break;
  }
  if( track ){
    track.play();
  }
};



// time function
var stopCount = false;
startTimer = function(){
  // vars for text and pomodoro color
  var counter = 0;
  var gray = 0;
  var red = 100;
  $( '.pomodoro' ).find( 'img' ).addClass( 'floating' ).css( 'filter', 'grayscale(' + gray + '%)' );
  $( '.banner' ).css( 'filter', 'grayscale(' + red + '%)' );
  // vars for get the current time
  var d1 = new Date (),
      d2 = new Date ( d1 );
  d2.setMinutes ( d1.getMinutes() + 25 );
  d2.setSeconds ( d2.getSeconds() + 1 );
  var countDownDate = d2;
  // loop
  var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      // Time calculations
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result"
      document.getElementById("timer").innerHTML = minutes + " m, " + seconds + " s";

      // turn to grayscale the pomodoro
      if( counter === 60 ){
        gray += 4;
        red -= 4;
        $( '.pomodoro' ).find( 'img' ).css( 'filter', 'grayscale( ' + gray + '% )');
        $( '.banner' ).find( 'img' ).css( 'filter', 'grayscale( ' + red + '% )');
        counter = 0;
      }
      counter++;

      // If the count down is over, or the job is done, write some text
      if (distance < 0 ) {
        clearInterval(x);
        audioTool( 'fail' );
        $( '#start' ).attr( 'disabled', false );
        $( '.pomodoro' ).find( 'img' ).removeClass( 'floating' );
        document.getElementById("timer").innerHTML = "BOOM! Have you finished your job?";
      }
      if ( distance > 0 && stopCount ) {
        $( '.banner' ).css( 'filter', 'grayscale(0%)' );
        clearInterval(x);
          document.getElementById("timer").innerHTML = 'GREAT! You did it!!!';
      }
  }, 1000);
};


  $( document ).ready( function(){

    $( '#start' ).on( 'click', function(){
      stopCount = false;
      startTimer();
      audioTool( 'start' );
      $( '#stop' ).attr( 'disabled', false );
      $( this ).attr( 'disabled', 'disabled' );
    } );

    $( '#stop' ).on( 'click', function(){
      stopCount = true;
      audioTool( 'done' );
      $( '#start' ).attr( 'disabled', false );
      $( this ).attr( 'disabled', 'disabled' );
    } );


  } );
