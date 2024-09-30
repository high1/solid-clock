(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const be=(e,t)=>e===t,F=Symbol("solid-proxy"),se=typeof Proxy=="function",we=Symbol("solid-track"),U={equals:be};let pe=de;const x=1,q=2,ie={owned:null,cleanups:null,context:null,owner:null};var y=null;let X=null,Ae=null,h=null,m=null,k=null,R=0;function B(e,t){const n=h,s=y,i=e.length===0,l=t===void 0?s:t,o=i?ie:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=i?e:()=>e(()=>T(()=>j(o)));y=o,h=null;try{return _(r,!0)}finally{h=n,y=s}}function re(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),fe(n,i));return[ce.bind(n),s]}function N(e,t,n){const s=ue(e,t,!1,x);V(s)}function le(e,t,n){n=n?Object.assign({},U,n):U;const s=ue(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,V(s),ce.bind(s)}function T(e){if(h===null)return e();const t=h;h=null;try{return e()}finally{h=t}}function oe(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function ce(){if(this.sources&&this.state)if(this.state===x)V(this);else{const e=m;m=null,_(()=>K(this),!1),m=e}if(h){const e=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(e)):(h.sources=[this],h.sourceSlots=[e]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function fe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&_(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=X&&X.running;o&&X.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?m.push(l):k.push(l),l.observers&&he(l)),o||(l.state=x)}if(m.length>1e6)throw m=[],new Error},!1)),t}function V(e){if(!e.fn)return;j(e);const t=R;Se(e,e.value,t)}function Se(e,t,n){let s;const i=y,l=h;h=y=e;try{s=e.fn(t)}catch(o){return e.pure&&(e.state=x,e.owned&&e.owned.forEach(j),e.owned=null),e.updatedAt=n+1,ge(o)}finally{h=l,y=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?fe(e,s):e.value=s,e.updatedAt=n)}function ue(e,t,n,s=x,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:y?y.context:null,pure:n};return y===null||y!==ie&&(y.owned?y.owned.push(l):y.owned=[l]),l}function ae(e){if(e.state===0)return;if(e.state===q)return K(e);if(e.suspense&&T(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<R);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===x)V(e);else if(e.state===q){const s=m;m=null,_(()=>K(e,t[0]),!1),m=s}}function _(e,t){if(m)return e();let n=!1;t||(m=[]),k?n=!0:k=[],R++;try{const s=e();return Oe(n),s}catch(s){n||(k=null),m=null,ge(s)}}function Oe(e){if(m&&(de(m),m=null),e)return;const t=k;k=null,t.length&&_(()=>pe(t),!1)}function de(e){for(let t=0;t<e.length;t++)ae(e[t])}function K(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===x?s!==t&&(!s.updatedAt||s.updatedAt<R)&&ae(s):i===q&&K(s,t)}}}function he(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=q,n.pure?m.push(n):k.push(n),n.observers&&he(n))}}function j(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)j(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)j(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function ke(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ge(e,t=y){throw ke(e)}const xe=Symbol("fallback");function Q(e){for(let t=0;t<e.length;t++)e[t]()}function Ee(e,t,n={}){let s=[],i=[],l=[],o=0,r=t.length>1?[]:null;return oe(()=>Q(l)),()=>{let f=e()||[],u=f.length,a,c;return f[we],T(()=>{let g,b,S,D,I,w,p,A,E;if(u===0)o!==0&&(Q(l),l=[],s=[],i=[],o=0,r&&(r=[])),n.fallback&&(s=[xe],i[0]=B(me=>(l[0]=me,n.fallback())),o=1);else if(o===0){for(i=new Array(u),c=0;c<u;c++)s[c]=f[c],i[c]=B(d);o=u}else{for(S=new Array(u),D=new Array(u),r&&(I=new Array(u)),w=0,p=Math.min(o,u);w<p&&s[w]===f[w];w++);for(p=o-1,A=u-1;p>=w&&A>=w&&s[p]===f[A];p--,A--)S[A]=i[p],D[A]=l[p],r&&(I[A]=r[p]);for(g=new Map,b=new Array(A+1),c=A;c>=w;c--)E=f[c],a=g.get(E),b[c]=a===void 0?-1:a,g.set(E,c);for(a=w;a<=p;a++)E=s[a],c=g.get(E),c!==void 0&&c!==-1?(S[c]=i[a],D[c]=l[a],r&&(I[c]=r[a]),c=b[c],g.set(E,c)):l[a]();for(c=w;c<u;c++)c in S?(i[c]=S[c],l[c]=D[c],r&&(r[c]=I[c],r[c](c))):i[c]=B(d);i=i.slice(0,o=u),s=f.slice(0)}return i});function d(g){if(l[c]=g,r){const[b,S]=re(c);return r[c]=S,t(f[c],b)}return t(f[c])}}}function O(e,t){return T(()=>e(t||{}))}function M(){return!0}const v={get(e,t,n){return t===F?n:e.get(t)},has(e,t){return t===F?!0:e.has(t)},set:M,deleteProperty:M,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:M,deleteProperty:M}},ownKeys(e){return e.keys()}};function H(e){return(e=typeof e=="function"?e():e)?e:{}}function Pe(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function W(...e){let t=!1;for(let o=0;o<e.length;o++){const r=e[o];t=t||!!r&&F in r,e[o]=typeof r=="function"?(t=!0,le(r)):r}if(se&&t)return new Proxy({get(o){for(let r=e.length-1;r>=0;r--){const f=H(e[r])[o];if(f!==void 0)return f}},has(o){for(let r=e.length-1;r>=0;r--)if(o in H(e[r]))return!0;return!1},keys(){const o=[];for(let r=0;r<e.length;r++)o.push(...Object.keys(H(e[r])));return[...new Set(o)]}},v);const n={},s=Object.create(null);for(let o=e.length-1;o>=0;o--){const r=e[o];if(!r)continue;const f=Object.getOwnPropertyNames(r);for(let u=f.length-1;u>=0;u--){const a=f[u];if(a==="__proto__"||a==="constructor")continue;const c=Object.getOwnPropertyDescriptor(r,a);if(!s[a])s[a]=c.get?{enumerable:!0,configurable:!0,get:Pe.bind(n[a]=[c.get.bind(r)])}:c.value!==void 0?c:void 0;else{const d=n[a];d&&(c.get?d.push(c.get.bind(r)):c.value!==void 0&&d.push(()=>c.value))}}}const i={},l=Object.keys(s);for(let o=l.length-1;o>=0;o--){const r=l[o],f=s[r];f&&f.get?Object.defineProperty(i,r,f):i[r]=f?f.value:void 0}return i}function Ce(e,...t){if(se&&F in e){const i=new Set(t.length>1?t.flat():t[0]),l=t.map(o=>new Proxy({get(r){return o.includes(r)?e[r]:void 0},has(r){return o.includes(r)&&r in e},keys(){return o.filter(r=>r in e)}},v));return l.push(new Proxy({get(o){return i.has(o)?void 0:e[o]},has(o){return i.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!i.has(o))}},v)),l}const n={},s=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const l=Object.getOwnPropertyDescriptor(e,i),o=!l.get&&!l.set&&l.enumerable&&l.writable&&l.configurable;let r=!1,f=0;for(const u of t)u.includes(i)&&(r=!0,o?s[f][i]=l.value:Object.defineProperty(s[f],i,l)),++f;r||(o?n[i]=l.value:Object.defineProperty(n,i,l))}return[...s,n]}function Ne(e){const t="fallback"in e&&{fallback:()=>e.fallback};return le(Ee(()=>e.each,e.children,t||void 0))}const $e=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Te=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...$e]),Le=new Set(["innerHTML","textContent","innerText","children"]),je=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),_e=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function De(e,t){const n=_e[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Ie=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Me={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Be(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,f=t[i-1].nextSibling,u=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const a=l<s?r?n[r-1].nextSibling:n[l-r]:f;for(;r<l;)e.insertBefore(n[r++],a)}else if(l===r)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],a),t[i]=n[l]}else{if(!u){u=new Map;let c=r;for(;c<l;)u.set(n[c],c++)}const a=u.get(t[o]);if(a!=null)if(r<a&&a<l){let c=o,d=1,g;for(;++c<i&&c<l&&!((g=u.get(t[c]))==null||g!==a+d);)d++;if(d>a-r){const b=t[o];for(;r<a;)e.insertBefore(n[r++],b)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const J="_$DX_DELEGATE";function Fe(e,t,n,s={}){let i;return B(l=>{i=l,t===document?e():C(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function ye(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>T(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return l.cloneNode=l,l}function Ue(e,t=window.document){const n=t[J]||(t[J]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,We))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function qe(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Ke(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Re(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ve(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n,typeof n!="function"&&n)}function Xe(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,o;for(l=0,o=i.length;l<o;l++){const r=i[l];!r||r==="undefined"||t[r]||(Z(e,r,!1),delete n[r])}for(l=0,o=s.length;l<o;l++){const r=s[l],f=!!t[r];!r||r==="undefined"||n[r]===f||!f||(Z(e,r,!0),n[r]=f)}return n}function He(e,t,n){if(!t)return n?G(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function ve(e,t={},n,s){const i={};return s||N(()=>i.children=$(e,t.children,i.children)),N(()=>typeof t.ref=="function"&&Ge(t.ref,e)),N(()=>Ye(e,t,n,!0,i,!0)),i}function Ge(e,t,n){return T(()=>e(t,n))}function C(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return $(e,t,s,n);N(i=>$(e,t(),i,n),s)}function Ye(e,t,n,s,i={},l=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=z(e,o,null,i[o],n,l,t)}for(const o in t){if(o==="children"){s||$(e,t.children);continue}const r=t[o];i[o]=z(e,o,r,i[o],n,l,t)}}function Qe(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Z(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function z(e,t,n,s,i,l,o){let r,f,u,a,c;if(t==="style")return He(e,n,s);if(t==="classList")return Xe(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const d=t.slice(3);s&&e.removeEventListener(d,s,typeof s!="function"&&s),n&&e.addEventListener(d,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const d=t.slice(10);s&&e.removeEventListener(d,s,!0),n&&e.addEventListener(d,n,!0)}else if(t.slice(0,2)==="on"){const d=t.slice(2).toLowerCase(),g=Ie.has(d);if(!g&&s){const b=Array.isArray(s)?s[0]:s;e.removeEventListener(d,b)}(g||n)&&(Ve(e,d,n,g),g&&Ue([d]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")Ke(e,t.slice(5),n);else if((c=t.slice(0,5)==="prop:")||(u=Le.has(t))||!i&&((a=De(t,e.tagName))||(f=Te.has(t)))||(r=e.nodeName.includes("-")||"is"in o))c&&(t=t.slice(5),f=!0),t==="class"||t==="className"?Re(e,n):r&&!f&&!u?e[Qe(t)]=n:e[a||t]=n;else{const d=i&&t.indexOf(":")>-1&&Me[t.split(":")[0]];d?qe(e,d,t,n):G(e,je[t]||t,n)}return n}function We(e){let t=e.target;const n=`$$${e.type}`,s=e.target,i=e.currentTarget,l=f=>Object.defineProperty(e,"target",{configurable:!0,value:f}),o=()=>{const f=t[n];if(f&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?f.call(t,u,e):f.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&l(t.host),!0},r=()=>{for(;o()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const f=e.composedPath();l(f[0]);for(let u=0;u<f.length-2&&(t=f[u],!!o());u++){if(t._$host){t=t._$host,r();break}if(t.parentNode===i)break}}else r();l(s)}function $(e,t,n,s,i){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(o){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=P(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=P(e,n,s);else{if(l==="function")return N(()=>{let r=t();for(;typeof r=="function";)r=r();n=$(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],f=n&&Array.isArray(n);if(Y(r,t,n,i))return N(()=>n=$(e,r,n,s,!0)),()=>n;if(r.length===0){if(n=P(e,n,s),o)return n}else f?n.length===0?ee(e,r,s):Be(e,n,r):(n&&P(e),ee(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=P(e,n,s,t);P(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Y(e,t,n,s){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],f=n&&n[e.length],u;if(!(r==null||r===!0||r===!1))if((u=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=Y(e,r,f)||i;else if(u==="function")if(s){for(;typeof r=="function";)r=r();i=Y(e,Array.isArray(r)?r:[r],Array.isArray(f)?f:[f])||i}else e.push(r),i=!0;else{const a=String(r);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return i}function ee(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function P(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const f=r.parentNode===e;!l&&!o?f?e.replaceChild(i,r):e.insertBefore(i,n):f&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const Je=ye("<svg><line></svg>",!1,!0),L=e=>{const t=W({length:0,limit:94},e),[n,s]=Ce(t,["length","limit","stationary"]);return(()=>{const i=Je();return ve(i,W(()=>n.stationary&&{y1:n.length-n.limit},{get y2(){return-(n.stationary?n.limit:n.length)},"stroke-linecap":"round"},s),!0,!1),i})()},Ze=ye('<div class="grid h-screen place-content-center @dark:bg-gray-800"><svg viewBox="0 0 200 200"class="h-95vmin z-1"><g class=translate-1/2><circle class="fill-none stroke-gray-600 @dark:stroke-gray-200"r=98></circle></g><g class=translate-1/2>'),te=60,ze=()=>{const e=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,[t,n]=re(e()),s=(u,a=1)=>`rotate(${(u*360).toFixed(a)})`,i=()=>s(t()%1,0),l=()=>s(t()%60/60),o=()=>s(t()/60%60/60),r=()=>s(t()/60/60%12/12);let f=requestAnimationFrame(function u(){n(e()),f=requestAnimationFrame(u)});return oe(()=>{cancelAnimationFrame(f)}),(()=>{const u=Ze(),a=u.firstChild,c=a.firstChild;c.firstChild;const d=c.nextSibling;return C(c,O(Ne,{get each(){return Array.from({length:te},(g,b)=>b%5===0)},children:(g,b)=>O(L,{get transform(){return s(b()/te,0)},class:g?"stroke-gray-600 stroke-2 @dark:stroke-gray-200":"stroke-gray-200 @dark:stroke-gray-600",length:g?6:2.5,stationary:!0})}),null),C(d,O(L,{get transform(){return i()},class:"stroke-gray-200 @dark:stroke-gray-600 stroke-3",length:82}),null),C(d,O(L,{get transform(){return r()},class:"stroke-gray-600 @dark:stroke-gray-200 stroke-4",length:46}),null),C(d,O(L,{get transform(){return o()},class:"stroke-3 stroke-gray-400",length:64}),null),C(d,O(L,{get transform(){return l()},class:"stroke-2 stroke-solid",length:76}),null),u})()},ne=document.querySelector("#root");if(ne)Fe(()=>O(ze,{}),ne);else throw new Error("#root element not found!");
