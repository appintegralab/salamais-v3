import{_ as u,S as d,P as c,c as p,f as o,h as l,Y as _,K as x,O as v,a0 as r,j as h,k as f}from"./index.2bd1149f.js";const V={data(){return{inputCss:{inner:"h-7 text-[8pt] fw-700"},email:"",texto:"",assunto:""}},methods:{enviarEmail(){let i=this;console.log("enviarEmail"),console.log("db",d);let e={nome:"nome",to:this.email,message:{subject:this.assunto,text:this.texto,html:this.texto}};console.log("dados",e),d.collection("mail").add(e).then(n=>{console.log("Email enviado!",n),i.$q.notify(c.success("Email enviado com sucesso"))})}}},E={class:"p-2 border rounded m-2"},g=r(" Teste de envio de email "),C={class:"grid grid-cols-2"},b={class:"px-2"},k={class:"px-2"},q={class:"px-2"},y=o("div",{class:"text-xs fw-500"}," Texto da mensagem ",-1),w=o("hr",{class:"my-2"},null,-1),B=r("Enviar");function T(i,e,n,K,s,m){const a=h("FormKit");return f(),p("div",E,[g,o("div",C,[o("div",null,[o("div",b,[l(a,{modelValue:s.email,"onUpdate:modelValue":e[0]||(e[0]=t=>s.email=t),type:"email",label:"Email destinat\xE1rio",help:"Endere\xE7o de email v\xE1lido",required:"",classes:s.inputCss,validation:"required"},null,8,["modelValue","classes"])]),o("div",k,[l(a,{modelValue:s.assunto,"onUpdate:modelValue":e[1]||(e[1]=t=>s.assunto=t),type:"text",label:"Assunto",help:"Assunto",required:"",classes:s.inputCss,validation:"required"},null,8,["modelValue","classes"])]),o("div",q,[y,l(_,{dense:"",rows:2,class:"text-xs",modelValue:s.texto,"onUpdate:modelValue":e[2]||(e[2]=t=>s.texto=t),outlined:"",type:"textarea"},null,8,["modelValue"])]),w,o("div",null,[l(v,{onClick:m.enviarEmail,size:"sm",outline:""},{default:x(()=>[B]),_:1},8,["onClick"])])])])])}var U=u(V,[["render",T]]);export{U as default};