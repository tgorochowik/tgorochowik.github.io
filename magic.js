/* Magic circles - a js attempt
 *
 * 2015 Tomasz Gorochowik <tomasz@gorochowik.com>
 *
 * WTFPL License
 */

function let_there_be_magic(){
  var w = window.innerWidth,
      h = window.innerHeight;

  var delay = 200;
  var margin = Math.floor(h*0.04);

  var anim_type = "<>";

  var paper = Raphael(0, 0, w, h);

  function Pane (p, px, py, ps, pn) {

    var x = px;
    var y = py;
    var s = ps;
    var rd = false;

    if(! p){
      sx=x;
      sy=y;
      ss=s;
      rd=true;
    }
    else{
      sx=px;
      sy=py;
      ss=ps;
      s = ps/2;

      switch(pn){
        case 2:
          x=px + s;
          y=py;
          break;
        case 3:
          x=px;
          y=py + s;
          break;
        case 4:
          x=px + s;
          y=py + s;
          break;
        default:
          x=px;
          y=py;
          break;
      };
    };

    var circle = paper.circle(sx+ss/2, sy+ss/2, ss/2).mousemove(
      function (){
        if (rd == true){
          rd=false;

          var a1 = new Pane(1, x, y, s, 1);
          var a2 = new Pane(1, x, y, s, 2);
          var a3 = new Pane(1, x, y, s, 3);

          circle.toFront();

          circle.animate(
              {r: s/4, cx: x+s/2+s/4, cy:y+s/2+s/4 },
              delay,
              anim_type,
              function(){rd = true;});


          x=x+s/2;
          y=y+s/2;
          s = s/2;

        }
      });

    /* Calculate some random color */
    var b = Math.floor(Math.random()*10+5);
    var g = b - Math.floor(Math.random()*5);
    var r = b - Math.floor(Math.random()*5-10);

    var col =r.toString(16).charAt(0)+g.toString(16).charAt(0)+b.toString(16).charAt(0);

    col = '#' + col;

    circle.attr("fill", col);
    circle.attr("stroke-width", 0);

    if (p){
      circle.animate(
          {r: s/2, cx: x+s/2, cy:y+s/2 },
          delay,
          anim_type,
          function(){rd = true;});
    }
  }

  /* Calculate start conditions */
  var hs = (h-2*margin);
  var ws = (w-2*margin);

  var margin_v = Math.floor(Math.abs(ws-hs)/2);
  margin_v += margin;

  /* Check which dimension is smaller */
  if ( ws < hs ){
    ws = [hs, hs = ws][0];
    margin_v = [margin, margin = margin_v][0];
  }

  /* Draw initial circle */
  new Pane(0, margin_v, margin, hs, 0);
}
