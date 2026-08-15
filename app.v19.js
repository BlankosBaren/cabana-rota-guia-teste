const C=window.GUIDE_CONFIG,app=document.getElementById('app'),modal=document.getElementById('modal'),mc=document.getElementById('modalContent'),toast=document.getElementById('toast');
const A='assets/crops/';
const nav=[
 ['checkin','checkin-icon.jpg','Check in','Informações para sua chegada'],['wifi','wifi-icon.jpg','Wi Fi','Rede e senha para você se conectar'],['cafe','cafe-icon.jpg','Café da manhã','Horário e informações sobre o delivery'],['hidro','hidro-icon.jpg','Hidromassagem','Dicas para aproveitar sua banheira'],
 ['calefator','calefator-icon.jpg','Calefator','Como usar com segurança'],['ar','ar-icon.jpg','Ar condicionado','Dicas para usar da melhor forma'],['tv','tv-icon.jpg','TV','Canais e instruções de uso'],['regras','regras-icon.jpg','Regras da cabana','Regras importantes para sua estadia'],
 ['rota','rota-icon.jpg','Rota do Vinho','Vinícolas, passeios e experiências'],['delivery','delivery-icon.jpg','Delivery na Cabana','Restaurantes parceiros que entregam'],['casaAzul','casa-icon.jpg','Casa Azul','Ateliê & Conveniência'],['checkout','checkout-icon.jpg','Check out','Informações para sua saída']
];
const go=id=>{location.hash=id==='home'?'':id}; const ext=u=>u&&(location.href=u);
function toastMsg(m){toast.textContent=m;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
function openModal(html){mc.innerHTML=html;modal.hidden=false;document.body.style.overflow='hidden'} function closeModal(){modal.hidden=true;mc.innerHTML='';document.body.style.overflow=''}
function imgModal(src,alt,cap=''){openModal(`<img src="${src}" alt="${alt}">${cap?`<div class="modal-caption">${cap}</div>`:''}`)}
function top(title,sub=''){return `<div class="topbar"><button class="icon-btn" data-go="home" aria-label="Voltar">←</button><div class="brand"><div><h1 class="page-title">${title}</h1>${sub?`<small>${sub}</small>`:''}</div></div><div></div></div>`}
function footer(){return `<button class="btn back-menu" data-go="home">⌂ Voltar para o menu</button>`}
function globalFooter(){return `<div class="footer-actions"><button data-ext="instagram">◎ Instagram</button><button data-ext="site">◉ Site</button><button data-ext="whatsapp">? Outras dúvidas</button></div>`}
function home(){
 const cards=nav.map(([id,ic,t,d])=>`<button class="home-card" data-go="${id}"><img src="${A}${ic}" alt=""><strong>${t}</strong><span>${d}</span></button>`).join('');
 return `<div class="page"><div class="topbar"><div></div><div class="brand"><img src="${A}logo.jpg" alt="Logo"><div><h1>Cabana</h1><small>Rota do Vinho</small></div></div><div></div></div><div class="hero"><img src="${A}home-hero.jpg" alt="Cabana Rota do Vinho"></div>
 <h2 class="section-title">Sua estadia</h2><div class="home-grid">${cards.slice(0, cards.length)}</div>
 <div class="help-card"><div class="help-icon">♡</div><div><strong>Precisa de ajuda?</strong><p>Fale conosco sempre que precisar.</p></div><button class="btn" data-ext="whatsapp">WhatsApp</button></div>${globalFooter()}</div>`
}
function checkin(){return `<div class="page">${top('Check in')}<img class="feature-image" src="${A}checkin-hero.jpg" alt="Área externa da cabana"><div class="list">
 ${step('🕒','Horário de entrada','A partir das 15h.')}
 ${step('📍','Como chegar','Abra a localização da cabana no Google Maps.','<button class="btn-outline" data-ext="mapsCabana">Abrir localização</button>')}
 ${step('🚗','Ao chegar à propriedade','Veja como funciona a entrada, onde estacionar e o caminho até sua cabana.','<button class="btn-outline" data-ext="checkinVideo">Ver foto ou vídeo</button>')}
 ${step('🔑','Acesso à cabana','Veja onde encontrar a chave e como acessar sua cabana.','<button class="btn-outline" data-ext="checkinVideo">Ver vídeo ou fotos</button>')}
 ${step('🔐','Chaves e controles','Dentro da cabana, no local indicado.')}
 </div>${footer()}${globalFooter()}</div>`}
function wifi(){return `<div class="page">${top('Wi Fi')}<div class="card wifi-box"><h2>Rede</h2><div class="wifi-value">Cabana Rota do Vinho</div><h2>Senha</h2><div class="wifi-value">${C.wifi.password}</div><button class="btn" id="copyWifi">⧉ Copiar senha</button></div><div class="notice"><strong>Informações adicionais</strong><p>Temos Wi Fi na portaria.<br>Rede Viva Natural, não possui senha.</p></div>${footer()}${globalFooter()}</div>`}
function cafe(){return `<div class="page">${top('Café da manhã')}<div class="card"><h2>Horário de entrega</h2><div class="wifi-value">8h30</div><h3>Onde retirar</h3><p>Na casinha vermelha, no pé da escada.</p><button class="btn-outline" id="breakfastPhoto">📍 Ver onde retirar</button></div><div class="notice"><strong>Importante</strong><p>Os comércios só abrem após as 8h. Por este motivo, não conseguimos alterar o horário do café da manhã.</p></div>${footer()}${globalFooter()}</div>`}
function hidro(){return infoPage('Hidromassagem','Conforto e relaxamento','hidro-hero.jpg',[
 ['1','Encha a banheira','Encha com água até cobrir os jatos antes de ligar a hidromassagem.'],['2','Ligue a hidromassagem','Use os comandos da própria banheira.'],['3','Temperatura','Utilize a água em temperatura confortável, no máximo 36 °C.'],['4','Cuidados','Não utilize ervas, pétalas ou qualquer material que possa entupir a banheira.']
 ],'hidroVideo','Vídeo da hidromassagem será disponibilizado em breve.');}
function calefator(){return infoPage('Calefator','Conforto com segurança','calefator-hero.jpg',[
 ['1','Antes de usar','Mantenha cortinas e objetos longe do calefator.'],['2','Porta sempre fechada','É obrigatório manter a porta do calefator fechada durante todo o uso.'],['3','Cuidado com as brasas','Tenha cuidado para não deixar brasas caírem no chão.'],['4','Não coloque alimentos','Não coloque nenhum tipo de alimento no calefator, inclusive queijos ou marshmallows.']
 ],'calefatorVideo','Vídeo do calefator será disponibilizado em breve.','A utilização com a porta aberta apresenta risco de incêndio.');}
function ar(){return infoPage('Ar condicionado','Conforto e bem estar','ar-hero.jpg',[
 ['1','Onde fica o controle','O controle do ar condicionado fica na parede ao lado da escada.'],['2','Somente frio','O aparelho possui apenas a função de resfriamento. Não possui função quente.'],['3','Portas e janelas','Mantenha portas e janelas fechadas enquanto o aparelho estiver ligado.'],['4','Ao sair da cabana','Desligue o ar condicionado.']
 ],'arVideo','Vídeo do ar condicionado será disponibilizado em breve.');}
function tv(){return infoPage('TV','Entretenimento para relaxar','tv-hero.jpg',[
 ['1','Controle da TV','O controle da TV fica dentro da cestinha em frente ao microondas.'],['2','Canais e aplicativos','A TV possui acesso a Netflix, YouTube, Prime Video, Disney+ e Globoplay. Use sua própria conta.'],['3','Para assistir','Ligue a TV, escolha o aplicativo desejado e faça login com sua conta.'],['4','Ao sair da cabana','Desligue a TV e desconecte sua conta dos aplicativos.']
 ],'tvVideo','Vídeo da TV será disponibilizado em breve.');}
function regras(){return `<div class="page">${top('Regras da cabana','Para uma estadia tranquila e especial')}<div class="list">
 ${step('🚭','Dentro da cabana','Não é permitido fumar dentro da cabana. O cheiro impregna nas cortinas e demais tecidos.')}
 ${step('🍳','Alimentos','Não é permitido fazer frituras, churrasco ou preparações gordurosas dentro da cabana.')}
 ${step('🔥','Calefator','Não coloque alimentos no calefator. Mantenha a porta fechada durante todo o uso.')}
 ${step('🧺','Enxoval','Não utilize toalhas ou roupas de cama para remover maquiagem. Itens com manchas permanentes serão descartados e cobrados pelo valor de reposição.')}
 ${step('🏠','Itens da cabana','Utensílios, equipamentos e objetos pertencem à cabana. Itens ausentes após o checkout serão cobrados pelo valor de reposição.')}
 </div><div class="notice"><strong>Regras completas</strong><p>Consulte os Termos da Hospedagem completos.</p><button class="btn rule-link" id="fullRules">Ver regras completas</button></div>${footer()}${globalFooter()}</div>`}
function rota(){return `<div class="page">${top('Rota do Vinho','Descubra São Roque')}<img class="feature-image" src="${A}rota-hero.jpg" alt="Rota do Vinho"><div class="card"><h2>Parceiros da Cabana</h2><p>Aproveite benefícios exclusivos com nossos parceiros.</p></div><div class="partner-grid">
 ${partner('hockenheim.jpg','Choperia Hockenheim','Parceiro Cabana Rota do Vinho','hockenheimMaps','hockenheim')}
 ${partner('dreamcar.jpg','Dream Car Museum','Parceiro Cabana Rota do Vinho','dreamCarMaps','dream')}
 </div><h2 class="section-title">Explore São Roque</h2><div class="card"><div class="info-row"><button class="btn" data-ext="rotaMaps">🗺 Abrir Rota no mapa</button><button class="btn-outline" id="routeMapImage">Mapa do Roteiro do Vinho</button></div></div>${footer()}</div>`}
function delivery(){return `<div class="page">${top('Delivery na Cabana','Opções que costumam entregar até a propriedade')}<div class="notice"><strong>Mais comodidade para você!</strong><p>Selecionamos algumas opções que costumam entregar até a cabana.</p></div><div class="delivery-list">
 ${deliveryCard('born.jpg','Born In Smoke','Carnes e opções defumadas','bornWhatsapp')}
 ${deliveryCard('itacolomy.jpg','Restaurante Itacolomy','Pizzas e comidas','itacolomyWhatsapp')}
 ${deliveryCard('dipomodoro.jpg','Pizzaria Di Pomodoro','Pizzas','diPomodoroWhatsapp')}
 </div><div class="card"><h2>iFood</h2><p>Alguns hóspedes também conseguem fazer pedidos pelo iFood. Confira no aplicativo quais estabelecimentos estão entregando na região no momento.</p><button class="btn" data-ext="ifood">Abrir iFood</button></div><div class="notice"><strong>Importante</strong><p>O tempo de entrega pode variar conforme o trânsito e a disponibilidade dos estabelecimentos.</p></div>${footer()}</div>`}
function casaAzul(){return `<div class="page">${top('Casa Azul','Ateliê & Conveniência')}<img class="feature-image" src="${A}casa-hero.jpg" alt="Casa Azul"><div class="card"><h2>Aqui você compra lembranças da viagem e ainda consegue apreciar a linda vista da nossa varanda!</h2><p>Produtos selecionados para sua comodidade e momentos especiais.</p></div><h2 class="section-title">O que você encontra</h2><div class="home-grid">
 ${mini('❄️','Bebidas Geladas','Cervejas, vinhos, refrigerantes, águas e muito mais.')}${mini('🥨','Salgadinhos','Salgadinhos para sua comodidade.')}${mini('🔥','Lenha','Para fogueira e lareira.')}${mini('🎁','Artesanatos e Presentes','Peças artesanais e lembranças.')}
 </div><div class="card" style="margin-top:14px"><button class="btn" id="casaDirections">📍 Como chegar</button></div>${footer()}</div>`}
function checkout(){return `<div class="page">${top('Check out','Sua saída tranquila')}<div class="card"><h2>Esperamos que você tenha aproveitado sua estadia!</h2><p>Para que tudo fique perfeito até o final, siga as orientações abaixo.</p></div><div class="list">
 ${step('1','Horário de saída','Check out até 11h.')}${step('2','Louças e organização','Deixar as louças utilizadas lavadas e a cabana minimamente organizada.')}${step('3','Lixo','Separar o lixo e deixar na lixeira ao lado da caixa d’água.')}${step('4','Chaves e controles','Deixar as chaves e controles nos mesmos locais onde foram encontrados.')}${step('5','Antes de sair','Desligar TV, ar condicionado e demais equipamentos elétricos.')}${step('6','Portas e janelas','Verificar se estão fechadas antes de deixar a cabana.')}${step('7','Para sair da cabana','Há teclados ao lado esquerdo dos portões. Para abrir, use a mesma senha de entrada.','<button class="btn-outline" id="gatePhoto">Ver foto</button>')}${step('8','Portões','Certifique se de que os portões estejam fechados ao sair.')}
 </div><div class="notice"><strong>Obrigado pela estadia!</strong><p>Esperamos que tenha vivido momentos especiais na Cabana Rota do Vinho. Boa viagem e volte sempre!</p></div><div class="checkout-actions"><button class="btn" id="finishCheckout">✓ Finalizei meu check out</button>${footer()}</div></div>`}
function infoPage(title,sub,img,items,pendingKey,pendingMsg,notice=''){return `<div class="page">${top(title,sub)}<img class="feature-image" src="${A}${img}" alt="${title}"><div class="list">${items.map(([i,t,d])=>step(i,t,d)).join('')}</div>${notice?`<div class="notice"><strong>Importante</strong><p>${notice}</p></div>`:''}<button class="btn back-menu" data-video="${pendingKey}" data-msg="${pendingMsg}">▶ Ver como utilizar</button>${footer()}${globalFooter()}</div>`}
function step(i,t,d,extra=''){return `<div class="step"><div class="ico">${i}</div><div><h3>${t}</h3><p>${d}</p>${extra?`<div style="margin-top:10px">${extra}</div>`:''}</div></div>`}
function partner(img,t,d,mapKey,type){return `<div class="partner"><img src="${A}${img}" alt="${t}"><div class="body"><h3>${t}</h3><p>${d}</p><div class="actions">${type==='dream'?'<button class="btn-small" id="dreamBenefit">Benefício</button>':'<button class="btn-small" id="hockBenefit">Benefício</button>'}<button class="btn-small" data-ext="${mapKey}">Como chegar</button></div></div></div>`}
function deliveryCard(img,t,d,key){return `<div class="delivery-card"><img src="${A}${img}" alt="${t}"><div class="body"><h3>${t}</h3><p>${d}</p><button class="btn" data-ext="${key}">WhatsApp • Fazer pedido</button></div></div>`}
function mini(ic,t,d){return `<div class="home-card"><div style="font-size:38px;margin-bottom:8px">${ic}</div><strong>${t}</strong><span>${d}</span></div>`}
const pages={home,checkin,wifi,cafe,hidro,calefator,ar,tv,regras,rota,delivery,casaAzul,checkout};
function render(){const id=(location.hash||'#home').slice(1)||'home';app.innerHTML=(pages[id]||home)();window.scrollTo(0,0);bind()}
function bind(){document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));document.querySelectorAll('[data-ext]').forEach(b=>b.onclick=()=>ext(C.external[b.dataset.ext]));
 const cp=document.getElementById('copyWifi');if(cp)cp.onclick=()=>navigator.clipboard?.writeText(C.wifi.password).then(()=>toastMsg('Senha copiada')).catch(()=>toastMsg(C.wifi.password));
 const bp=document.getElementById('breakfastPhoto');if(bp)bp.onclick=()=>imgModal('assets/extras/casinha-vermelha.png','Casinha vermelha','Retire o café da manhã na casinha vermelha, no pé da escada.');
 document.querySelectorAll('[data-video]').forEach(b=>b.onclick=()=>{const u=C.pending[b.dataset.video];u?ext(u):toastMsg(b.dataset.msg)});
 const fr=document.getElementById('fullRules');if(fr)fr.onclick=()=>imgModal('assets/extras/regras-completas.png','Regras completas');
 const rm=document.getElementById('routeMapImage');if(rm)rm.onclick=()=>imgModal('assets/extras/mapa-roteiro.png','Mapa do Roteiro do Vinho');
 const db=document.getElementById('dreamBenefit');if(db)db.onclick=()=>openModal(`<img src="assets/extras/dream-car-beneficio.png" alt="Benefício Dream Car"><div class="modal-caption"><strong>Cupom: CABANAROTADOVINHO</strong><br><br><button class="btn modal-home" onclick="location.href='${C.external.dreamCarPurchase}'">Comprar no site da Dream Car</button></div>`);
 const hb=document.getElementById('hockBenefit');if(hb)hb.onclick=()=>C.pending.hockenheimBenefit?ext(C.pending.hockenheimBenefit):toastMsg('Benefício da Hockenheim será disponibilizado em breve.');
 const cd=document.getElementById('casaDirections');if(cd)cd.onclick=()=>openModal(`<img src="assets/extras/casa-azul-portao.png" alt="Vista da Casa Azul"><img src="assets/extras/casa-azul-fachada.png" alt="Fachada da Casa Azul" style="margin-top:10px"><div class="modal-caption"><strong>Como chegar:</strong> olhando do portão da cabana, esta é a Casa Azul. Para chegar, suba a rua à esquerda. A senha da porta é <strong>2381</strong>. Por favor, feche a porta ao sair.</div>`);
 const gp=document.getElementById('gatePhoto');if(gp)gp.onclick=()=>C.pending.checkoutGatePhoto?imgModal(C.pending.checkoutGatePhoto,'Foto do portão'):toastMsg('Foto do teclado/portão será adicionada em breve.');
 const fc=document.getElementById('finishCheckout');if(fc)fc.onclick=()=>openModal(`<img src="assets/extras/avaliacao-pos-checkout.png" alt="Avaliação"><button class="btn modal-home" id="homeAfterEval">Voltar para a tela inicial</button>`);setTimeout(()=>{const x=document.getElementById('homeAfterEval');if(x)x.onclick=()=>{closeModal();go('home')}},0)
}
document.addEventListener('click',e=>{if(e.target.matches('[data-close]'))closeModal()});window.addEventListener('hashchange',render);render();
