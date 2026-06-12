/**
 * Shitamachi Detective Agency (下町探偵団) - Main JS logic
 */

// CONFIGURATION: Replace with your live Next.js backend app URL in production (no trailing slash)
const LIVE_BACKEND_URL = 'https://simple-proxy-taupe.vercel.app';

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

/**
 * Contact Form validation and processing
 */
function initContactForm() {
    const contactForm = document.getElementById('contact');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form field data retrieval
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Contact form submitted:', data);

        // Simple validation checks
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-brand-red');
            } else {
                field.classList.remove('border-brand-red');
            }
        });

        if (!isValid) {
            alert('必須項目をすべて入力してください。');
            return;
        }

        // Set loading state on submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';

        // Determine backend endpoint URL
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const endpoint = isLocal
            ? 'http://localhost:3000/api/shitamachi'
            : `${LIVE_BACKEND_URL}/api/shitamachi`;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert('お問い合わせが送信されました。担当者よりご連絡いたします。');
                    contactForm.reset();
                } else {
                    alert('送信に失敗しました。時間をおいて再度お試しいただくか、お電話にて直接ご連絡ください。');
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                alert('通信エラーが発生しました。ネットワーク接続を確認し、再度お試しください。');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });
}
