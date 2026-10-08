(function(){
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
  document.querySelectorAll('.copy-btn').forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-copy');
      var done=function(){b.classList.add('done');var s=b.querySelector('span');if(s)s.textContent=b.getAttribute('data-done');var st=b.parentElement.querySelector('.copy-status');if(st)st.textContent='';};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,function(){fallback();});}else fallback();
      function fallback(){var ta=document.createElement('textarea');ta.value=v;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}ta.remove();done();}
    });
  });
  var bar=document.querySelector('.give-bar');
  if(bar && window.matchMedia('(max-width:768px)').matches){
    var closed=false;
    try{closed=sessionStorage.getItem('ph-givebar')==='0';}catch(e){}
    var x=bar.querySelector('.give-bar-x');
    if(x)x.addEventListener('click',function(){bar.classList.remove('show');document.body.classList.remove('has-bar');try{sessionStorage.setItem('ph-givebar','0');}catch(e){}closed=true;});
    var foot=document.querySelector('.site-footer');
    var onscroll=function(){
      if(closed)return;
      var show=window.scrollY>window.innerHeight*0.6;
      if(foot){var r=foot.getBoundingClientRect();if(r.top<window.innerHeight-60)show=false;}
      bar.classList.toggle('show',show);
      document.body.classList.toggle('has-bar',show);
    };
    var ticking=false;
    window.addEventListener('scroll',function(){if(ticking)return;ticking=true;requestAnimationFrame(function(){ticking=false;onscroll();});},{passive:true});
  }
})();
