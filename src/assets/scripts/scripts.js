// Menambahkan effect blur dan background putih pada header ketika di scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    const logo = document.querySelector('.logo');
    logo.classList.toggle('scrolled', window.scrollY > 50);
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const items = document.querySelectorAll('.package-item');
    const indicators = document.querySelectorAll('.slider-indicator button');
    const intervalTime = 3000; // Set waktu antar slide (3000ms = 3 detik)

    function showSlide(index) {
        // Reset semua item dan indikator
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Tampilkan item dan indikator sesuai index
        items[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // Fungsi untuk auto-slide
    function autoSlide() {
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    // Jalankan auto-slide setiap 3 detik
    let autoSlideInterval = setInterval(autoSlide, intervalTime);

    // Berhenti saat mouse ada di slider dan lanjutkan saat mouse keluar
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(autoSlide, intervalTime);
    });

    // Inisialisasi slide pertama
    showSlide(currentIndex);

    const grid = document.querySelector('.activities-grid');
    const gridItems = document.querySelectorAll('.activity-wrapper');

    // Hitung lebar dari satu item dan jarak antar item
    const itemWidth = gridItems[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(grid).gap);

    // Scroll posisi ke item ke-3
    const scrollToCenter = () => {
        const targetIndex = 2; // Item ke-3 (index mulai dari 0)
        
        // Hitung jarak yang harus di-scroll ke tengah
        const scrollPosition = (itemWidth + gap) * targetIndex - (window.innerWidth / 2) + (itemWidth / 2);

        // Scroll elemen grid ke posisi item ke-3
        grid.scrollLeft = scrollPosition;
    };

    scrollToCenter();

    // Batasi scroll ke kiri
    grid.addEventListener('scroll', () => {
        if (grid.scrollLeft < 0) {
            grid.scrollLeft = 0;
        }
    });

    // Tambahkan event listener untuk merespons resize
    window.addEventListener('resize', scrollToCenter);
});

// Intersection Observer untuk mendeteksi ketika elemen masuk ke dalam viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Elemen keluar dari viewport
            entry.target.classList.remove('visible');
        }
    });
});

// Pilih semua elemen yang memiliki kelas 'scroll-animate'
document.querySelectorAll('.scroll-animate-ease').forEach(el => {
    observer.observe(el);
});

// Toggle hamburger menu
// Toggle hamburger menu
const hamburger = document.getElementById('hamburger-menu');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a'); // Select all nav links
const body = document.querySelector('body');

// Function to toggle navigation
function toggleNavigation() {
    navigation.classList.toggle('active');
}

// Close navigation when clicking outside
function closeNavigation() {
    if (navigation.classList.contains('active')) {
        navigation.classList.remove('active');
    }
}

// Toggle navigation when hamburger is clicked
hamburger.addEventListener('click', toggleNavigation);

// Close navigation when any nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', closeNavigation);
});

// Close navigation when clicking outside the navigation area
body.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && !hamburger.contains(e.target)) {
        closeNavigation();
    }
});