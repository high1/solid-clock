(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const k={},be=(e,t)=>e===t,B=Symbol("solid-proxy"),pe=Symbol("solid-track"),I={equals:be};let Ae=ae;const E=1,K=2,se={owned:null,cleanups:null,context:null,owner:null};var g=null;let S=null,h=null,y=null,C=null,X=0;function q(e,t){const n=h,s=g,i=e.length===0,l=i?se:{owned:null,cleanups:null,context:null,owner:t||s},o=i?e:()=>e(()=>H(()=>G(l)));g=l,h=null;try{return _(o,!0)}finally{h=n,g=s}}function ie(e,t){t=t?Object.assign({},I,t):I;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),fe(n,i));return[oe.bind(n),s]}function $(e,t,n){const s=ce(e,t,!1,E);R(s)}function le(e,t,n){n=n?Object.assign({},I,n):I;const s=ce(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,R(s),oe.bind(s)}function H(e){const t=h;h=null;try{return e()}finally{h=t}}function re(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function oe(){const e=S;if(this.sources&&(this.state||e))if(this.state===E||e)R(this);else{const t=y;y=null,_(()=>U(this),!1),y=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function fe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&_(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=S&&S.running;o&&S.disposed.has(l),(o&&!l.tState||!o&&!l.state)&&(l.pure?y.push(l):C.push(l),l.observers&&he(l)),o||(l.state=E)}if(y.length>1e6)throw y=[],new Error},!1)),t}function R(e){if(!e.fn)return;G(e);const t=g,n=h,s=X;h=g=e,ke(e,e.value,s),h=n,g=t}function ke(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=E),de(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?fe(e,s):e.value=s,e.updatedAt=n)}function ce(e,t,n,s=E,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==se&&(g.owned?g.owned.push(l):g.owned=[l]),l}function ue(e){const t=S;if(e.state===0||t)return;if(e.state===K||t)return U(e);if(e.suspense&&H(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<X);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===E||t)R(e);else if(e.state===K||t){const i=y;y=null,_(()=>U(e,n[0]),!1),y=i}}function _(e,t){if(y)return e();let n=!1;t||(y=[]),C?n=!0:C=[],X++;try{const s=e();return xe(n),s}catch(s){y||(C=null),de(s)}}function xe(e){if(y&&(ae(y),y=null),e)return;const t=C;C=null,t.length&&_(()=>Ae(t),!1)}function ae(e){for(let t=0;t<e.length;t++)ue(e[t])}function U(e,t){const n=S;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===E||n?i!==t&&ue(i):(i.state===K||n)&&U(i,t))}}function he(e){const t=S;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=K,s.pure?y.push(s):C.push(s),s.observers&&he(s))}}function G(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)G(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Se(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function de(e){throw e=Se(e),e}const Ce=Symbol("fallback");function Q(e){for(let t=0;t<e.length;t++)e[t]()}function Ee(e,t,n={}){let s=[],i=[],l=[],o=0,r=t.length>1?[]:null;return re(()=>Q(l)),()=>{let u=e()||[],c,f;return u[pe],H(()=>{let a=u.length,m,w,T,D,M,b,p,A,N;if(a===0)o!==0&&(Q(l),l=[],s=[],i=[],o=0,r&&(r=[])),n.fallback&&(s=[Ce],i[0]=q(we=>(l[0]=we,n.fallback())),o=1);else if(o===0){for(i=new Array(a),f=0;f<a;f++)s[f]=u[f],i[f]=q(d);o=a}else{for(T=new Array(a),D=new Array(a),r&&(M=new Array(a)),b=0,p=Math.min(o,a);b<p&&s[b]===u[b];b++);for(p=o-1,A=a-1;p>=b&&A>=b&&s[p]===u[A];p--,A--)T[A]=i[p],D[A]=l[p],r&&(M[A]=r[p]);for(m=new Map,w=new Array(A+1),f=A;f>=b;f--)N=u[f],c=m.get(N),w[f]=c===void 0?-1:c,m.set(N,f);for(c=b;c<=p;c++)N=s[c],f=m.get(N),f!==void 0&&f!==-1?(T[f]=i[c],D[f]=l[c],r&&(M[f]=r[c]),f=w[f],m.set(N,f)):l[c]();for(f=b;f<a;f++)f in T?(i[f]=T[f],l[f]=D[f],r&&(r[f]=M[f],r[f](f))):i[f]=q(d);i=i.slice(0,o=a),s=u.slice(0)}return i});function d(a){if(l[f]=a,r){const[m,w]=ie(f);return r[f]=w,t(u[f],m)}return t(u[f])}}}function x(e,t){return H(()=>e(t||{}))}function F(){return!0}const ge={get(e,t,n){return t===B?n:e.get(t)},has(e,t){return t===B?!0:e.has(t)},set:F,deleteProperty:F,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:F,deleteProperty:F}},ownKeys(e){return e.keys()}};function V(e){return(e=typeof e=="function"?e():e)?e:{}}function W(...e){let t=!1;for(let s=0;s<e.length;s++){const i=e[s];t=t||!!i&&B in i,e[s]=typeof i=="function"?(t=!0,le(i)):i}if(t)return new Proxy({get(s){for(let i=e.length-1;i>=0;i--){const l=V(e[i])[s];if(l!==void 0)return l}},has(s){for(let i=e.length-1;i>=0;i--)if(s in V(e[i]))return!0;return!1},keys(){const s=[];for(let i=0;i<e.length;i++)s.push(...Object.keys(V(e[i])));return[...new Set(s)]}},ge);const n={};for(let s=e.length-1;s>=0;s--)if(e[s]){const i=Object.getOwnPropertyDescriptors(e[s]);for(const l in i)l in n||Object.defineProperty(n,l,{enumerable:!0,get(){for(let o=e.length-1;o>=0;o--){const r=(e[o]||{})[l];if(r!==void 0)return r}}})}return n}function Ne(e,...t){const n=new Set(t.flat()),s=Object.getOwnPropertyDescriptors(e),i=B in e;i||t.push(Object.keys(s).filter(o=>!n.has(o)));const l=t.map(o=>{const r={};for(let u=0;u<o.length;u++){const c=o[u];!i&&!(c in e)||Object.defineProperty(r,c,s[c]?s[c]:{get(){return e[c]},set(){return!0},enumerable:!0})}return r});return i&&l.push(new Proxy({get(o){return n.has(o)?void 0:e[o]},has(o){return n.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!n.has(o))}},ge)),l}function Oe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return le(Ee(()=>e.each,e.children,t||void 0))}const Le=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],$e=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Le]),Pe=new Set(["innerHTML","textContent","innerText","children"]),Te=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Y=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),je=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),_e={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function De(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,u=t[i-1].nextSibling,c=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const f=l<s?r?n[r-1].nextSibling:n[l-r]:u;for(;r<l;)e.insertBefore(n[r++],f)}else if(l===r)for(;o<i;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!c){c=new Map;let d=r;for(;d<l;)c.set(n[d],d++)}const f=c.get(t[o]);if(f!=null)if(r<f&&f<l){let d=o,a=1,m;for(;++d<i&&d<l&&!((m=c.get(t[d]))==null||m!==f+a);)a++;if(a>f-r){const w=t[o];for(;r<f;)e.insertBefore(n[r++],w)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const J="_$DX_DELEGATE";function Me(e,t,n,s={}){let i;return q(l=>{i=l,t===document?e():L(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function ye(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Fe(e,t=window.document){const n=t[J]||(t[J]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,ve))}}function me(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function qe(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Be(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ie(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function Ke(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,o;for(l=0,o=i.length;l<o;l++){const r=i[l];!r||r==="undefined"||t[r]||(Z(e,r,!1),delete n[r])}for(l=0,o=s.length;l<o;l++){const r=s[l],u=!!t[r];!r||r==="undefined"||n[r]===u||!u||(Z(e,r,!0),n[r]=u)}return n}function Ue(e,t,n){if(!t)return n?me(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function He(e,t={},n,s){const i={};return s||$(()=>i.children=P(e,t.children,i.children)),$(()=>t.ref&&t.ref(e)),$(()=>Re(e,t,n,!0,i,!0)),i}function L(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return P(e,t,s,n);$(i=>P(e,t(),i,n),s)}function Re(e,t,n,s,i={},l=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=z(e,o,null,i[o],n,l)}for(const o in t){if(o==="children"){s||P(e,t.children);continue}const r=t[o];i[o]=z(e,o,r,i[o],n,l)}}function Ve(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Z(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function z(e,t,n,s,i,l){let o,r,u;if(t==="style")return Ue(e,n,s);if(t==="classList")return Ke(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);s&&e.removeEventListener(c,s),n&&e.addEventListener(c,n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);s&&e.removeEventListener(c,s,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),f=je.has(c);if(!f&&s){const d=Array.isArray(s)?s[0]:s;e.removeEventListener(c,d)}(f||n)&&(Ie(e,c,n,f),f&&Fe([c]))}else if((u=Pe.has(t))||!i&&(Y[t]||(r=$e.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?Be(e,n):o&&!r&&!u?e[Ve(t)]=n:e[Y[t]||t]=n;else{const c=i&&t.indexOf(":")>-1&&_e[t.split(":")[0]];c?qe(e,c,t,n):me(e,Te[t]||t,n)}return n}function ve(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),k.registry&&!k.done&&(k.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function P(e,t,n,s,i){for(k.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(k.context)return n;if(l==="number"&&(t=t.toString()),o){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=O(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(k.context)return n;n=O(e,n,s)}else{if(l==="function")return $(()=>{let r=t();for(;typeof r=="function";)r=r();n=P(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],u=n&&Array.isArray(n);if(v(r,t,n,i))return $(()=>n=P(e,r,n,s,!0)),()=>n;if(k.context){if(!r.length)return n;for(let c=0;c<r.length;c++)if(r[c].parentNode)return n=r}if(r.length===0){if(n=O(e,n,s),o)return n}else u?n.length===0?ee(e,r,s):De(e,n,r):(n&&O(e),ee(e,r));n=r}else if(t instanceof Node){if(k.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=O(e,n,s,t);O(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function v(e,t,n,s){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],u=n&&n[l];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=v(e,r,u)||i;else if(typeof r=="function")if(s){for(;typeof r=="function";)r=r();i=v(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||i}else e.push(r),i=!0;else{const c=String(r);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function ee(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function O(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const u=r.parentNode===e;!l&&!o?u?e.replaceChild(i,r):e.insertBefore(i,n):u&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const Xe=ye("<svg><line></line></svg>",4,!0),j=e=>{const t=W({length:0,limit:94},e),[n,s]=Ne(t,["length","limit","stationary"]);return(()=>{const i=Xe.cloneNode(!0);return He(i,W(()=>n.stationary&&{y1:n.length-n.limit},{get y2(){return-(n.stationary?n.limit:n.length)},"stroke-linecap":"round"},s),!0,!1),i})()},Ge=ye('<div class="flex items-center justify-center h-screen @dark:bg-neutral-700"><svg viewBox="0 0 200 200" class="h-95vmin"><g class="translate-100px"><circle class="stroke-neutral-900 @dark:stroke-neutral-100 fill-none" r="99"></circle></g><g class="translate-100px"></g></svg></div>'),te=60,Qe=()=>{const e=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,[t,n]=ie(e()),s=(c,f=1)=>`rotate(${(c*360).toFixed(f)})`,i=()=>s(t()%1,0),l=()=>s(t()%60/60),o=()=>s(t()/60%60/60),r=()=>s(t()/60/60%12/12);let u=requestAnimationFrame(function c(){n(e()),u=requestAnimationFrame(c)});return re(()=>cancelAnimationFrame(u)),(()=>{const c=Ge.cloneNode(!0),f=c.firstChild,d=f.firstChild;d.firstChild;const a=d.nextSibling;return L(d,x(Oe,{get each(){return Array.from({length:te},(m,w)=>w%5===0)},children:(m,w)=>x(j,{get transform(){return s(w()/te,0)},class:m?"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2":"stroke-neutral-400 @dark:stroke-neutral-600",length:m?7:3,stationary:!0})}),null),L(a,x(j,{get transform(){return i()},class:"stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5",length:83}),null),L(a,x(j,{get transform(){return r()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4",length:50}),null),L(a,x(j,{get transform(){return o()},class:"stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3",length:70}),null),L(a,x(j,{get transform(){return l()},class:"stroke-red-500 stroke-width-2",length:77}),null),c})()},ne=document.querySelector("#root");if(ne)Me(()=>x(Qe,{}),ne);else throw new Error("#root element not found!");
