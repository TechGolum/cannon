var cannon = document.getElementById("cannon");
var button = document.getElementById("fire");
var bullet = document.getElementById("bullet");
var reload = document.getElementById("reload");
var music = document.getElementById("music");
var volumeText = document.getElementById("volume"); 

var up = false;
var rotate = true;

var timer_set, timer_flight;

var angel = 3;
var x , y;
var v0 = 150;
var g = 45;
var t = 0;
var in_rad = Math.PI / 180;
var cannon_width = 90;
var cannon_height = 40;
var section_height = 650;
var time = 10;

button.addEventListener("click", function()
{
    Rotate();
    if(!rotate)
    {
        clearInterval(timer);
        music.play();
        music.volume = 1;
        volumeText.innerHTML += " " + music.volume * 100 + "%";
        button.style.visibility = "hidden";
        Flight();
    } 
    button.innerText = "FIRE!";
    rotate=false;
});

reload.addEventListener("click", function()
{
    location.reload();
});

function SetXY()
{
    t+=time / 1000;
    x = v0 * t * Math.cos(in_rad * angel) + (cannon_width / 2 - 
        cannon_height / 2 * Math.tan(angel * in_rad)) * Math.cos(angel * in_rad);
    y = v0 * t * Math.sin(in_rad * angel) - g * t * t / 2 + (section_height - cannon_height) + 
        cannon_height / (2 * Math.cos(angel * in_rad)) + 
            (cannon_width / 2 - cannon_height * Math.tan(angel * in_rad) / 2) * Math.sin(angel * in_rad);
}

function Flight()
{
    timer_flight = setInterval(function()
    {
        SetXY();
        bullet.style.left = x + "px";
        bullet.style.bottom = y + "px";
        bullet.style.visibility = "visible";
        if(Math.round(y) < 610)
        {
            clearInterval(timer_flight);     
            SetVolume();
        }
    }, time);

}

function Rotate()
{
    if(rotate)
    {
        timer = setInterval(function()
        {
            cannon.style.transform = "rotate(-" + angel + "deg)";
            if(up)
            {
                angel-=3;
            }
            else
            {
                angel+=3;
            }
            if(angel==0 || angel==60) up = !up;

        }, 70);
    }
}

function SetVolume()
{
    music.volume = 0;
    for(let i = 300; i < x; i+=26.4)
    {
        music.volume+=0.1;
    }
    volumeText.innerHTML = "Громкость: " + Math.round(music.volume * 100) + "%";
}