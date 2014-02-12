(function() {
  'use strict';

  var
  family = [
    { name: 'Ksześ',   id: 'kszes',   color: '#2fb2de' },
    { name: 'Łukasz',  id: 'lukasz',  color: '#d45533' },
    { name: 'Michał',  id: 'michal',  color: '#debb2f' },
    { name: 'Bartek',  id: 'bartek',  color: '#3ec734' },
    { name: 'Asia',    id: 'asia',    color: '#812dd4' },
  ],
  strokeWidth = {
    normal: 7,
    hover: 14
  },
  s = Snap('#logo'),
  $body = $('svg'),
  arc = function(center, radius, startAngle, stopAngle) {
    var
    radStart = Snap.rad(startAngle),
    radStop  = Snap.rad(stopAngle),
    start = {
      x: center.x + radius * Math.cos(radStart),
      y: center.y + radius * Math.sin(radStart),
    },
    stop = {
      x: center.x + radius * Math.cos(radStop),
      y: center.y + radius * Math.sin(radStop)
    };

    return [
      'M', start.x, start.y,
      'A', radius, radius, '0 0 1', stop.x, stop.y
    ].join(' ');
  },
  click = function(url) {
    return function() {
      if (url) {
        window.location.href = url;
      }
    };
  },
  draw = function(s) {
    s.clear();

    var
    width = $body.width(),
    height = $body.height(),
    radius = (Math.min(width, height) / 2) * 0.9,
    center = { x: width / 2, y: height / 2 };

    // Draw N
    var
    h = radius,
    w = radius / 3,
    bottom = center.y - h / 2,
    top = center.y + h / 2,
    right = center.x - w,
    left = center.x + w;

    s.path([
      'M', left, bottom,
      'L', left, top,
      'L', right, bottom,
      'L', right, top
    ].join(' '))
    .attr({
      strokeWidth: strokeWidth.normal,
      stroke: '#888a85',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      fill: 'transparent'
    });

    // Draw segments
    var
    onOver = function(text) {
      return function() {
        this.animate({strokeWidth: strokeWidth.hover}, 100);
        text.attr({
          visibility: 'visible'
        });
      };
    },
    onOut = function(text) {
      return function() {
        this.animate({strokeWidth: strokeWidth.normal}, 100);
        text.attr({
          visibility: 'hidden'
        });
      };
    };

    for(var i = 0; i < 5; i++) {
      var
      p = s.path(arc(center, radius, 72 * i - 90, 72 * (i + 1) - 90))
      .attr({
        fill: 'transparent',
        stroke: family[i].color,
        strokeWidth: strokeWidth.normal,
        id: family[i].id,
        'class': 'link'
      }),
      path = s.path(arc(center, radius - strokeWidth.hover * 2, 72 * i - 90, 72 * (i + 1) - 90))
      .attr({fill: 'transparent'}),
      t = s.text(10, 10, family[i].name).attr({
        textpath: path,
        fill: family[i].color,
        visibility: 'hidden'
      });

      p
      .hover(onOver(t), onOut(t))
      .click(click(['http://', family[i].id, '.niemier.pl'].join('')));
    }
  };

  $(document).ready(function() { draw(s); });
  $(window).resize(function() { draw(s); });
}).call(this);

