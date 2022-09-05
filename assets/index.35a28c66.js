(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var A={},me=(e,t)=>e===t,we=Symbol("solid-proxy"),be=Symbol("solid-track"),B={equals:me},ve=ce,C=1,I=2,se={owned:null,cleanups:null,context:null,owner:null},g=null,x=null,h=null,y=null,S=null,X=0;function F(e,t){const n=h,s=g,i=e.length===0,r=i?se:{owned:null,cleanups:null,context:null,owner:t||s},o=i?e:()=>e(()=>U(()=>Q(r)));g=r,h=null;try{return _(o,!0)}finally{h=n,g=s}}function ie(e,t){t=t?Object.assign({},B,t):B;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),oe(n,i));return[le.bind(n),s]}function E(e,t,n){const s=fe(e,t,!1,C);H(s)}function Ae(e,t,n){n=n?Object.assign({},B,n):B;const s=fe(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,H(s),le.bind(s)}function U(e){let t,n=h;return h=null,t=e(),h=n,t}function re(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function le(){const e=x;if(this.sources&&(this.state||e))if(this.state===C||e)H(this);else{const t=y;y=null,_(()=>K(this),!1),y=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function oe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&_(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=x&&x.running;o&&x.disposed.has(r),(o&&!r.tState||!o&&!r.state)&&(r.pure?y.push(r):S.push(r),r.observers&&ae(r)),o||(r.state=C)}if(y.length>1e6)throw y=[],new Error},!1)),t}function H(e){if(!e.fn)return;Q(e);const t=g,n=h,s=X;h=g=e,pe(e,e.value,s),h=n,g=t}function pe(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=C),he(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?oe(e,s):e.value=s,e.updatedAt=n)}function fe(e,t,n,s=C,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==se&&(g.owned?g.owned.push(r):g.owned=[r]),r}function ue(e){const t=x;if(e.state===0||t)return;if(e.state===I||t)return K(e);if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<X);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===C||t)H(e);else if(e.state===I||t){const i=y;y=null,_(()=>K(e,n[0]),!1),y=i}}function _(e,t){if(y)return e();let n=!1;t||(y=[]),S?n=!0:S=[],X++;try{const s=e();return ke(n),s}catch(s){y||(S=null),he(s)}}function ke(e){if(y&&(ce(y),y=null),e)return;const t=S;S=null,t.length&&_(()=>ve(t),!1)}function ce(e){for(let t=0;t<e.length;t++)ue(e[t])}function K(e,t){const n=x;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===C||n?i!==t&&ue(i):(i.state===I||n)&&K(i,t))}}function ae(e){const t=x;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=I,s.pure?y.push(s):S.push(s),s.observers&&ae(s))}}function Q(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)Q(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function xe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function he(e){throw e=xe(e),e}var Se=Symbol("fallback");function W(e){for(let t=0;t<e.length;t++)e[t]()}function Ee(e,t,n={}){let s=[],i=[],r=[],o=0,l=t.length>1?[]:null;return re(()=>W(r)),()=>{let u=e()||[],c,f;return u[be],U(()=>{let a=u.length,m,p,O,M,j,w,b,v,N;if(a===0)o!==0&&(W(r),r=[],s=[],i=[],o=0,l&&(l=[])),n.fallback&&(s=[Se],i[0]=F(ye=>(r[0]=ye,n.fallback())),o=1);else if(o===0){for(i=new Array(a),f=0;f<a;f++)s[f]=u[f],i[f]=F(d);o=a}else{for(O=new Array(a),M=new Array(a),l&&(j=new Array(a)),w=0,b=Math.min(o,a);w<b&&s[w]===u[w];w++);for(b=o-1,v=a-1;b>=w&&v>=w&&s[b]===u[v];b--,v--)O[v]=i[b],M[v]=r[b],l&&(j[v]=l[b]);for(m=new Map,p=new Array(v+1),f=v;f>=w;f--)N=u[f],c=m.get(N),p[f]=c===void 0?-1:c,m.set(N,f);for(c=w;c<=b;c++)N=s[c],f=m.get(N),f!==void 0&&f!==-1?(O[f]=i[c],M[f]=r[c],l&&(j[f]=l[c]),f=p[f],m.set(N,f)):r[c]();for(f=w;f<a;f++)f in O?(i[f]=O[f],r[f]=M[f],l&&(l[f]=j[f],l[f](f))):i[f]=F(d);i=i.slice(0,o=a),s=u.slice(0)}return i});function d(a){if(r[f]=a,l){const[m,p]=ie(f);return l[f]=p,t(u[f],m)}return t(u[f])}}}function k(e,t){return U(()=>e(t||{}))}function D(){return!0}var de={get(e,t,n){return t===we?n:e.get(t)},has(e,t){return e.has(t)},set:D,deleteProperty:D,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:D,deleteProperty:D}},ownKeys(e){return e.keys()}};function R(e){return(e=typeof e=="function"?e():e)==null?{}:e}function Ce(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const s=R(e[n])[t];if(s!==void 0)return s}},has(t){for(let n=e.length-1;n>=0;n--)if(t in R(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(R(e[n])));return[...new Set(t)]}},de)}function Ne(e,...t){const n=new Set(t.flat()),s=Object.getOwnPropertyDescriptors(e),i=t.map(r=>{const o={};for(let l=0;l<r.length;l++){const u=r[l];Object.defineProperty(o,u,s[u]?s[u]:{get(){return e[u]},set(){return!0}})}return o});return i.push(new Proxy({get(r){return n.has(r)?void 0:e[r]},has(r){return n.has(r)?!1:r in e},keys(){return Object.keys(e).filter(r=>!n.has(r))}},de)),i}function $e(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Ae(Ee(()=>e.each,e.children,t||void 0))}var Le=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Te=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Le]),Oe=new Set(["innerHTML","textContent","innerText","children"]),Pe={className:"class",htmlFor:"for"},Y={class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"},_e=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Me={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function je(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,u=t[i-1].nextSibling,c=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const f=r<s?l?n[l-1].nextSibling:n[r-l]:u;for(;l<r;)e.insertBefore(n[l++],f)}else if(r===l)for(;o<i;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],f),t[i]=n[r]}else{if(!c){c=new Map;let d=l;for(;d<r;)c.set(n[d],d++)}const f=c.get(t[o]);if(f!=null)if(l<f&&f<r){let d=o,a=1,m;for(;++d<i&&d<r&&!((m=c.get(t[d]))==null||m!==f+a);)a++;if(a>f-l){const p=t[o];for(;l<f;)e.insertBefore(n[l++],p)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}var G="_$DX_DELEGATE";function De(e,t,n){let s;return F(i=>{s=i,t===document?e():L(t,e(),t.firstChild?null:void 0,n)}),()=>{s(),t.textContent=""}}function ge(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Fe(e,t=window.document){const n=t[G]||(t[G]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Xe))}}function q(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function qe(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Be(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ie(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n)}function Ke(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let r,o;for(r=0,o=i.length;r<o;r++){const l=i[r];!l||l==="undefined"||t[l]||(J(e,l,!1),delete n[l])}for(r=0,o=s.length;r<o;r++){const l=s[r],u=!!t[l];!l||l==="undefined"||n[l]===u||!u||(J(e,l,!0),n[l]=u)}return n}function Ue(e,t,n={}){const s=e.style,i=typeof n=="string";if(t==null&&i||typeof t=="string")return s.cssText=t;i&&(s.cssText=void 0,n={}),t||(t={});let r,o;for(o in n)t[o]==null&&s.removeProperty(o),delete n[o];for(o in t)r=t[o],r!==n[o]&&(s.setProperty(o,r),n[o]=r);return n}function He(e,t,n,s){typeof t=="function"?E(i=>z(e,t(),i,n,s)):z(e,t,void 0,n,s)}function L(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return T(e,t,s,n);E(i=>T(e,t(),i,n),s)}function Re(e,t,n,s,i={},r=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;Z(e,o,null,i[o],n,r)}for(const o in t){if(o==="children"){s||T(e,t.children);continue}const l=t[o];i[o]=Z(e,o,l,i[o],n,r)}}function Ve(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function J(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],n)}function Z(e,t,n,s,i,r){let o,l,u;if(t==="style")return Ue(e,n,s);if(t==="classList")return Ke(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);s&&e.removeEventListener(c,s),n&&e.addEventListener(c,n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);s&&e.removeEventListener(c,s,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),f=_e.has(c);if(!f&&s){const d=Array.isArray(s)?s[0]:s;e.removeEventListener(c,d)}(f||n)&&(Ie(e,c,n,f),f&&Fe([c]))}else if((u=Oe.has(t))||!i&&(Y[t]||(l=Te.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?Be(e,n):o&&!l&&!u?e[Ve(t)]=n:e[Y[t]||t]=n;else{const c=i&&t.indexOf(":")>-1&&Me[t.split(":")[0]];c?qe(e,c,t,n):q(e,Pe[t]||t,n)}return n}function Xe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),A.registry&&!A.done&&(A.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n!==null;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function z(e,t,n={},s,i){return t||(t={}),!i&&"children"in t&&E(()=>n.children=T(e,t.children,n.children)),t.ref&&t.ref(e),E(()=>Re(e,t,s,!0,n,!0)),n}function T(e,t,n,s,i){for(A.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(A.context)return n;if(r==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=$(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(A.context)return n;n=$(e,n,s)}else{if(r==="function")return E(()=>{let l=t();for(;typeof l=="function";)l=l();n=T(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],u=n&&Array.isArray(n);if(V(l,t,n,i))return E(()=>n=T(e,l,n,s,!0)),()=>n;if(A.context){if(!l.length)return n;for(let c=0;c<l.length;c++)if(l[c].parentNode)return n=l}if(l.length===0){if(n=$(e,n,s),o)return n}else u?n.length===0?ee(e,l,s):je(e,n,l):(n&&$(e),ee(e,l));n=l}else if(t instanceof Node){if(A.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=$(e,n,s,t);$(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function V(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],u=n&&n[r];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=V(e,l,u)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=V(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else e.push(l),i=!0;else{const c=String(l);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function ee(e,t,n){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function $(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const u=l.parentNode===e;!r&&!o?u?e.replaceChild(i,l):e.insertBefore(i,n):u&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}const Qe=ge("<svg><line></line></svg>",4,!0),P=e=>{const t=Ce({length:0,limit:94,class:""},e),[n,s]=Ne(t,["class","length","limit","stationary"]);return(()=>{const i=Qe.cloneNode(!0);return He(i,s,!0,!1),E(r=>{const o=`stroke-cap-round ${n.class}`,l=n.stationary?n.length-n.limit:void 0,u=-(n.stationary?n.limit:n.length);return o!==r._v$&&q(i,"class",r._v$=o),l!==r._v$2&&q(i,"y1",r._v$2=l),u!==r._v$3&&q(i,"y2",r._v$3=u),r},{_v$:void 0,_v$2:void 0,_v$3:void 0}),i})()},We=ge('<div class="flex items-center justify-center h-full @dark:bg-neutral-700"><svg viewBox="0 0 200 200" class="h-95vmin"><g class="translate-100px"><circle class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none" r="99"></circle></g><g class="translate-100px"></g></svg></div>'),te=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,Ye=()=>{const[e,t]=ie(te());let n=requestAnimationFrame(function u(){t(te()),n=requestAnimationFrame(u)});re(()=>cancelAnimationFrame(n));const s=(u,c=1)=>`rotate(${(u*360).toFixed(c)})`,i=()=>s(e()%1,0),r=()=>s(e()%60/60),o=()=>s(e()/60%60/60),l=()=>s(e()/60/60%12/12);return(()=>{const u=We.cloneNode(!0),c=u.firstChild,f=c.firstChild;f.firstChild;const d=f.nextSibling;return L(f,k($e,{get each(){return Array.from({length:60},(a,m)=>({isHour:m%5===0}))},children:({isHour:a},m)=>k(P,{get transform(){return`rotate(${360*m()/60})`},class:a?"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2":"stroke-neutral-400 @dark:stroke-neutral-600",length:a?7:3,stationary:!0})}),null),L(d,k(P,{get transform(){return i()},class:"stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5 will-change-transform",length:83}),null),L(d,k(P,{get transform(){return l()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4",length:50}),null),L(d,k(P,{get transform(){return o()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3",length:70}),null),L(d,k(P,{get transform(){return r()},class:"stroke-red-500 stroke-width-2",length:77}),null),u})()},ne=document.querySelector("#root");if(ne)De(()=>k(Ye,{}),ne);else throw new Error("#root element not found!");
