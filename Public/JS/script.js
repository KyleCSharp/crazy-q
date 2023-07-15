
  $(document).ready(function() {
    var currentImageIndex = 0;
    var images = $(".comics-div img");
    var numImages = images.length;

    function showNextImage() {
      images.hide(); // Hide all images
      images.eq(currentImageIndex).show(); // Show the current image

      currentImageIndex = (currentImageIndex + 1) % numImages; // Update the current image index

      setTimeout(showNextImage, 2000); // Change image every 2 seconds (adjust this value as needed)
    }

    showNextImage(); // Start the slideshow
  });
  function checkOpenStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes;

    const businessHours = {
        0: { start: 1100, end: 1930 }, // Sunday
        1: { start: 1100, end: 2030 }, // Monday
        2: { start: 1100, end: 2030 }, // Tuesday
        3: { start: 1100, end: 2030 }, // Wednesday
        4: { start: 1100, end: 2030 }, // Thursday
        5: { start: 1100, end: 2100 }, // Friday
        6: { start: 1100, end: 2100 }, // Saturday
    };

    const currentDay = businessHours[dayOfWeek];
    if (currentDay && currentTime >= currentDay.start && currentTime <= currentDay.end) {
        document.getElementById("sign").innerHTML = "<div class='open-sign'>Open</div>";
    } else {
        document.getElementById("sign").innerHTML = "<div class='closed-sign'>Closed</div>";
    }
}

// Check the open status immediately
checkOpenStatus();

// Check the open status every minute
setInterval(checkOpenStatus, 60000);