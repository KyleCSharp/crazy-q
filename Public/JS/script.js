
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