site-bg-slideshow-*.jpg   - slideshow image
  - to add more slideshow image, add file name as site-bg-slideshow-01.jpg 02.jpg 03.jpg etc
  - and then open assets/js/variable.js find and edit the number

var _bg_slideshow_image_amount =        2; // slideshow image amount






site-bg-img.jpg           - single image
site-bg-video.jpg         - show before html5 video loaded
site-bg-video-youtube.jpg - show before youtube video loaded

for example, if we set html5 video version at desktop, and single image at mobile, then we need

site-bg-video.jpg - for desktop
site-bg-img.jpg   - for mobile

and you may delete the image that dont need for the current version

for more info, check the documentation :)