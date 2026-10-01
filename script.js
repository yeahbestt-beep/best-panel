const modal=document.getElementById('modal');
const title=document.getElementById('modal-title'), sub=document.getElementById('modal-sub');
const submit=document.getElementById('auth-submit'), sw=document.getElementById('switch'), form=document.getElementById('auth-form');
let mode='login';

function openModal(m){
  mode=m; modal.classList.add('open');
  title.textContent=m==='login'?"Best Panel'e hoş geldin":"Best Panel hesabını oluştur";
  sub.textContent=m==='login'?'Hesabına giriş yap.':'Dakikalar içinde hesabını oluştur.';
  submit.textContent=m==='login'?'Giriş Yap':'Kayıt Ol';
  sw.innerHTML=m==='login'?'Hesabın yok mu? <b>Kayıt ol</b>':'Zaten hesabın var mı? <b>Giriş yap</b>';
}
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));
document.querySelector('.close').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
sw.addEventListener('click',()=>openModal(mode==='login'?'register':'login'));

async function api(path, options={}){
  const res=await fetch('/.netlify/functions/'+path,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error||'İşlem başarısız');
  return data;
}
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const inputs=form.querySelectorAll('input');
  const email=inputs[0].value.trim(), password=inputs[1].value;
  try{
    if(mode==='register') await api('auth',{method:'POST',body:JSON.stringify({action:'register',email,password})});
    else await api('auth',{method:'POST',body:JSON.stringify({action:'login',email,password})});
    modal.classList.remove('open');
    await refreshDashboard();
    alert(mode==='login'?'Giriş başarılı.':'Hesabın oluşturuldu ve giriş yapıldı.');
  }catch(err){alert(err.message)}
});

async function refreshDashboard(){
  try{
    const data=await api('auth?action=me');
    if(!data.user) return;
    const welcome=document.querySelector('.dash-top h3');
    if(welcome) welcome.textContent='Hoş geldin, '+data.user.email.split('@')[0]+' 👋';
    const cards=document.querySelectorAll('.dash-stats strong');
    if(cards.length>=3){
      cards[0].textContent=data.subscriptions.length;
      const active=data.subscriptions.find(s=>s.active);
      cards[1].textContent=active?Math.max(0,Math.ceil((new Date(active.expiresAt)-Date.now())/86400000))+' gün':'—';
      cards[2].textContent='Aktif';
    }
    if(data.subscriptions[0]){
      const s=data.subscriptions[0];
      const h=document.querySelector('.subscription h4');
      if(h) h.textContent=s.plan+' Plan';
      const status=document.querySelector('.status');
      if(status) status.textContent=s.active?'AKTİF':'PASİF';
    }
  }catch(e){}
}
refreshDashboard();
