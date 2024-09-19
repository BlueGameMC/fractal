//Grid Checks + Skip Checksx5 + DecimalLight, 50 precision, 50x50, 255 iterations - 2.165
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//var zoomSlider = document.getElementById("zoom");
//var zoom2Slider = document.getElementById("zoom2");
//var xOffsetSlider = document.getElementById("xOffset");
//var yOffsetSlider = document.getElementById("yOffset");
var fpsText = document.getElementById("fps");
var zoom = 1;
var xOffset = -8000;
var yOffset = 0;
var zoomn = 1.4;
var iterations = 500;
var res = 50;

function valueEase(x)
{
    return x**10;
}

//requestAnimationFrame(draw);
function draw()
{
    zoom = (zoomn ** 3) / 2 * (res / 4);

    var ScreenArray = [];

    // Grid Checks
    for (let x = 0; x < res; x++) {
        ScreenArray[x] = [];
        for (let y = 0; y < res; y++) {
            if(x % 8 == 0 || y % 8 == 0 || x < 8 || y < 8 || x > res-10 || y > res-10)
            {
                ScreenArray[x][y] = MandelbrotFunction(x-res/2,y-res/2);
            }
            else
            {
                ScreenArray[x][y] = -1;
            }
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if((x % 8 == 0 || y % 8 == 0) && x >= 8 && y >= 8 && x <= res-10 && y <= res-10)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x+1][y] && ScreenArray[x+2][y] == ScreenArray[x+3][y] && ScreenArray[x+4][y] == ScreenArray[x+5][y] && ScreenArray[x+6][y] == ScreenArray[x+7][y] && ScreenArray[x+8][y] == ScreenArray[x][y] &&
                        ScreenArray[x][y+8] == ScreenArray[x+1][y+8] && ScreenArray[x+2][y+8] == ScreenArray[x+3][y+8] && ScreenArray[x+4][y+8] == ScreenArray[x+5][y+8] && ScreenArray[x+6][y+8] == ScreenArray[x+7][y+8] && ScreenArray[x+8][y+8] == ScreenArray[x][y+8] &&
                        ScreenArray[x][y] == ScreenArray[x][y+1] && ScreenArray[x][y+2] == ScreenArray[x][y+3] && ScreenArray[x][y+4] == ScreenArray[x][y+5] && ScreenArray[x][y+6] == ScreenArray[x][y+7] && ScreenArray[x][y+8] == ScreenArray[x][y] &&
                        ScreenArray[x+8][y] == ScreenArray[x+8][y+1] && ScreenArray[x+8][y+2] == ScreenArray[x+8][y+3] && ScreenArray[x+8][y+4] == ScreenArray[x+8][y+5] && ScreenArray[x+8][y+6] == ScreenArray[x+8][y+7] && ScreenArray[x+8][y+8] == ScreenArray[x+8][y]
                    )
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            ScreenArray[x+i][y+j] = ScreenArray[x][y];
                        }
                    }
                }
                else
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            if((x+i)%4 == 0 || (y+j)%4 == 0)
                            {
                                if(ScreenArray[x+i][y+j] == -1)
                                {
                                    ScreenArray[x+i][y+j] = MandelbrotFunction(x+i-res/2,y+j-res/2);
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if((x % 4 == 0 || y % 4 == 0) && x >= 8 && y >= 8 && x <= res-10 && y <= res-10)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x+1][y] && ScreenArray[x+2][y] == ScreenArray[x+3][y] && ScreenArray[x+4][y] == ScreenArray[x][y] &&
                        ScreenArray[x][y+4] == ScreenArray[x+1][y+4] && ScreenArray[x+2][y+4] == ScreenArray[x+3][y+4] && ScreenArray[x+4][y+4] == ScreenArray[x][y+4] &&
                        ScreenArray[x][y] == ScreenArray[x][y+1] && ScreenArray[x][y+2] == ScreenArray[x][y+3] && ScreenArray[x][y+4] == ScreenArray[x][y] &&
                        ScreenArray[x+4][y] == ScreenArray[x+4][y+1] && ScreenArray[x+4][y+2] == ScreenArray[x+4][y+3] && ScreenArray[x+4][y+4] == ScreenArray[x+4][y]
                    )
                {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            ScreenArray[x+i][y+j] = ScreenArray[x][y];
                        }
                    }
                }
                else
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            if((x+i)%2 == 0 || (y+j)%2 == 0 )
                            {
                                if(ScreenArray[x+i][y+j] == -1)
                                {
                                    ScreenArray[x+i][y+j] = MandelbrotFunction(x+i-res/2,y+j-res/2);
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if(ScreenArray[x][y] == -1)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x-1][y-1] && ScreenArray[x-1][y-1] == ScreenArray[x][y-1] && ScreenArray[x][y-1] == ScreenArray[x+1][y-1] &&
                        ScreenArray[x][y] == ScreenArray[x-1][y+1] && ScreenArray[x-1][y+1] == ScreenArray[x][y+1] && ScreenArray[x][y+1] == ScreenArray[x+1][y+1] &&
                        ScreenArray[x][y] == ScreenArray[x-1][y] && ScreenArray[x][y] == ScreenArray[x+1][y] 
                    )
                {

                    ScreenArray[x][y] = ScreenArray[x-1][y];

                }
                else
                {
                    ScreenArray[x][y] = MandelbrotFunction(x-res/2,y-res/2);
                }
            }
            
        }
    }


    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            let i = ScreenArray[x][y];
            let color = HSVtoRGB((i%255)/36,1,1-valueEase(parseFloat(i)/parseFloat(iterations)));
            setPixel(x,y,color.r,color.g,color.b);
        }
    }
    //setPixel(Math.round(res/2),Math.round(res/2), 255,0,0);
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);
    requestAnimFrame();
}

document.onkeydown = function(e) { 
    switch (e.key) { 
        case "d": 
            xOffset = xOffset + (1 / (zoom / (10000))) * res/50;
            break; 
        case "a": 
            xOffset = xOffset - (1 / (zoom / (10000))) * res/50;
            break; 
        case "w": 
            yOffset = yOffset + (1 / (zoom / (10000))) * res/50;
            break; 
        case "s": 
            yOffset = yOffset - (1 / (zoom / (10000))) * res/50;

            break; 
        case "e": 
            zoomn = zoomn + (zoomn / (2));
            break; 
        case "q": 
            zoomn = zoomn - (zoomn /(4));
            break; 
        case "r": 
            zoomn = zoomn + (zoomn / (20));
            break; 
        case "f": 
            zoomn = zoomn - (zoomn /(40));
            break; 
        case "t": 
            zoomn = zoomn + (zoomn / (200));
            break; 
        case "g": 
            zoomn = zoomn - (zoomn /(400));
            break; 
        case "i": 
            iterations += 100;
            break; 
        case "k": 
            iterations -= 100;
            break; 
        case "o": 
            iterations += 1;
            break; 
        case "l": 
            iterations -= 1;
            break; 
        case "p": 
            iterations = 500;
            break; 
        case "1": 
            res = 50;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "2": 
            res = 100;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "3": 
            res = 200;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "4": 
            res = 400;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "5": 
            res = 700;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "0": 
            res = 5000;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
    } 
}; 
function MandelbrotFunction(xi, yi)
{
    let y = xi / (zoom);
    let x = yi / (zoom);

    x = x + (xOffset / (10000));
    y = y - (yOffset / (10000));

    var zx = 0;
    var zy = 0;
    var cx = x;
    var cy = y;

    for (let i = 0; i < iterations; i++)
    {

        i++
        let xt = zx * (zy);
        zx = zx * (zx) - (zy * (zy)) + (cx);
        zy = xt * (2) + (cy);
        let oldoldoldoldzx = (zx);
        let oldoldoldoldzy = (zy);

        i++
        xt = zx * (zy);
        zx = zx * (zx) - (zy * (zy)) + (cx);
        zy = xt * (2) + (cy);
        let oldoldoldzx = (zx);
        let oldoldoldzy = (zy);

        i++
        xt = zx * (zy);
        zx = zx * (zx) - (zy * (zy)) + (cx);
        zy = xt * (2) + (cy);
        let oldoldzx = (zx);
        let oldoldzy = (zy);

        i++
        xt = zx * (zy);
        zx = zx * (zx) - (zy * (zy)) + (cx);
        zy = xt * (2) + (cy);
        let oldzx = (zx);
        let oldzy = (zy);

        xt = zx * (zy);
        zx = zx * (zx) - (zy * (zy)) + (cx);
        zy = xt * (2) + (cy);

        if (zx * (zx) + (zy * (zy)) > (4))
        {
            if (oldzx * (oldzx) + (oldzy * (oldzy)) > (4))
            {
                if (oldoldzx * (oldoldzx) + (oldoldzy * (oldoldzy)) > (4))
                {
                    if (oldoldoldzx * (oldoldoldzx) + (oldoldoldzy * (oldoldoldzy)) > (4))
                    {
                        if (oldoldoldoldzx * (oldoldoldoldzx) + (oldoldoldoldzy * (oldoldoldoldzy)) > (4))
                        {
                            return i-4;
                        }
                        return i-3;
                    }
                    return i-2;
                }
                return i-1;
            }
            return i;
        }
    }
    return iterations;
}

function setPixel(y, x, r, g, b) {
    let pixelIndex = (y * canvas.width + x) * 4;
    imageData.data[pixelIndex] = r;
    imageData.data[pixelIndex + 1] = g;
    imageData.data[pixelIndex + 2] = b;
    imageData.data[pixelIndex + 3] = 255;
}

var lastCalledTime;
var fps;

function requestAnimFrame() 
{
  if(!lastCalledTime) {
     lastCalledTime = performance.now();
     fps = 0;
     return;
  }
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = 1/delta;
  fpsText.innerText = Math.round(fps*1000)/1000;
} 
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}