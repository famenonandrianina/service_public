document.addEventListener('DOMContentLoaded', () => {
    const roleBtns = document.querySelectorAll('.role-btn');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const regLink = document.getElementById('reg-link');
    const loginForm = document.getElementById('login-form');

    let currentRole = 'citoyen';

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Content
            currentRole = btn.getAttribute('data-role');
            
            if (currentRole === 'admin') {
                formTitle.innerText = 'Connexion Admin';
                submitBtn.innerText = 'Accès Admin';
                submitBtn.style.background = '#14532d'; // Dark Green for Admin
                regLink.style.display = 'none'; // Admins don't register publicly
            } else {
                formTitle.innerText = 'Connexion Citoyen';
                submitBtn.innerText = 'Se Connecter';
                submitBtn.style.background = '#22c55e'; // Vibrant Green for Citizen
                regLink.style.display = 'block';
            }

            // Animation effect
            const form = document.querySelector('.glass-form');
            form.style.animation = 'none';
            void form.offsetWidth;
            form.style.animation = 'shake 0.4s ease';
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Mock feedback
        submitBtn.innerText = 'Vérification...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Connecté en tant que ${currentRole.toUpperCase()}\nRedirection en cours...`);
            
            // Redirect simulation
            if (currentRole === 'admin') {
                window.location.href = 'admin_dashboard.html';
            } else {
                window.location.href = '/services';
            }
        }, 1500);
    });

    // Add shake animation to CSS dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
