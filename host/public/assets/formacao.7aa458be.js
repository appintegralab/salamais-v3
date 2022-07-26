import{Q as E,a as Q,b as F,c as A}from"./QTabPanels.584a5de3.js";import{_ as b,k as l,c as n,M as z,f as e,N as u,d as r,u as w,m as k,b as S,r as x,a as g,R as $,P as j,l as y,K as m,O as h,q as N,e as q,o as B,j as v,h as c,L as O,F as T,g as C,a0 as I,T as V,V as R,a4 as H,X as J,i as Y,a2 as L,a5 as K,s as X}from"./index.2bd1149f.js";import{b as P}from"./badge-area.51bfdf65.js";import{d as G}from"./dialog-inscricao.3b3944ca.js";import{Q as M}from"./QImg.297fc3cd.js";import{s as U,V as W}from"./vue3-pdf-embed.59f74997.js";import{Q as Z}from"./QLinearProgress.69a859f2.js";import"./caixa-formacao-info.1312eccb.js";const ee={props:{options:{default:{},type:Object},selected:{default:!1,type:Boolean},color:{default:"#cccccc",type:String}},data(){return{}},computed:{colorSel(){return`
                border-color: ${this.options.color};
                color: ${this.options.color}; 
                background-color: white;
            `},colorUSel(){return`
                border-color: white;
                background-color: white;
                color: ${this.options.color}; 
                
            `},select(){return this.options.selected}},mounted(){},methods:{tone(s,t){let a=!1;s[0]=="#"&&(s=s.slice(1),a=!0);let p=parseInt(s,16),o=(p>>16)+t;o>255?o=255:o<0&&(o=0);let i=(p>>8&255)+t;i>255?i=255:i<0&&(i=0);let d=(p&255)+t;return d>255?d=255:d<0&&(d=0),(a?"#":"")+(d|i<<8|o<<16).toString(16)}}},se={class:"p-1"},te={class:"pr-2"},oe=["data-icon"],ae={class:"text-left"},le={class:"leading-3 text-[7pt]"},ie={class:"leading-3 text-xs font-semibold"},ne={class:"pr-2"},re=["data-icon"],ce={class:"text-left"},de={class:"leading-3 text-[7pt]"},ue={class:"leading-3 text-xs font-semibold"};function me(s,t,a,p,o,i){return l(),n("span",se,[i.select?r("",!0):(l(),n("button",{key:0,onClick:t[0]||(t[0]=d=>s.$emit("onclick")),style:z(i.colorUSel),class:"border-2 shadow-md px-3 py-2 rounded-lg flex items-center"},[e("div",te,[e("span",{class:"iconify text-2xl","data-icon":a.options.icon},null,8,oe)]),e("div",ae,[e("p",le,u(a.options.subTitle),1),e("p",ie,u(a.options.title),1)])],4)),i.select?(l(),n("button",{key:1,onClick:t[1]||(t[1]=d=>s.$emit("onclick")),style:z(i.colorSel),class:"border-2 shadow-md px-3 py-2 rounded-lg flex items-center"},[e("div",ne,[e("span",{class:"iconify text-2xl","data-icon":a.options.icon},null,8,re)]),e("div",ce,[e("p",de,u(a.options.subTitle),1),e("p",ue,u(a.options.title),1)])],4)):r("",!0)])}var pe=b(ee,[["render",me]]);const _e={props:{formacao:{default:null,type:Object},encontro:{default:null,type:Object}},data(){return{refresh:0,status:"fechada",userStore:w(),enabled:!1}},watch:{formacao(){this.load()},encontro(){this.load()}},computed:{moment(){return k}},mounted(){this.load()},methods:{load(){let s=this;if(this.formacao&&this.encontro){let t=`/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`;S(x(g,t+"/presencaStatus"),a=>{let p=a.val();p?s.status=p:s.status="fechada",s.refresh++})}this.checkEnabled()},checkEnabled(){let s=this.userStore.user.cpf;["18374109840","28854077860","99271176804","12345678900","36126741889"].lastIndexOf(s)!=-1?this.enabled=!0:this.enabled=!1,this.refresh++},abrirPresenca(){let s=this;console.log("abrirPresenca"),console.log("this.formacao",this.formacao),console.log("this.encontro",this.encontro);let t=`/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`;console.log("path",t),$(x(g,t+"/presencaStatus"),"liberada"),s.$q.notify(j.success("Lista de presen\xE7a aberta com sucesso!"))},fecharPresenca(){let s=this;console.log("fecharPresenca");let t=`/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`;console.log("path",t),$(x(g,t+"/presencaStatus"),"encerrada"),s.$q.notify(j.success("Lista de presen\xE7a fechada com sucesso!"))}}},fe=e("span",{class:"iconify text-[10pt] text-red-800","data-icon":"mdi:lock-outline"},null,-1),he=e("span",{class:"ml-1 pt-[1px] text-[5pt]"},"fechar presen\xE7a",-1),xe=e("span",{class:"iconify text-[10pt]","data-icon":"mdi:lock-open-outline"},null,-1),ge=e("span",{class:"ml-1 pt-[1px] text-[5pt]"},"abrir presen\xE7a",-1);function ve(s,t,a,p,o,i){return o.enabled?(l(),n("div",{class:"flex justify-end mr-1",key:o.refresh},[o.status=="liberada"?(l(),y(h,{key:0,onClick:i.fecharPresenca,size:"xs",class:"text-red-800 bg-gray-100 px-2"},{default:m(()=>[fe,he]),_:1},8,["onClick"])):r("",!0),o.status!="liberada"?(l(),y(h,{key:1,onClick:i.abrirPresenca,size:"xs",class:"text-black bg-gray-100 px-2"},{default:m(()=>[xe,ge]),_:1},8,["onClick"])):r("",!0)])):r("",!0)}var be=b(_e,[["render",ve]]);const ye={components:{badgearea:P,dialoginscricao:G,abrirPresenca:be},props:{formacao:{default:null,type:Object}},data(){return{userStore:w(),formacaoObj:null,removeDialog:!1}},computed:{moment(){return k}},mounted(){this.load()},watch:{formacao(){this.load()}},methods:{load(){let s=this,t=N(x(g,"/salamais/inscricoes"),B("userID"),q(this.userStore.user.id));S(t,a=>{s.formacaoObj=JSON.parse(JSON.stringify(s.formacao)),s.formacaoObj.inscricao=!1;let p=a.val();for(let o in p)if(p[o].formacaoID==s.formacaoObj.id){s.formacaoObj.inscricaoID=p[o].id;for(let i in p[o].encontros)s.formacaoObj.inscricao=!0,s.formacaoObj.dataInscricao=p[o].encontros[i].createdAt,s.formacaoObj.encontros[i].inscricao=p[o].encontros[i]}})},cancelar(){let s=this;console.log("cancelar",this.formacao),console.log(this.formacaoObj.inscricaoID);for(let t in this.formacaoObj.encontros){let a=this.formacaoObj.encontros[t];console.log("encontro",a);let p="";a.area==null||a.area==""?p="/salamais/formacoes/"+this.formacaoObj.id+"/encontros/"+a.encontroID+"/salas/sala"+a.sala+"/inscricoes/"+this.userStore.user.id:p="/salamais/formacoes/"+this.formacaoObj.id+"/encontros/"+a.encontroID+"/areas/"+a.area+"/salas/sala"+a.sala+"/inscricoes/"+this.userStore.user.id,console.log("path",p),$(x(g,p),null)}$(x(g,"/salamais/inscricoes/"+this.formacaoObj.inscricaoID),null),s.$q.notify(j.success("Inscri\xE7\xE3o cancelada com sucesso!")),s.removeDialog=!1},novaInscricao(){this.load()},acessarSala(s){let t="sala"+s.sala+":"+this.formacaoObj.id+":"+s.encontroID+":"+s.area;this.$router.push({path:"/sala/"+t})}}},ke={key:0,class:"p-2"},$e={key:0,class:"mb-2"},we=e("span",{class:"text-[8pt] iconify","data-icon":"mdi:calendar-check"},null,-1),De=e("span",{class:"ml-1 pt-[2px] text-[6pt]"}," Realizar inscri\xE7\xE3o ",-1),je={key:1,class:"mb-2"},Ie={class:"flex items-center justify-between"},Se={class:"leading-3"},Te=e("div",{class:"flex"},[e("span",{class:"text-green-700 text-[10pt] iconify","data-icon":"mdi:calendar-check"}),e("span",{class:"ml-1 mt-[3px] text-[7pt] fw-500 text-green-800"},"Inscri\xE7\xE3o realizada")],-1),Ce={class:"ml-1 mt-[3px] text-[6pt] fw-300 text-black"},Oe={class:"flex items-center ml-1 pt-[2px] fw-600 text-[8pt]"},Ve=e("span",{class:"iconify text-[8pt] mr-1","data-icon":"ic:cancel"},null,-1),Me=I(" cancelar inscri\xE7\xE3o "),Ue={class:"rounded w-[240px]"},Fe=e("div",{class:"flex p-1 bg-red-800 text-white"},[e("div",{class:"text-[10pt] px-1"},[e("span",{class:"iconify","data-icon":"mdi:warning"})]),e("div",{class:"text-[8pt] fw-700"},"Deseja realmente cancelar a inscri\xE7\xE3o?")],-1),Ae={class:"flex justify-around p-2"},ze=I("N\xE3o"),Le=I("sim "),Ye={class:""},Pe={class:"col-span-3 md:col-span-2 border rounded p-2"},Ee=e("div",{class:"fw-500 text-sm border-b"}," Encontros ",-1),Qe={class:"mt-2"},Ne={key:0,class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},qe={class:"ml-1 text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},Be={class:"ml-1 text-[9pt] fw-300"},Re=e("span",{class:"ml-1 text-[9pt] fw-200"},"Hor\xE1rio:",-1),He={class:"px-1 rounded text-[9pt] fw-500 text-slate-900"},Je={key:1,class:"flex items-center mt-1 p-1 border border-green-800 rounded"},Ke={class:"leading-3"},Xe={class:"ml-1 text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-200"},Ge={class:"text-[9pt] fw-300"},We={class:"mt-1"},Ze=e("span",{class:"ml-1 text-[9pt] fw-300"},"Hor\xE1rio:",-1),es={class:"px-1 rounded text-[9pt] fw-500 text-slate-900"},ss=e("div",{class:"ml-2 h-[12px] w-[122px] flex items-center"},[e("div",{class:"rounded-lg text-green-800 bg-gray-300 -mt-[1px]"},[e("span",{class:"iconify text-[10pt]","data-icon":"ic:check"})]),e("span",{class:"ml-1 text-[8pt] fw-500 mt-[1px]"},"inscrito")],-1),ts={key:0,class:"-mt-[2px]"},os={class:"flex-1"},as={class:""},ls=e("span",{class:"text-[5pt]"},"acessar sala",-1);function is(s,t,a,p,o,i){v("abrirPresenca");const d=v("badgearea"),f=v("dialoginscricao");return o.formacaoObj!=null?(l(),n("div",ke,[o.formacaoObj.inscricao?r("",!0):(l(),n("div",$e,[c(h,{outline:"",onClick:t[0]||(t[0]=_=>s.$refs.dialoginscricaoref.show(o.formacaoObj)),class:"px-2 text-gray-700",size:"6px"},{default:m(()=>[we,De]),_:1})])),o.formacaoObj.inscricao?(l(),n("div",je,[e("div",Ie,[e("div",Se,[Te,e("div",null,[e("span",Ce," em "+u(i.moment(a.formacao.dataInscricao).format("DD/MM/YYYY"))+" - "+u(i.moment(a.formacao.dataInscricao).format("HH:mm")),1)])]),e("div",Oe,[c(h,{outline:"",size:"5pt",class:"px-2 text-[7pt] ml-4 text-red-800"},{default:m(()=>[Ve,Me,c(O,{modelValue:o.removeDialog,"onUpdate:modelValue":t[2]||(t[2]=_=>o.removeDialog=_),anchor:"bottom right",self:"bottom left"},{default:m(()=>[e("div",Ue,[Fe,e("div",Ae,[c(h,{onClick:t[1]||(t[1]=_=>o.removeDialog=!1),size:"xs"},{default:m(()=>[ze]),_:1}),c(h,{onClick:i.cancelar,class:"bg-red-800 text-white",size:"xs"},{default:m(()=>[Le]),_:1},8,["onClick"])])])]),_:1},8,["modelValue"])]),_:1})])])])):r("",!0),e("div",Ye,[e("div",Pe,[Ee,e("div",Qe,[(l(!0),n(T,null,C(o.formacaoObj.encontros,(_,D)=>(l(),n("div",{key:D},[_.inscricao==null?(l(),n("div",Ne,[e("div",null,[e("span",qe,u(i.moment(_.data).format("DD/MM/YYYY")),1),e("span",Be," ("+u(i.moment(_.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),e("div",null,[Re,e("span",He,u(_.horaInicio)+" \xE0s "+u(_.horaTermino),1)]),r("",!0),r("",!0)])):r("",!0),_.inscricao!=null?(l(),n("div",Je,[e("div",Ke,[e("span",Xe,u(i.moment(_.data).format("DD/MM/YYYY")),1),e("span",Ge," ("+u(i.moment(_.data).locale("pt-br").format("dddd").split("-")[0])+") ",1),e("div",We,[Ze,e("span",es,u(_.horaInicio)+" \xE0s "+u(_.horaTermino),1)])]),ss,_.inscricao.area!=""?(l(),n("div",ts,[c(d,{sigla:_.inscricao.area},null,8,["sigla"])])):r("",!0),e("div",os,[e("div",as,[c(h,{onClick:na=>i.acessarSala(_.inscricao),class:"px-1 py-1 leading-3",size:"5px",outline:""},{default:m(()=>[ls]),_:2},1032,["onClick"])])]),r("",!0)])):r("",!0)]))),128))])])]),c(f,{ref:"dialoginscricaoref",onNovaInscricao:i.novaInscricao},null,8,["onNovaInscricao"])])):r("",!0)}var ns=b(ye,[["render",is]]);const rs={data(){return{enviarEmail:!1,userStore:w(),mensagem:""}},computed:{moment(){return k}},mounted(){},methods:{enviar(){let s=this;if(console.log("enviar"),this.mensagem.trim()==""){s.$q.notify(j.error("Texto da mensagem obrigat\xF3rio!"));return}console.log("this.mensagem",this.mensagem),console.log("this.enviarEmail",this.enviarEmail);let t={id:this.userStore.user.id+"-"+k().format(),mensagem:this.mensagem,createdAt:k().format(),userID:this.userStore.user.id,emailSent:this.enviarEmail},a="/salamais/postagens/"+this.$route.params.id+"/"+t.id;console.log(a,t),$(x(g,a),t),s.mensagem="",s.$q.notify(j.success("Mensagem enviada com sucesso!"))}}},cs={class:"my-1"},ds={class:"flex items-center p-1"},us={class:"ml-2 flex-1"},ms={class:"text-xs flato fw-400"},ps=e("div",{class:"text-xs flato fw-600"}," Criar uma nova postagem ",-1),_s={class:"flex flex-col mt-1 mx-2"},fs={class:"flex justify-between mt-2"},hs=e("span",{class:"ml-2 text-xs"},"Enviar a mensagem para todos por email",-1),xs=e("span",{class:"iconify text-sm","data-icon":"ic:round-send"},null,-1),gs=e("div",{class:"ml-1 pt-[2px] fw-400 text-xs"},"enviar",-1),vs=e("div",{class:"bg-gray-200 h-1 mx-2 mt-3"},null,-1);function bs(s,t,a,p,o,i){return l(),n("div",cs,[e("div",ds,[e("div",null,[c(V,{class:"",size:"30px"},{default:m(()=>[c(M,{src:o.userStore.user.urlFoto},null,8,["src"])]),_:1})]),e("div",us,[e("div",ms,u(o.userStore.user.nome),1),ps])]),e("div",_s,[R(e("textarea",{"onUpdate:modelValue":t[0]||(t[0]=d=>o.mensagem=d),class:"p-3 bg-transparent border border-gray-300 rounded",rows:"3",placeholder:"Escreva uma mensagem para todos da sala"},null,512),[[H,o.mensagem]]),e("div",fs,[e("div",null,[c(J,{dense:"",modelValue:o.enviarEmail,"onUpdate:modelValue":t[1]||(t[1]=d=>o.enviarEmail=d),color:"blue-grey"},null,8,["modelValue"]),hs]),c(h,{onClick:i.enviar,size:"xs",class:"flex items-center px-2 h-6 bg-slate-200"},{default:m(()=>[xs,gs]),_:1},8,["onClick"])])]),vs])}var ys=b(rs,[["render",bs]]);const ks={props:{userID:{default:"noid",type:String}},data(){return{user:null}},watch:{userID(){this.load()}},mounted(){this.load()},methods:{load(){let s=this;Y(x(g,"/salamais/usuarios/"+this.userID)).then(t=>{let a=t.val();a&&(s.user=a)})}}},$s={key:0},ws={class:"flex items-center p-1"},Ds={class:""},js={class:"flex-1 ml-2 truncate"},Is={class:"text-[7pt] fw-400 leading-3"},Ss={class:""};function Ts(s,t,a,p,o,i){return o.user!=null?(l(),n("div",$s,[e("div",ws,[e("div",Ds,[c(V,{size:"20px"},{default:m(()=>[c(M,{src:o.user.urlFoto},null,8,["src"])]),_:1})]),e("div",js,[e("div",Is,[e("span",Ss,u(o.user.nome),1)])])])])):r("",!0)}var Cs=b(ks,[["render",Ts]]);const Os={components:{userAvatar:Cs},props:{postID:{default:"noid",type:String}},data(){return{userStore:w(),likes:null,iLiked:!1}},watch:{postID(){this.load()},messageID(){this.load()}},mounted(){this.load()},methods:{load(){let s=this;S(x(g,"/salamais/likes/"+this.postID),t=>{s.likes=t.val(),console.log("self.likes",s.likes),s.iLiked=!1,s.likes&&s.likes[s.userStore.user.id]!=null&&(s.iLiked=!0)})},liked(){console.log("this.iLiked",this.iLiked),console.log("this.postID",this.postID);let s="/salamais/likes/"+this.postID+"/"+this.userStore.user.id;console.log(s),this.iLiked?$(x(g,s),null):$(x(g,s),k().format())}}},Vs=e("span",{class:"iconify text-lg","data-icon":"ph:heart-duotone"},null,-1),Ms={key:0,class:"absolute -right-1 -bottom-1"},Us={class:"text-[7pt] fw-600 rounded-lg text-red-900 bg-red-300 px-[3px] py-[1px]"},Fs={key:0,class:"text-center mt-1"},As=e("span",{class:"iconify text-red text-lg","data-icon":"ph:heart-duotone"},null,-1),zs={key:0,class:"absolute -right-1 -bottom-1"},Ls={class:"text-[7pt] fw-600 rounded-lg text-red-900 bg-red-200 px-[3px] py-[1px]"},Ys={key:0,class:"text-center mt-1"};function Ps(s,t,a,p,o,i){const d=v("userAvatar");return l(),n("div",null,[o.iLiked?r("",!0):(l(),y(h,{key:0,onClick:i.liked,round:"",size:"xs",class:"mr-1"},{default:m(()=>[Vs,o.likes!=null?(l(),n("div",Ms,[e("span",Us,u(Object.keys(o.likes).length),1)])):r("",!0),o.likes!=null?(l(),y(L,{key:1,delay:1e3},{default:m(()=>[(l(!0),n(T,null,C(o.likes,(f,_,D)=>(l(),n("div",{key:_},[D<10?(l(),y(d,{key:0,userID:_},null,8,["userID"])):r("",!0)]))),128)),Object.keys(o.likes).length>10?(l(),n("div",Fs," mais "+u(Object.keys(o.likes).length-10),1)):r("",!0)]),_:1})):r("",!0)]),_:1},8,["onClick"])),o.iLiked?(l(),y(h,{key:1,onClick:i.liked,round:"",size:"xs",class:"mr-1"},{default:m(()=>[As,o.likes!=null?(l(),n("div",zs,[e("span",Ls,u(Object.keys(o.likes).length),1)])):r("",!0),o.likes!=null?(l(),y(L,{key:1,delay:1e3},{default:m(()=>[(l(!0),n(T,null,C(o.likes,(f,_,D)=>(l(),n("div",{key:_},[D<10?(l(),y(d,{key:0,userID:_},null,8,["userID"])):r("",!0)]))),128)),Object.keys(o.likes).length>10?(l(),n("div",Ys," mais "+u(Object.keys(o.likes).length-10),1)):r("",!0)]),_:1})):r("",!0)]),_:1},8,["onClick"])):r("",!0)])}var Es=b(Os,[["render",Ps]]);const Qs={components:{btnLike:Es},props:{post:{default:null,type:Object}},data(){return{userStore:w(),user:null,menuShow:!1}},watch:{post(){this.load()}},computed:{moment(){return k},isme(){return this.user&&this.user.id==this.userStore.user.id}},mounted(){this.load()},methods:{load(){let s=this;S(x(g,"/salamais/usuarios/"+this.post.userID),t=>{s.user=t.val()})}}},Ns={class:"my-1 p-1"},qs={class:"flex items-center p-1"},Bs={class:"ml-2 flex-1"},Rs={class:"flex items-center justify-between"},Hs={class:"flex-1"},Js={key:0,class:"text-xs flato fw-400 leading-3"},Ks={key:1,class:"text-xs flato font-light"},Xs={class:"text-xs font-light"},Gs={key:0},Ws=e("span",{class:"iconify text-base","data-icon":"mdi:edit"},null,-1),Zs={class:"p-1"},et={class:"my-[2px] cursor-pointer hover:bg-gray-200"},st=e("div",{class:""},[e("span",{class:"text-[9pt]"},"Editar")],-1),tt=[st],ot={class:"my-[2px] cursor-pointer hover:bg-gray-200"},at=e("div",{class:""},[e("span",{class:"text-[9pt]"},"Excluir")],-1),lt=[at],it=e("hr",{class:"my-1"},null,-1),nt={class:"border rounded py-1 px-2 text-sm fraleway font-normal"},rt={class:"mt-1 flex items-center justify-end"},ct=e("div",{class:"my-2 rounded-lg h-1 bg-gray-200"},null,-1);function dt(s,t,a,p,o,i){const d=v("btnLike");return l(),n("div",Ns,[e("div",qs,[e("div",null,[c(V,{class:"",size:"36px"},{default:m(()=>[o.user!=null?(l(),y(M,{key:0,src:o.user.urlFoto},null,8,["src"])):r("",!0)]),_:1})]),e("div",Bs,[e("div",Rs,[e("div",Hs,[o.user!=null?(l(),n("div",Js,u(o.user.nome),1)):r("",!0),o.user!=null?(l(),n("div",Ks,u(o.user.email),1)):r("",!0)]),e("div",Xs,u(i.moment(a.post.createdAt).locale("pt-br").fromNow()),1),i.isme?(l(),n("div",Gs,[c(h,{round:"",size:"xs",class:"ml-2"},{default:m(()=>[Ws,c(O,{modelValue:o.menuShow,"onUpdate:modelValue":t[2]||(t[2]=f=>o.menuShow=f),anchor:"bottom left",self:"center right"},{default:m(()=>[e("div",Zs,[e("div",et,[e("div",{onClick:t[0]||(t[0]=f=>{o.menuShow=!1}),class:"flex items-center rounded py-1 px-2"},tt)]),e("div",ot,[e("div",{onClick:t[1]||(t[1]=f=>{o.menuShow=!1}),class:"flex items-center rounded py-1 px-2"},lt)])])]),_:1},8,["modelValue"])]),_:1})])):r("",!0)]),it,e("div",nt,u(a.post.mensagem),1),e("div",rt,[e("div",null,[c(d,{postID:a.post.id},null,8,["postID"])])])])]),ct])}var ut=b(Qs,[["render",dt]]);const mt={components:{postVue:ut},data(){return{postList:null,userStore:w(),salaTool:U(),isFacilitador:!1}},mounted(){this.load()},methods:{load(){let s=this;this.salaTool.init(this.$route.params.id,t=>{s.salaTool=t,s.isFacilitador=s.salaTool.isFacilitador(s.userStore.user.id),console.log("salaTool",t),S(x(g,"/salamais/postagens/"+t.urlID),a=>{s.postList=a.val(),console.log("self.postList",s.postList)})})}}},pt={class:"m-2 border rounded px-1"},_t={key:0},ft=e("div",{class:"p-2 border bg-gray-200 rounded fw-200"}," Mural vazio (nenhuma postagem criada) ",-1),ht=[ft],xt={key:1};function gt(s,t,a,p,o,i){const d=v("postVue");return l(),n("div",pt,[o.postList==null?(l(),n("div",_t,ht)):r("",!0),o.postList!=null?(l(),n("div",xt,[(l(!0),n(T,null,C(o.postList,(f,_)=>(l(),n("div",{class:"my-1",key:_},[c(d,{post:f},null,8,["post"])]))),128))])):r("",!0)])}var vt=b(mt,[["render",gt]]);const bt={components:{postForm:ys,postlist:vt},data(){return{refresh:0,inputCss:{outer:"flex-1",inner:"h-7 text-[8pt] fw-700",help:"text-[7pt] mt-2"},mensagem:"",presencaLiberada:!1,userStore:w(),salaTool:U(),isFacilitador:!1}},watch:{"$route.params.id":function(){this.load()}},mounted(){this.load()},computed:{},methods:{load(){let s=this;this.salaTool.init(this.$route.params.id,t=>{s.salaTool=t,s.isFacilitador=s.salaTool.isFacilitador(s.userStore.user.id),console.log("salaTool",t)})}}},yt={class:"border rounded p-1"},kt=e("div",{class:"fw-600 text-sm"}," Mural ",-1),$t=e("hr",{class:""},null,-1);function wt(s,t,a,p,o,i){const d=v("postForm"),f=v("postlist");return l(),n("div",yt,[kt,$t,o.isFacilitador?(l(),y(d,{key:0})):r("",!0),c(f)])}var Dt=b(bt,[["render",wt]]);const jt={components:{geral:ns,mural:Dt},props:{formacao:{default:null,type:Object},sala:{default:null,type:Object}},data(){return{inputCss:{outer:"flex-1",inner:"h-7 text-[8pt] fw-700",help:"text-[6pt] mt-2"},mensagem:"",userStore:w(),salaTool:U(),isFacilitador:!1}},mounted(){this.load()},methods:{load(){let s=this;this.salaTool.init(this.$route.params.id,t=>{s.salaTool=t,s.isFacilitador=s.salaTool.isFacilitador(s.userStore.user.id),console.log("salaTool",t)})}}},It={class:"grid grid-cols-12"},St={class:"col-span-12 sm:col-span-6 pr-2 border"},Tt={class:"col-span-12 sm:col-span-6 pl-2"},Ct={class:"border rounded p-1 text-sm"};function Ot(s,t,a,p,o,i){const d=v("geral"),f=v("mural",!0);return l(),n("div",It,[e("div",St,[a.formacao!=null?(l(),y(d,{key:0,formacao:a.formacao},null,8,["formacao"])):r("",!0)]),e("div",Tt,[e("div",Ct,[c(f)])])])}var Vt=b(jt,[["render",Ot]]);const Mt={props:{path:{default:"nopath",type:String}},data(){return{progressUpload:0,progress:!1,done:!1,file:File,uploadTask:"",UploadMenu:!1,tipo:"notipo",nome:""}},watch:{uploadTask:function(){let s=this;this.uploadTask.on("state_changed",t=>{this.progressUpload=Math.floor(t.bytesTransferred/t.totalBytes*100),this.progressUpload==100&&setTimeout(()=>{s.done=!0,s.progress=!1},600)},null,()=>{this.uploadTask.snapshot.ref.getDownloadURL().then(t=>{this.$emit("url",{downloadURL:t,tipo:s.tipo,nome:s.nome})})})}},methods:{detectFiles(s){this.progress=!0,Array.from(Array(s.length).keys()).map(t=>{this.upload(s[t])})},upload(s){let t=this.path+"/"+s.name;console.log(s),console.log("filePath",t),this.nome=s.name,this.uploadTask=K.ref(t).put(s)},clickPdf(){console.log("upload",this.path),this.$refs.file.click(),this.tipo="file"},clickVideo(){this.UploadMenu=!1,this.tipo="video"},clicklink(){this.UploadMenu=!1,this.tipo="link"}}},Ut=e("span",{class:"iconify text-[12pt] mr-1","data-icon":"uil:book-reader"},null,-1),Ft=e("span",{class:"iconify pt-[2px]"}," Adicionar material ",-1),At={class:"p-2 shadow-lg w-[360px]"},zt=e("div",{class:"flex text-[8pt] fw-600"}," Adicionar materiais ",-1),Lt=e("hr",{class:"mb-2"},null,-1),Yt={class:"flex items-center"},Pt=e("span",{class:"iconify text-[12pt] mr-1","data-icon":"ic:outline-cloud-upload"},null,-1),Et=e("span",{class:"iconify pt-[2px]"}," Adicionar arquivo ",-1),Qt=e("span",{class:"iconify text-[12pt] mr-1","data-icon":"ic:round-insert-link"},null,-1),Nt=e("span",{class:"iconify pt-[2px]"}," Adicionar link ",-1),qt=e("span",{class:"iconify text-[12pt] mr-1","data-icon":"ion:social-youtube-outline"},null,-1),Bt=e("span",{class:"iconify pt-[2px]"}," Video Youtube ",-1),Rt={class:"mt-1"},Ht={class:"absolute-full flex flex-center"},Jt={class:"text-[7pt] fw-600 text-white"},Kt={key:1,class:"flex itens-center mt-1 fw-600 text-green-800"},Xt=e("span",{class:"iconify text-[10pt] mr-1","data-icon":"ic:baseline-check-circle"},null,-1),Gt=e("span",{class:"text-[7pt]"},"Material adicionado com sucesso!",-1),Wt=[Xt,Gt];function Zt(s,t,a,p,o,i){return l(),n("div",null,[c(h,{size:"xs",class:"flex items-center mr-2 px-2",onClick:t[2]||(t[2]=d=>o.done=!1),outline:""},{default:m(()=>[Ut,Ft,c(O,{modelValue:o.UploadMenu,"onUpdate:modelValue":t[1]||(t[1]=d=>o.UploadMenu=d)},{default:m(()=>[e("div",At,[zt,Lt,e("div",Yt,[c(h,{size:"xs",class:"flex items-center mr-2 px-2",outline:"",onClick:i.clickPdf},{default:m(()=>[Pt,Et]),_:1},8,["onClick"]),c(h,{size:"xs",class:"flex items-center mr-2 px-2",outline:"",onClick:i.clicklink},{default:m(()=>[Qt,Nt]),_:1},8,["onClick"]),c(h,{size:"xs",class:"flex items-center mr-2 px-2",outline:"",onClick:i.clickVideo},{default:m(()=>[qt,Bt]),_:1},8,["onClick"]),e("input",{ref:"file",style:{display:"none"},type:"file",multiple:"",onChange:t[0]||(t[0]=d=>i.detectFiles(d.target.files))},null,544)]),e("div",Rt,[o.progress?(l(),y(Z,{key:0,size:"12px",value:o.progressUpload,color:"blue-grey"},{default:m(()=>[e("div",Ht,[e("span",Jt,u(o.progressUpload)+" % ",1)])]),_:1},8,["value"])):r("",!0),o.done?(l(),n("div",Kt,Wt)):r("",!0)])])]),_:1},8,["modelValue"])]),_:1})])}var eo=b(Mt,[["render",Zt]]);const so={components:{VuePdfEmbed:W},props:{elem:{default:null,type:Object}},data(){return{src:"https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/teste%2FAcoplador%20direcional.pdf?alt=media&token=7864c861-5a1d-4f0e-be36-1f0a39bb38d4"}},mounted(){},methods:{}},to={key:0,class:""},oo={class:"flex justify-center"},ao={class:"ml-1 mr-2"},lo=e("div",{class:"flex items-center justify-center"},[e("span",{class:"iconify text-[14pt]","data-icon":"vscode-icons:file-type-pdf2"}),e("span",{class:"ml-1 text-[8pt]"},"PDF")],-1),io={class:"text-xs fw-400 text-center p-1 border rounded shadow hover:bg-gray-200"},no=["href"];function ro(s,t,a,p,o,i){const d=v("vue-pdf-embed");return a.elem!=null?(l(),n("div",to,[e("div",oo,[c(d,{source:a.elem.url,page:1,rotation:"0",height:220},null,8,["source"])]),e("div",ao,[lo,e("div",io,[e("a",{href:a.elem.url,target:"_blank"},u(a.elem.nome),9,no)])])])):r("",!0)}var co=b(so,[["render",ro]]);const uo={components:{pdfviewer:co},props:{elem:{default:null,type:Object}},data(){return{removeDialog:!1}},mounted(){console.log("mateiral mounted",this.elem)}},mo={key:0},po={key:0,class:"relative"},_o={class:"absolute top-0 right-0"},fo=e("span",{class:"iconify text-sm","data-icon":"material-symbols:delete-outline-sharp","data-inline":"false"},null,-1),ho={class:"rounded w-[200px]"},xo=e("div",{class:"flex p-1 bg-red-800 text-white"},[e("div",{class:"text-[10pt] px-1"},[e("span",{class:"iconify","data-icon":"mdi:warning"})]),e("div",{class:"text-[8pt] fw-700"},"Deseja realmente excluir o item?")],-1),go={class:"flex justify-around p-2"},vo=I("cancelar "),bo=I(" sim");function yo(s,t,a,p,o,i){const d=v("pdfviewer");return a.elem!=null?(l(),n("div",mo,[a.elem.tipo=="file"?(l(),n("div",po,[e("div",null,[c(d,{elem:a.elem},null,8,["elem"])]),e("div",_o,[c(h,{round:"",size:"xs",color:"red"},{default:m(()=>[fo,c(O,{modelValue:o.removeDialog,"onUpdate:modelValue":t[2]||(t[2]=f=>o.removeDialog=f)},{default:m(()=>[e("div",ho,[xo,e("div",go,[c(h,{onClick:t[0]||(t[0]=f=>o.removeDialog=!1),size:"xs"},{default:m(()=>[vo]),_:1}),c(h,{onClick:t[1]||(t[1]=f=>{s.$emit("excluir",a.elem),o.removeDialog=!1}),class:"bg-red-800 text-white",size:"xs"},{default:m(()=>[bo]),_:1})])])]),_:1},8,["modelValue"])]),_:1})])])):r("",!0)])):r("",!0)}var ko=b(uo,[["render",yo]]);const $o={components:{btnfileuploader:eo,material:ko},data(){return{inputCss:{inner:"h-7 text-[8pt] fw-700"},mensagem:"",sala:{link:""},userStore:w(),materiais:[]}},computed:{isAdmin(){return this.userStore.userAdmin()}},watch:{},mounted(){console.log("materiais mounted",this.$route.params.id),this.load()},methods:{load(){let s=this;S(x(g,"/salamais/materiaisApoio/"+this.$route.params.id),t=>{let a=X(t);console.log("data",a),s.materiais=a})},uuidv4(s){return s.normalize("NFD").replace(/[ \u0300-\u036f]/g,"").toUpperCase().substr(0,10)+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^crypto.getRandomValues(new Uint8Array(1))[0]&15>>a/4).toString(16)).substr(0,6)},newUpload(s){if(console.log("newUpload",s),s.tipo=="file"){let t="/salamais/materiaisApoio/"+this.$route.params.id,a={id:"MAT-APOIO-"+this.uuidv4(s.nome),nome:s.nome,url:s.downloadURL,createdAt:k().format(),tipo:s.tipo};console.log(t+"/"+a.id,a),$(x(g,t+"/"+a.id),a),this.$q.notify(j.success("Material de apoio adicionado com sucesso!"))}},excluir(s){console.log("excluir",s);let t="/salamais/materiaisApoio/"+this.$route.params.id;console.log(t+"/"+s.id,null),$(x(g,t+"/"+s.id),null),this.$q.notify(j.success("Material de apoio removido com sucesso!"))}}},wo={class:"p-2 border rounded fw-600 text-[8pt]"},Do={class:"flex items-center justify-between"},jo=e("div",null," Materiais ",-1),Io={key:0},So=e("hr",{class:"mt-1 mb-2"},null,-1),To={class:"grid grid-cols-4"},Co={key:0,class:"border rounded p-2 bg-gray-200"},Oo={class:"border rounded p-1 text-sm"};function Vo(s,t,a,p,o,i){const d=v("btnfileuploader"),f=v("material");return l(),n("div",wo,[e("div",Do,[jo,i.isAdmin?(l(),n("div",Io,[c(d,{onUrl:i.newUpload,path:"materiaisApoio/"+s.$route.params.id},null,8,["onUrl","path"])])):r("",!0)]),So,e("div",To,[o.materiais.length==0?(l(),n("div",Co," Nenhum material disponibilizado ")):r("",!0),(l(!0),n(T,null,C(o.materiais,(_,D)=>(l(),n("div",{class:"pr-2",key:D},[e("div",Oo,[c(f,{elem:_,onExcluir:i.excluir},null,8,["elem","onExcluir"])])]))),128))])])}var Mo=b($o,[["render",Vo]]);const Uo={components:{superbotao:pe,mural:Vt,badgearea:P,materiais:Mo},data(){return{menu:[{selected:!0,color:"#581c87",icon:"ic:school",title:"Forma\xE7\xE3o",subTitle:"Informa\xE7\xF5es gerais"},{selected:!1,color:"#991b1b",icon:"ic:sharp-account-tree",title:"Materiais",subTitle:"Recursos / Materiais"},{selected:!1,color:"#d97706",icon:"ic:link",title:"Acessar",subTitle:"Link para forma\xE7\xE3o"},{selected:!1,color:"#115e59",icon:"ic:twotone-co-present",title:"Participantes",subTitle:"ver participantes"}],formacao:null,tab:"mural"}},computed:{moment(){return k}},watch:{"$route.params":function(){this.load()}},mounted(){this.load()},methods:{load(){let s=this;Y(x(g,"/salamais/formacoes/"+this.$route.params.id)).then(t=>{let a=t.val();s.formacao=a,console.log("self.formacao",s.formacao)})},menuSel(s){console.log(s);for(let t in this.menu)t==s?this.menu[t].selected=!0:this.menu[t].selected=!1}}},Fo={key:0},Ao={class:"hero bg-gray-100 py-2 m-1 mx-2 rounded shadow"},zo={class:"container px-4 sm:px-4 lg:px-6 xl:px-6 mx-auto"},Lo={class:"hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center"},Yo={class:"hero-text col-span-6"},Po={class:"flex items-center font-bold text-lg md:text-lg max-w-lg text-gray-900 leading-tight"},Eo=e("div",null,[e("span",{class:"iconify text-purple-900 text-5xl mr-1","data-icon":"ic:school"}),e("hr",{class:"w-12 h-[4px] bg-purple-900 rounded-full mt-0"})],-1),Qo={class:"flex-1 leading-3 ml-2"},No=e("div",{class:"pt-2 m-0 fw-200 text-[8pt] border-b border-gray-300"}," Forma\xE7\xE3o ",-1),qo={class:"mt-2 leading-5 text-[13pt]"},Bo={class:"leading-4 text-gray-800 text-[8pt] mt-2 font-light"},Ro={key:0,class:"my-[3px] fw-400 text-[8pt]"},Ho=e("span",null,"DATA:",-1),Jo={class:"ml-1 text-[8pt] fw-500 px-1 pt-[2px] rounded text-green-700 bg-slate-200"},Ko={class:"ml-1 text-[9pt] fw-300"},Xo={key:1,class:"my-[3px] fw-400 text-[8pt]"},Go=e("span",{class:"fw-500 text-[8pt]"},"Per\xEDodo:",-1),Wo={class:"ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200"},Zo={class:"text-[6pt]"},ea=e("span",{class:"px-1"},"at\xE9",-1),sa={class:"ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200"},ta={class:"text-[6pt]"},oa={class:"px-2 mt-1"},aa=e("span",{class:"text-[8pt]"},"Mural",-1),la=e("span",{class:"text-[8pt]"},"Materiais de apoio",-1);function ia(s,t,a,p,o,i){v("superbotao");const d=v("mural"),f=v("materiais");return o.formacao!=null?(l(),n("div",Fo,[e("div",Ao,[e("div",zo,[e("div",Lo,[e("div",Yo,[e("h1",Po,[Eo,e("div",Qo,[No,e("div",qo,u(o.formacao.nome),1)])]),e("p",Bo,u(o.formacao.descr),1),e("div",null,[o.formacao.dataInicio==o.formacao.dataTermino?(l(),n("div",Ro,[Ho,e("span",Jo,u(i.moment(o.formacao.dataInicio).format("DD/MM/YYYY")),1),e("span",Ko," ("+u(i.moment(o.formacao.dataInicio).locale("pt-br").format("dddd"))+") ",1)])):r("",!0),o.formacao.dataInicio!=o.formacao.dataTermino?(l(),n("div",Xo,[Go,e("span",Wo,[I(u(i.moment(o.formacao.dataInicio).format("DD/MM/YYYY"))+" ",1),e("span",Zo," ("+u(i.moment(o.formacao.dataInicio).locale("pt-br").format("ddd").toUpperCase())+") ",1)]),ea,e("span",sa,[I(u(i.moment(o.formacao.dataTermino).format("DD/MM/YYYY"))+" ",1),e("span",ta," ("+u(i.moment(o.formacao.dataTermino).locale("pt-br").format("ddd").toUpperCase())+") ",1)])])):r("",!0)])]),r("",!0)])])]),e("div",oa,[c(E,{modelValue:o.tab,"onUpdate:modelValue":t[0]||(t[0]=_=>o.tab=_),class:"text-slate-900",align:"left",dense:""},{default:m(()=>[c(F,{name:"mural",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:m(()=>[aa]),_:1}),c(F,{name:"materiais",class:"",style:{height:"30px","max-height":"30px","min-height":"30px"}},{default:m(()=>[la]),_:1})]),_:1},8,["modelValue"])]),e("div",null,[c(Q,{modelValue:o.tab,"onUpdate:modelValue":t[1]||(t[1]=_=>o.tab=_),animated:"",swipeable:"",vertical:"","transition-prev":"jump-up","transition-next":"jump-up"},{default:m(()=>[c(A,{name:"mural"},{default:m(()=>[c(d,{formacao:o.formacao},null,8,["formacao"])]),_:1}),c(A,{name:"materiais"},{default:m(()=>[c(f)]),_:1})]),_:1},8,["modelValue"])])])):r("",!0)}var ha=b(Uo,[["render",ia]]);export{ha as default};
