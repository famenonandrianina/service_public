document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Loader Handling
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.querySelector('i').classList.toggle('fa-bars');
        mobileMenu.querySelector('i').classList.toggle('fa-xmark');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll Navbar effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.top = '10px';
            nav.style.padding = '10px 30px';
        } else {
            nav.style.top = '20px';
            nav.style.padding = '15px 40px';
        }
    });
});

// For Contact Form
function validateContactForm() {
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return false;
    }

    // Success simulation
    showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');
    return true;
}

function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast glass ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translate(-50%, 20px)';
        toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Register Form Validation
function validateRegisterForm(e) {
    e.preventDefault();
    const pwd = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (pwd !== confirm) {
        showNotification('Les mots de passe ne correspondent pas', 'error');
        return;
    }

    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
    btn.disabled = true;

    setTimeout(() => {
        showNotification('Félicitations ! Votre compte a été créé.', 'success');
        btn.innerHTML = originalText;
        btn.disabled = false;
        // Redirect or reset
    }, 2000);
}
