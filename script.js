document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI TELEGRAM ---
    const BOT_TOKEN = "8444269904:AAH8MFx6gc1exc4Vkk4jicmjO5Dl07Sksr4"; 
    const CHAT_ID = "1195997972"; 
    
    // --- TARGET DATE: 15 FEBRUARI 2026 ---
    const TARGET_DATE = new Date('February 15, 2026 08:00:00').getTime();

    // 1. PARTICLES (Floating Embers)
    function createParticles() {
        const particleContainer = document.getElementById('particles');
        const particleCount = 60; // Jumlah partikel

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firefly');
            
            // Random Posisi
            const x = Math.random() * 100;
            const delay = Math.random() * 5; 
            const duration = 5 + Math.random() * 5; 

            particle.style.left = `${x}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particleContainer.appendChild(particle);
        }
    }
    createParticles();

    // 2. ANIMASI BUKA PINTU
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');
    const musicIcon = document.getElementById('music-control');

    openBtn.addEventListener('click', () => {
        overlay.classList.add('door-open');
        musicIcon.classList.add('spin'); // Putar icon musik
        
        setTimeout(() => {
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                overlay.style.display = 'none'; 
            }, 100);
        }, 1200);
    });

    // 3. COUNTDOWN TIMER
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = TARGET_DATE - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown-box').innerHTML = "<p style='color:var(--gold);'>ACARA TELAH DIMULAI</p>";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById('days');
        if (elDays) {
            elDays.innerText = d;
            document.getElementById('hours').innerText = h;
            document.getElementById('minutes').innerText = m;
            document.getElementById('seconds').innerText = s;
        }
    }, 1000);

    // 4. KIRIM KE TELEGRAM
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnKirim = document.getElementById('btn-kirim');
            const originalText = btnKirim.innerText;
            btnKirim.innerText = "MENGIRIM...";
            btnKirim.disabled = true;

            const nama = document.getElementById('nama').value;
            const ucapan = document.getElementById('ucapan').value;
            const status = document.getElementById('status').value;

            const textMessage = `👹 *INFINITY CASTLE RSVP*\n\n👤: ${nama}\nChecking in: ${status}\n📜: "${ucapan}"`;

            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(textMessage)}&parse_mode=Markdown`)
                .then(res => {
                    if(res.ok) { alert("Konfirmasi kehadiran terkirim!"); rsvpForm.reset(); }
                    else { alert("Gagal mengirim."); }
                })
                .finally(() => {
                    btnKirim.innerText = originalText;
                    btnKirim.disabled = false;
                });
        });
    }

    // Toggle Musik (Animasi Icon Saja)
    if (musicIcon) musicIcon.addEventListener('click', () => musicIcon.classList.toggle('spin'));
});