'use strict';
const menu=document.getElementById('menu');
const shade=document.getElementById('menu-shade');
const input=document.getElementById('search');
const results=document.getElementById('search-results');
const closeMenu=()=>{document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');shade.hidden=true;};
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));shade.hidden=!open;});
shade.addEventListener('click',closeMenu);
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{closeMenu();if(window.innerWidth<=790){const target=document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));if(target)target.focus({preventScroll:true});}}));
document.getElementById('print').addEventListener('click',()=>window.print());
const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const chapters=[...document.querySelectorAll('.chapter')].map(section=>({id:section.dataset.chapter,title:section.querySelector('h2').childNodes[0].textContent,text:section.innerText.replace(/Zurück zum Überblick ↑/g,'').replace(/\s+/g,' ').trim()}));
input.addEventListener('input',()=>{const term=normalize(input.value.trim());results.replaceChildren();if(term.length<2){results.hidden=true;return;}const terms=term.split(/\s+/);const matches=chapters.filter(c=>terms.every(t=>normalize(c.text).includes(t))).slice(0,8);if(!matches.length){const p=document.createElement('p');p.textContent='Kein passendes Kapitel gefunden. Versuche einen anderen Begriff, zum Beispiel „Ausfall“ oder „Speichern“.';results.append(p);}for(const c of matches){const a=document.createElement('a');a.href='#'+c.id;const title=document.createElement('strong');title.textContent=c.title;const excerpt=document.createElement('small');const at=normalize(c.text).indexOf(terms[0]);excerpt.textContent=(at>65?'… ':'')+c.text.slice(Math.max(0,at-65),Math.max(0,at-65)+190)+' …';a.append(title,excerpt);a.addEventListener('click',()=>{results.hidden=true;document.getElementById(c.id).focus({preventScroll:true});});results.append(a);}results.hidden=false;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){results.hidden=true;closeMenu();}if(event.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){event.preventDefault();input.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.search-wrap'))results.hidden=true;});
const links=[...document.querySelectorAll('nav [data-section]')];
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){links.forEach(a=>{const active=a.dataset.section===entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}, {rootMargin:'-90px 0px -65% 0px',threshold:0});document.querySelectorAll('h2').forEach(h=>observer.observe(h));}
