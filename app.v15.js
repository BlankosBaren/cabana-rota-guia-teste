const BUILD_VERSION='15';
const C = window.GUIDE_CONFIG;
const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const toast = document.getElementById('toast');

const screens = {
  home: {img:'assets/screens/home.png', ratio:[941,1672]},
  checkin: {img:'assets/screens/checkin.png', ratio:[941,1672]},
  wifi: {img:'assets/screens/wifi.png', ratio:[941,1672]},
  cafe: {img:'assets/screens/cafe.png', ratio:[941,1672]},
  hidro: {img:'assets/screens/hidro.png', ratio:[941,1672]},
  calefator: {img:'assets/screens/calefator.png', ratio:[941,1672]},
  ar: {img:'assets/screens/ar.png', ratio:[941,1672]},
  tv: {img:'assets/screens/tv.png', ratio:[941,1672]},
  regras: {img:'assets/screens/regras.png', ratio:[941,1672]},
  rota: {img:'assets/screens/rota.png', ratio:[941,1672]},
  delivery: {img:'assets/screens/delivery.png', ratio:[864,1821]},
  casaAzul: {img:'assets/screens/casa-azul.png', ratio:[941,1672]},
  checkout: {img:'assets/screens/checkout.png', ratio:[941,1672]}
};

const go = id => { location.hash = id === 'home' ? '' : id; };
const openExternal = url => url && window.open(url,'_blank','noopener,noreferrer');
const pct = (x,y,w,h) => ({left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`});
function hotspot(label, box, action, hidden=false, visibleLabel=''){ return {label, box, action, hidden, visibleLabel}; }

const actions = {
  home: [
    hotspot('Check in',pct(5.5,43.4,20.5,12.6),()=>go('checkin')),
    hotspot('Wi Fi',pct(27.2,43.4,21.4,12.6),()=>go('wifi')),
    hotspot('Café da manhã',pct(50.3,43.4,21,12.6),()=>go('cafe')),
    hotspot('Hidromassagem',pct(73.2,43.4,21,12.6),()=>go('hidro')),
    hotspot('Calefator',pct(5.5,59.6,20.5,12.4),()=>go('calefator')),
    hotspot('Ar condicionado',pct(27.2,59.6,21.4,12.4),()=>go('ar')),
    hotspot('TV',pct(50.3,59.6,21,12.4),()=>go('tv')),
    hotspot('Regras da cabana',pct(73.2,59.6,21,12.4),()=>go('regras')),
    hotspot('Rota do Vinho',pct(5.5,76.4,20.5,10.6),()=>go('rota')),
    hotspot('Delivery na Cabana',pct(27.2,76.4,21.4,10.6),()=>go('delivery')),
    hotspot('Casa Azul',pct(50.3,76.4,21,10.6),()=>go('casaAzul')),
    hotspot('Check out',pct(73.2,76.4,21,10.6),()=>go('checkout')),
    hotspot('WhatsApp',pct(67.5,88.4,24,4.6),()=>openExternal(C.external.whatsapp)),
    hotspot('Instagram',pct(5.5,94.5,28,4.5),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(36,94.5,27,4.5),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(64,94.5,30,4.5),()=>openExternal(C.external.whatsapp))
  ],
  checkin: [
    hotspot('Voltar',pct(2,2,10,7),()=>go('home')),
    hotspot('Abrir localização',pct(24.5,47.6,43.5,4.6),()=>openExternal(C.external.mapsCabana)),
    hotspot('Ver foto ou vídeo',pct(24.5,60.5,43.5,4.6),()=>openExternal(C.external.checkinVideo)),
    hotspot('Ver vídeo ou fotos',pct(24.5,73.4,43.5,4.6),()=>openExternal(C.external.checkinVideo)),
    hotspot('WhatsApp',pct(65.0,87.0,26.5,5.0),()=>openExternal(C.external.whatsapp)),
    hotspot('Instagram',pct(5.0,94.0,30.0,5.5),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(35.0,94.0,28.0,5.5),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(63.0,94.0,34.0,5.5),()=>openExternal(C.external.whatsapp))
  ],
  wifi: [
    hotspot('Voltar',pct(2,2,10,7),()=>go('home')),
    hotspot('Copiar senha',pct(11,55.0,77,6.5),copyWifi),
    hotspot('Voltar para o menu',pct(9.2,81.3,80.0,6.2),()=>go('home')),
    hotspot('Instagram',pct(3,94.1,31,5.5),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(34,94.1,31,5.5),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65,94.1,32,5.5),()=>openExternal(C.external.whatsapp))
  ],
  cafe: [
    hotspot('Voltar',pct(2,2,10,7),()=>go('home')),
    hotspot('Ver onde retirar',pct(57.5,50.1,31.5,4.8),showBreakfastPhoto),
    hotspot('Voltar para o menu',pct(13.0,83.5,74.0,5.4),()=>go('home')),
    hotspot('Instagram',pct(3.0,94.0,31.0,5.5),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(34.0,94.0,31.0,5.5),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65.0,94.0,32.0,5.5),()=>openExternal(C.external.whatsapp))
  ],
  hidro: [
    hotspot('Voltar',pct(2.0,1.5,10.0,6.0),()=>go('home')),
    hotspot('Ver vídeo: Como usar a hidromassagem',pct(5.0,37.8,90.0,5.3),()=>{
      if(C.pending.hidroVideo) openExternal(C.pending.hidroVideo);
      else showToast('Vídeo da hidromassagem será disponibilizado em breve.');
    }),
    hotspot('Voltar para o menu',pct(14.0,85.8,72.0,5.3),()=>go('home')),
    hotspot('Instagram',pct(3.0,94.1,31.0,5.5),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(34.0,94.1,31.0,5.5),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65.0,94.1,32.0,5.5),()=>openExternal(C.external.whatsapp))
  ],
  calefator: [
    hotspot('Voltar',pct(2.0,1.5,10.0,6.0),()=>go('home')),
    hotspot('Ver vídeo: Como utilizar o calefator',pct(4.5,43.8,91.0,4.6),()=>{
      if(C.pending.calefatorVideo) openExternal(C.pending.calefatorVideo);
      else showToast('Vídeo do calefator será disponibilizado em breve.');
    }),
    hotspot('Voltar para o menu',pct(14.5,87.4,71.0,4.8),()=>go('home')),
    hotspot('Instagram',pct(3.0,95.0,31.0,4.6),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(34.0,95.0,31.0,4.6),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65.0,95.0,32.0,4.6),()=>openExternal(C.external.whatsapp))
  ],
  ar: [
    hotspot('Voltar',pct(2.0,1.5,10.0,6.0),()=>go('home')),
    hotspot('Ver vídeo: Como utilizar o ar condicionado',pct(4.5,46.5,91.0,4.8),()=>{
      if(C.pending.arVideo) openExternal(C.pending.arVideo);
      else showToast('Vídeo do ar condicionado será disponibilizado em breve.');
    }),
    hotspot('Voltar para o menu',pct(16.5,85.4,67.0,4.8),()=>go('home')),
    hotspot('Instagram',pct(3.0,94.5,31.0,5.0),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(34.0,94.5,31.0,5.0),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65.0,94.5,32.0,5.0),()=>openExternal(C.external.whatsapp))
  ],
  tv: [
    hotspot('Voltar',pct(2.0,1.5,12.0,6.5),()=>go('home')),
    hotspot('Ver como utilizar',pct(18.8,89.0,62.2,5.8),()=>{
      if(C.pending.tvVideo) openExternal(C.pending.tvVideo);
      else showToast('Vídeo da TV será disponibilizado em breve.');
    })
  ],
  regras: [
    hotspot('Voltar',pct(2.5,1.2,12.0,6.0),()=>go('home')),
    hotspot('Ver regras completas (PDF)',pct(55.5,82.5,38.5,6.0),()=>showImage('assets/extras/regras-completas.png','Regras completas')),
    hotspot('Voltar para o menu',pct(20.0,88.4,60.0,6.2),()=>go('home')),
    hotspot('Instagram',pct(2.0,94.0,31.5,6.0),()=>openExternal(C.external.instagram)),
    hotspot('Site',pct(33.5,94.0,31.5,6.0),()=>openExternal(C.external.site)),
    hotspot('Outras dúvidas',pct(65.0,94.0,33.0,6.0),()=>openExternal(C.external.whatsapp))
  ],
  rota: [
    hotspot('Voltar',pct(2.5,1.8,10.5,5.3),()=>go('home')),

    // Parceiros: a faixa de benefício é clicável. No Dream Car abre a arte do cupom.
    hotspot('Hockenheim benefício',pct(6.0,61.5,41.0,6.0),()=>{
      if(C.pending.hockenheimBenefit) openExternal(C.pending.hockenheimBenefit);
      else showToast('Benefício da Choperia Hockenheim será disponibilizado em breve.');
    }),
    hotspot('Dream Car benefício',pct(52.5,61.5,41.0,6.0),()=>showDreamBenefit()),

    // A área da foto/nome do Dream Car leva ao mapa. Hockenheim fica preparada até receber o link.
    hotspot('Hockenheim como chegar',pct(5.0,43.0,43.0,18.0),()=>openExternal(C.external.hockenheimMaps)),
    hotspot('Dream Car como chegar',pct(51.5,43.0,43.0,18.0),()=>openExternal(C.external.dreamCarMaps)),

    hotspot('Abrir Rota do Vinho no mapa',pct(10.8,86.4,48.0,5.0),()=>openExternal(C.external.rotaMaps)),
    hotspot('Mapa do Roteiro do Vinho',pct(60.2,86.4,31.5,5.0),()=>showImage('assets/extras/mapa-roteiro.png','Mapa do Roteiro do Vinho')),
    hotspot('Voltar para o menu',pct(20.4,92.2,59.2,5.0),()=>go('home'))
  ],
  delivery: [
    hotspot('Voltar',pct(2,1,10,6),()=>go('home')),
    hotspot('Born In Smoke',pct(55,28,36,5),()=>openExternal(C.external.bornWhatsapp)),
    hotspot('Itacolomy',pct(55,47,36,5),()=>openExternal(C.external.itacolomyWhatsapp)),
    hotspot('Di Pomodoro',pct(55,65,36,5),()=>openExternal(C.external.diPomodoroWhatsapp)),
    hotspot('iFood',pct(65.0,79.1,29.0,4.3),()=>openExternal(C.external.ifood)),
    hotspot('Voltar para o menu',pct(22,94,58,4.5),()=>go('home'))
  ],
  casaAzul: [
    hotspot('Voltar',pct(2,2,10,7),()=>go('home')),
    hotspot('Como chegar',pct(29,86.7,42,5.5),showCasaAzulDirections),
    hotspot('Voltar para o menu',pct(23,93.2,54,5.4),()=>go('home'))
  ],
  checkout: [
    hotspot('Voltar',pct(2,2,10,7),()=>go('home')),
    hotspot('Ver foto do portão',pct(75.0,68.5,17.0,4.2),()=>showPendingPhoto(),false,'Ver foto'),
    hotspot('Finalizei meu check out',pct(17,90.2,66,4.7),()=>showCheckoutEvaluation()),
    hotspot('Voltar para o menu',pct(17,95,66,4.2),()=>go('home'))
  ]
};

function currentScreen(){ const id=(location.hash||'#home').slice(1)||'home'; return screens[id]?id:'home'; }
function render(){
  const id=currentScreen();
  const s=screens[id];

  const section=document.createElement('section');
  section.className='screen';
  section.dataset.screen=id;

  // Camada responsiva isolada: imagem e hotspots escalam juntos em qualquer tela.
  const stage=document.createElement('div');
  stage.className='screen__stage';
  stage.style.aspectRatio=`${s.ratio[0]} / ${s.ratio[1]}`;

  const img=document.createElement('img');
  img.src=s.img+'?v='+BUILD_VERSION;
  img.alt=`Tela ${id}`;
  img.width=s.ratio[0];
  img.height=s.ratio[1];
  stage.appendChild(img);

  (actions[id]||[]).forEach(h=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='hotspot';
    b.setAttribute('aria-label',h.label);
    Object.assign(b.style,h.box);
    if(h.hidden)b.hidden=true;
    if(h.visibleLabel){
      b.classList.add('visible-action');
      b.textContent=h.visibleLabel;
    }
    b.addEventListener('click',h.action);
    stage.appendChild(b);
  });

  section.appendChild(stage);
  app.replaceChildren(section);
  window.scrollTo({top:0,behavior:'instant'});
}
function copyWifi(){ navigator.clipboard?.writeText(C.wifi.password).then(()=>showToast('Senha copiada: '+C.wifi.password)).catch(()=>showToast('Senha: '+C.wifi.password)); }
function showToast(msg){ toast.textContent=msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2600); }
function openModal(html){ modalContent.innerHTML=html; modal.hidden=false; document.body.style.overflow='hidden'; }
function closeModal(){ modal.hidden=true; modalContent.innerHTML=''; document.body.style.overflow=''; }
function showImage(src,alt){ openModal(`<img src="${src}?v=${BUILD_VERSION}" alt="${alt}">`); }
function showBreakfastPhoto(){ openModal(`<div class="gallery"><img src="assets/extras/casinha-vermelha.png?v=${BUILD_VERSION}" alt="Casinha vermelha para retirada do café da manhã"><div class="caption">Retire o café da manhã na casinha vermelha, no pé da escada.</div></div>`); }
function showCasaAzulDirections(){ openModal(`<div class="gallery"><img src="assets/extras/casa-azul-portao.png?v=${BUILD_VERSION}" alt="Vista da Casa Azul a partir do portão"><img src="assets/extras/casa-azul-fachada.png?v=${BUILD_VERSION}" alt="Fachada da Casa Azul"><div class="caption"><strong>Como chegar:</strong> olhando do portão da cabana, esta é a Casa Azul. Para chegar, suba a rua à esquerda. A senha da porta é <strong>2381</strong>. Por favor, feche a porta ao sair.</div></div>`); }
function showDreamBenefit(){ openModal(`<div class="gallery"><img src="assets/extras/dream-car-beneficio.png?v=${BUILD_VERSION}" alt="Benefício Dream Car Museum"><div class="caption"><strong>Cupom:</strong> CABANAROTADOVINHO<br><br><button type="button" onclick="window.open('${C.external.dreamCarPurchase}','_blank','noopener,noreferrer')">Comprar no site da Dream Car</button></div></div>`); }
function showPendingPhoto(){ if(C.pending.checkoutGatePhoto) showImage(C.pending.checkoutGatePhoto,'Foto do teclado/portão'); else showToast('Foto do teclado/portão será adicionada em breve.'); }
function showCheckoutEvaluation(){
  openModal(`<div class="gallery checkout-evaluation"><img src="assets/extras/avaliacao-pos-checkout.png?v=${BUILD_VERSION}" alt="Informações sobre avaliação da hospedagem"><button type="button" class="modal-home-btn" id="checkoutHomeBtn">Voltar para a tela inicial</button></div>`);
  requestAnimationFrame(()=>{
    const btn=document.getElementById('checkoutHomeBtn');
    if(btn) btn.addEventListener('click',()=>{ closeModal(); go('home'); });
  });
}

document.addEventListener('click',e=>{ if(e.target.matches('[data-close-modal]')) closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!modal.hidden) closeModal(); });
window.addEventListener('hashchange',render);
render();
