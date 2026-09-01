const loader=document.getElementById("loader"),pct=document.getElementById("loaderPct");
let p=0;const boot=setInterval(()=>{p+=Math.floor(Math.random()*13)+5;if(p>=100){p=100;clearInterval(boot);setTimeout(()=>loader.style.opacity="0",300);setTimeout(()=>loader.remove(),1000)}pct.textContent=p+"%"},80);

const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let W,H,pts=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;pts=Array.from({length:Math.min(100,Math.floor(W/14))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.4+.3}))}
resize();addEventListener("resize",resize);
function draw(){ctx.clearRect(0,0,W,H);for(const a of pts){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fillStyle="rgba(85,246,194,.35)";ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){ctx.strokeStyle=`rgba(85,246,194,${(1-d/110)*.07})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}draw();

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.querySelectorAll(".counter").forEach(el=>{
  const target=parseFloat(el.dataset.target), dec=String(target).includes(".");
  const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let n=0,step=target/45;const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=dec?n.toFixed(2):Math.floor(n)},25);ob.disconnect()}}));
  ob.observe(el);
});

const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
addEventListener("mousemove",e=>{dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";ring.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:180,fill:"forwards"})});
document.querySelectorAll("a,.skill-card,.project").forEach(x=>{x.addEventListener("mouseenter",()=>ring.classList.add("big"));x.addEventListener("mouseleave",()=>ring.classList.remove("big"))});

document.querySelectorAll(".skill-card").forEach(card=>card.addEventListener("mousemove",e=>{
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(700px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateY(-8px)`;
  card.addEventListener("mouseleave",()=>card.style.transform="",{once:true});
}));
/* =====================================================
   GO TO TOP — SHOW AT 2/3 PAGE
===================================================== */

const goTop = document.getElementById("goTop");

window.addEventListener("scroll", function () {

    const scrollPosition = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        scrollPosition / pageHeight;


    /* Show after 66.6% of the page */

    if (scrollPercentage >= 0.66) {

        goTop.classList.add("show");

    } else {

        goTop.classList.remove("show");

    }

});

/* =========================================
   LIGHT / DARK THEME
========================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");


    if (document.body.classList.contains("light-theme")) {

        themeIcon.textContent = "☾";

    } else {

        themeIcon.textContent = "☀";

    }

});
