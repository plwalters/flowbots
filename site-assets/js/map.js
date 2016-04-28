var $ = jQuery.noConflict();

//
// map
// --------------------------------------------------
//

function initialize() {
  var $map = $('#map-canvas');

  if ($map.length) {
    if (_map_toggle) {
      var mapCanvas = document.getElementById('map-canvas');
      var myLatlng = new google.maps.LatLng(_map_latitude_longitude[0], _map_latitude_longitude[1]); // map location
      var mapOptions = {
        center: myLatlng,
        disableDefaultUI: true,
        scrollwheel: false,
        zoom: 10, // zoom level
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        // style start
        styles: [{
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#444444"
            }
          ]
        }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
        }, {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }, {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        }, {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                "visibility": "off"
              }
          ]
        }, {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },{
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                "color": _map_water_color
              },
              {
                "visibility": "on"
              }
          ]
        }]
        // style end
      };

      var map = new google.maps.Map(mapCanvas, mapOptions);

      var image = 'assets/img/item/map-marker.png';
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image
      });

      $('body').addClass('is-map');

      google.maps.event.addDomListener(window, 'resize', function() {
        var center = map.getCenter();

        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      });
    }
  }
}

function loadScript() {
  var script = document.createElement('script');

  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&callback=initialize';
  document.body.appendChild(script);
}

$(window).on('load', function() {
  loadScript();
});