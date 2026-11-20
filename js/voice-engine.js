window.VE=(()=>{const ss=window.speechSynthesis;let list=[],i=0,playing=false,tok=0,rate=0.9,pitch=1,voice=null,hi=()=>{};
const clean=s=>s.replace(/\[[^\]]*\]/g,'').trim();
function speak(){if(!ss)return;if(i>=list.length){playing=false;hi(-1);return}const t=clean(list[i]);if(!t){i++;return speak()}
const u=new SpeechSynthesisUtterance(t),my=++tok;u.rate=rate;u.pitch=pitch;if(voice)u.voice=voice;u.onstart=()=>hi(i);u.onend=()=>{if(playing&&my===tok){i++;speak()}};ss.speak(u)}
return{supported:!!ss,voices:()=>ss?ss.getVoices().filter(v=>/^en/i.test(v.lang)):[],
load(l){this.stop();list=l},play(){if(!ss)return;if(ss.paused){ss.resume();playing=true;return}playing=true;tok++;ss.cancel();speak()},
pause(){if(ss){playing=false;ss.pause()}},stop(){playing=false;tok++;i=0;if(ss)ss.cancel();hi(-1)},
skip(d){if(!ss)return;i=Math.max(0,Math.min(list.length-1,i+d));playing=true;tok++;ss.cancel();speak()},
set(o){if('rate'in o)rate=o.rate;if('pitch'in o)pitch=o.pitch;if('voice'in o)voice=o.voice},onHi(f){hi=f},wpm:()=>Math.round(140*rate)}})();