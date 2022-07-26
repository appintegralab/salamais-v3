var Z=Object.defineProperty,ee=Object.defineProperties;var te=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var oe=Object.prototype.hasOwnProperty,ae=Object.prototype.propertyIsEnumerable;var M=(t,l,d)=>l in t?Z(t,l,{enumerable:!0,configurable:!0,writable:!0,value:d}):t[l]=d,C=(t,l)=>{for(var d in l||(l={}))oe.call(l,d)&&M(t,d,l[d]);if(A)for(var d of A(l))ae.call(l,d)&&M(t,d,l[d]);return t},H=(t,l)=>ee(t,te(l));import{n as w,p as le,t as ie,v as se,w as re,x as ne,y as de,z as ce,A as pe,B as me,C as S,Q as fe,D as ge,E as ue,G as he,H as U,I as xe,J as O,_ as L,i as K,r as I,a as z,k as r,c as n,h,K as _,L as be,f as e,F as E,g as D,M as v,N as m,O as Y,u as ye,m as R,P as y,R as P,S as Q,j as B,l as ve,T as we,U as _e,V as ke,W as Se,d as u,X as N,Y as Ie,Z as ze,$ as Ee,a0 as j,a1 as De}from"./index.2bd1149f.js";import{c as Ce}from"./caixa-formacao-info.1312eccb.js";const je=w("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24","aria-hidden":"true"},[w("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),w("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var F=le({name:"QRadio",props:H(C(C(C({},ie),se),re),{modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]}),emits:["update:modelValue"],setup(t,{slots:l,emit:d}){const{proxy:i}=he(),a=ne(t,i.$q),c=de(t,ce),x=pe(null),{refocusTargetEl:s,refocusTarget:o}=me(t,x),p=S(()=>U(t.modelValue)===U(t.val)),g=S(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(t.disable===!0?" disabled":"")+(a.value===!0?" q-radio--dark":"")+(t.dense===!0?" q-radio--dense":"")+(t.leftLabel===!0?" reverse":"")),b=S(()=>{const f=t.color!==void 0&&(t.keepColor===!0||p.value===!0)?` text-${t.color}`:"";return`q-radio__inner relative-position q-radio__inner--${p.value===!0?"truthy":"falsy"}${f}`}),k=S(()=>(p.value===!0?t.checkedIcon:t.uncheckedIcon)||null),G=S(()=>t.disable===!0?-1:t.tabindex||0),X=S(()=>{const f={type:"radio"};return t.name!==void 0&&Object.assign(f,{"^checked":p.value===!0?"checked":void 0,name:t.name,value:t.val}),f}),$=xe(X);function V(f){f!==void 0&&(O(f),o(f)),t.disable!==!0&&p.value!==!0&&d("update:modelValue",t.val,f)}function J(f){(f.keyCode===13||f.keyCode===32)&&O(f)}function W(f){(f.keyCode===13||f.keyCode===32)&&V(f)}return Object.assign(i,{set:V}),()=>{const f=k.value!==null?[w("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[w(fe,{class:"q-radio__icon",name:k.value})])]:[je];t.disable!==!0&&$(f,"unshift"," q-radio__native q-ma-none q-pa-none");const q=[w("div",{class:b.value,style:c.value},f)];s.value!==null&&q.push(s.value);const T=t.label!==void 0?ge(l.default,[t.label]):ue(l.default);return T!==void 0&&q.push(w("div",{class:"q-radio__label q-anchor--skip"},T)),w("div",{ref:x,class:g.value,tabindex:G.value,role:"radio","aria-label":t.label,"aria-checked":p.value===!0?"true":"false","aria-disabled":t.disable===!0?"true":void 0,onClick:V,onKeydown:J,onKeyup:W},q)}}});function Ve({nome:t,email:l,trilha:d,data:i,horario:a,link:c}){return`<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title>Inscri\xE7\xE3o realizada com sucesso</title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
            <noscript>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet" type="text/css">
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic"
        rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Roboto:300,500);
        @import url(https://fonts.googleapis.com/css?family=Raleway:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
    </head>
    
    <body style="word-spacing:normal;">
      <div>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#e2e8f0" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#e2e8f0;background-color:#e2e8f0;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#e2e8f0;background-color:#e2e8f0;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                      width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="border-collapse:collapse;border-spacing:0px;">
                              <tbody>
                                <tr>
                                  <td style="width:180px;"><img height="auto"
                                      src="https://firebasestorage.googleapis.com/v0/b/appintegra-d8424.appspot.com/o/salamais%2Fsalamais-rect.png?alt=media&token=f7e29a07-1eb6-4db9-95aa-c801eee78299"
                                      style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                      width="180"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-top:5px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding-right:40px;padding-left:40px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:20px;font-weight:600;line-height:16px;text-align:center;color:#626262;">
                                      Ol\xE1 ${t}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:16px;font-weight:300;line-height:16px;text-align:center;color:#525252;">
                                      Agradecemos a sua inscri\xE7\xE3o no <strong>Sala Mais</strong>.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:16px;font-weight:300;line-height:16px;text-align:center;color:#525252;">
                                      Confira os dados da sua inscri\xE7\xE3o:</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td
                  style="direction:ltr;font-size:0px;padding:0px;padding-left:80px;padding-right:80px;padding-top:5px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:440px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td
                            style="border:1px solid #d4d4d4;vertical-align:top;padding-top:10px;padding-right:5px;padding-bottom:10px;padding-left:5px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="left"
                                    style="font-size:0px;padding:10px 25px;padding-top:2px;padding-bottom:2px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:left;color:#525252;">
                                      <strong>Trilha:</strong> ${d}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left"
                                    style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:left;color:#525252;">
                                      <strong>Data:</strong> ${i}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left"
                                    style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:left;color:#525252;">
                                      <strong>Hor\xE1rio:</strong> ${a}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-top:5px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding-right:40px;padding-left:40px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:center;color:#525252;">
                                      Clique no link / bot\xE3o abaixo para acessar informa\xE7\xF5es da forma\xE7\xE3o.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center"
                                    style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:center;color:#525252;">
                                      Neste link, voc\xEA encontrar\xE1 o acesso a sua sala na data do evento e os materiais que
                                      separamos para se preparar.</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:5px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding-right:40px;padding-bottom:0px;padding-left:40px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" vertical-align="middle"
                                    style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                      style="border-collapse:separate;line-height:100%;">
                                      <tbody>
                                        <tr>
                                          <td align="center" bgcolor="#ffffff" role="presentation"
                                            style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff;"
                                            valign="middle"><a href="${c}"
                                              style="display:inline-block;background:#ffffff;color:#000000;font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                              target="_blank">${c}</a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:5px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding-top:0px;padding-right:40px;padding-left:40px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" vertical-align="middle"
                                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                      style="border-collapse:separate;line-height:100%;">
                                      <tbody>
                                        <tr>
                                          <td align="center" bgcolor="#5b21b6" role="presentation"
                                            style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#5b21b6;"
                                            valign="middle"><a href="${c}"
                                              style="display:inline-block;background:#5b21b6;color:#ffffff;font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                              target="_blank">Ver informa\xE7\xF5es da forma\xE7\xE3o</a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ede9fe" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ede9fe;background-color:#ede9fe;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            style="background:#ede9fe;background-color:#ede9fe;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:10px;padding-top:0px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix"
                    style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td style="vertical-align:top;padding-top:0px;padding-right:40px;padding-left:40px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div
                                      style="font-family:Raleway, Roboto, Helvetica, sans-serif;font-size:14px;font-weight:300;line-height:16px;text-align:center;color:#525252;">
                                      At\xE9 breve!</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
    
    </html>`}const qe={data(){return{menuShow:!1,areas:[]}},mounted(){let t=this;K(I(z,"/salamais/areas/")).then(l=>{let d=l.val();t.areas=d})},methods:{selecionar(t){console.log(t),this.menuShow=!1,this.$emit("onSelect",t)}}},Re=e("span",{class:"text-[8pt] fw-300 lowercase"},"Selecionar \xE1rea",-1),Pe={class:"w-[300px]"},Ye=e("div",{class:"p-2 pl-3 bg-slate-200 text-xs fw-300"}," Selecione uma \xE1rea de conhecimento ",-1),Te=["onClick"];function Ae(t,l,d,i,a,c){return r(),n("span",null,[h(Y,{size:"4px",class:"px-1 pt-[6px]"},{default:_(()=>[Re,h(be,{modelValue:a.menuShow,"onUpdate:modelValue":l[0]||(l[0]=x=>a.menuShow=x)},{default:_(()=>[e("div",Pe,[Ye,(r(!0),n(E,null,D(a.areas,(x,s)=>(r(),n("div",{class:"px-2 my-1",key:s},[e("div",{onClick:o=>c.selecionar(x),class:"flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200"},[e("div",{style:v("background-color:"+x.cor),class:"leading-3 ml-1 text-[6pt] fw-700 px-1 pt-[1px] rounded text-white"},m(x.sigla),5),e("div",{style:v("color:"+x.cor),class:"ml-1 text-[7pt] text-purple-900 fw-700"},m(x.nome),5)],8,Te)]))),128))])]),_:1},8,["modelValue"])]),_:1})])}var Me=L(qe,[["render",Ae]]);const He={components:{caixaformacaoinfo:Ce,selecionararea:Me},data(){return{dialog:!1,cpf:"",formacao:null,opcao:0,email:"",areas:[],areaSel:"",userStore:ye(),rules:[function(t){return t.trim()!=""?/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(t)?!0:"Email inv\xE1lido":"Email obrigat\xF3rio"}]}},computed:{moment(){return R},user(){return this.userStore.user}},watch:{"userStore.user":function(t){this.email=this.userStore.user.email}},mounted(){let t=this;K(I(z,"/salamais/areas/")).then(l=>{let d=l.val();t.areas=d})},methods:{show(t){this.formacao=t,console.log("formacao",t);for(let l in this.formacao.encontros)this.formacao.encontros[l].selected=!1,this.formacao.encontros[l].areaSel="";this.opcao=0,this.areaSel="",this.email=this.userStore.user.email,this.dialog=!0},uuidv4(t){return t.normalize("NFD").replace(/[ \u0300-\u036f]/g,"").toUpperCase().substr(0,10)+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,d=>(d^crypto.getRandomValues(new Uint8Array(1))[0]&15>>d/4).toString(16)).substr(0,10)},registrarInscricao(){let t=this;if(console.log("email",this.email),this.email==""){this.$q.notify(y.error("Email obrigat\xF3rio!"));return}if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){this.$q.notify(y.error("Email inv\xE1lido!"));return}let i={id:this.uuidv4("INS-"+this.formacao.nome),formacaoID:this.formacao.id,encontros:{},userID:this.userStore.user.id,userEmail:this.email};if(console.log("formacao",this.formacao),console.log("elem",i),this.formacao.inscrPorEncontro)if(this.formacao.multiplaInscr)if(this.formacao.turmasPorArea){for(let s in this.formacao.encontros)if(this.formacao.encontros[s].selected)if(this.formacao.encontros[s].areaSel==""){this.$q.notify(y.error("Escolha \xE1rea de conhecimento para o encontro selecionado!"));return}else{let o=this.formacao.encontros[s].areaSel.id;i.encontros[this.formacao.encontros[s].id]={encontroID:this.formacao.encontros[s].id,area:this.formacao.encontros[s].areaSel.id,sala:this.formacao.encontros[s].areas[o].salaIDCtrl}}if(i.encontros.length==0){this.$q.notify(y.error("Escolha pelo menos uma op\xE7\xE3o de encontro!"));return}}else{for(let s in this.formacao.encontros)this.formacao.encontros[s].selected&&(i.encontros[this.formacao.encontros[s].id]={encontroID:this.formacao.encontros[s].id,area:"",sala:this.formacao.encontros[s].salaIDCtrl});if(i.encontros.length==0){this.$q.notify(y.error("Escolha pelo menos uma op\xE7\xE3o de encontro!"));return}}else if(this.formacao.turmasPorArea)if(this.formacao.encontros[this.opcao].areaSel==""){this.$q.notify(y.error("Escolha \xE1rea de conhecimento para a forma\xE7\xE3o!"));return}else{let s=this.formacao.encontros[this.opcao].areaSel.id;i.encontros={},i.encontros[this.formacao.encontros[this.opcao].id]={encontroID:this.formacao.encontros[this.opcao].id,area:this.formacao.encontros[this.opcao].areaSel.id,sala:this.formacao.encontros[this.opcao].areas[s].salaIDCtrl}}else i.encontros={},i.encontros[this.formacao.encontros[this.opcao].id]={encontroID:this.formacao.encontros[this.opcao].id,area:this.areaSel,sala:this.formacao.encontros[this.opcao].salaIDCtrl};else if(this.formacao.turmasPorArea)if(this.areaSel==""){this.$q.notify(y.error("Escolha \xE1rea de conhecimento para a forma\xE7\xE3o!"));return}else i.encontros={},i.encontros[this.formacao.encontros[0].id]={encontroID:this.formacao.encontros[0].id,area:this.areaSel,sala:this.formacao.encontros[0].salaIDCtrl};else i.encontros={},i.encontros[this.formacao.encontros[0].id]={encontroID:this.formacao.encontros[0].id,area:"",sala:this.formacao.encontros[0].salaIDCtrl};console.log("elem",i);let a="";for(let s in i.encontros){let o=i.encontros[s].encontroID,p="";i.encontros[s].area!=null&&i.encontros[s].area!=""&&(p=" - "+i.encontros[s].area);let g=" - sala "+i.encontros[s].sala;for(let b in this.formacao.encontros){let k=this.formacao.encontros[b];o==k.id&&(a=a+"("+k.horaInicio+" \xE0s "+k.horaTermino+p+g+") ")}}console.log("horario",a),this.dialog=!1,console.log("formacao",this.formacao);let c=this.formacao;for(let s in i.encontros){console.log("encontro",i.encontros[s]);for(let o in c.encontros)if(c.encontros[o].id==i.encontros[s].encontroID){console.log("achei encontro:",c.encontros[o]);let p=i.encontros[s].area;if(console.log("area",p),p!=null&&p!=""){let g=c.encontros[o].areas[p].salaIDCtrl,b=`/salamais/formacoes/${c.id}/encontros/${o}/areas/${p}/salas/sala${g}/inscricoes/`;console.log("path",b+t.userStore.user.id),P(I(z,b+t.userStore.user.id),t.userStore.user.id)}else{let g=c.encontros[o].salaIDCtrl,b=`/salamais/formacoes/${c.id}/encontros/${o}/salas/sala${g}/inscricoes/`;console.log("path",b+t.userStore.user.id),P(I(z,b+t.userStore.user.id),t.userStore.user.id)}}}console.log("formacao",c),P(I(z,"/salamais/inscricoes/"+i.id),i),t.$emit("novaInscricao"),t.$q.notify(y.success("Inscri\xE7\xE3o realizada com sucesso"));let x={nome:t.userStore.user.nome,email:i.userEmail,trilha:t.formacao.nome,data:R(t.formacao.dataInicio).format("DD/MM/YYYY")+" ("+R(t.formacao.dataInicio).locale("pt-br").format("dddd")+")",horario:a,link:"https://prj-salamais-prd.web.app/formacao/"+t.formacao.id};console.log("enviaEmail",x),t.enviaEmail(x)},showCadastro(){},enviaEmail(t){console.log("enviaEmail"),console.log("db",Q);let l={nome:t.nome,to:t.email,message:{subject:"Sala Mais - Confirma\xE7\xE3o de inscri\xE7\xE3o - "+t.trilha,text:"This is the plaintext section of the email body.",html:Ve(t)}};Q.collection("mail").add(l).then(d=>{console.log("Email enviado!",d)})}}},Ue={class:"bg-white md:min-w-[800px]"},Oe=e("img",{src:Ee},null,-1),Qe=e("span",{class:"text-base"}," Inscri\xE7\xE3o ",-1),Be={class:"mx-4 p-1 px-2 border rounded"},Ne={key:0,class:"mx-4 my-2 p-1 border rounded bg-gray-100"},Fe={key:0,class:"text-[9pt] ml-1 fw-300 mb-1"},Le={key:1,class:"ml-2 flex-1 flex items-center justify-center"},Ke={class:"flex items-center"},Ge=e("div",{class:"fw-200 text-[7pt] pt-[2px] mr-2"},"\xC1rea: ",-1),Xe={key:0,class:"flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]"},$e=e("span",{class:"mr-1 text-[9pt] iconify","data-icon":"ic:warning"},null,-1),Je=j(" Selecione uma \xE1rea... "),We=[$e,Je],Ze={key:1,class:""},et={class:"flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200"},tt={class:"ml-2"},ot={key:1,class:"mx-4 my-2 p-1 border rounded bg-gray-100"},at=e("div",{class:"text-[10pt] mb-1 fw-300"}," Escolha qual encontro deseja se inscrever: ",-1),lt={key:0},it={key:0},st={class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},rt={class:"ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},nt={class:"ml-1 text-[10pt] fw-300"},dt=e("span",{class:"ml-2 fw-200 text-[9pt]"},"Hor\xE1rio:",-1),ct={class:"px-1 rounded text-[9pt] fw-500 text-slate-900"},pt={key:1},mt={class:""},ft={class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},gt={class:"ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},ut={class:"ml-1 text-[9pt] fw-300"},ht=e("span",{class:"ml-2 fw-200 text-[9pt]"},"Hor\xE1rio:",-1),xt={class:"px-1 rounded text-[9pt] fw-500 text-slate-900"},bt={key:0,class:"ml-2 flex-1 flex items-center justify-between"},yt={class:"flex items-center"},vt=e("div",{class:"fw-200 text-[10pt] pt-[2px]"},"\xC1rea: ",-1),wt={key:0,class:"flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]"},_t=e("span",{class:"mr-1 text-[10pt] iconify","data-icon":"ic:warning"},null,-1),kt=j(" Selecione uma \xE1rea... "),St=[_t,kt],It={key:1,class:""},zt={class:"flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200"},Et={class:"ml-2"},Dt={key:1},Ct={key:0},jt={class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},Vt={class:"ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},qt={class:"ml-1 text-[10pt] fw-300"},Rt=e("span",{class:"ml-2 fw-200 text-[10pt]"},"Hor\xE1rio:",-1),Pt={class:"px-1 rounded text-[10pt] fw-500 text-slate-900"},Yt={key:1},Tt={class:""},At={class:"flex items-center mt-1 p-1 bg-slate-200 rounded"},Mt={class:"ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100"},Ht={class:"ml-1 text-[10pt] fw-300"},Ut=e("span",{class:"ml-2 fw-200 text-[10pt]"},"Hor\xE1rio:",-1),Ot={class:"px-1 rounded text-[10pt] fw-500 text-slate-900"},Qt={key:0,class:"ml-2 flex-1 flex items-center justify-between"},Bt={class:"flex items-center"},Nt=e("div",{class:"fw-300 text-[10pt] pt-[2px]"},"\xC1rea: ",-1),Ft={key:0,class:"flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]"},Lt=e("span",{class:"mr-1 text-[10pt] iconify","data-icon":"ic:warning"},null,-1),Kt=e("span",{class:"text-[9pt]"},"Selecione uma \xE1rea...",-1),Gt=[Lt,Kt],Xt={key:1,class:""},$t={class:"flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200"},Jt={class:"ml-2"},Wt=e("div",{class:""},null,-1),Zt={class:"mx-4 mt-1 mb-2 border pt-2 px-2 rounded shadow bg-gray-100"},eo={class:"flex items-center"},to=e("div",{class:"flex-shrink w-[48px]"},[e("span",{class:"iconify mx-auto text-[14pt]","data-icon":"icon-park-outline:attention","data-inline":"false"})],-1),oo={class:"flex-1 text-[8pt]"},ao=e("div",{class:"fw-800 text-[7pt]"},"IMPORTANTE",-1),lo=j(" Um email ser\xE1 encaminhado confirmando sua inscri\xE7\xE3o e futuros avisos sobre esta forma\xE7\xE3o ser\xE3o tamb\xE9m enviados por email. Indique um endere\xE7o de email que voc\xEA utiliza com mais frequencia. "),io=e("span",{class:"fw-800 text-[8pt]"}," O email abaixo est\xE1 correto? ",-1),so=e("span",{class:"fw-400 text-[7pt] text-red-900"}," Caso n\xE3o seja seu email, altere para o endere\xE7o correto! ",-1),ro={class:"mt-2 mb-0"},no={class:"flex justify-center mb-2"},co=e("span",{class:"iconify mr-2","data-icon":"ic:check","data-inline":"false"},null,-1),po=j(" Confirmar inscri\xE7\xE3o ");function mo(t,l,d,i,a,c){const x=B("caixaformacaoinfo"),s=B("selecionararea");return r(),ve(ze,{modelValue:a.dialog,"onUpdate:modelValue":l[4]||(l[4]=o=>a.dialog=o)},{default:_(()=>[e("div",Ue,[h(Se,{class:"h-[20px]"},{default:_(()=>[h(we,{size:"28px"},{default:_(()=>[Oe]),_:1}),h(_e,null,{default:_(()=>[Qe]),_:1}),ke(h(Y,{flat:"",round:"",dense:"",icon:"close"},null,512),[[De]])]),_:1}),e("div",null,[e("div",Be,[h(x,{formacao:a.formacao},null,8,["formacao"])]),a.formacao.inscrPorEncontro?u("",!0):(r(),n("div",Ne,[a.formacao.turmasPorArea?(r(),n("div",Fe," Escolha qual \xE1rea de conhecimento deseja realizar a inscri\xE7\xE3o: ")):u("",!0),a.formacao.turmasPorArea?(r(),n("div",Le,[e("div",Ke,[Ge,a.areaSel==""?(r(),n("div",Xe,We)):u("",!0),!a.areaSel==""?(r(),n("div",Ze,[e("div",et,[e("div",{style:v("background-color:"+a.areaSel.cor),class:"text-[5pt] fw-600 px-[2px] pt-[1px] rounded text-white"},m(a.areaSel.sigla),5),e("div",{style:v("color:"+a.areaSel.cor),class:"ml-[3px] pt-[3px] text-[6pt] froboto text-purple-900 fw-500"},m(a.areaSel.nome),5)])])):u("",!0)]),e("div",tt,[h(s,{onOnSelect:l[0]||(l[0]=o=>{a.areaSel=o})})])])):u("",!0)])),a.formacao.inscrPorEncontro?(r(),n("div",ot,[at,a.formacao.multiplaInscr?u("",!0):(r(),n("div",lt,[a.formacao.turmasPorArea?u("",!0):(r(),n("div",it,[(r(!0),n(E,null,D(a.formacao.encontros,(o,p)=>(r(),n("div",{key:p},[e("div",st,[h(F,{color:"grey",modelValue:a.opcao,"onUpdate:modelValue":l[1]||(l[1]=g=>a.opcao=g),val:p,dense:"",size:"34px"},null,8,["modelValue","val"]),e("div",null,[e("span",rt,m(c.moment(o.data).format("DD/MM/YYYY")),1),e("span",nt," ("+m(c.moment(o.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),e("div",null,[dt,e("span",ct,m(o.horaInicio)+" \xE0s "+m(o.horaTermino),1)])])]))),128))])),a.formacao.turmasPorArea?(r(),n("div",pt,[e("div",mt,[(r(!0),n(E,null,D(a.formacao.encontros,(o,p)=>(r(),n("div",{key:p},[e("div",ft,[h(F,{color:"grey",modelValue:a.opcao,"onUpdate:modelValue":l[2]||(l[2]=g=>a.opcao=g),val:p,dense:"",size:"34px"},null,8,["modelValue","val"]),e("div",null,[e("span",gt,m(c.moment(o.data).format("DD/MM/YYYY")),1),e("span",ut," ("+m(c.moment(o.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),e("div",null,[ht,e("span",xt,m(o.horaInicio)+" \xE0s "+m(o.horaTermino),1)]),a.opcao==p?(r(),n("div",bt,[e("div",yt,[vt,o.areaSel==""?(r(),n("div",wt,St)):u("",!0),!o.areaSel==""?(r(),n("div",It,[e("div",zt,[e("div",{style:v("background-color:"+o.areaSel.cor),class:"text-[5pt] fw-600 px-[2px] pt-[1px] rounded text-white"},m(o.areaSel.sigla),5),e("div",{style:v("color:"+o.areaSel.cor),class:"ml-[3px] pt-[3px] text-[6pt] froboto text-purple-900 fw-500"},m(o.areaSel.nome),5)])])):u("",!0)]),e("div",Et,[h(s,{onOnSelect:g=>{o.areaSel=g}},null,8,["onOnSelect"])])])):u("",!0)])]))),128))])])):u("",!0)])),a.formacao.multiplaInscr?(r(),n("div",Dt,[a.formacao.turmasPorArea?u("",!0):(r(),n("div",Ct,[(r(!0),n(E,null,D(a.formacao.encontros,(o,p)=>(r(),n("div",{key:p},[e("div",jt,[h(N,{color:"grey",modelValue:o.selected,"onUpdate:modelValue":g=>o.selected=g,dense:"",size:"34px"},null,8,["modelValue","onUpdate:modelValue"]),e("div",null,[e("span",Vt,m(c.moment(o.data).format("DD/MM/YYYY")),1),e("span",qt," ("+m(c.moment(o.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),e("div",null,[Rt,e("span",Pt,m(o.horaInicio)+" \xE0s "+m(o.horaTermino),1)])])]))),128))])),a.formacao.turmasPorArea?(r(),n("div",Yt,[e("div",Tt,[(r(!0),n(E,null,D(a.formacao.encontros,(o,p)=>(r(),n("div",{key:p},[e("div",At,[h(N,{color:"grey",modelValue:o.selected,"onUpdate:modelValue":g=>o.selected=g,dense:"",size:"34px"},null,8,["modelValue","onUpdate:modelValue"]),e("div",null,[e("span",Mt,m(c.moment(o.data).format("DD/MM/YYYY")),1),e("span",Ht," ("+m(c.moment(o.data).locale("pt-br").format("dddd").split("-")[0])+") ",1)]),e("div",null,[Ut,e("span",Ot,m(o.horaInicio)+" \xE0s "+m(o.horaTermino),1)]),o.selected?(r(),n("div",Qt,[e("div",Bt,[Nt,o.areaSel==""?(r(),n("div",Ft,Gt)):u("",!0),!o.areaSel==""?(r(),n("div",Xt,[e("div",$t,[e("div",{style:v("background-color:"+o.areaSel.cor),class:"text-[7pt] fw-500 px-[2px] pt-[1px] rounded text-white"},m(o.areaSel.sigla),5),e("div",{style:v("color:"+o.areaSel.cor),class:"ml-[3px] pt-[3px] text-[7pt] froboto text-purple-900 fw-500"},m(o.areaSel.nome),5)])])):u("",!0)]),e("div",Jt,[h(s,{onOnSelect:g=>{o.areaSel=g}},null,8,["onOnSelect"])])])):u("",!0)])]))),128))])])):u("",!0)])):u("",!0),Wt])):u("",!0),e("div",Zt,[e("div",eo,[to,e("div",oo,[ao,lo,io,so,e("div",ro,[h(Ie,{color:"purple-9",class:"dense",type:"email",outlined:"",dense:"",modelValue:a.email,"onUpdate:modelValue":l[3]||(l[3]=o=>a.email=o),label:"Email",rules:a.rules},null,8,["modelValue","rules"])])])])]),e("div",no,[h(Y,{outline:"",size:"sm",onClick:c.registrarInscricao,class:"py-1 px-4 rounded text-gray-900"},{default:_(()=>[co,po]),_:1},8,["onClick"])])])])]),_:1},8,["modelValue"])}var ho=L(He,[["render",mo]]);export{ho as d};
