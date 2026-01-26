  // Alert function for button clicks
        function showAlert() {
            alert(' Thank you for your interest in SonicWave headphones!\n\n' +
                'Our team will contact you shortly with more details.\n' +
                'Get ready to experience audio perfection! ');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });