const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Kelime havuzumuz
const words = [
  "mücadele", "başarı", "öğrenme", "gelişim", "düşünce", 
    "anlamak", "göstermek", "sahip", "karakter", "başkaları", 
    "yaşamak", "hakikat", "kabul", "güzellik", "insanlar", 
    "bilmek", "anlam", "sorun", "öğretmek", "hayat", 
    "dünya", "bilgi", "zaman", "yapmak", "sevgi", 
    "huzur", "beklemek", "gerçek", "güçlü", "büyümek", 
    "gelişmek", "anı", "mutluluk", "gelecek", "başlamak", 
    "sonunda", "başarı", "farklı", "umut", "görmek", 
    "bilmek", "olmak", "duygu", "insanlık", "hissetmek", 
    "görmek", "geliştirmek", "öğrenmek", "sürdürmek", "çalışmak", 
    "başarmak", "güzel", "gelecek", "olabilir", "olmamak", 
    "karar", "gerçekten", "gerek", "sorun", "kendisi", 
    "anlamak", "hakkında", "çalışmak", "deneyim", "beklemek", 
    "başlamak", "olabilir", "bilmek", "olacak", "olmalı",
    "kendini", "şey", "günlük", "mesele", "umutlu",
    "söz", "gerçekleşmek", "sonuç", "tutum", "başlangıç",
    "etkilemek", "ilgilenmek", "hedef", "toplum", "hayal",
    "yetenek", "güven", "ilerleme", "katkı", "bağımsız",
    "sürdürmek", "gelişmek", "oluşturmak", "katılım", "paylaşmak",
    "deneyim", "fayda", "görev", "yardım", "kültür",
    "ilgi", "sorumluluk", "değişim", "topluluk", "şans",
    "kazanç", "duyarlı", "hızlı", "incelemek", "eleştiri",
    "düzenli", "bağlam", "anımsatmak", "yetenek", "güvence",
    "süreç", "tarz", "geçmiş", "felsefe", "insanlık",
    "duruş", "vazgeçmek", "başkalarına", "farkındalık", "müşteri",
    "katkıda", "öncelik", "belirleme", "çalışkan", "kolaylık",
    "ilgilenmek", "gelişmek", "oluşturmak", "kararlı", "bağımsız",
    "öğrenme", "bağlılık", "fırsat", "tutum", "başarıya",
    "öğrenmek", "vizyon", "özgüven", "çözüm", "etkilemek",
    "başarmak", "gelişmek", "oluşturmak", "katılım", "güçlü",
    "paylaşmak", "deneyim", "görev", "yardım", "kültür",
    "ilgi", "sorumluluk", "değişim", "topluluk", "şans",
    "kazanç", "duyarlı", "hızlı", "incelemek", "eleştiri",
    "düzenli", "bağlam", "anımsatmak", "yetenek", "güvence",
    "süreç", "tarz", "geçmiş", "felsefe", "insanlık",
    "duruş", "vazgeçmek", "başkalarına", "farkındalık", "müşteri",
    "katkıda", "öncelik", "belirleme", "çalışkan", "kolaylık",
]

// Random kelime
let randomWord;

// Skor
let score = 0;

// Zaman
let time = 10;

// Zorluk derecesi
let difficulty =  localStorage.getItem("difficulty") !== null ? localStorage.getItem('difficulty') : 'medium'
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem('difficulty') : 'medium'

text.focus();

// Zaman sayac başlat
const timeInterval = setInterval(updateTime, 1000);

// Zamanı güncelle
function updateTime(){
  time--;
  timeEl.innerHTML = `${time}s`
  if(time === 0){
    clearInterval(time);

    gameOver()
  }
}

// Oyun sonu
function gameOver(){
  endgameEl.innerHTML = `
    <h1>Süre Bitti</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

// Random kelime seç
function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)];
}

// DOM'a kelime ekle
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Skor güncelle
function updateScore(){
  score++;
  scoreEl.innerHTML = score
}

addWordToDOM();

// Yazma işlevi
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';
    if(difficulty === "hard"){
      time+=2;
    }else if(difficulty === "medium"){
      time+=3;
    }else if(difficulty === "easy"){
      time+=5;
    }
    updateTime();
  }
});

// Üst Barı gizleme
settingsBtn.addEventListener("click", ()=>{
  settings.classList.toggle("hide");
})

// Seçilen zorluk ayarı
settingsForm.addEventListener("change", (e)=>{
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty)
})