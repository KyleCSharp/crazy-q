const menuImage = document.querySelector('.menu img');
const menuContainer = document.querySelector('.menu-container');
const contentWrapper = document.querySelector('.content-wrapper');
const footer = document.querySelector('.footer');
const imageBackground = document.querySelector('.image-background');

let zoomLevel = 1; // Initial zoom level
const zoomStep = 0.1; // Zoom level increment

menuImage.addEventListener('click', () => {
  menuImage.classList.toggle('fullscreen');
  menuContainer.classList.toggle('opened');
  contentWrapper.classList.toggle('blur');
  footer.classList.toggle('blur');
  imageBackground.classList.toggle('blur');
  menuContainer.classList.toggle('menu-container-full');

  if (menuImage.classList.contains('fullscreen')) {
    document.addEventListener('wheel', handleZoom);
    menuContainer.addEventListener('mousemove', handleMousemove);
  } else {
    document.removeEventListener('wheel', handleZoom);
    menuContainer.removeEventListener('mousemove', handleMousemove);
    zoomLevel = 1; // Reset zoom level when exiting fullscreen
    menuImage.style.transform = `scale(${zoomLevel}) translate(0, 0)`;
  }
});

function handleZoom(event) {
  event.preventDefault();
  const delta = Math.sign(event.deltaY); // Get scroll direction

  // Calculate the mouse position relative to the image container
  const containerRect = menuContainer.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  // Calculate the zoom origin based on the mouse position
  const zoomOriginX = mouseX / containerRect.width;
  const zoomOriginY = mouseY / containerRect.height;

  // Update the zoom level based on the scroll direction
  if (delta > 0) {
    zoomLevel -= zoomStep;
    if (zoomLevel < 0.1) zoomLevel = 0.1; // Set a minimum zoom level
  } else if (delta < 0) {
    zoomLevel += zoomStep;
    if (zoomLevel > 3) zoomLevel = 3; // Set a maximum zoom level
  }

  // Apply the zoom level and origin to the image with CSS transitions
  menuImage.style.transformOrigin = `${zoomOriginX * 100}% ${zoomOriginY * 100}%`;
  menuImage.style.transform = `scale(${zoomLevel})`;

  // Calculate the maximum translation based on the image dimensions
  const imageWidth = menuImage.offsetWidth;
  const imageHeight = menuImage.offsetHeight;
  const maxTranslateX = (zoomLevel - 1) * (imageWidth - containerRect.width);
  const maxTranslateY = (zoomLevel - 1) * (imageHeight - containerRect.height);

  // Clamp the translation values within the maximum bounds
  const clampedTranslateX = Math.min(Math.max(translateX, -maxTranslateX), 0);
  const clampedTranslateY = Math.min(Math.max(translateY, -maxTranslateY), 0);
  menuImage.style.transform = `scale(${zoomLevel}) translate(${clampedTranslateX}px, ${clampedTranslateY}px)`;
}

function handleMousemove(event) {
  // Calculate the mouse position relative to the image container
  const containerRect = menuContainer.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  // Calculate the translation based on the zoom level and mouse position
  const translateX = -((zoomLevel - 1) * mouseX);
  const translateY = -((zoomLevel - 1) * mouseY);

  // Calculate the maximum translation based on the image dimensions
  const imageWidth = menuImage.offsetWidth;
  const imageHeight = menuImage.offsetHeight;
  const maxTranslateX = (zoomLevel - 1) * (imageWidth - containerRect.width);
  const maxTranslateY = (zoomLevel - 1) * (imageHeight - containerRect.height);

  // Clamp the translation values within the maximum bounds
  const clampedTranslateX = Math.min(Math.max(translateX, -maxTranslateX), 0);
  const clampedTranslateY = Math.min(Math.max(translateY, -maxTranslateY), 0);
  menuImage.style.transform = `scale(${zoomLevel}) translate(${clampedTranslateX}px, ${clampedTranslateY}px)`;
}
