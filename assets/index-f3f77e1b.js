(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();const S={},be=(e,t)=>e===t,I=Symbol("solid-proxy"),pe=Symbol("solid-track"),q={equals:be};let Ae=de;const E=1,H=2,ie={owned:null,cleanups:null,context:null,owner:null};var g=null;let k=null,d=null,y=null,C=null,K=0;function B(e,t){const n=d,i=g,s=e.length===0,l=s?ie:{owned:null,cleanups:null,context:null,owner:t===void 0?i:t},o=s?e:()=>e(()=>v(()=>V(l)));g=l,d=null;try{return M(o,!0)}finally{d=n,g=i}}function le(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),ce(n,s));return[fe.bind(n),i]}function $(e,t,n){const i=ue(e,t,!1,E);R(i)}function re(e,t,n){n=n?Object.assign({},q,n):q;const i=ue(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,R(i),fe.bind(i)}function v(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function oe(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function fe(){const e=k;if(this.sources&&(this.state||e))if(this.state===E||e)R(this);else{const t=y;y=null,M(()=>U(this),!1),y=t}if(d){const t=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(t)):(d.sources=[this],d.sourceSlots=[t]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function ce(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&M(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],o=k&&k.running;o&&k.disposed.has(l),(o&&!l.tState||!o&&!l.state)&&(l.pure?y.push(l):C.push(l),l.observers&&he(l)),o||(l.state=E)}if(y.length>1e6)throw y=[],new Error},!1)),t}function R(e){if(!e.fn)return;V(e);const t=g,n=d,i=K;d=g=e,Se(e,e.value,i),d=n,g=t}function Se(e,t,n){let i;try{i=e.fn(t)}catch(s){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(V),e.owned=null),e.updatedAt=n+1,ge(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ce(e,i):e.value=i,e.updatedAt=n)}function ue(e,t,n,i=E,s){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==ie&&(g.owned?g.owned.push(l):g.owned=[l]),l}function ae(e){const t=k;if(e.state===0||t)return;if(e.state===H||t)return U(e);if(e.suspense&&v(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<K);)(e.state||t)&&n.push(e);for(let i=n.length-1;i>=0;i--)if(e=n[i],e.state===E||t)R(e);else if(e.state===H||t){const s=y;y=null,M(()=>U(e,n[0]),!1),y=s}}function M(e,t){if(y)return e();let n=!1;t||(y=[]),C?n=!0:C=[],K++;try{const i=e();return xe(n),i}catch(i){n||(C=null),y=null,ge(i)}}function xe(e){if(y&&(de(y),y=null),e)return;const t=C;C=null,t.length&&M(()=>Ae(t),!1)}function de(e){for(let t=0;t<e.length;t++)ae(e[t])}function U(e,t){const n=k;e.state=0;for(let i=0;i<e.sources.length;i+=1){const s=e.sources[i];s.sources&&(s.state===E||n?s!==t&&(!s.updatedAt||s.updatedAt<K)&&ae(s):(s.state===H||n)&&U(s,t))}}function he(e){const t=k;for(let n=0;n<e.observers.length;n+=1){const i=e.observers[n];(!i.state||t)&&(i.state=H,i.pure?y.push(i):C.push(i),i.observers&&he(i))}}function V(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const l=s.pop(),o=n.observerSlots.pop();i<s.length&&(l.sourceSlots[o]=i,s[i]=l,n.observerSlots[i]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)V(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ke(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ge(e){throw e=ke(e),e}const Ce=Symbol("fallback");function J(e){for(let t=0;t<e.length;t++)e[t]()}function Ee(e,t,n={}){let i=[],s=[],l=[],o=0,r=t.length>1?[]:null;return oe(()=>J(l)),()=>{let u=e()||[],c,f;return u[pe],v(()=>{let a=u.length,m,w,P,_,D,b,p,A,L;if(a===0)o!==0&&(J(l),l=[],i=[],s=[],o=0,r&&(r=[])),n.fallback&&(i=[Ce],s[0]=B(we=>(l[0]=we,n.fallback())),o=1);else if(o===0){for(s=new Array(a),f=0;f<a;f++)i[f]=u[f],s[f]=B(h);o=a}else{for(P=new Array(a),_=new Array(a),r&&(D=new Array(a)),b=0,p=Math.min(o,a);b<p&&i[b]===u[b];b++);for(p=o-1,A=a-1;p>=b&&A>=b&&i[p]===u[A];p--,A--)P[A]=s[p],_[A]=l[p],r&&(D[A]=r[p]);for(m=new Map,w=new Array(A+1),f=A;f>=b;f--)L=u[f],c=m.get(L),w[f]=c===void 0?-1:c,m.set(L,f);for(c=b;c<=p;c++)L=i[c],f=m.get(L),f!==void 0&&f!==-1?(P[f]=s[c],_[f]=l[c],r&&(D[f]=r[c]),f=w[f],m.set(L,f)):l[c]();for(f=b;f<a;f++)f in P?(s[f]=P[f],l[f]=_[f],r&&(r[f]=D[f],r[f](f))):s[f]=B(h);s=s.slice(0,o=a),i=u.slice(0)}return s});function h(a){if(l[f]=a,r){const[m,w]=le(f);return r[f]=w,t(u[f],m)}return t(u[f])}}}function x(e,t){return v(()=>e(t||{}))}function F(){return!0}const Y={get(e,t,n){return t===I?n:e.get(t)},has(e,t){return t===I?!0:e.has(t)},set:F,deleteProperty:F,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:F,deleteProperty:F}},ownKeys(e){return e.keys()}};function X(e){return(e=typeof e=="function"?e():e)?e:{}}function Q(...e){let t=!1;for(let i=0;i<e.length;i++){const s=e[i];t=t||!!s&&I in s,e[i]=typeof s=="function"?(t=!0,re(s)):s}if(t)return new Proxy({get(i){for(let s=e.length-1;s>=0;s--){const l=X(e[s])[i];if(l!==void 0)return l}},has(i){for(let s=e.length-1;s>=0;s--)if(i in X(e[s]))return!0;return!1},keys(){const i=[];for(let s=0;s<e.length;s++)i.push(...Object.keys(X(e[s])));return[...new Set(i)]}},Y);const n={};for(let i=e.length-1;i>=0;i--)if(e[i]){const s=Object.getOwnPropertyDescriptors(e[i]);for(const l in s)l in n||Object.defineProperty(n,l,{enumerable:!0,get(){for(let o=e.length-1;o>=0;o--){const r=(e[o]||{})[l];if(r!==void 0)return r}}})}return n}function Le(e,...t){const n=new Set(t.flat());if(I in e){const s=t.map(l=>new Proxy({get(o){return l.includes(o)?e[o]:void 0},has(o){return l.includes(o)&&o in e},keys(){return l.filter(o=>o in e)}},Y));return s.push(new Proxy({get(l){return n.has(l)?void 0:e[l]},has(l){return n.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!n.has(l))}},Y)),s}const i=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(i).filter(s=>!n.has(s))),t.map(s=>{const l={};for(let o=0;o<s.length;o++){const r=s[o];r in e&&Object.defineProperty(l,r,i[r]?i[r]:{get(){return e[r]},set(){return!0},enumerable:!0})}return l})}function Ne(e){const t="fallback"in e&&{fallback:()=>e.fallback};return re(Ee(()=>e.each,e.children,t||void 0))}const Oe=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],$e=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Oe]),Te=new Set(["innerHTML","textContent","innerText","children"]),Pe=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),W=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),je=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Me={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function _e(e,t,n){let i=n.length,s=t.length,l=i,o=0,r=0,u=t[s-1].nextSibling,c=null;for(;o<s||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[s-1]===n[l-1];)s--,l--;if(s===o){const f=l<i?r?n[r-1].nextSibling:n[l-r]:u;for(;r<l;)e.insertBefore(n[r++],f)}else if(l===r)for(;o<s;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[s-1]){const f=t[--s].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],f),t[s]=n[l]}else{if(!c){c=new Map;let h=r;for(;h<l;)c.set(n[h],h++)}const f=c.get(t[o]);if(f!=null)if(r<f&&f<l){let h=o,a=1,m;for(;++h<s&&h<l&&!((m=c.get(t[h]))==null||m!==f+a);)a++;if(a>f-r){const w=t[o];for(;r<f;)e.insertBefore(n[r++],w)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const Z="_$DX_DELEGATE";function De(e,t,n,i={}){let s;return B(l=>{s=l,t===document?e():O(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function ye(e,t,n){const i=document.createElement("template");if(i.innerHTML=e,t&&i.innerHTML.split("<").length-1!==t)throw`The browser resolved template HTML does not match JSX input:
${i.innerHTML}

${e}. Is your HTML properly formed?`;let s=i.content.firstChild;return n&&(s=s.firstChild),s}function Fe(e,t=window.document){const n=t[Z]||(t[Z]=new Set);for(let i=0,s=e.length;i<s;i++){const l=e[i];n.has(l)||(n.add(l),t.addEventListener(l,Ve))}}function me(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Be(e,t,n,i){i==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,i)}function Ie(e,t){t==null?e.removeAttribute("class"):e.className=t}function qe(e,t,n,i){if(i)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=l=>s.call(e,n[1],l))}else e.addEventListener(t,n)}function He(e,t,n={}){const i=Object.keys(t||{}),s=Object.keys(n);let l,o;for(l=0,o=s.length;l<o;l++){const r=s[l];!r||r==="undefined"||t[r]||(z(e,r,!1),delete n[r])}for(l=0,o=i.length;l<o;l++){const r=i[l],u=!!t[r];!r||r==="undefined"||n[r]===u||!u||(z(e,r,!0),n[r]=u)}return n}function Ue(e,t,n){if(!t)return n?me(e,"style"):t;const i=e.style;if(typeof t=="string")return i.cssText=t;typeof n=="string"&&(i.cssText=n=void 0),n||(n={}),t||(t={});let s,l;for(l in n)t[l]==null&&i.removeProperty(l),delete n[l];for(l in t)s=t[l],s!==n[l]&&(i.setProperty(l,s),n[l]=s);return n}function Ke(e,t={},n,i){const s={};return i||$(()=>s.children=T(e,t.children,s.children)),$(()=>t.ref&&t.ref(e)),$(()=>ve(e,t,n,!0,s,!0)),s}function O(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return T(e,t,i,n);$(s=>T(e,t(),s,n),i)}function ve(e,t,n,i,s={},l=!1){t||(t={});for(const o in s)if(!(o in t)){if(o==="children")continue;s[o]=ee(e,o,null,s[o],n,l)}for(const o in t){if(o==="children"){i||T(e,t.children);continue}const r=t[o];s[o]=ee(e,o,r,s[o],n,l)}}function Re(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function z(e,t,n){const i=t.trim().split(/\s+/);for(let s=0,l=i.length;s<l;s++)e.classList.toggle(i[s],n)}function ee(e,t,n,i,s,l){let o,r,u;if(t==="style")return Ue(e,n,i);if(t==="classList")return He(e,n,i);if(n===i)return i;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const c=t.slice(3);i&&e.removeEventListener(c,i),n&&e.addEventListener(c,n)}else if(t.slice(0,10)==="oncapture:"){const c=t.slice(10);i&&e.removeEventListener(c,i,!0),n&&e.addEventListener(c,n,!0)}else if(t.slice(0,2)==="on"){const c=t.slice(2).toLowerCase(),f=je.has(c);if(!f&&i){const h=Array.isArray(i)?i[0]:i;e.removeEventListener(c,h)}(f||n)&&(qe(e,c,n,f),f&&Fe([c]))}else if((u=Te.has(t))||!s&&(W[t]||(r=$e.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?Ie(e,n):o&&!r&&!u?e[Re(t)]=n:e[W[t]||t]=n;else{const c=s&&t.indexOf(":")>-1&&Me[t.split(":")[0]];c?Be(e,c,t,n):me(e,Pe[t]||t,n)}return n}function Ve(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),S.registry&&!S.done&&(S.done=_$HY.done=!0);n;){const i=n[t];if(i&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?i.call(n,s,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function T(e,t,n,i,s){if(S.context){!n&&(n=[...e.childNodes]);let r=[];for(let u=0;u<n.length;u++){const c=n[u];c.nodeType===8&&c.data==="!"?c.remove():r.push(c)}n=r}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=i!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(S.context)return n;if(l==="number"&&(t=t.toString()),o){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=N(e,n,i,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(S.context)return n;n=N(e,n,i)}else{if(l==="function")return $(()=>{let r=t();for(;typeof r=="function";)r=r();n=T(e,r,n,i)}),()=>n;if(Array.isArray(t)){const r=[],u=n&&Array.isArray(n);if(G(r,t,n,s))return $(()=>n=T(e,r,n,i,!0)),()=>n;if(S.context){if(!r.length)return n;for(let c=0;c<r.length;c++)if(r[c].parentNode)return n=r}if(r.length===0){if(n=N(e,n,i),o)return n}else u?n.length===0?te(e,r,i):_e(e,n,r):(n&&N(e),te(e,r));n=r}else if(t instanceof Node){if(S.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=N(e,n,i,t);N(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function G(e,t,n,i){let s=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],u=n&&n[l];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))s=G(e,r,u)||s;else if(typeof r=="function")if(i){for(;typeof r=="function";)r=r();s=G(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||s}else e.push(r),s=!0;else{const c=String(r);u&&u.nodeType===3?(u.data=c,e.push(u)):e.push(document.createTextNode(c))}}return s}function te(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function N(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(s!==r){const u=r.parentNode===e;!l&&!o?u?e.replaceChild(s,r):e.insertBefore(s,n):u&&r.remove()}else l=!0}}else e.insertBefore(s,n);return[s]}const Xe=ye("<svg><line></line></svg>",4,!0),j=e=>{const t=Q({length:0,limit:94},e),[n,i]=Le(t,["length","limit","stationary"]);return(()=>{const s=Xe.cloneNode(!0);return Ke(s,Q(()=>n.stationary&&{y1:n.length-n.limit},{get y2(){return-(n.stationary?n.limit:n.length)},"stroke-linecap":"round"},i),!0,!1),s})()},Ye=ye('<div class="grid h-screen place-content-center @dark:bg-neutral-700"><svg viewBox="0 0 200 200" class="h-95vmin"><g class="translate-1/2"><circle class="fill-none stroke-neutral-600 @dark:stroke-neutral-200" r="98"></circle></g><g class="translate-1/2"></g></svg></div>',10),ne=60,Ge=()=>{const e=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,[t,n]=le(e()),i=(c,f=1)=>`rotate(${(c*360).toFixed(f)})`,s=()=>i(t()%1,0),l=()=>i(t()%60/60),o=()=>i(t()/60%60/60),r=()=>i(t()/60/60%12/12);let u=requestAnimationFrame(function c(){n(e()),u=requestAnimationFrame(c)});return oe(()=>cancelAnimationFrame(u)),(()=>{const c=Ye.cloneNode(!0),f=c.firstChild,h=f.firstChild;h.firstChild;const a=h.nextSibling;return O(h,x(Ne,{get each(){return Array.from({length:ne},(m,w)=>w%5===0)},children:(m,w)=>x(j,{get transform(){return i(w()/ne,0)},class:m?"stroke-neutral-600 stroke-2 @dark:stroke-neutral-200":"stroke-neutral-200 @dark:stroke-neutral-600",length:m?6:2.5,stationary:!0})}),null),O(a,x(j,{get transform(){return s()},class:"stroke-neutral-200 stroke-4 @dark:stroke-neutral-600",length:82}),null),O(a,x(j,{get transform(){return r()},class:"stroke-neutral-600 stroke-4 @dark:stroke-neutral-200",length:46}),null),O(a,x(j,{get transform(){return o()},class:"stroke-neutral-400 stroke-3",length:64}),null),O(a,x(j,{get transform(){return l()},class:"stroke-#518ac8 stroke-2",length:76}),null),c})()},se=document.querySelector("#root");if(se)De(()=>x(Ge,{}),se);else throw new Error("#root element not found!");
