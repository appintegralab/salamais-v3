var _=Object.defineProperty,x=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var v=(e,t,r)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))w.call(t,r)&&v(e,r,t[r]);if(c)for(var r of c(t))B.call(t,r)&&v(e,r,t[r]);return e},o=(e,t)=>x(e,C(t));import{p as z,t as D,v as L,x as P,y as F,C as a,n as s,D as N,G as Q}from"./index.2bd1149f.js";let E=!1;{const e=document.createElement("div"),t=document.createElement("div");e.setAttribute("dir","rtl"),e.style.width="1px",e.style.height="1px",e.style.overflow="auto",t.style.width="1000px",t.style.height="1px",document.body.appendChild(e),e.appendChild(t),e.scrollLeft=-1e3,E=e.scrollLeft>=0,e.remove()}const A={xs:2,sm:4,md:6,lg:10,xl:14};function m(e,t,r){return{transform:t===!0?`translateX(${r.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var I=z({name:"QLinearProgress",props:o(l(l({},D),L),{value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean}),setup(e,{slots:t}){const{proxy:r}=Q(),g=P(e,r.$q),u=F(e,A),n=a(()=>e.indeterminate===!0||e.query===!0),i=a(()=>e.reverse!==e.query),y=a(()=>o(l({},u.value!==null?u.value:{}),{"--q-linear-progress-speed":`${e.animationSpeed}ms`})),f=a(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),h=a(()=>m(e.buffer!==void 0?e.buffer:1,i.value,r.$q)),b=a(()=>`q-linear-progress__track absolute-full q-linear-progress__track--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__track--${g.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),q=a(()=>m(n.value===!0?1:e.value,i.value,r.$q)),k=a(()=>`q-linear-progress__model absolute-full q-linear-progress__model--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__model--${n.value===!0?"in":""}determinate`),$=a(()=>({width:`${e.value*100}%`})),S=a(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"}`);return()=>{const d=[s("div",{class:b.value,style:h.value}),s("div",{class:k.value,style:q.value})];return e.stripe===!0&&n.value===!1&&d.push(s("div",{class:S.value,style:$.value})),s("div",{class:f.value,style:y.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},N(t.default,d))}}});export{I as Q,E as r};