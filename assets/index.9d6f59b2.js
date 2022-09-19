(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();var A={},me=(e,n)=>e===n,we=Symbol("solid-proxy"),be=Symbol("solid-track"),B={equals:me},ve=ce,C=1,I=2,se={owned:null,cleanups:null,context:null,owner:null},g=null,S=null,h=null,y=null,E=null,X=0;function F(e,n){const t=h,s=g,i=e.length===0,r=i?se:{owned:null,cleanups:null,context:null,owner:n||s},o=i?e:()=>e(()=>U(()=>Q(r)));g=r,h=null;try{return _(o,!0)}finally{h=t,g=s}}function ie(e,n){n=n?Object.assign({},B,n):B;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),oe(t,i));return[le.bind(t),s]}function p(e,n,t){const s=fe(e,n,!1,C);H(s)}function Ae(e,n,t){t=t?Object.assign({},B,t):B;const s=fe(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,H(s),le.bind(s)}function U(e){let n,t=h;return h=null,n=e(),h=t,n}function re(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function le(){const e=S;if(this.sources&&(this.state||e))if(this.state===C||e)H(this);else{const n=y;y=null,_(()=>K(this),!1),y=n}if(h){const n=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(n)):(h.sources=[this],h.sourceSlots=[n]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function oe(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&_(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=S&&S.running;o&&S.disposed.has(r),(o&&!r.tState||!o&&!r.state)&&(r.pure?y.push(r):E.push(r),r.observers&&ae(r)),o||(r.state=C)}if(y.length>1e6)throw y=[],new Error},!1)),n}function H(e){if(!e.fn)return;Q(e);const n=g,t=h,s=X;h=g=e,pe(e,e.value,s),h=t,g=n}function pe(e,n,t){let s;try{s=e.fn(n)}catch(i){e.pure&&(e.state=C),he(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?oe(e,s):e.value=s,e.updatedAt=t)}function fe(e,n,t,s=C,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:g,context:null,pure:t};return g===null||g!==se&&(g.owned?g.owned.push(r):g.owned=[r]),r}function ue(e){const n=S;if(e.state===0||n)return;if(e.state===I||n)return K(e);if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<X);)(e.state||n)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===C||n)H(e);else if(e.state===I||n){const i=y;y=null,_(()=>K(e,t[0]),!1),y=i}}function _(e,n){if(y)return e();let t=!1;n||(y=[]),E?t=!0:E=[],X++;try{const s=e();return ke(t),s}catch(s){y||(E=null),he(s)}}function ke(e){if(y&&(ce(y),y=null),e)return;const n=E;E=null,n.length&&_(()=>ve(n),!1)}function ce(e){for(let n=0;n<e.length;n++)ue(e[n])}function K(e,n){const t=S;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===C||t?i!==n&&ue(i):(i.state===I||t)&&K(i,n))}}function ae(e){const n=S;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||n)&&(s.state=I,s.pure?y.push(s):E.push(s),s.observers&&ae(s))}}function Q(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const r=i.pop(),o=t.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,t.observerSlots[s]=o)}}if(e.owned){for(n=0;n<e.owned.length;n++)Q(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function xe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function he(e){throw e=xe(e),e}var Se=Symbol("fallback");function W(e){for(let n=0;n<e.length;n++)e[n]()}function Ee(e,n,t={}){let s=[],i=[],r=[],o=0,l=n.length>1?[]:null;return re(()=>W(r)),()=>{let u=e()||[],c,f;return u[be],U(()=>{let a=u.length,m,k,O,M,j,w,b,v,N;if(a===0)o!==0&&(W(r),r=[],s=[],i=[],o=0,l&&(l=[])),t.fallback&&(s=[Se],i[0]=F(ye=>(r[0]=ye,t.fallback())),o=1);else if(o===0){for(i=new Array(a),f=0;f<a;f++)s[f]=u[f],i[f]=F(d);o=a}else{for(O=new Array(a),M=new Array(a),l&&(j=new Array(a)),w=0,b=Math.min(o,a);w<b&&s[w]===u[w];w++);for(b=o-1,v=a-1;b>=w&&v>=w&&s[b]===u[v];b--,v--)O[v]=i[b],M[v]=r[b],l&&(j[v]=l[b]);for(m=new Map,k=new Array(v+1),f=v;f>=w;f--)N=u[f],c=m.get(N),k[f]=c===void 0?-1:c,m.set(N,f);for(c=w;c<=b;c++)N=s[c],f=m.get(N),f!==void 0&&f!==-1?(O[f]=i[c],M[f]=r[c],l&&(j[f]=l[c]),f=k[f],m.set(N,f)):r[c]();for(f=w;f<a;f++)f in O?(i[f]=O[f],r[f]=M[f],l&&(l[f]=j[f],l[f](f))):i[f]=F(d);i=i.slice(0,o=a),s=u.slice(0)}return i});function d(a){if(r[f]=a,l){const[m,k]=ie(f);return l[f]=k,n(u[f],m)}return n(u[f])}}}function x(e,n){return U(()=>e(n||{}))}function D(){return!0}var de={get(e,n,t){return n===we?t:e.get(n)},has(e,n){return e.has(n)},set:D,deleteProperty:D,getOwnPropertyDescriptor(e,n){return{configurable:!0,enumerable:!0,get(){return e.get(n)},set:D,deleteProperty:D}},ownKeys(e){return e.keys()}};function R(e){return(e=typeof e=="function"?e():e)==null?{}:e}function Ce(...e){return new Proxy({get(n){for(let t=e.length-1;t>=0;t--){const s=R(e[t])[n];if(s!==void 0)return s}},has(n){for(let t=e.length-1;t>=0;t--)if(n in R(e[t]))return!0;return!1},keys(){const n=[];for(let t=0;t<e.length;t++)n.push(...Object.keys(R(e[t])));return[...new Set(n)]}},de)}function Ne(e,...n){const t=new Set(n.flat()),s=Object.getOwnPropertyDescriptors(e),i=n.map(r=>{const o={};for(let l=0;l<r.length;l++){const u=r[l];Object.defineProperty(o,u,s[u]?s[u]:{get(){return e[u]},set(){return!0}})}return o});return i.push(new Proxy({get(r){return t.has(r)?void 0:e[r]},has(r){return t.has(r)?!1:r in e},keys(){return Object.keys(e).filter(r=>!t.has(r))}},de)),i}function $e(e){const n="fallback"in e&&{fallback:()=>e.fallback};return Ae(Ee(()=>e.each,e.children,n||void 0))}var Le=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Te=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Le]),Oe=new Set(["innerHTML","textContent","innerText","children"]),Pe={className:"class",htmlFor:"for"},Y={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},_e=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Me={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function je(e,n,t){let s=t.length,i=n.length,r=s,o=0,l=0,u=n[i-1].nextSibling,c=null;for(;o<i||l<r;){if(n[o]===t[l]){o++,l++;continue}for(;n[i-1]===t[r-1];)i--,r--;if(i===o){const f=r<s?l?t[l-1].nextSibling:t[r-l]:u;for(;l<r;)e.insertBefore(t[l++],f)}else if(r===l)for(;o<i;)(!c||!c.has(n[o]))&&n[o].remove(),o++;else if(n[o]===t[r-1]&&t[l]===n[i-1]){const f=n[--i].nextSibling;e.insertBefore(t[l++],n[o++].nextSibling),e.insertBefore(t[--r],f),n[i]=t[r]}else{if(!c){c=new Map;let d=l;for(;d<r;)c.set(t[d],d++)}const f=c.get(n[o]);if(f!=null)if(l<f&&f<r){let d=o,a=1,m;for(;++d<i&&d<r&&!((m=c.get(n[d]))==null||m!==f+a);)a++;if(a>f-l){const k=n[o];for(;l<f;)e.insertBefore(t[l++],k)}else e.replaceChild(t[l++],n[o++])}else o++;else n[o++].remove()}}}var G="_$DX_DELEGATE";function De(e,n,t){let s;return F(i=>{s=i,n===document?e():L(n,e(),n.firstChild?null:void 0,t)}),()=>{s(),n.textContent=""}}function ge(e,n,t){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return t&&(i=i.firstChild),i}function Fe(e,n=window.document){const t=n[G]||(n[G]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];t.has(r)||(t.add(r),n.addEventListener(r,Xe))}}function q(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function qe(e,n,t,s){s==null?e.removeAttributeNS(n,t):e.setAttributeNS(n,t,s)}function Be(e,n){n==null?e.removeAttribute("class"):e.className=n}function Ie(e,n,t,s){if(s)Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t;else if(Array.isArray(t)){const i=t[0];e.addEventListener(n,t[0]=r=>i.call(e,t[1],r))}else e.addEventListener(n,t)}function Ke(e,n,t={}){const s=Object.keys(n||{}),i=Object.keys(t);let r,o;for(r=0,o=i.length;r<o;r++){const l=i[r];!l||l==="undefined"||n[l]||(J(e,l,!1),delete t[l])}for(r=0,o=s.length;r<o;r++){const l=s[r],u=!!n[l];!l||l==="undefined"||t[l]===u||!u||(J(e,l,!0),t[l]=u)}return t}function Ue(e,n,t={}){const s=e.style,i=typeof t=="string";if(n==null&&i||typeof n=="string")return s.cssText=n;i&&(s.cssText=void 0,t={}),n||(n={});let r,o;for(o in t)n[o]==null&&s.removeProperty(o),delete t[o];for(o in n)r=n[o],r!==t[o]&&(s.setProperty(o,r),t[o]=r);return t}function He(e,n,t,s){typeof n=="function"?p(i=>z(e,n(),i,t,s)):z(e,n,void 0,t,s)}function L(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return T(e,n,s,t);p(i=>T(e,n(),i,t),s)}function Re(e,n,t,s,i={},r=!1){n||(n={});for(const o in i)if(!(o in n)){if(o==="children")continue;Z(e,o,null,i[o],t,r)}for(const o in n){if(o==="children"){s||T(e,n.children);continue}const l=n[o];i[o]=Z(e,o,l,i[o],t,r)}}function Ve(e){return e.toLowerCase().replace(/-([a-z])/g,(n,t)=>t.toUpperCase())}function J(e,n,t){const s=n.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],t)}function Z(e,n,t,s,i,r){let o,l,u;if(n==="style")return Ue(e,t,s);if(n==="classList")return Ke(e,t,s);if(t===s)return s;if(n==="ref")r||t(e);else if(n.slice(0,3)==="on:"){const c=n.slice(3);s&&e.removeEventListener(c,s),t&&e.addEventListener(c,t)}else if(n.slice(0,10)==="oncapture:"){const c=n.slice(10);s&&e.removeEventListener(c,s,!0),t&&e.addEventListener(c,t,!0)}else if(n.slice(0,2)==="on"){const c=n.slice(2).toLowerCase(),f=_e.has(c);if(!f&&s){const d=Array.isArray(s)?s[0]:s;e.removeEventListener(c,d)}(f||t)&&(Ie(e,c,t,f),f&&Fe([c]))}else if((u=Oe.has(n))||!i&&(Y[n]||(l=Te.has(n)))||(o=e.nodeName.includes("-")))n==="class"||n==="className"?Be(e,t):o&&!l&&!u?e[Ve(n)]=t:e[Y[n]||n]=t;else{const c=i&&n.indexOf(":")>-1&&Me[n.split(":")[0]];c?qe(e,c,n,t):q(e,Pe[n]||n,t)}return t}function Xe(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),A.registry&&!A.done&&(A.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));t!==null;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t.host&&t.host!==t&&t.host instanceof Node?t.host:t.parentNode}}function z(e,n,t={},s,i){return n||(n={}),i||p(()=>t.children=T(e,n.children,t.children)),p(()=>n.ref&&n.ref(e)),p(()=>Re(e,n,s,!0,t,!0)),t}function T(e,n,t,s,i){for(A.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const r=typeof n,o=s!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,r==="string"||r==="number"){if(A.context)return t;if(r==="number"&&(n=n.toString()),o){let l=t[0];l&&l.nodeType===3?l.data=n:l=document.createTextNode(n),t=$(e,t,s,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||r==="boolean"){if(A.context)return t;t=$(e,t,s)}else{if(r==="function")return p(()=>{let l=n();for(;typeof l=="function";)l=l();t=T(e,l,t,s)}),()=>t;if(Array.isArray(n)){const l=[],u=t&&Array.isArray(t);if(V(l,n,t,i))return p(()=>t=T(e,l,t,s,!0)),()=>t;if(A.context){if(!l.length)return t;for(let c=0;c<l.length;c++)if(l[c].parentNode)return t=l}if(l.length===0){if(t=$(e,t,s),o)return t}else u?t.length===0?ee(e,l,s):je(e,t,l):(t&&$(e),ee(e,l));t=l}else if(n instanceof Node){if(A.context&&n.parentNode)return t=o?[n]:n;if(Array.isArray(t)){if(o)return t=$(e,t,s,n);$(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function V(e,n,t,s){let i=!1;for(let r=0,o=n.length;r<o;r++){let l=n[r],u=t&&t[r];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=V(e,l,u)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=V(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else e.push(l),i=!0;else{const c=String(l);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function ee(e,n,t){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function $(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let r=!1;for(let o=n.length-1;o>=0;o--){const l=n[o];if(i!==l){const u=l.parentNode===e;!r&&!o?u?e.replaceChild(i,l):e.insertBefore(i,t):u&&l.remove()}else r=!0}}else e.insertBefore(i,t);return[i]}const Qe=ge("<svg><line></line></svg>",4,!0),P=e=>{const n=Ce({length:0,limit:94,class:""},e),[t,s]=Ne(n,["class","length","limit","stationary"]);return(()=>{const i=Qe.cloneNode(!0);return He(i,s,!0,!1),p(r=>{const o=`stroke-cap-round ${t.class}`,l=t.stationary?t.length-t.limit:void 0,u=-(t.stationary?t.limit:t.length);return o!==r._v$&&q(i,"class",r._v$=o),l!==r._v$2&&q(i,"y1",r._v$2=l),u!==r._v$3&&q(i,"y2",r._v$3=u),r},{_v$:void 0,_v$2:void 0,_v$3:void 0}),i})()},We=ge('<div class="flex items-center justify-center h-full @dark:bg-neutral-700"><svg viewBox="0 0 200 200" class="h-95vmin"><g class="translate-100px"><circle class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none" r="99"></circle></g><g class="translate-100px"></g></svg></div>'),te=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,Ye=()=>{const[e,n]=ie(te());let t=requestAnimationFrame(function u(){n(te()),t=requestAnimationFrame(u)});re(()=>cancelAnimationFrame(t));const s=(u,c=1)=>`rotate(${(u*360).toFixed(c)})`,i=()=>s(e()%1,0),r=()=>s(e()%60/60),o=()=>s(e()/60%60/60),l=()=>s(e()/60/60%12/12);return(()=>{const u=We.cloneNode(!0),c=u.firstChild,f=c.firstChild;f.firstChild;const d=f.nextSibling;return L(f,x($e,{get each(){return Array.from({length:60},(a,m)=>({isHour:m%5===0}))},children:({isHour:a},m)=>x(P,{get transform(){return s(m()/60,0)},class:a?"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2":"stroke-neutral-400 @dark:stroke-neutral-600",length:a?7:3,stationary:!0})}),null),L(d,x(P,{get transform(){return i()},class:"stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform",length:83}),null),L(d,x(P,{get transform(){return l()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4",length:50}),null),L(d,x(P,{get transform(){return o()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3",length:70}),null),L(d,x(P,{get transform(){return r()},class:"stroke-red-500 stroke-width-2",length:77}),null),u})()},ne=document.querySelector("#root");if(ne)De(()=>x(Ye,{}),ne);else throw new Error("#root element not found!");
