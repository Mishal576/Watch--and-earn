let points = Number(localStorage.getItem('points') || 0);
const pointsEl = document.getElementById('points');
const message = document.getElementById('message');

function render(){ pointsEl.textContent = points.toLocaleString(); localStorage.setItem('points', points); }
document.querySelectorAll('.task').forEach(btn=>{
  btn.addEventListener('click',()=>{
    points += Number(btn.dataset.points);
    render();
    message.textContent = 'Demo task completed. Points added.';
  });
});
document.getElementById('daily').addEventListener('click',()=>{
  const today = new Date().toISOString().slice(0,10);
  if(localStorage.getItem('daily')===today){ message.textContent='Daily bonus already claimed today.'; return; }
  points += 5; localStorage.setItem('daily',today); render();
  message.textContent='Daily bonus claimed!';
});
document.getElementById('withdraw').addEventListener('click',()=>{
  const account = document.getElementById('account').value.trim();
  if(points < 1000){ message.textContent='You need at least 1,000 points before withdrawal.'; return; }
  if(!account){ message.textContent='Enter your wallet/account number.'; return; }
  message.textContent='Demo only: withdrawal request recorded locally. Real payouts need a backend and payment integration.';
});
document.getElementById('loginBtn').addEventListener('click',()=>alert('Next step: connect a real signup/login system.'));
render();
