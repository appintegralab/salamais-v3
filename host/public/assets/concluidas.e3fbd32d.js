import{Q as h,a as v}from"./QTr.6ba7f04a.js";import{Q as x}from"./QTable.6c172721.js";import{_ as w,u as y,m as b,q as g,e as D,o as V,r as f,a as p,b as F,c as I,f as e,h as n,K as c,j as Q,k,i as q}from"./index.2bd1149f.js";import"./QLinearProgress.69a859f2.js";const B={components:{},props:{},data(){return{refresh:0,tab:"mails",userStore:y(),filter:"",columns:[{label:"Forma\xE7\xF5es conclu\xEDdas",field:"nome",align:"left",sortable:!0},{label:"",sortable:!1}],rows:[],removeDialog:[]}},computed:{moment(){return b}},mounted(){this.load()},methods:{async load(){let r=this,i=g(f(p,"/salamais/inscricoes"),V("userID"),D(this.userStore.user.id));F(i,d=>{let s=d.val();console.log("inscricoes",s);function t(o,a){q(f(p,o)).then(l=>{l.val()&&r.rows.push(a)})}r.rows=[];for(let o in s)for(let a in s[o].encontros){let l="sala"+s[o].encontros[a].sala,u=s[o].encontros[a].area,m=l+":"+s[o].formacaoID+":"+a+":"+u;console.log("pathID",m);let _="/salamais/listaPresenca/"+m+"/"+r.userStore.user.id;t(_,s[o])}})}}},C=e("div",{class:"flex items-center mx-4 my-1 pt-2 fw-500"},[e("div",{class:"h-[20px] fs-12pt mr-1"},[e("span",{class:"iconify","data-icon":"mdi:school","data-inline":"false"})]),e("div",null," Meus certificados emitidos ")],-1),S={class:"mx-4"},T={class:"w-full"},K={class:"p-1 flex items-center justify-between"},P={class:"flex items-center"},j={class:"-mb-2"},N=e("div",{class:"pl-1"},[e("span",{class:"iconify text-[14pt]","data-icon":"mi:search"})],-1),E=e("div",{class:"flex items-center"},[e("div",null,[e("span",{class:"iconify text-[12pt]","data-icon":"mdi:school"})]),e("div",{class:"ml-2 w-[160px]"},[e("div",{class:"text-[5pt] leading-3 fw-600"}," Forma\xE7\xE3o ")])],-1);function M(r,i,d,s,t,o){const a=Q("FormKit");return k(),I("div",null,[C,e("div",S,[n(x,{dense:"",pagination:{rowsPerPage:20},rows:t.rows,filter:t.filter,columns:t.columns,"row-key":"name"},{top:c(()=>[e("div",T,[e("div",K,[e("div",P,[e("div",j,[n(a,{modelValue:t.filter,"onUpdate:modelValue":i[0]||(i[0]=l=>t.filter=l),classes:{inner:"h-7"},type:"text",placeholder:"Filtrar"},null,8,["modelValue"])]),N])])])]),body:c(l=>[n(h,{props:l},{default:c(()=>[n(v,null,{default:c(()=>[E]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","filter","columns"])])])}var G=w(B,[["render",M]]);export{G as default};
