(this["webpackJsonpvg-voting"]=this["webpackJsonpvg-voting"]||[]).push([[0],{16:function(e,t,a){e.exports=a.p+"static/media/docs.9963ae0e.pdf"},22:function(e,t,a){e.exports=a(42)},31:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(13),c=a.n(r),s=(a(27),a(28),a(14)),i=a(15),u=a(21),o=a(19),m=a(18),d=a(1),b=a(20);a(31);function f(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(!1),i=Object(d.a)(s,2),u=i[0],o=i[1],m=Object(n.useState)("V\xe4lj en fil med r\xf6stkoder"),f=Object(d.a)(m,2),E=f[0],h=f[1],g=Object(n.useState)("V\xe4lj en fil med r\xf6ster"),p=Object(d.a)(g,2),v=p[0],j=p[1],O=Object(n.useState)(!1),N=Object(d.a)(O,2),x=N[0],k=N[1];Object(n.useEffect)((function(){0===r.length?o(!1):2===r.length&&o(!0)}),[r]);var S=function(e){e.preventDefault(),k(!1);var t=e.target.id,a=e.target.files[0];a.name.endsWith("xlsx")||a.name.endsWith("xls")?(c([].concat(Object(b.a)(r),[{file_id:t,uploaded_file:a}])),"0"===t?h(null===a||void 0===a?void 0:a.name):j(null===a||void 0===a?void 0:a.name)):k(!0)};return l.a.createElement("div",{className:"container"},l.a.createElement("form",{className:"upload-container",onSubmit:function(t){t.preventDefault(),r.forEach((function(t){"0"===(null===t||void 0===t?void 0:t.file_id)?e.setVoteCodeFile(null===t||void 0===t?void 0:t.uploaded_file):e.setVoteFile(null===t||void 0===t?void 0:t.uploaded_file),e.setSubmitted(!0),c([]),h("V\xe4lj en fil med r\xf6stkoder"),j("V\xe4lj en fil med r\xf6ster")}))}},l.a.createElement("div",{className:"upload-btn"},l.a.createElement("h3",{className:"file-upload-header"},"R\xf6stkoder"),l.a.createElement("input",{id:0,name:"file",type:"file",accept:".xlsx",className:"file-input",onChange:S}),l.a.createElement("label",{htmlFor:0},E)),l.a.createElement("div",{className:"upload-btn"},l.a.createElement("h3",{className:"file-upload-header"},"R\xf6ster"),l.a.createElement("input",{id:1,type:"file",accept:".xlsx",className:"file-input",onChange:S}),l.a.createElement("label",{htmlFor:1},v),x?l.a.createElement("div",{className:"error-message-root"},l.a.createElement("span",{className:"error-message"},"Filen m\xe5ste vara av typen .xlsx eller .xls.")):null),u?l.a.createElement("div",{className:"submit-btn-root"},l.a.createElement("button",{className:"btn btn-success btn-lg",type:"submit"},"Ladda upp")):l.a.createElement("div",{className:"submit-btn-root"},l.a.createElement("button",{className:"btn btn-success btn-lg",type:"submit",disabled:!0},"Ladda upp"))))}var E=a(3),h=a.n(E),g=a(32);function p(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)([]),i=Object(d.a)(s,2),u=i[0],o=i[1],m=Object(n.useState)(!1),b=Object(d.a)(m,2),f=b[0],E=b[1],p=Object(n.useState)(!0),v=Object(d.a)(p,2),j=v[0],O=v[1],N=Object(n.useState)(null),x=Object(d.a)(N,2),k=x[0],S=x[1],y=Object(n.useState)(0),w=Object(d.a)(y,2),C=w[0],R=w[1],W=Object(n.useState)(null),F=Object(d.a)(W,2),V=F[0],B=F[1],_=Object(n.useState)(null),A=Object(d.a)(_,2),D=A[0],L=A[1],T=Object(n.useState)(null),G=Object(d.a)(T,2),J=G[0],I=G[1],$=Object(n.useState)(null),q=Object(d.a)($,2),z=q[0],H=q[1];Object(n.useEffect)((function(){M(),K()}),[]);var K=function(){var t=new g.Workbook;e.voteFile.arrayBuffer().then((function(e){t.xlsx.load(e)})),I(t)},M=function(){var t=new g.Workbook;e.voteCodeFile.arrayBuffer().then((function(e){t.xlsx.load(e)})),L(t)},P=function(){var e=[];return J.getWorksheet().getColumn("B").eachCell((function(t){return e.push(t.text)})),e.slice(1)},Q=function(){var e=[];return D.getWorksheet().getColumn("A").eachCell((function(t){return e.push(t.text)})),e},U=function(){for(var e=J.getWorksheet(),t=function(){var e={};return J.getWorksheet().getRow(1).eachCell((function(t){"Tidst\xe4mpel"!==t.text&&"Valkod"!==t.text&&(e[t.text]=[])})),e}(),a=3;a<=e.actualColumnCount;a++)e.getColumn(a).eachCell((function(e){for(var a in t)if(e.text.startsWith(a)){var n=t[a];n.push(e.text),t[a]=n}}));for(var n in t)t[n].shift();return t},X=function(t){e.setSubmitted(!1),t.preventDefault()},Y=function(){var e=function(){var e=U(),t={};for(var a in e)e[a].forEach((function(e){(e=e.split(",")).forEach((function(e){(e=e.trim()).endsWith("*")&&(e=e.replace(/\*/g,"")),t[e]=t[e]+1||1}))}));return t}(),t=[];(function(){var e=[],t=P(),a=Q(),n=[],l=[];return t.forEach((function(t){a.includes(t)?(e.push(t),n.push("Giltig r\xf6st: "+t),a=a.filter((function(e){return e!==t}))):e.includes(t)?(l.push("Ogiltig r\xf6st, har r\xf6stat mer \xe4n 1 g\xe5ng: "+t),S(!1)):(l.push("Ogiltig r\xf6st, ej registrerad: "+t),S(!1))})),0===l.length&&S(!0),[n,l]})().forEach((function(e){return e.forEach((function(e){return t.push(e)}))}));var a=Object.entries(e),n=[];a.forEach((function(e){var t=Object(d.a)(e,2),a=t[0],l=t[1];if(1===l)var r=" r\xf6st";else r=" r\xf6ster";n.push(a+": "+l+r)})),c(t),o(n),E(!0),O(!1),R(Q().length),H(function(){var e=[],t=P(),a=Q();a.length>t.length?(S(!1),B(!1),a.filter((function(e){return!t.includes(e)})).forEach((function(t){e.push("Registrerad, men har ej r\xf6stat: "+t)}))):a.length<t.length?B(!1):B(!0);return e}())},Z=function(){return l.a.createElement("div",{className:"col text-center"},l.a.createElement("button",{type:"button",className:"btn btn-success m-4 btn-lg",onClick:X},"Genomf\xf6r en ny r\xf6stning"))};return l.a.createElement("div",{className:"container w-50"},f?k&&V?l.a.createElement("div",{className:"container w-75"},l.a.createElement("h1",null,l.a.createElement("b",null,"Resultat")),l.a.createElement("ul",{className:"list-group"},u.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("h1",null,l.a.createElement("b",null,"R\xf6stvalidering")),l.a.createElement("br",null),l.a.createElement("h3",null,l.a.createElement("b",null,"Antal r\xf6stande: ",r.length)),l.a.createElement("h3",null,l.a.createElement("b",null,"R\xf6stl\xe4ngd: ",C)),l.a.createElement("br",null),l.a.createElement("ul",{className:"list-group"},r.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),Z()):k&&!V?l.a.createElement("div",{className:"container w-75"},l.a.createElement("h5",null,l.a.createElement("b",null,"R\xf6stningen \xe4r inte giltig. R\xf6stl\xe4ngd och antalet r\xf6ster st\xe4mmer \xf6verensst\xe4mmer inte.")),l.a.createElement("br",null),l.a.createElement("ul",{className:"list-group"},z.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("h5",null,"Antal r\xf6stande: ",r.length),l.a.createElement("h5",null,"R\xf6stl\xe4ngd: ",C)),Z()):!k&&V?l.a.createElement("div",{className:"container w-75"},l.a.createElement("h5",null,l.a.createElement("b",null,"R\xf6stningen \xe4r inte giltig. Ta bort ogiltiga r\xf6ster ur Excel-arket och ladda upp igen:"," ")),l.a.createElement("br",null),l.a.createElement("ul",{className:"list-group"},r.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),Z()):k||V?void 0:l.a.createElement("div",{className:"container w-75"},l.a.createElement("h5",null,l.a.createElement("b",null,"R\xf6stningen \xe4r inte giltig. Ta bort ogiltiga r\xf6ster ur Excel-arket och ladda upp igen:"," ")),l.a.createElement("br",null),l.a.createElement("ul",{className:"list-group"},r.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),l.a.createElement("br",null),l.a.createElement("ul",{className:"list-group"},z.map((function(e){return l.a.createElement("li",{key:h()(),className:"list-group-item"}," ",l.a.createElement("h3",null," ",e))}))),l.a.createElement("br",null),l.a.createElement("h5",null,l.a.createElement("b",null,"R\xf6stningen \xe4r inte giltig. R\xf6stl\xe4ngd och antalet r\xf6ster st\xe4mmer \xf6verensst\xe4mmer inte.")),l.a.createElement("br",null),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("h5",null,"Antal r\xf6stande: ",r.length),l.a.createElement("h5",null,"R\xf6stl\xe4ngd: ",C)),Z()):null,l.a.createElement("div",{className:"row"}),j?l.a.createElement("div",{className:"col text-center"},l.a.createElement("button",{type:"button",className:"btn btn-success m-4 btn-lg",onClick:Y},"Visa valresultat")):null)}a(35);function v(){var e=Object(n.useState)(!1),t=Object(d.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(null),s=Object(d.a)(c,2),i=s[0],u=s[1],o=Object(n.useState)(null),m=Object(d.a)(o,2),b=m[0],E=m[1];return l.a.createElement("div",{className:"container-root"},l.a.createElement("div",{className:"jumbotron text-center"},l.a.createElement("h1",{className:"display-4"},"R\xf6str\xe4knare "),l.a.createElement("p",{className:"lead"},"V\xe4stg\xf6ta Nation")),a?l.a.createElement(p,{setSubmitted:r,voteCodeFile:i,voteFile:b}):l.a.createElement(f,{setSubmitted:r,setVoteCodeFile:u,setVoteFile:E}))}a(36);var j=a(16),O=a.n(j);function N(){return l.a.createElement("div",{className:"footer"},l.a.createElement("span",{className:"support-text"},l.a.createElement("a",{href:O.a,download:!0},"L\xe4s p\xe5 om systemet h\xe4r!")))}a(37);var x=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.a,{basename:"/voting-vg"},l.a.createElement(v,null),l.a.createElement(N,null))}}]),a}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[22,1,2]]]);
//# sourceMappingURL=main.2df3be4c.chunk.js.map