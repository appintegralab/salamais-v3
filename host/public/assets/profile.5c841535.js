import{Q as H,a as B,b as $,c as C}from"./QTabPanels.584a5de3.js";import{_ as D,cO as q,cP as M,cQ as j,cR as P,i as k,r as h,a as x,P as b,R as S,j as g,k as r,l as y,K as p,h as c,W as L,T as Y,U as J,V as K,a1 as W,O as w,f as s,Y as X,c as m,g as V,X as Z,M as T,N as d,d as u,F as U,cS as G,Z as ss,a0 as v,u as I,m as Q,a2 as z,L as es,q as R,e as A,o as O,b as N,a5 as ts}from"./index.2bd1149f.js";import{f as os}from"./caixa-formacao.75e1d637.js";import{b as as}from"./badge-area.51bfdf65.js";import is from"./facilitador.3dbbd885.js";import{Q as ls}from"./QImg.297fc3cd.js";import{Q as rs}from"./QLinearProgress.69a859f2.js";import"./caixa-formacao-info.1312eccb.js";import"./QTr.6ba7f04a.js";import"./QTable.6c172721.js";const ns={components:{},props:{},data(){return{dialog:!1,user:null,inputCss:{inner:"h-7 text-[8pt] fw-700"},areas:[],formData:{areas:[]},optionsCampus:[]}},computed:{optionsIES(){let e=[];for(let t in q)e.push({label:q[t].nome,value:t});return e},optionsCargos(){let e=[];for(let t in M)e.push({label:M[t].cargo,value:t});return e},optionsRegionais(){let e=[];for(let t in j)e.push({label:j[t].regional,value:t});return e}},watch:{"formData.ies":function(){console.log("ies mudou"),this.optionsCampus=[];let e=this.formData.ies;if(q[e]!=null)for(let t in q[e].campus)this.optionsCampus.push({label:P[t].nome,value:t})}},mounted(){let e=this;k(h(x,"/salamais/areas")).then(t=>{let o=t.val();e.areas=o})},methods:{show(e){let t=JSON.parse(JSON.stringify(e));this.formData=t,this.dialog=!0},uuidv4(e){return e.normalize("NFD").replace(/[ \u0300-\u036f]/g,"").toUpperCase().substr(0,10)+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,o=>(o^crypto.getRandomValues(new Uint8Array(1))[0]&15>>o/4).toString(16)).substr(0,6)},submitHandler(){let e=this;if(console.log("this.formData",this.formData),this.formData.nome==""){this.$q.notify(b.error("Nome obrigat\xF3rio!"));return}if(this.formData.cpf==""){this.$q.notify(b.error("CPF obrigat\xF3rio!"));return}if(this.formData.email==""){this.$q.notify(b.error("Email obrigat\xF3rio!"));return}if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)){this.$q.notify(b.error("Email inv\xE1lido!"));return}if(this.formData.telefone==""){this.$q.notify(b.error("Telefone obrigat\xF3rio!"));return}if(this.formData.areas.length==0){this.$q.notify(b.error("Sele\xE7\xE3o de \xC1rea \xE9 obrigat\xF3ria!"));return}if(this.formData.id==null){let o=this.uuidv4(this.formData.nome);console.log(o)}else e.dialog=!1,S(h(x,"/salamais/usuarios/"+this.formData.id),this.formData),e.$emit("updated"),e.$q.notify(b.success("Altera\xE7\xE3o de informa\xE7\xF5es pessoais realizada com sucesso"))}}},cs=s("span",{class:"iconify text-lg","data-icon":"ic:person"},null,-1),ds=s("span",{class:"text-base"}," Editar dados pessoais ",-1),ms={class:"border rounded shadow p-2 m-1 mx-3"},us={class:"px-2"},fs={class:"px-2 mb-3"},ps=s("div",{class:"fw-600 text-[9pt]"},"CPF *",-1),_s={class:"col-span-1 px-2"},hs={class:"grid grid-cols-2"},xs={class:"col-span-1 px-2"},gs={class:"col-span-1 px-2"},vs={class:"grid grid-cols-3"},bs={class:"col-span-1 px-2"},ys={class:"col-span-1 px-2"},ws={class:"col-span-1 px-2"},Ds={class:"px-2 mb-3"},ks=s("div",{class:"fw-600 text-[9pt]"},"\xC1reas de conhecimento *",-1),Is={class:"border rounded p-1"},$s={class:"grid grid-cols-2"},Cs={class:"flex items-center"},qs={class:"mt-1 border-t pt-2 px-2"},Ss={class:"flex justify-center"},Ts=s("span",{class:"iconify text-base mr-1","data-icon":"ic:save"},null,-1),Vs=v(" salvar informa\xE7\xF5es ");function Us(e,t,o,i,a,l){const f=g("FormKit");return r(),y(ss,{modelValue:a.dialog,"onUpdate:modelValue":t[3]||(t[3]=n=>a.dialog=n)},{default:p(()=>[c(G,{class:"w-[470px]"},{default:p(()=>[c(L,{class:"h-[20px]"},{default:p(()=>[c(Y,{size:"28px",class:"bg-slate-300"},{default:p(()=>[cs]),_:1}),c(J,null,{default:p(()=>[ds]),_:1}),K(c(w,{flat:"",round:"",dense:"",icon:"close"},null,512),[[W]])]),_:1}),s("div",ms,[c(f,{id:"formacao",type:"form",modelValue:a.formData,"onUpdate:modelValue":t[2]||(t[2]=n=>a.formData=n),actions:!1,onSubmit:l.submitHandler},{default:p(()=>[s("div",us,[c(f,{name:"nome",label:"Nome completo *",help:"Indique seu nome completo",classes:a.inputCss,validation:"required"},null,8,["classes"])]),s("div",fs,[ps,c(X,{class:"text-xs",dense:"",outlined:"",modelValue:a.formData.cpf,"onUpdate:modelValue":t[0]||(t[0]=n=>a.formData.cpf=n),mask:"###.###.###-##"},null,8,["modelValue"])]),s("div",_s,[c(f,{type:"email",name:"email",label:"Email *",help:"Indique um email v\xE1lido",classes:a.inputCss,validation:"required|email"},null,8,["classes"])]),s("div",hs,[s("div",xs,[c(f,{type:"tel",name:"telefone",label:"Telefone *",help:"Indique um telefone (99) 9999-9999",classes:a.inputCss,validation:"required"},null,8,["classes"])]),s("div",gs,[c(f,{type:"select",name:"cargo",label:"Cargo (fun\xE7\xE3o)",help:"Indique cargo / fun\xE7\xE3o de atua\xE7\xE3o",classes:a.inputCss,options:l.optionsCargos},null,8,["classes","options"])])]),s("div",vs,[s("div",bs,[c(f,{type:"select",name:"ies",label:"Unidade (IES)",help:"Indique a unidade de atua\xE7\xE3o",classes:a.inputCss,options:l.optionsIES},null,8,["classes","options"])]),s("div",ys,[c(f,{type:"select",name:"campus",label:"Campus",help:"Indique o campus de atua\xE7\xE3o",classes:a.inputCss,options:a.optionsCampus},null,8,["classes","options"])]),s("div",ws,[c(f,{type:"select",name:"regional",label:"Regional",help:"Indique a regional de atua\xE7\xE3o",classes:a.inputCss,options:l.optionsRegionais},null,8,["classes","options"])])]),s("div",Ds,[ks,s("div",Is,[s("div",$s,[(r(!0),m(U,null,V(a.areas,(n,_)=>(r(),m("div",{key:_},[c(Z,{size:"30px",modelValue:a.formData.areas,"onUpdate:modelValue":t[1]||(t[1]=E=>a.formData.areas=E),val:n.id,color:"grey"},{default:p(()=>[s("div",Cs,[e.$q.screen.xs?u("",!0):(r(),m("div",{key:0,style:T("background-color:"+n.cor),class:"text-[5pt] fw-400 py-0 px-1 rounded text-white"},d(n.sigla),5)),s("div",{style:T("color:"+n.cor),class:"ml-1 text-[6pt] sm:text-[6pt] fw-600"},d(n.nome),5)])]),_:2},1032,["modelValue","val"])]))),128))])])]),s("div",qs,[s("div",Ss,[c(w,{onClick:l.submitHandler,size:"sm",outline:"",class:"flex items-center"},{default:p(()=>[Ts,Vs]),_:1},8,["onClick"])])])]),_:1},8,["modelValue","onSubmit"])])]),_:1})]),_:1},8,["modelValue"])}var Es=D(ns,[["render",Us]]);const Fs={components:{formedituser:Es},props:{user:{default:null,type:Object}},data(){return{tab:"mails",areas:{},userStore:I()}},computed:{campusNome(){return P[this.user.campus].nome},cargoNome(){return M[this.user.cargo].cargo},isUserLog(){return this.userStore.user.id==this.user.id}},mounted(){let e=this;k(h(x,"/salamais/areas/")).then(t=>{let o=t.val();for(let i in o)e.areas[o[i].id]=o[i]})},methods:{}},Ms={key:0},Ys={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},Qs=s("div",{class:"col-span-3 sm:col-span-3 md:col-span-3 pb-1 text-xs border-b fw-500"}," Dados pessoais ",-1),Ns={key:0,class:"col-span-1 pb-1 text-xs border-b fw-500 flex justify-end"},js=s("span",{class:"iconify mr-1 text-[8pt]","data-icon":"ic:edit"},null,-1),zs=s("span",{class:"text-[7pt] pt-[2px]"},"editar",-1),Ps={class:"mt-2 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},Rs=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Nome: ",-1),As={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},Os={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},Hs=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," CPF: ",-1),Bs={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},Ls={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},Js=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Email: ",-1),Ks={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},Ws={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},Xs=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Telefone: ",-1),Zs={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},Gs={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},se=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Cargo: ",-1),ee={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},te={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},oe=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," IES: ",-1),ae={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},ie={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},le=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Regional: ",-1),re={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},ne={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},ce=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," Campus: ",-1),de={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},me={class:"mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7"},ue=s("div",{class:"col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600"}," \xC1reas: ",-1),fe={class:"col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400"},pe={key:0,class:"flex items-center"};function _e(e,t,o,i,a,l){const f=g("formedituser");return o.user!=null?(r(),m("div",Ms,[s("div",Ys,[Qs,l.isUserLog?(r(),m("div",Ns,[c(w,{onClick:t[0]||(t[0]=n=>e.$refs.formedituserref.show(o.user)),size:"xs",class:"px-2 flex items-center"},{default:p(()=>[js,zs]),_:1})])):u("",!0)]),s("div",Ps,[Rs,s("div",As,d(o.user.nome),1)]),s("div",Os,[Hs,s("div",Bs,d(o.user.cpf),1)]),s("div",Ls,[Js,s("div",Ks,d(o.user.email),1)]),s("div",Ws,[Xs,s("div",Zs,d(o.user.telefone),1)]),s("div",Gs,[se,s("div",ee,d(l.cargoNome),1)]),s("div",te,[oe,s("div",ae,d(o.user.ies),1)]),s("div",ie,[le,s("div",re,d(o.user.regional),1)]),s("div",ne,[ce,s("div",de,d(o.user.campus)+" - "+d(l.campusNome),1)]),s("div",me,[ue,s("div",fe,[Object.keys(a.areas).length>0?(r(),m("div",pe,[(r(!0),m(U,null,V(o.user.areas,(n,_)=>(r(),m("div",{class:"mr-2 pb-1 flex items-center",key:_},[e.$q.screen.xs?u("",!0):(r(),m("div",{key:0,style:T("background-color:"+a.areas[n].cor),class:"text-[5pt] fw-400 py-0 px-1 rounded text-white"},d(a.areas[n].sigla),5)),s("div",{style:T("color:"+n.cor),class:"ml-1 text-[6pt] sm:text-[6pt] fw-600"},d(a.areas[n].nome),5)]))),128))])):u("",!0)])]),c(f,{ref:"formedituserref",onUpdated:t[1]||(t[1]=n=>e.$emit("updated"))},null,512)])):u("",!0)}var he=D(Fs,[["render",_e]]);const xe={components:{badgearea:as},props:{formacao:{default:null,type:Object}},data(){return{}},computed:{moment(){return Q},inscEncontros(){let e={};for(let t in this.formacao.inscEncontros){let o=this.formacao.inscEncontros[t].encontroID,i=this.formacao.inscEncontros[t].area,a={id:o,area:i};e[a.id]=a}return e}},methods:{}},ge={key:0,class:""},ve={class:"grid grid-cols-2"},be={class:"col-span-1 pt-1 pb-3"},ye={class:"flex items-center"},we={class:"fw-600 text-[10pt] text-green-600"},De={key:0,class:"ml-1 text-[7pt] fw-600 px-1 pt-[2px] rounded text-green-700 bg-slate-300"},ke={key:0,class:"my-[3px] fw-400 text-[8pt]"},Ie=s("span",null,"DATA:",-1),$e={class:"ml-1 text-[8pt] fw-500 px-1 pt-[2px] rounded text-green-700 bg-slate-200"},Ce={class:"ml-1 text-[9pt] fw-300"},qe={key:1,class:"my-[3px] fw-400 text-[8pt]"},Se=s("span",{class:"fw-500 text-[8pt]"},"Per\xEDodo:",-1),Te={class:"ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200"},Ve={class:"text-[6pt]"},Ue=s("span",{class:"px-1"},"at\xE9",-1),Ee={class:"ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200"},Fe={class:"text-[6pt]"},Me={class:"leading-[0.8rem] fw-300 pr-2"},Ye=s("div",{class:"fw-500 mt-1 text-[8pt]"},"Descri\xE7\xE3o: ",-1),Qe={class:"border border-gray-200 rounded p-1 px-2 text-[7pt] finter text-justify mt-1"},Ne={class:"col-span-1 border rounded"},je={class:"p-1 fw-400 text-[7pt]"},ze={key:0,class:"flex items-center justify-between"},Pe=s("div",{class:"fw-500 text-[8pt]"}," Op\xE7\xF5es de encontro(s): ",-1),Re={key:0,class:"flex items-center fw-300 text-[7pt]"},Ae=s("span",null,"escolher 1 op\xE7\xE3o",-1),Oe=s("span",{class:"ml-1 iconify text-[11pt]","data-icon":"ph:question-duotone"},null,-1),He=s("div",{class:"flex items-center"},[s("div",{class:"w-[20px] h-[20px] text-[15pt]"},[s("span",{class:"absolute iconify","data-icon":"ph:question-duotone"})]),s("div",{class:"pl-3 w-[180px]"}," Ser\xE1 ofertada a mesma forma\xE7\xE3o nos diversos encontros ")],-1),Be={key:1,class:"flex items-center fw-300 text-[7pt]"},Le=s("span",null,"escolher op\xE7\xF5es",-1),Je=s("span",{class:"ml-1 iconify text-[11pt]","data-icon":"ph:question-duotone"},null,-1),Ke=s("div",{class:"flex items-center"},[s("div",{class:"w-[20px] h-[20px] text-[15pt]"},[s("span",{class:"absolute iconify","data-icon":"ph:question-duotone"})]),s("div",{class:"pl-3 w-[180px]"}," Voc\xEA poder\xE1 se inscrever em diversos encontros em diferentes hor\xE1rios ")],-1),We={key:1},Xe=s("span",{class:"fw-500 text-[8pt]"}," Encontro(s): ",-1),Ze=[Xe],Ge={key:0,class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},st={class:"ml-1 text-[7pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},et={class:"ml-1 text-[7pt] fw-300"},tt=s("span",{class:"ml-2 fw-200"},"Hor\xE1rio:",-1),ot={class:"px-1 rounded text-[7pt] fw-500 text-slate-900"},at={key:1,class:"flex items-center mt-1 p-1 border border-green-800 rounded"},it={class:"ml-1 text-[7pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},lt={class:"ml-1 text-[7pt] fw-300"},rt=s("span",{class:"ml-2 fw-200"},"Hor\xE1rio:",-1),nt={class:"px-1 rounded text-[7pt] fw-500 text-slate-900"},ct=s("div",{class:"ml-1 h-[12px] flex items-center rounded-lg bg-gray-200 text-green-800 pr-1"},[s("div",{class:"rounded-lg bg-gray-300 -mt-[1px]"},[s("span",{class:"iconify text-[10pt]","data-icon":"ic:check"})]),s("span",{class:"ml-1 text-[6pt] fw-500 mt-[1px]"},"inscrito")],-1),dt={key:0,class:"pt-[1px]"};function mt(e,t,o,i,a,l){const f=g("badgearea");return o.formacao!=null?(r(),m("div",ge,[s("div",ve,[s("div",be,[s("div",ye,[s("div",we,[v(d(o.formacao.nome)+" ",1),o.formacao.turmasPorArea?(r(),m("span",De," Turmas por \xC1rea ")):u("",!0)])]),o.formacao.dataInicio==o.formacao.dataTermino?(r(),m("div",ke,[Ie,s("span",$e,d(l.moment(o.formacao.dataInicio).format("DD/MM/YYYY")),1),s("span",Ce," ("+d(l.moment(o.formacao.dataInicio).locale("pt-br").format("dddd"))+") ",1)])):u("",!0),o.formacao.dataInicio!=o.formacao.dataTermino?(r(),m("div",qe,[Se,s("span",Te,[v(d(l.moment(o.formacao.dataInicio).format("DD/MM/YYYY"))+" ",1),s("span",Ve," ("+d(l.moment(o.formacao.dataInicio).locale("pt-br").format("ddd").toUpperCase())+") ",1)]),Ue,s("span",Ee,[v(d(l.moment(o.formacao.dataTermino).format("DD/MM/YYYY"))+" ",1),s("span",Fe," ("+d(l.moment(o.formacao.dataTermino).locale("pt-br").format("ddd").toUpperCase())+") ",1)])])):u("",!0),s("div",Me,[Ye,s("div",Qe,d(o.formacao.descr),1)])]),s("div",Ne,[s("div",je,[o.formacao.inscrPorEncontro?(r(),m("div",ze,[Pe,o.formacao.multiplaInscr?u("",!0):(r(),m("div",Re,[Ae,s("div",null,[Oe,c(z,{class:"bg-white text-slate-900 border"},{default:p(()=>[He]),_:1})])])),o.formacao.multiplaInscr?(r(),m("div",Be,[Le,s("div",null,[Je,c(z,{class:"bg-white text-slate-900 border"},{default:p(()=>[Ke]),_:1})])])):u("",!0)])):u("",!0),o.formacao.inscrPorEncontro?u("",!0):(r(),m("div",We,Ze)),(r(!0),m(U,null,V(o.formacao.encontros,(n,_)=>(r(),m("div",{key:_},[l.inscEncontros[n.id]==null?(r(),m("div",Ge,[s("div",null,[s("span",st,d(l.moment(n.data).format("DD/MM/YYYY")),1),s("span",et," ("+d(l.moment(n.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),s("div",null,[tt,s("span",ot,d(n.horaInicio)+" \xE0s "+d(n.horaTermino),1)])])):u("",!0),l.inscEncontros[n.id]!=null?(r(),m("div",at,[s("div",null,[s("span",it,d(l.moment(n.data).format("DD/MM/YYYY")),1),s("span",lt," ("+d(l.moment(n.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),s("div",null,[rt,s("span",nt,d(n.horaInicio)+" \xE0s "+d(n.horaTermino),1)]),ct,l.inscEncontros[n.id].area!=""?(r(),m("div",dt,[c(f,{sigla:l.inscEncontros[n.id].area},null,8,["sigla"])])):u("",!0)])):u("",!0)]))),128))])])])])):u("",!0)}var ut=D(xe,[["render",mt]]);const ft={components:{caixaformacaoinfoinsc:ut},props:{formacao:{default:null,type:Object},userID:{default:"noid",type:String}},data(){return{removeDialog:!1,refresh:0,userStore:I()}},computed:{moment(){return Q},isMe(){return this.userStore.user.id==this.userID}},watch:{formacao(){this.refresh++}},methods:{cancelar(){let e=this;console.log("cancelar",this.formacao),console.log(this.formacao.inscricaoID);for(let t in this.formacao.inscEncontros){let o=this.formacao.inscEncontros[t];console.log("encontro",o);let i="";o.area==null||o.area==""?i="/salamais/formacoes/"+this.formacao.id+"/encontros/"+o.encontroID+"/salas/sala"+o.sala+"/inscricoes/"+this.userStore.user.id:i="/salamais/formacoes/"+this.formacao.id+"/encontros/"+o.encontroID+"/areas/"+o.area+"/salas/sala"+o.sala+"/inscricoes/"+this.userStore.user.id,console.log("path",i),S(h(x,i),null)}S(h(x,"/salamais/inscricoes/"+this.formacao.inscricaoID),null),e.$q.notify(b.success("Inscri\xE7\xE3o cancelada com sucesso!")),e.removeDialog=!1}}},pt={key:0,class:"flex mb-1"},_t=s("div",{class:"flex-shrink w-[48px]"},[s("div",null,[s("div",{class:"absolute mx-3 bg-green-700 text-white w-6 h-6 border rounded-full flex items-center justify-center"},[s("span",{class:"iconify","data-icon":"mdi:calendar-check","data-inline":"false"})])]),s("div",{class:"w-1 h-full mx-auto border bg-green-400"})],-1),ht={class:"pt-1 pb-3 flex-1"},xt={key:0,class:"mt-2"},gt={class:"flex items-center text-green-700"},vt=s("div",null,[s("span",{class:"text-green-700 text-[10pt] iconify","data-icon":"mdi:calendar-check"})],-1),bt={class:"flex items-center ml-1 pt-[2px] fw-600 text-[8pt]"},yt=v(" Inscri\xE7\xE3o realizada "),wt={class:"ml-1 mt-[3px] text-[6pt] fw-300 text-black"},Dt=s("span",{class:"iconify text-[8pt] mr-1","data-icon":"ic:school"},null,-1),kt=v(" ver forma\xE7\xE3o "),It=s("span",{class:"iconify text-[8pt] mr-1","data-icon":"ic:cancel"},null,-1),$t=v(" cancelar inscri\xE7\xE3o "),Ct={class:"rounded w-[240px]"},qt=s("div",{class:"flex p-1 bg-red-800 text-white"},[s("div",{class:"text-[10pt] px-1"},[s("span",{class:"iconify","data-icon":"mdi:warning"})]),s("div",{class:"text-[8pt] fw-700"},"Deseja realmente cancelar a inscri\xE7\xE3o?")],-1),St={class:"flex justify-around p-2"},Tt=v("N\xE3o"),Vt=v("sim "),Ut=s("div",{class:"border-t mt-1 mb-2"},null,-1);function Et(e,t,o,i,a,l){const f=g("caixaformacaoinfoinsc");return o.formacao!=null?(r(),m("div",pt,[_t,s("div",ht,[(r(),y(f,{formacao:o.formacao,key:a.refresh},null,8,["formacao"])),o.formacao.inscricao?(r(),m("div",xt,[s("div",gt,[vt,s("div",bt,[yt,s("span",wt," em "+d(l.moment(o.formacao.dataInscricao).format("DD/MM/YYYY"))+" - "+d(l.moment(o.formacao.dataInscricao).format("HH:mm")),1),c(w,{onClick:t[0]||(t[0]=n=>e.$router.push({path:"/formacao/"+o.formacao.id})),outline:"",size:"5pt",class:"px-2 text-[7pt] ml-4 text-green-800"},{default:p(()=>[Dt,kt]),_:1}),l.isMe?(r(),y(w,{key:0,outline:"",size:"5pt",class:"px-2 text-[7pt] ml-4 text-red-800"},{default:p(()=>[It,$t,c(es,{modelValue:a.removeDialog,"onUpdate:modelValue":t[2]||(t[2]=n=>a.removeDialog=n),anchor:"bottom right",self:"bottom left"},{default:p(()=>[s("div",Ct,[qt,s("div",St,[c(w,{onClick:t[1]||(t[1]=n=>a.removeDialog=!1),size:"xs"},{default:p(()=>[Tt]),_:1}),c(w,{onClick:l.cancelar,class:"bg-red-800 text-white",size:"xs"},{default:p(()=>[Vt]),_:1},8,["onClick"])])])]),_:1},8,["modelValue"])]),_:1})):u("",!0)])])])):u("",!0),Ut])])):u("",!0)}var Ft=D(ft,[["render",Et]]);const Mt={components:{formacao:os,formacaoinsc:Ft},props:{userID:{default:"noid",type:String}},data(){return{refresh:0,userStore:I(),inscricoes:[],formacoes:[]}},computed:{moment(){return Q},isMe(){return this.userStore.user.id==this.userID}},mounted(){console.log("minhas-forma\xE7\xF5es mounted"),this.load()},methods:{load(){let e=this,t=R(h(x,"/salamais/inscricoes"),O("userID"),A(this.userID));N(t,o=>{let i=o.val();if(console.log("inscricoes",i),e.formacoes=[],i!=null){e.formacoes=[];async function a(f){let _=(await k(h(x,"/salamais/formacoes/"+f.formacaoID))).val();console.log("formacao",_),_.inscricao=!1,_.dataInscricao="",_.opcao=0,_.inscricaoID=f.id,_.inscricao=!0,_.dataInscricao=f.createdAt,_.inscEncontros=f.encontros,e.formacoes.push(_)}async function l(){for(let f in i)await a(i[f]);e.inscricoes=i,console.log("inscricoes",i),console.log("self.formacoes",e.formacoes),e.refresh++,e.$forceUpdate()}l()}})},verInformacoes(){console.log("verInformacoes")},inscricao(e){this.$refs.dialoginscricaoref.show(e)},novaInscricao(){this.load()}}},Yt={class:"m-1 p-2 border"},Qt=s("div",{class:"fw-600"}," Minhas inscri\xE7\xF5es ",-1),Nt=s("div",{class:"border-t mt-1 mb-3 mr-3"},null,-1),jt={class:"py-1 pr-3"},zt={key:0},Pt=s("div",{class:"border rounded shadow p-1 text-xs fw-300 bg-slate-200"}," Nenhuma inscri\xE7\xE3o foi encontrada ",-1),Rt=[Pt];function At(e,t,o,i,a,l){const f=g("formacaoinsc");return r(),m("div",Yt,[Qt,Nt,s("div",jt,[a.formacoes.length==0?(r(),m("div",zt,Rt)):u("",!0),(r(!0),m(U,null,V(a.formacoes,(n,_)=>(r(),m("div",{key:_+a.refresh},[n.inscricao?(r(),y(f,{key:0,userID:o.userID,formacao:n,onRemoveInscricao:l.novaInscricao},null,8,["userID","formacao","onRemoveInscricao"])):u("",!0)]))),128))])])}var Ot=D(Mt,[["render",At]]);const Ht={props:{userID:{default:"noid",type:String}},data(){return{userStore:I(),isMe:!1,user:null,progressUpload:0,progress:!1,done:!1,file:File,uploadTask:""}},watch:{userID(){this.load()},uploadTask:function(){let e=this;this.uploadTask.on("state_changed",t=>{this.progressUpload=Math.floor(t.bytesTransferred/t.totalBytes*100),this.progressUpload==100&&setTimeout(()=>{e.done=!0,e.progress=!1,setTimeout(()=>{e.done=!1},2e3)},600)},null,()=>{this.uploadTask.snapshot.ref.getDownloadURL().then(t=>{this.saveUrl(t)})})}},mounted(){this.load()},methods:{load(){let e=this;this.userID==this.userStore.user.id?(this.isMe=!0,this.user=this.userStore.user):N(h(x,"/salamais/usuarios/"+this.userID),t=>{e.user=t.val()})},changeFoto(){this.$refs.file.click()},detectFiles(e){this.progress=!0,Array.from(Array(e.length).keys()).map(t=>{this.upload(e[t])})},upload(e){this.uploadTask=ts.ref("/profiles/"+this.userStore.user.id+".png").put(e)},saveUrl(e){let t="/salamais/usuarios/"+this.userID+"/urlFoto";S(h(x,t),e),this.user.urlFoto=e}}},Bt={key:0,class:"col-span-1 py-5 text-center"},Lt=s("span",{class:"text-xs iconify","data-icon":"ic:round-photo-camera"},null,-1),Jt={class:"mt-1"},Kt={class:"absolute-full flex flex-center"},Wt={class:"text-[7pt] fw-600 text-white"},Xt={key:1,class:"flex itens-center justify-center mt-2 fw-600 text-green-800"},Zt=s("span",{class:"iconify text-[10pt] mr-1","data-icon":"ic:baseline-check-circle"},null,-1),Gt=s("span",{class:"text-[6pt]"},"Imagem alterada com sucesso!",-1),so=[Zt,Gt];function eo(e,t,o,i,a,l){return a.user!=null?(r(),m("div",Bt,[c(Y,{class:"w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"},{default:p(()=>[c(ls,{src:a.user.urlFoto},null,8,["src"])]),_:1}),a.isMe?(r(),m("div",{key:0,class:"relative -mt-6 ml-12 sm:ml-16",onClick:t[0]||(t[0]=(...f)=>l.changeFoto&&l.changeFoto(...f))},[c(Y,{size:"xs",class:"bg-slate-500 text-white cursor-pointer"},{default:p(()=>[Lt]),_:1})])):u("",!0),s("input",{ref:"file",style:{display:"none"},type:"file",onChange:t[1]||(t[1]=f=>l.detectFiles(f.target.files))},null,544),s("div",Jt,[a.progress?(r(),y(rs,{key:0,size:"12px",value:a.progressUpload,color:"blue-grey"},{default:p(()=>[s("div",Kt,[s("span",Wt,d(a.progressUpload)+" % ",1)])]),_:1},8,["value"])):u("",!0),a.done?(r(),m("div",Xt,so)):u("",!0)])])):u("",!0)}var to=D(Ht,[["render",eo]]);const oo={components:{userinfo:he,inscricoes:Ot,facilitador:is,avatarEdit:to},props:{},data(){return{refresh:0,tab:"dados",userStore:I(),user:null,facilitador:!1,qtdeFacilitador:0,qtdeInscricoes:0}},computed:{isMe(){return this.user!=null&&this.userStore.user.id==this.user.id}},watch:{"$route.params":function(e){this.load()}},mounted(){this.load()},methods:{load(){let e=this;console.log("formacao mounted",this.$route.params),k(h(x,"/salamais/usuarios/"+this.$route.params.id)).then(o=>{let i=o.val();i.areas==null&&(i.areas=[]),i.cargo==null&&(i.cargo="profHor"),i.campus==null&&(i.campus="102"),i.ies==null&&(i.ies="USJT"),e.user=i,console.log("self.user",e.user),e.refresh++,e.$forceUpdate()}),k(h(x,"/salamais/facilitadores/"+this.userStore.user.id)).then(o=>{let i=o.val();if(i!=null){i=i.formacoes,e.qtdeFacilitador=0;for(let a in i)for(let l in i[a].encontros)e.qtdeFacilitador++;e.facilitador=!0}else e.facilitador=!1,e.qtdeFacilitador=0});let t=R(h(x,"/salamais/inscricoes"),O("userID"),A(this.userStore.user.id));N(t,o=>{e.qtdeInscricoes=0;let i=o.val();console.log("inscricoes",i);for(let a in i)for(let l in i[a].encontros)e.qtdeInscricoes++})}}},ao={key:0,class:"bg-gray-100 p-2"},io={class:"grid grid-cols-5 shadow"},lo={class:"col-span-4 py-4"},ro={class:"flex items-center"},no={class:"fw-800 flato text-base"},co=s("div",{class:"pl-2 text-teal-800"},[s("span",{class:"iconify text-xl","data-icon":"fluent:book-star-20-regular"})],-1),mo={class:"flex items-center mt-1"},uo=s("div",{class:"flex itens-center"},[s("div",{class:"text-teal-800"},[s("span",{class:"iconify text-xs","data-icon":"icomoon-free:profile"})]),s("div",{class:"ml-1 fw-500 flato text-xs"}," Educador ")],-1),fo={key:0,class:"flex itens-center pl-4"},po=s("div",{class:"text-teal-800"},[s("span",{class:"iconify text-xs","data-icon":"icon-park-twotone:local-two"})],-1),_o={class:"ml-1 fw-500 flato text-xs"},ho={class:"flex itens-center pl-4"},xo=s("div",{class:"text-teal-800"},[s("span",{class:"iconify text-xs","data-icon":"ic:business"})],-1),go={class:"ml-1 fw-500 flato text-xs"},vo={class:"flex itens-center pl-4"},bo=s("div",{class:"text-teal-800"},[s("span",{class:"iconify text-xs","data-icon":"ic:twotone-mail"})],-1),yo={class:"ml-1 fw-500 flato text-[8pt] flato"},wo={class:"grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 mt-1"},Do={class:"border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1"},ko={class:"leading-4 fw-800 flato text-base"},Io=s("div",{class:"leading-4 fw-500 flato text-[7pt] text-gray-500"}," Inscri\xE7\xF5es ",-1),$o=s("div",{class:"border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1"},[s("div",null,[s("div",{class:"leading-4 fw-800 flato text-base"}," 0 "),s("div",{class:"leading-4 fw-500 flato text-[7pt] text-gray-500"}," Conclu\xEDdas ")])],-1),Co={key:0,class:"border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1"},qo={class:"leading-4 fw-800 flato text-base"},So=s("div",{class:"leading-4 fw-500 flato text-[7pt] text-gray-500"}," Facilitador ",-1),To={class:"px-2 mt-1"},Vo=s("span",{class:"text-[8pt]"},"Dados pessoais",-1),Uo=s("span",{class:"text-[8pt]"},"Inscri\xE7\xF5es",-1),Eo=s("span",{class:"text-[8pt]"},"Certificados",-1),Fo=s("span",{class:"text-[8pt]"},"Facilitador",-1),Mo=s("div",{class:"text-sm border rounded shadow p-2"}," Certificados ",-1),Yo={class:"text-sm border rounded shadow p-2"};function Qo(e,t,o,i,a,l){const f=g("avatarEdit"),n=g("userinfo"),_=g("inscricoes"),E=g("facilitador");return a.user!=null?(r(),m("div",ao,[s("div",io,[c(f,{userID:a.user.id},null,8,["userID"]),s("div",lo,[s("div",ro,[s("div",no,d(a.user.nome),1),co]),s("div",mo,[uo,a.user.regional!=null?(r(),m("div",fo,[po,s("div",_o,d(a.user.regional),1)])):u("",!0),s("div",ho,[xo,s("div",go,d(a.user.ies),1)]),s("div",vo,[bo,s("div",yo,d(a.user.email),1)])]),s("div",wo,[s("div",Do,[s("div",null,[s("div",ko,d(a.qtdeInscricoes),1),Io])]),$o,a.facilitador?(r(),m("div",Co,[s("div",null,[s("div",qo,d(a.qtdeFacilitador),1),So])])):u("",!0)])])]),s("div",To,[c(H,{modelValue:a.tab,"onUpdate:modelValue":t[0]||(t[0]=F=>a.tab=F),class:"text-slate-900",align:"left",dense:""},{default:p(()=>[c($,{name:"dados",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:p(()=>[Vo]),_:1}),c($,{name:"inscricoes",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:p(()=>[Uo]),_:1}),l.isMe?(r(),y($,{key:0,name:"certificados",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:p(()=>[Eo]),_:1})):u("",!0),l.isMe&&a.facilitador?(r(),y($,{key:1,name:"facilitador",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:p(()=>[Fo]),_:1})):u("",!0)]),_:1},8,["modelValue"])]),s("div",null,[c(B,{modelValue:a.tab,"onUpdate:modelValue":t[1]||(t[1]=F=>a.tab=F),animated:"",swipeable:"",vertical:"","transition-prev":"jump-up","transition-next":"jump-up"},{default:p(()=>[c(C,{name:"dados"},{default:p(()=>[c(n,{user:a.user,onUpdated:l.load},null,8,["user","onUpdated"])]),_:1}),c(C,{name:"inscricoes"},{default:p(()=>[(r(),y(_,{userID:a.user.id,key:a.refresh},null,8,["userID"]))]),_:1}),c(C,{name:"certificados"},{default:p(()=>[Mo]),_:1}),c(C,{name:"facilitador"},{default:p(()=>[s("div",Yo,[c(E)])]),_:1})]),_:1},8,["modelValue"])])])):u("",!0)}var Jo=D(oo,[["render",Qo]]);export{Jo as default};