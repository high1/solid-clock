(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();const k={},me=(e,n)=>e===n,X=Symbol("solid-proxy"),we=Symbol("solid-track"),q={equals:me};let be=ue;const N=1,B=2,se={owned:null,cleanups:null,context:null,owner:null};var g=null;let S=null,d=null,y=null,C=null,G=0;function v(e,n){const t=d,s=g,i=e.length===0,l=i?se:{owned:null,cleanups:null,context:null,owner:n||s},o=i?e:()=>e(()=>U(()=>Q(l)));g=l,d=null;try{return _(o,!0)}finally{d=t,g=s}}function ie(e,n){n=n?Object.assign({},q,n):q;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),oe(t,i));return[re.bind(t),s]}function E(e,n,t){const s=fe(e,n,!1,N);H(s)}function pe(e,n,t){t=t?Object.assign({},q,t):q;const s=fe(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,H(s),re.bind(s)}function U(e){let n,t=d;return d=null,n=e(),d=t,n}function le(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function re(){const e=S;if(this.sources&&(this.state||e))if(this.state===N||e)H(this);else{const n=y;y=null,_(()=>I(this),!1),y=n}if(d){const n=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(n)):(d.sources=[this],d.sourceSlots=[n]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function oe(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&_(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=S&&S.running;o&&S.disposed.has(l),(o&&!l.tState||!o&&!l.state)&&(l.pure?y.push(l):C.push(l),l.observers&&ae(l)),o||(l.state=N)}if(y.length>1e6)throw y=[],new Error},!1)),n}function H(e){if(!e.fn)return;Q(e);const n=g,t=d,s=G;d=g=e,Ae(e,e.value,s),d=t,g=n}function Ae(e,n,t){let s;try{s=e.fn(n)}catch(i){e.pure&&(e.state=N),de(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?oe(e,s):e.value=s,e.updatedAt=t)}function fe(e,n,t,s=N,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:g,context:null,pure:t};return g===null||g!==se&&(g.owned?g.owned.push(l):g.owned=[l]),l}function ce(e){const n=S;if(e.state===0||n)return;if(e.state===B||n)return I(e);if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<G);)(e.state||n)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===N||n)H(e);else if(e.state===B||n){const i=y;y=null,_(()=>I(e,t[0]),!1),y=i}}function _(e,n){if(y)return e();let t=!1;n||(y=[]),C?t=!0:C=[],G++;try{const s=e();return ke(t),s}catch(s){y||(C=null),de(s)}}function ke(e){if(y&&(ue(y),y=null),e)return;const n=C;C=null,n.length&&_(()=>be(n),!1)}function ue(e){for(let n=0;n<e.length;n++)ce(e[n])}function I(e,n){const t=S;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===N||t?i!==n&&ce(i):(i.state===B||t)&&I(i,n))}}function ae(e){const n=S;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||n)&&(s.state=B,s.pure?y.push(s):C.push(s),s.observers&&ae(s))}}function Q(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const l=i.pop(),o=t.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,t.observerSlots[s]=o)}}if(e.owned){for(n=0;n<e.owned.length;n++)Q(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function xe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function de(e){throw e=xe(e),e}const Se=Symbol("fallback");function W(e){for(let n=0;n<e.length;n++)e[n]()}function Ce(e,n,t={}){let s=[],i=[],l=[],o=0,r=n.length>1?[]:null;return le(()=>W(l)),()=>{let u=e()||[],c,f;return u[we],U(()=>{let a=u.length,m,w,T,D,M,b,p,A,O;if(a===0)o!==0&&(W(l),l=[],s=[],i=[],o=0,r&&(r=[])),t.fallback&&(s=[Se],i[0]=v(ye=>(l[0]=ye,t.fallback())),o=1);else if(o===0){for(i=new Array(a),f=0;f<a;f++)s[f]=u[f],i[f]=v(h);o=a}else{for(T=new Array(a),D=new Array(a),r&&(M=new Array(a)),b=0,p=Math.min(o,a);b<p&&s[b]===u[b];b++);for(p=o-1,A=a-1;p>=b&&A>=b&&s[p]===u[A];p--,A--)T[A]=i[p],D[A]=l[p],r&&(M[A]=r[p]);for(m=new Map,w=new Array(A+1),f=A;f>=b;f--)O=u[f],c=m.get(O),w[f]=c===void 0?-1:c,m.set(O,f);for(c=b;c<=p;c++)O=s[c],f=m.get(O),f!==void 0&&f!==-1?(T[f]=i[c],D[f]=l[c],r&&(M[f]=r[c]),f=w[f],m.set(O,f)):l[c]();for(f=b;f<a;f++)f in T?(i[f]=T[f],l[f]=D[f],r&&(r[f]=M[f],r[f](f))):i[f]=v(h);i=i.slice(0,o=a),s=u.slice(0)}return i});function h(a){if(l[f]=a,r){const[m,w]=ie(f);return r[f]=w,n(u[f],m)}return n(u[f])}}}function x(e,n){return U(()=>e(n||{}))}function F(){return!0}const he={get(e,n,t){return n===X?t:e.get(n)},has(e,n){return e.has(n)},set:F,deleteProperty:F,getOwnPropertyDescriptor(e,n){return{configurable:!0,enumerable:!0,get(){return e.get(n)},set:F,deleteProperty:F}},ownKeys(e){return e.keys()}};function R(e){return(e=typeof e=="function"?e():e)==null?{}:e}function Ee(...e){if(e.some(t=>t&&(X in t||typeof t=="function")))return new Proxy({get(t){for(let s=e.length-1;s>=0;s--){const i=R(e[s])[t];if(i!==void 0)return i}},has(t){for(let s=e.length-1;s>=0;s--)if(t in R(e[s]))return!0;return!1},keys(){const t=[];for(let s=0;s<e.length;s++)t.push(...Object.keys(R(e[s])));return[...new Set(t)]}},he);const n={};for(let t=e.length-1;t>=0;t--)if(e[t]){const s=Object.getOwnPropertyDescriptors(e[t]);for(const i in s)i in n||Object.defineProperty(n,i,{enumerable:!0,get(){for(let l=e.length-1;l>=0;l--){const o=(e[l]||{})[i];if(o!==void 0)return o}}})}return n}function Ne(e,...n){const t=new Set(n.flat()),s=Object.getOwnPropertyDescriptors(e),i=X in e;i||n.push(Object.keys(s).filter(o=>!t.has(o)));const l=n.map(o=>{const r={};for(let u=0;u<o.length;u++){const c=o[u];!i&&!(c in e)||Object.defineProperty(r,c,s[c]?s[c]:{get(){return e[c]},set(){return!0},enumerable:!0})}return r});return i&&l.push(new Proxy({get(o){return t.has(o)?void 0:e[o]},has(o){return t.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!t.has(o))}},he)),l}function Oe(e){const n="fallback"in e&&{fallback:()=>e.fallback};return pe(Ce(()=>e.each,e.children,n||void 0))}const $e=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Le=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...$e]),Pe=new Set(["innerHTML","textContent","innerText","children"]),Te=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Y=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),je=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),_e={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function De(e,n,t){let s=t.length,i=n.length,l=s,o=0,r=0,u=n[i-1].nextSibling,c=null;for(;o<i||r<l;){if(n[o]===t[r]){o++,r++;continue}for(;n[i-1]===t[l-1];)i--,l--;if(i===o){const f=l<s?r?t[r-1].nextSibling:t[l-r]:u;for(;r<l;)e.insertBefore(t[r++],f)}else if(l===r)for(;o<i;)(!c||!c.has(n[o]))&&n[o].remove(),o++;else if(n[o]===t[l-1]&&t[r]===n[i-1]){const f=n[--i].nextSibling;e.insertBefore(t[r++],n[o++].nextSibling),e.insertBefore(t[--l],f),n[i]=t[l]}else{if(!c){c=new Map;let h=r;for(;h<l;)c.set(t[h],h++)}const f=c.get(n[o]);if(f!=null)if(r<f&&f<l){let h=o,a=1,m;for(;++h<i&&h<l&&!((m=c.get(n[h]))==null||m!==f+a);)a++;if(a>f-r){const w=n[o];for(;r<f;)e.insertBefore(t[r++],w)}else e.replaceChild(t[r++],n[o++])}else o++;else n[o++].remove()}}}const J="_$DX_DELEGATE";function Me(e,n,t,s={}){let i;return v(l=>{i=l,n===document?e():L(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function ge(e,n,t){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return t&&(i=i.firstChild),i}function Fe(e,n=window.document){const t=n[J]||(n[J]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];t.has(l)||(t.add(l),n.addEventListener(l,Ve))}}function K(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function ve(e,n,t,s){s==null?e.removeAttributeNS(n,t):e.setAttributeNS(n,t,s)}function qe(e,n){n==null?e.removeAttribute("class"):e.className=n}function Be(e,n,t,s){if(s)Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t;else if(Array.isArray(t)){const i=t[0];e.addEventListener(n,t[0]=l=>i.call(e,t[1],l))}else e.addEventListener(n,t)}function Ie(e,n,t={}){const s=Object.keys(n||{}),i=Object.keys(t);let l,o;for(l=0,o=i.length;l<o;l++){const r=i[l];!r||r==="undefined"||n[r]||(Z(e,r,!1),delete t[r])}for(l=0,o=s.length;l<o;l++){const r=s[l],u=!!n[r];!r||r==="undefined"||t[r]===u||!u||(Z(e,r,!0),t[r]=u)}return t}function Ke(e,n,t){if(!n)return t?K(e,"style"):n;const s=e.style;if(typeof n=="string")return s.cssText=n;typeof t=="string"&&(s.cssText=t=void 0),t||(t={}),n||(n={});let i,l;for(l in t)n[l]==null&&s.removeProperty(l),delete t[l];for(l in n)i=n[l],i!==t[l]&&(s.setProperty(l,i),t[l]=i);return t}function Ue(e,n={},t,s){const i={};return s||E(()=>i.children=P(e,n.children,i.children)),E(()=>n.ref&&n.ref(e)),E(()=>He(e,n,t,!0,i,!0)),i}function L(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return P(e,n,s,t);E(i=>P(e,n(),i,t),s)}function He(e,n,t,s,i={},l=!1){n||(n={});for(const o in i)if(!(o in n)){if(o==="children")continue;i[o]=z(e,o,null,i[o],t,l)}for(const o in n){if(o==="children"){s||P(e,n.children);continue}const r=n[o];i[o]=z(e,o,r,i[o],t,l)}}function Re(e){return e.toLowerCase().replace(/-([a-z])/g,(n,t)=>t.toUpperCase())}function Z(e,n,t){const s=n.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],t)}function z(e,n,t,s,i,l){let o,r,u;if(n==="style")return Ke(e,t,s);if(n==="classList")return Ie(e,t,s);if(t===s)return s;if(n==="ref")l||t(e);else if(n.slice(0,3)==="on:"){const c=n.slice(3);s&&e.removeEventListener(c,s),t&&e.addEventListener(c,t)}else if(n.slice(0,10)==="oncapture:"){const c=n.slice(10);s&&e.removeEventListener(c,s,!0),t&&e.addEventListener(c,t,!0)}else if(n.slice(0,2)==="on"){const c=n.slice(2).toLowerCase(),f=je.has(c);if(!f&&s){const h=Array.isArray(s)?s[0]:s;e.removeEventListener(c,h)}(f||t)&&(Be(e,c,t,f),f&&Fe([c]))}else if((u=Pe.has(n))||!i&&(Y[n]||(r=Le.has(n)))||(o=e.nodeName.includes("-")))n==="class"||n==="className"?qe(e,t):o&&!r&&!u?e[Re(n)]=t:e[Y[n]||n]=t;else{const c=i&&n.indexOf(":")>-1&&_e[n.split(":")[0]];c?ve(e,c,n,t):K(e,Te[n]||n,t)}return t}function Ve(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),k.registry&&!k.done&&(k.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));t!==null;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t.host&&t.host!==t&&t.host instanceof Node?t.host:t.parentNode}}function P(e,n,t,s,i){for(k.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const l=typeof n,o=s!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,l==="string"||l==="number"){if(k.context)return t;if(l==="number"&&(n=n.toString()),o){let r=t[0];r&&r.nodeType===3?r.data=n:r=document.createTextNode(n),t=$(e,t,s,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||l==="boolean"){if(k.context)return t;t=$(e,t,s)}else{if(l==="function")return E(()=>{let r=n();for(;typeof r=="function";)r=r();t=P(e,r,t,s)}),()=>t;if(Array.isArray(n)){const r=[],u=t&&Array.isArray(t);if(V(r,n,t,i))return E(()=>t=P(e,r,t,s,!0)),()=>t;if(k.context){if(!r.length)return t;for(let c=0;c<r.length;c++)if(r[c].parentNode)return t=r}if(r.length===0){if(t=$(e,t,s),o)return t}else u?t.length===0?ee(e,r,s):De(e,t,r):(t&&$(e),ee(e,r));t=r}else if(n instanceof Node){if(k.context&&n.parentNode)return t=o?[n]:n;if(Array.isArray(t)){if(o)return t=$(e,t,s,n);$(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function V(e,n,t,s){let i=!1;for(let l=0,o=n.length;l<o;l++){let r=n[l],u=t&&t[l];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=V(e,r,u)||i;else if(typeof r=="function")if(s){for(;typeof r=="function";)r=r();i=V(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||i}else e.push(r),i=!0;else{const c=String(r);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function ee(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function $(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let l=!1;for(let o=n.length-1;o>=0;o--){const r=n[o];if(i!==r){const u=r.parentNode===e;!l&&!o?u?e.replaceChild(i,r):e.insertBefore(i,t):u&&r.remove()}else l=!0}}else e.insertBefore(i,t);return[i]}const Xe=ge('<svg><line stroke-linecap="round"></line></svg>',4,!0),j=e=>{const n=Ee({length:0,limit:94},e),[t,s]=Ne(n,["length","limit","stationary"]);return(()=>{const i=Xe.cloneNode(!0);return Ue(i,s,!0,!1),E(l=>{const o=t.stationary?t.length-t.limit:void 0,r=-(t.stationary?t.limit:t.length);return o!==l._v$&&K(i,"y1",l._v$=o),r!==l._v$2&&K(i,"y2",l._v$2=r),l},{_v$:void 0,_v$2:void 0}),i})()},Ge=ge('<div class="flex items-center justify-center h-screen @dark:bg-neutral-700"><svg viewBox="0 0 200 200" class="h-95vmin"><g class="translate-100px"><circle class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none" r="99"></circle></g><g class="translate-100px"></g></svg></div>'),te=60,Qe=()=>{const e=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,[n,t]=ie(e()),s=(c,f=1)=>`rotate(${(c*360).toFixed(f)})`,i=()=>s(n()%1,0),l=()=>s(n()%60/60),o=()=>s(n()/60%60/60),r=()=>s(n()/60/60%12/12);let u=requestAnimationFrame(function c(){t(e()),u=requestAnimationFrame(c)});return le(()=>cancelAnimationFrame(u)),(()=>{const c=Ge.cloneNode(!0),f=c.firstChild,h=f.firstChild;h.firstChild;const a=h.nextSibling;return L(h,x(Oe,{get each(){return Array.from({length:te},(m,w)=>({isHour:w%5===0}))},children:({isHour:m},w)=>x(j,{get transform(){return s(w()/te,0)},class:m?"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2":"stroke-neutral-400 @dark:stroke-neutral-600",length:m?7:3,stationary:!0})}),null),L(a,x(j,{get transform(){return i()},class:"stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5",length:83}),null),L(a,x(j,{get transform(){return r()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4",length:50}),null),L(a,x(j,{get transform(){return o()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3",length:70}),null),L(a,x(j,{get transform(){return l()},class:"stroke-red-500 stroke-width-2",length:77}),null),c})()},ne=document.querySelector("#root");if(ne)Me(()=>x(Qe,{}),ne);else throw new Error("#root element not found!");
