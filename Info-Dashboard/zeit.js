$(document).ready(function () {
   // Update the clock every second
   setInterval(function () {
      let currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let seconds = currentTime.getSeconds();

      // Add leading zeros to hours, minutes, and seconds if needed
      hours = (hours < 10 ? "0" : "") + hours;
      minutes = (minutes < 10 ? "0" : "") + minutes;
      seconds = (seconds < 10 ? "0" : "") + seconds;

      // Build the clock string and set the clock element's text
      let clockStr = hours + ":" + minutes + ":" + seconds;
      $("#clock").text(clockStr);
      $("#date").text(currentTime.toLocaleDateString());
   }, 1000);
});

$(window).on("load", function () {
   $("#clock,#date").html(
      "<div class='spinner-grow text-secondary' role='status'><span class='visually-hidden'>Loading...</span></div>"
   );
});
