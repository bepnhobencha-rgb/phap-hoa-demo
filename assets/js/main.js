(function(){
  document.documentElement.classList.remove('no-js');
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('site-nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus();}
    });
  }
  var mb=document.querySelector('[data-map-load]');
  if(mb){
    mb.addEventListener('click',function(){
      var box=mb.closest('.map');
      var f=document.createElement('iframe');
      f.src=mb.getAttribute('data-map-load');
      f.title=mb.getAttribute('data-map-title')||'Google Maps';
      f.loading='lazy'; f.referrerPolicy='no-referrer-when-downgrade';
      box.innerHTML=''; box.classList.add('loaded'); box.appendChild(f);
    });
  }
})();
