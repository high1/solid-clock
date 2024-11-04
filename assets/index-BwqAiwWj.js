(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const me=(e,t)=>e===t,U=Symbol("solid-proxy"),se=typeof Proxy=="function",we=Symbol("solid-track"),q={equals:me};let Ae=he;const O=1,z=2,ie={owned:null,cleanups:null,context:null,owner:null};var g=null;let X=null,pe=null,d=null,b=null,C=null,R=0;function K(e,t){const n=d,s=g,i=e.length===0,l=t===void 0?s:t,o=i?ie:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=i?e:()=>e(()=>L(()=>j(o)));g=o,d=null;try{return D(r,!0)}finally{d=n,g=s}}function re(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),fe(n,i));return[ce.bind(n),s]}function $(e,t,n){const s=ue(e,t,!1,O);H(s)}function le(e,t,n){n=n?Object.assign({},q,n):q;const s=ue(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,H(s),ce.bind(s)}function L(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function oe(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function ce(){if(this.sources&&this.state)if(this.state===O)H(this);else{const e=b;b=null,D(()=>I(this),!1),b=e}if(d){const e=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(e)):(d.sources=[this],d.sourceSlots=[e]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function fe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&D(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=X&&X.running;o&&X.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?b.push(l):C.push(l),l.observers&&de(l)),o||(l.state=O)}if(b.length>1e6)throw b=[],new Error},!1)),t}function H(e){if(!e.fn)return;j(e);const t=R;Se(e,e.value,t)}function Se(e,t,n){let s;const i=g,l=d;d=g=e;try{s=e.fn(t)}catch(o){return e.pure&&(e.state=O,e.owned&&e.owned.forEach(j),e.owned=null),e.updatedAt=n+1,ge(o)}finally{d=l,g=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?fe(e,s):e.value=s,e.updatedAt=n)}function ue(e,t,n,s=O,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return g===null||g!==ie&&(g.owned?g.owned.push(l):g.owned=[l]),l}function ae(e){if(e.state===0)return;if(e.state===z)return I(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<R);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===O)H(e);else if(e.state===z){const s=b;b=null,D(()=>I(e,t[0]),!1),b=s}}function D(e,t){if(b)return e();let n=!1;t||(b=[]),C?n=!0:C=[],R++;try{const s=e();return ke(n),s}catch(s){n||(C=null),b=null,ge(s)}}function ke(e){if(b&&(he(b),b=null),e)return;const t=C;C=null,t.length&&D(()=>Ae(t),!1)}function he(e){for(let t=0;t<e.length;t++)ae(e[t])}function I(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===O?s!==t&&(!s.updatedAt||s.updatedAt<R)&&ae(s):i===z&&I(s,t)}}}function de(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=z,n.pure?b.push(n):C.push(n),n.observers&&de(n))}}function j(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)j(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)j(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function xe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ge(e,t=g){throw xe(e)}const Ce=Symbol("fallback");function Q(e){for(let t=0;t<e.length;t++)e[t]()}function Oe(e,t,n={}){let s=[],i=[],l=[],o=0,r=t.length>1?[]:null;return oe(()=>Q(l)),()=>{let f=e()||[],u=f.length,a,c;return f[we],L(()=>{let y,m,k,F,B,w,A,p,E;if(u===0)o!==0&&(Q(l),l=[],s=[],i=[],o=0,r&&(r=[])),n.fallback&&(s=[Ce],i[0]=K(be=>(l[0]=be,n.fallback())),o=1);else if(o===0){for(i=new Array(u),c=0;c<u;c++)s[c]=f[c],i[c]=K(h);o=u}else{for(k=new Array(u),F=new Array(u),r&&(B=new Array(u)),w=0,A=Math.min(o,u);w<A&&s[w]===f[w];w++);for(A=o-1,p=u-1;A>=w&&p>=w&&s[A]===f[p];A--,p--)k[p]=i[A],F[p]=l[A],r&&(B[p]=r[A]);for(y=new Map,m=new Array(p+1),c=p;c>=w;c--)E=f[c],a=y.get(E),m[c]=a===void 0?-1:a,y.set(E,c);for(a=w;a<=A;a++)E=s[a],c=y.get(E),c!==void 0&&c!==-1?(k[c]=i[a],F[c]=l[a],r&&(B[c]=r[a]),c=m[c],y.set(E,c)):l[a]();for(c=w;c<u;c++)c in k?(i[c]=k[c],l[c]=F[c],r&&(r[c]=B[c],r[c](c))):i[c]=K(h);i=i.slice(0,o=u),s=f.slice(0)}return i});function h(y){if(l[c]=y,r){const[m,k]=re(c);return r[c]=k,t(f[c],m)}return t(f[c])}}}function x(e,t){return L(()=>e(t||{}))}function M(){return!0}const v={get(e,t,n){return t===U?n:e.get(t)},has(e,t){return t===U?!0:e.has(t)},set:M,deleteProperty:M,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:M,deleteProperty:M}},ownKeys(e){return e.keys()}};function V(e){return(e=typeof e=="function"?e():e)?e:{}}function Ee(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function W(...e){let t=!1;for(let o=0;o<e.length;o++){const r=e[o];t=t||!!r&&U in r,e[o]=typeof r=="function"?(t=!0,le(r)):r}if(se&&t)return new Proxy({get(o){for(let r=e.length-1;r>=0;r--){const f=V(e[r])[o];if(f!==void 0)return f}},has(o){for(let r=e.length-1;r>=0;r--)if(o in V(e[r]))return!0;return!1},keys(){const o=[];for(let r=0;r<e.length;r++)o.push(...Object.keys(V(e[r])));return[...new Set(o)]}},v);const n={},s=Object.create(null);for(let o=e.length-1;o>=0;o--){const r=e[o];if(!r)continue;const f=Object.getOwnPropertyNames(r);for(let u=f.length-1;u>=0;u--){const a=f[u];if(a==="__proto__"||a==="constructor")continue;const c=Object.getOwnPropertyDescriptor(r,a);if(!s[a])s[a]=c.get?{enumerable:!0,configurable:!0,get:Ee.bind(n[a]=[c.get.bind(r)])}:c.value!==void 0?c:void 0;else{const h=n[a];h&&(c.get?h.push(c.get.bind(r)):c.value!==void 0&&h.push(()=>c.value))}}}const i={},l=Object.keys(s);for(let o=l.length-1;o>=0;o--){const r=l[o],f=s[r];f&&f.get?Object.defineProperty(i,r,f):i[r]=f?f.value:void 0}return i}function Pe(e,...t){if(se&&U in e){const i=new Set(t.length>1?t.flat():t[0]),l=t.map(o=>new Proxy({get(r){return o.includes(r)?e[r]:void 0},has(r){return o.includes(r)&&r in e},keys(){return o.filter(r=>r in e)}},v));return l.push(new Proxy({get(o){return i.has(o)?void 0:e[o]},has(o){return i.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!i.has(o))}},v)),l}const n={},s=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const l=Object.getOwnPropertyDescriptor(e,i),o=!l.get&&!l.set&&l.enumerable&&l.writable&&l.configurable;let r=!1,f=0;for(const u of t)u.includes(i)&&(r=!0,o?s[f][i]=l.value:Object.defineProperty(s[f],i,l)),++f;r||(o?n[i]=l.value:Object.defineProperty(n,i,l))}return[...s,n]}function Ne(e){const t="fallback"in e&&{fallback:()=>e.fallback};return le(Oe(()=>e.each,e.children,t||void 0))}const $e=new Set(["innerHTML","textContent","innerText","children"]),Le=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Te=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),je={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function _e(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,f=t[i-1].nextSibling,u=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const a=l<s?r?n[r-1].nextSibling:n[l-r]:f;for(;r<l;)e.insertBefore(n[r++],a)}else if(l===r)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],a),t[i]=n[l]}else{if(!u){u=new Map;let c=r;for(;c<l;)u.set(n[c],c++)}const a=u.get(t[o]);if(a!=null)if(r<a&&a<l){let c=o,h=1,y;for(;++c<i&&c<l&&!((y=u.get(t[c]))==null||y!==a+h);)h++;if(h>a-r){const m=t[o];for(;r<a;)e.insertBefore(n[r++],m)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const J="_$DX_DELEGATE";function De(e,t,n,s={}){let i;return K(l=>{i=l,t===document?e():N(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function ye(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>L(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return l.cloneNode=l,l}function Fe(e,t=window.document){const n=t[J]||(t[J]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Ve))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Be(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Me(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Ke(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ue(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n,typeof n!="function"&&n)}function qe(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,o;for(l=0,o=i.length;l<o;l++){const r=i[l];!r||r==="undefined"||t[r]||(Z(e,r,!1),delete n[r])}for(l=0,o=s.length;l<o;l++){const r=s[l],f=!!t[r];!r||r==="undefined"||n[r]===f||!f||(Z(e,r,!0),n[r]=f)}return n}function ze(e,t,n){if(!t)return n?G(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function Ie(e,t={},n,s){const i={};return $(()=>i.children=_(e,t.children,i.children)),$(()=>typeof t.ref=="function"&&Re(t.ref,e)),$(()=>He(e,t,n,!0,i,!0)),i}function Re(e,t,n){return L(()=>e(t,n))}function N(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return _(e,t,s,n);$(i=>_(e,t(),i,n),s)}function He(e,t,n,s,i={},l=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=ee(e,o,null,i[o],n,l,t)}for(const o in t){if(o==="children")continue;const r=t[o];i[o]=ee(e,o,r,i[o],n,l,t)}}function Xe(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Z(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function ee(e,t,n,s,i,l,o){let r,f,u,a;if(t==="style")return ze(e,n,s);if(t==="classList")return qe(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);s&&e.removeEventListener(c,s,typeof s!="function"&&s),n&&e.addEventListener(c,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);s&&e.removeEventListener(c,s,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),h=Te.has(c);if(!h&&s){const y=Array.isArray(s)?s[0]:s;e.removeEventListener(c,y)}(h||n)&&(Ue(e,c,n,h),h&&Fe([c]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")Me(e,t.slice(5),n);else if((a=t.slice(0,5)==="prop:")||(u=$e.has(t))||!i||(r=e.nodeName.includes("-")||"is"in o))a&&(t=t.slice(5),f=!0),t==="class"||t==="className"?Ke(e,n):r&&!f&&!u?e[Xe(t)]=n:e[t]=n;else{const c=t.indexOf(":")>-1&&je[t.split(":")[0]];c?Be(e,c,t,n):G(e,Le[t]||t,n)}return n}function Ve(e){let t=e.target;const n=`$$${e.type}`,s=e.target,i=e.currentTarget,l=f=>Object.defineProperty(e,"target",{configurable:!0,value:f}),o=()=>{const f=t[n];if(f&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?f.call(t,u,e):f.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&l(t.host),!0},r=()=>{for(;o()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const f=e.composedPath();l(f[0]);for(let u=0;u<f.length-2&&(t=f[u],!!o());u++){if(t._$host){t=t._$host,r();break}if(t.parentNode===i)break}}else r();l(s)}function _(e,t,n,s,i){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(o){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=P(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=P(e,n,s);else{if(l==="function")return $(()=>{let r=t();for(;typeof r=="function";)r=r();n=_(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],f=n&&Array.isArray(n);if(Y(r,t,n,i))return $(()=>n=_(e,r,n,s,!0)),()=>n;if(r.length===0){if(n=P(e,n,s),o)return n}else f?n.length===0?te(e,r,s):_e(e,n,r):(n&&P(e),te(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=P(e,n,s,t);P(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Y(e,t,n,s){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],f=n&&n[e.length],u;if(!(r==null||r===!0||r===!1))if((u=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=Y(e,r,f)||i;else if(u==="function")if(s){for(;typeof r=="function";)r=r();i=Y(e,Array.isArray(r)?r:[r],Array.isArray(f)?f:[f])||i}else e.push(r),i=!0;else{const a=String(r);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return i}function te(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function P(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const f=r.parentNode===e;!l&&!o?f?e.replaceChild(i,r):e.insertBefore(i,n):f&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}var ve=ye("<svg><line></svg>",!1,!0);const T=e=>{const t=W({length:0,limit:94},e),[n,s]=Pe(t,["length","limit","stationary"]);return(()=>{var i=ve();return Ie(i,W(()=>n.stationary&&{y1:n.length-n.limit},{get y2(){return-(n.stationary?n.limit:n.length)},"stroke-linecap":"round"},s),!0),i})()};var Ge=ye('<div class="grid h-screen place-content-center dark:bg-zinc-800"><svg viewBox="0 0 200 200"class=h-[95vmin]><g class=translate-1/2><circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200"r=98></circle></g><g class=translate-1/2>');const S=60,Ye=()=>{const e=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,[t,n]=re(e()),s=(u,a=1)=>`rotate(${(u*360).toFixed(a)})`,i=()=>s(t()%1,0),l=()=>s(t()%S/S),o=()=>s(t()/S%S/S),r=()=>s(t()/S**2%12/12);let f=requestAnimationFrame(function u(){n(e()),f=requestAnimationFrame(u)});return oe(()=>{cancelAnimationFrame(f)}),(()=>{var u=Ge(),a=u.firstChild,c=a.firstChild;c.firstChild;var h=c.nextSibling;return N(c,x(Ne,{get each(){return Array.from({length:S},(y,m)=>m%5===0)},children:(y,m)=>x(T,{get transform(){return s(m()/S,0)},class:y?"stroke-zinc-600 stroke-2 dark:stroke-zinc-200":"stroke-zinc-200 dark:stroke-zinc-600",length:y?6:2.5,stationary:!0})}),null),N(h,x(T,{get transform(){return i()},class:"stroke-zinc-200 dark:stroke-zinc-600 stroke-3",length:82}),null),N(h,x(T,{get transform(){return r()},class:"stroke-zinc-600 dark:stroke-zinc-200 stroke-4",length:46}),null),N(h,x(T,{get transform(){return o()},class:"stroke-3 stroke-zinc-400",length:64}),null),N(h,x(T,{get transform(){return l()},class:"stroke-2 stroke-solid",length:76}),null),u})()},ne=document.querySelector("#root");if(ne)De(()=>x(Ye,{}),ne);else throw new Error("#root element not found!");
