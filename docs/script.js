document.addEventListener('DOMContentLoaded',()=>{
  // set year
  const y = new Date().getFullYear(); document.getElementById('year').textContent = y;

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.animate-up, .animate-left, .animate-right, .animate-scale, .animate-pop').forEach(el=>io.observe(el));

  // client-side thumbnail generation and lazy-load (LQIP)
  document.querySelectorAll('.gallery-item').forEach(img=>{
    const src = img.getAttribute('data-src');
    if(!src) return;
    img.style.filter = 'blur(8px)';
    img.style.transition = 'filter .6s, opacity .6s';

    // generate a tiny blurred placeholder
    generateThumbnail(src,40).then(dataUrl=>{
      img.src = dataUrl; // low-res placeholder
      // then load full-res image
      const hi = new Image(); hi.onload = ()=>{ img.src = src; img.style.filter='none'; };
      hi.onerror = ()=>{ img.style.opacity = '0.6'; };
      hi.src = src;
    }).catch(()=>{
      // fallback to direct load
      img.src = src;
    });

    img.addEventListener('click',()=>openLightbox(img.src || src, img.alt || ''));
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  document.getElementById('lb-close').addEventListener('click',closeLightbox);
  lb.addEventListener('click',(e)=>{ if(e.target===lb) closeLightbox(); });
  function openLightbox(src,alt){ lbImg.src = src; lbImg.alt = alt; lb.setAttribute('aria-hidden','false'); }
  function closeLightbox(){ lbImg.src = ''; lb.setAttribute('aria-hidden','true'); }

  // simple nav link smooth scroll
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click',(e)=>{
      e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
  });

});

// Generate a tiny thumbnail (LQIP) by drawing to canvas
function generateThumbnail(src, size){
  return new Promise((resolve,reject)=>{
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const scale = Math.min(size / img.width, size / img.height, 1);
      canvas.width = Math.max(1, Math.floor(img.width * scale));
      canvas.height = Math.max(1, Math.floor(img.height * scale));
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      // small blur by scaling up in CSS; return tiny data URL
      try{
        const dataUrl = canvas.toDataURL('image/jpeg',0.6);
        resolve(dataUrl);
      }catch(e){ reject(e); }
    };
    img.onerror = reject;
    img.src = src;
  });
}

// KaTeX auto-render after content load (if available)
document.addEventListener('DOMContentLoaded',()=>{
  if(window.renderMathInElement){
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
  }
});
