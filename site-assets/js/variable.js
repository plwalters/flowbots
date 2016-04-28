//
// config file
// --------------------------------------------------
//
// customize the template function via this file.
//
// but for the contact form and subscribe, please check the documentation
//

//
// overlay
// --------------------------------------------------
//
// overlay color doesnt mean home section bckground color

var _site_bg_overlay_color =                      'rgba(33, 33, 33, 0.6)'; // overlay color, rgba format
var _site_bg_overlay_disable =                    false; // [true, false] - force disable overlay, sometime we dont need it, disable by this variable

//
// map (google map)
// https://maps.google.com/
// --------------------------------------------------
//

// [true, false] - enable or disable google map
var _map_toggle =                                 true;

// map latitude
var _map_latitude_longitude =                     [35.6046472, 140.2642208];

// map water color
var _map_water_color =                            '#1080f2';


//
// background
// --------------------------------------------------
//
// choose background version for both desktop and mobile :)
//

// for desktop
var _bg_style_desktop =                           6;
                                                    // 0 = flat color
                                                    // 1 = flat color     (mp3 audio) - audio place at /audio/audio.mp3
                                                    // 2 = image
                                                    // 3 = image          (mp3 audio) - audio place at /audio/audio.mp3
                                                    // 4 = slideshow
                                                    // 5 = slideshow      (mp3 audio) - audio place at /audio/audio.mp3
                                                    // 6 = slideshow      (kenburn)
                                                    // 7 = slideshow      (kenburn, mp3 audio) - audio place at /audio/audio.mp3
                                                    // 8 = html5 video    (mute) - video file place at /video/video.mp4
                                                    // 9 = html5 video    (video audio)
                                                    // 10 = html5 video   (mp3 audio, audio place at /audio/audio.mp3)
                                                    // 11 = youtube video (mute)
                                                    // 12 = youtube video (video audio)
                                                    // 13 = youtube video (youtube + mp3 audio) - audio place at /audio/audio.mp3

// for mobile
var _bg_style_mobile =                            6;
                                                    // 0 = flat color
                                                    // 1 = flat color (mp3 audio) - audio place at /audio/audio.mp3
                                                    // 2 = image
                                                    // 3 = image      (mp3 audio) - audio place at /audio/audio.mp3
                                                    // 4 = slideshow
                                                    // 5 = slideshow  (mp3 audio, audio place at /audio/audio.mp3)
                                                    // 6 = slideshow  (kenburn)
                                                    // 7 = slideshow  (kenburn, mp3 audio) - audio place at /audio/audio.mp3

// if _bg_style == 4 - 7 (slideshow)
var _bg_slideshow_image_amount =                  2; // slideshow image amount
var _bg_slideshow_duration =                      9000; // millisecond

// if _bg_style_desktop == 11 - 13 (youtube video)
var _bg_video_youtube_url =                       'gme8UgbTLHE'; // youtube video url id - https://www.youtube.com/watch?v=gme8UgbTLHE
var _bg_video_youtube_quality =                   'hightres'; // hightres, hd1080, hd720, default - youtube video quality
var _bg_video_youtube_start =                     1; // seconds - video start time
var _bg_video_youtube_end =                       0; // seconds - video end time, 0 to ignored
var _bg_video_youtube_loop =                      true; // true, false - video loop

//
// background effect (constellation, parallax star star, particles)
// --------------------------------------------------
var _site_bg_effect =                             2; // 0 = disable, 1 = constellation, 2 = parallax star star, 3 = particles
var _side_bg_effect_parallax =                    true; // [true, false] - enable parallax effect on effect 1,2 its force disable on mobile, and not work with outdated browser

// if _bg_effect == 1 (constellation)
var _constellation_color =                        'rgba(255, 255, 255, .9)';// [rgba format] - constellation color
var _constellation_width =                        1.5; // [px] - constellation width

// if _bg_effect == 2 (parallax star)
var _parallax_star_opacity =                      1; // [0.1 to 1] - parallax star opacity

// if _bg_effect == 3 (particles)
var _particles_opacity =                          .5; // [0.1 to 1] - particles opacity
var _particles_link_opacity =                     .4; // [0.1 to 1] - particles link opacity