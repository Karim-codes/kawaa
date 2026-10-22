import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import './content.js';
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let userReduced=false;const isReduced=()=>reduce.matches||userReduced;
const intro = $('#intro');
const skip = $('#skip-intro');
let introTimeline, safetyTimer, motion;
const cup = id => `<svg viewBox="0 0 400 500" role="img" aria-label="Sculpted KAAWA cup with visibly rising coffee">
<defs>
<linearGradient id="body-${id}" x1="0" x2="1"><stop stop-color="#dbe6f7" stop-opacity=".8"/><stop offset=".19" stop-color="#fff" stop-opacity=".2"/><stop offset=".65" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#6c7ea0" stop-opacity=".8"/></linearGradient>
<linearGradient id="blue-${id}" x1="0" x2="1"><stop stop-color="#071d97"/><stop offset=".23" stop-color="#3156ff"/><stop offset=".6" stop-color="#1739ed"/><stop offset="1" stop-color="#0825b6"/></linearGradient>
<linearGradient id="coffee-${id}" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#bd793c"/><stop offset=".17" stop-color="#70401f"/><stop offset=".7" stop-color="#331a0d"/><stop offset="1" stop-color="#160e09"/></linearGradient>
<radialGradient id="crema-${id}"><stop stop-color="#5c2b10"/><stop offset=".55" stop-color="#8e4a21"/><stop offset=".82" stop-color="#c28a49"/><stop offset="1" stop-color="#e5b979"/></radialGradient>
<linearGradient id="stream-${id}" x1="0" x2="1"><stop stop-color="#361707"/><stop offset=".45" stop-color="#d89851"/><stop offset="1" stop-color="#6e3717"/></linearGradient>
<clipPath id="inside-${id}"><path d="M69 132 C69 84 331 84 331 132 L298 418 Q200 455 102 418Z"/></clipPath>
<filter id="blur-${id}"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<ellipse cx="200" cy="455" rx="108" ry="14" fill="#171017" opacity=".14" filter="url(#blur-${id})"/>
<path d="M65 130 Q200 82 335 130 L301 421 Q200 466 99 421Z" fill="url(#body-${id})" stroke="#e7e8e5" stroke-width="2"/>
<ellipse cx="200" cy="130" rx="135" ry="42" fill="#c4c8c7"/><ellipse cx="200" cy="130" rx="126" ry="34" fill="#423c34"/>
<g clip-path="url(#inside-${id})"><g class="liquid-group">
<path d="M60 146 Q200 178 340 146 L340 470 H60Z" fill="url(#coffee-${id})"/>
<ellipse cx="200" cy="146" rx="132" ry="36" fill="url(#crema-${id})"/>
<ellipse class="ripple" cx="200" cy="146" rx="34" ry="10" fill="none" stroke="#f5cc8d" stroke-width="1.5" opacity=".6"/>
<ellipse cx="200" cy="146" rx="88" ry="24" fill="none" stroke="#e8b773" stroke-width="2" opacity=".45"/>
<path d="M112 139 Q160 120 185 136 T284 141" fill="none" stroke="#e6b276" stroke-width="3" opacity=".6"/>
<g fill="#eed4a0" opacity=".7"><circle cx="102" cy="147" r="3"/><circle cx="112" cy="153" r="2"/><circle cx="285" cy="142" r="2"/><circle cx="270" cy="153" r="3"/><circle cx="124" cy="156" r="1.5"/></g>
</g><path class="inside-stream" d="M195 130 L195 374 L205 374 L205 130Z" fill="url(#stream-${id})" opacity="0"/></g>
<path d="M68 136L102 417Q200 456 298 417L332 136" fill="url(#body-${id})" opacity=".35"/>
<path d="M80 224 Q200 265 320 224 L303 391 Q200 433 97 391Z" fill="url(#blue-${id})"/>
<path d="M84 227 Q200 270 316 227" fill="none" stroke="#5574ff" stroke-width="2"/>
<text x="200" y="333" text-anchor="middle" fill="#fffdf0" font-family="Arial,sans-serif" font-size="47" font-weight="800" letter-spacing="-3">KAAWA.</text>
<text x="200" y="359" text-anchor="middle" fill="#e2e7ff" font-family="Arial,sans-serif" font-size="7.5" letter-spacing="2">YOUR DAILY RITUAL</text>
<path d="M83 159 L110 410" stroke="#fff" stroke-width="5" opacity=".23" fill="none"/>
<path d="M318 162 L290 409" stroke="#081a52" stroke-width="3" opacity=".18" fill="none"/>
<ellipse cx="200" cy="130" rx="135" ry="42" fill="none" stroke="#f9f7ef" stroke-width="5"/>
<path d="M66 133 Q200 180 334 133" fill="none" stroke="#c3c9d5" stroke-width="2"/>
<path class="cup-stream" d="M194 -75 C188 15 203 60 195 140 L205 140 C211 60 199 15 206 -75Z" fill="url(#stream-${id})"/>
<g class="cup-steam" fill="none" stroke="#fff9e9" stroke-width="3" stroke-linecap="round" filter="url(#blur-${id})"><path d="M160 110 C130 78 185 69 158 27"/><path d="M203 100 C230 74 176 55 210 9"/><path d="M242 113 C269 82 222 65 252 40"/></g>
</svg>`;
$$('.cup-mount').forEach((el,i) => el.innerHTML = cup(i));
$('#year').textContent = new Date().getFullYear();
if (window.KAAWA_CONTENT?.openingHours) $('#opening-hours').textContent = window.KAAWA_CONTENT.openingHours;
function filter(category) {
 let count=0;
 $$('.menu-list li').forEach(el => {el.hidden = category !== 'all' && el.dataset.category !== category; if(!el.hidden) count++;});
 $$('.filters button').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.filter === category)));
 $('#filter-status').textContent = `${count} items shown`;
 if(window.ScrollTrigger) requestAnimationFrame(()=>ScrollTrigger.refresh());
}
$$('[data-filter]').forEach(el => el.addEventListener('click', () => filter(el.dataset.filter)));
$$('[data-select]').forEach(el => el.addEventListener('click', () => filter(el.dataset.select)));
const toggle = $('.menu-toggle'), mobileNav = $('#mobile-nav');
function closeMenu() {mobileNav.hidden=true;toggle.setAttribute('aria-expanded','false');$('span',toggle).textContent='＋';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;$('span',toggle).textContent=open?'−':'＋';});
$$('a',mobileNav).forEach(el=>el.addEventListener('click',closeMenu));
document.addEventListener('keydown', e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();toggle.focus();}});
matchMedia('(min-width: 551px)').addEventListener('change',closeMenu);
let navFrame=false;
window.addEventListener('scroll',()=>{if(!navFrame){navFrame=true;requestAnimationFrame(()=>{$('#header').classList.toggle('scrolled',scrollY>90);navFrame=false;});}},{passive:true});
$('#header').classList.toggle('scrolled',scrollY>90);
function finishIntro() {
 introTimeline?.kill();clearTimeout(safetyTimer);if(window.gsap){gsap.set('.hero h1,.hero-description,.hero-actions,.hero-photo',{opacity:1,y:0});gsap.set(intro,{opacity:1});}intro.classList.remove('active');intro.setAttribute('aria-hidden','true');skip.tabIndex=-1;
 if(document.activeElement===skip) $('.logo').focus();
 try{sessionStorage.setItem('kaawa-ritual-seen','1');}catch{}
}
skip.addEventListener('click',finishIntro);
// Static content and navigation remain available if the animation library fails.
if(!window.gsap || !window.ScrollTrigger){finishIntro();$('#replay').hidden=true;return;}
gsap.registerPlugin(ScrollTrigger);
function pour(tl, root, start, duration) {
 const liquid=$('.liquid-group',root),stream=$('.cup-stream',root);
 tl.fromTo($('.inside-stream',root),{opacity:0,attr:{d:'M195 130 L195 374 L205 374 L205 130Z'}},{opacity:1,attr:{d:'M195 130 L195 146 L205 146 L205 130Z'},duration,ease:'none'},start)
 .to($('.inside-stream',root),{opacity:0,duration:.1},start+duration-.1)
 .fromTo(liquid,{y:228},{y:0,duration,ease:'none'},start)
 .fromTo(stream,{opacity:0,scaleY:0,transformOrigin:'50% 0%'},{opacity:1,scaleY:1,duration:.15,ease:'power1.in'},start)
 .to(stream,{opacity:0,duration:.17},start+duration-.1)
 .fromTo($('.cup-steam',root),{opacity:0,y:10},{opacity:.6,y:-12,duration:.55},start+duration-.4)
 .fromTo($('.ripple',root),{scale:.3,opacity:.7,transformOrigin:'center'},{scale:2.8,opacity:0,duration:duration/3,repeat:2,ease:'power1.out'},start);
}
function playIntro() {
 if(isReduced()){finishIntro();return;}
 finishIntro();window.scrollTo({top:0,behavior:'instant'});
 intro.classList.add('active');intro.setAttribute('aria-hidden','false');skip.tabIndex=0;
 gsap.set('.intro-cup',{opacity:1,scale:1,x:0,y:0,rotation:0});gsap.set('.blue-wipe',{scale:0});gsap.set('.intro-caption,.intro-mark',{opacity:1});
 safetyTimer=setTimeout(finishIntro,4500);
 introTimeline=gsap.timeline({onComplete:finishIntro});
 introTimeline.fromTo('.intro-cup',{y:65,rotation:-9,opacity:0},{y:0,rotation:0,opacity:1,duration:.6,ease:'power3.out'});
 pour(introTimeline,$('.intro-cup'),.55,1.65);
 introTimeline.to('.intro-cup',{rotation:4,y:-10,duration:.25,ease:'sine.inOut'},2.2)
 .to('.intro-cup',{rotation:0,scale:1.7,y:75,duration:.6,ease:'power3.in'},2.45)
 .to('.intro-caption,.intro-mark',{opacity:0,duration:.2},2.5)
 .to('.blue-wipe',{scale:12,duration:.55,ease:'power3.inOut'},2.7)
 .fromTo('.hero h1',{y:35,opacity:0},{y:0,opacity:1,duration:.65,ease:'power3.out'},2.75)
 .fromTo('.hero-description,.hero-actions,.hero-photo',{y:35,opacity:0},{y:0,opacity:1,duration:.6,stagger:.08,ease:'power3.out'},2.85)
 .to(intro,{opacity:0,duration:.18},3.22)
 .set(intro,{opacity:1});
}
$('#replay').addEventListener('click',playIntro);
let seen=false;try{seen=!!sessionStorage.getItem('kaawa-ritual-seen');}catch{}
if(!seen&&!location.hash&&!isReduced()) playIntro();
function setupMotion() {
 motion?.revert();
 if(isReduced()){finishIntro();gsap.set('.liquid-group',{y:0});return;}
 motion=gsap.matchMedia();
 motion.add({desktop:'(min-width: 801px)',mobile:'(max-width: 800px)'},context=>{
  const mobile=context.conditions.mobile;
  const ritual=gsap.timeline({scrollTrigger:{trigger:'.ritual',start:'top top',end:'bottom bottom',scrub:.5,invalidateOnRefresh:true}});
  ritual.to('.ritual-stage',{backgroundColor:'#281910',color:'#f4f1e9',duration:1},0)
   .to('.ritual-first',{opacity:0,y:-45,duration:.35},.25)
   .fromTo('.ritual-second',{opacity:0,y:45},{opacity:1,y:0,duration:.4},.55);
  pour(ritual,$('.ritual-cup'),0,1);
  ritual.to('.ritual-cup',{scale:mobile?1.3:1.7,y:50,rotation:-5,duration:.45},1.05)
   .to('.ritual-wipe',{scale:12,duration:.45,ease:'power2.in'},1.23);
  $$('.product').forEach(el=>{
   gsap.fromTo($('.product-image',el),{clipPath:'inset(12% 0 12% 0)',y:50},{clipPath:'inset(0% 0 0% 0)',y:-15,ease:'none',scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 65%',scrub:.5}});
   gsap.fromTo($('.product-copy',el),{y:25},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'top 20%',scrub:.5}});
  });
  const cookieTimeline=gsap.timeline({scrollTrigger:{trigger:'.cookie-section',start:'top 65%',end:'bottom bottom',scrub:.5}});
  cookieTimeline.fromTo('.cookie-visual',{clipPath:mobile?'circle(28% at 50% 50%)':'circle(22% at 50% 50%)'},{clipPath:'circle(85% at 50% 50%)',duration:1,ease:'none'})
   .fromTo('.cookie-visual img',{scale:1},{scale:1.18,duration:1,ease:'none'},0)
   .fromTo('.cookie-copy',{opacity:0,y:40},{opacity:1,y:0,duration:.45},.5);
  const atmosphere=gsap.timeline({scrollTrigger:{trigger:'.atmosphere',start:'top top',end:'bottom bottom',scrub:.5}});
  atmosphere.to('.night',{opacity:1,duration:1,ease:'none'},0).to('.daynight-line i',{left:'100%',duration:1,ease:'none'},0);
  if(!mobile){
   const hero=$('.hero'); const move=e=>{gsap.to('.hero-photo',{x:(e.clientX/innerWidth-.5)*12,rotation:(e.clientX/innerWidth-.5)*.4,duration:.8,overwrite:'auto'});};
   const leave=()=>gsap.to('.hero-photo',{x:0,rotation:0,duration:.8});
   hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',leave);
   const cleanup=[];
   $$('.magnetic').forEach(el=>{const m=e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.07,y:(e.clientY-r.top-r.height/2)*.09,duration:.3});};const l=()=>gsap.to(el,{x:0,y:0,duration:.4});el.addEventListener('pointermove',m);el.addEventListener('pointerleave',l);cleanup.push(()=>{el.removeEventListener('pointermove',m);el.removeEventListener('pointerleave',l);});});
   return()=>{hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);cleanup.forEach(fn=>fn());};
  }
 });
}
setupMotion();reduce.addEventListener('change',setupMotion);
$('#motion-toggle').addEventListener('click',()=>{userReduced=!userReduced;document.documentElement.classList.toggle('reduced-motion',userReduced);$('#motion-toggle').setAttribute('aria-pressed',String(userReduced));setupMotion();ScrollTrigger.refresh();});
window.addEventListener('load',()=>ScrollTrigger.refresh());
window.addEventListener('pagehide',()=>{finishIntro();motion?.revert();});
window.addEventListener('pageshow',e=>{if(e.persisted)setupMotion();});
})();
