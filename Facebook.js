  var markkinointiPalvelutKuvio = $(".markkinointiPalvelutKuvio");
  var density = 16,
      speed = 0.9,
      winHeight = $(markkinointiPalvelutKuvio).height(),
      start = {yMin:winHeight-40, yMax:winHeight-40, xMin:100, xMax:200, scaleMin:0.1, scaleMax:0.35, opacityMin:0.2, opacityMax:0.4},
      mid = {yMin:winHeight * 0.3, yMax:winHeight * 0.5, xMin:75, xMax:400, scaleMin:0.3, scaleMax:1.45, opacityMin:0.4, opacityMax:1},
      end = {yMin:-200, yMax:-200, xMin:20, xMax:400, scaleMin:0.1, scaleMax:1.50, opacityMin:0.2, opacityMax:0.7};


    function range(map, prop) {
      var min = map[prop + "Min"],
        max = map[prop + "Max"];
      return min + (max - min) * Math.random();
    }

    function spawn(particle) {
      var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
        delay = wholeDuration * Math.random(),
        partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

      //set the starting values
      TweenMax.set(particle, {y:range(start, "y"), x:range(start, "x"), scale:range(start, "scale"), opacity:range(start, "opacity"), visibility:"hidden"});

      //the y tween should be continuous and smooth the whole duration
      TweenMax.to(particle, wholeDuration, {delay:delay, y:range(end, "y"), ease:Linear.easeNone, force3D:true});

      //now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
      TweenMax.to(particle, partialDuration, {delay:delay, x:range(mid, "x"), ease:Power1.easeOut, force3D:true});
      TweenMax.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, x:range(end, "x"), ease:Power1.easeIn, force3D:true});

      //now create some random scale and opacity changes
      partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
      TweenMax.to(particle, partialDuration, {delay:delay, scale:range(mid, "scale"), autoAlpha:range(mid, "opacity"), ease:Linear.easeNone, force3D:true});
      TweenMax.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, scale:range(end, "scale"), autoAlpha:range(end, "opacity"), ease:Linear.easeNone, force3D:true, onComplete:spawn, onCompleteParams:[particle]});
    }

    var body = $(markkinointiPalvelutKuvio),

      i, particle;
    for (i = 0; i < density; i++) {
      spawn( $("<div />", {id:"particle"+i, class:"someSuihku" + Math.floor((Math.random() * 6) + 1)}).appendTo(body) );
    }