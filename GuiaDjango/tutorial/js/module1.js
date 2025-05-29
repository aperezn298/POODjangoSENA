// Código específico para el módulo 1
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los editores de código
    initModuleCodeEditors();
    
    // Inicializar el seguimiento de progreso
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    
    // Comprobar si el quiz ya fue completado
    checkQuizCompletion();
});

function updateProgress() {
    const sections = ['introduccion', 'instalacion', 'estructura', 'mvc-mvt', 'ejercicio', 'quiz'];
    let visibleSections = 0;
    const windowHeight = window.innerHeight;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            // Consideramos una sección como "vista" si está o ha estado visible en la ventana
            if (rect.top < windowHeight && rect.top > -rect.height) {
                visibleSections++;
            }
        }
    });

    // Calcular el porcentaje de progreso
    const progress = Math.min((visibleSections / sections.length) * 100, 100);
    const progressBar = document.querySelector('.module-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    // Habilitar el botón de siguiente módulo si el progreso es suficiente
    if (progress >= 70) {
        const nextButtons = document.querySelectorAll('#next-module-btn, #next-module-btn-bottom');
        nextButtons.forEach(button => button.classList.remove('disabled'));
    }
}

function checkQuizCompletion() {
    // Obtener el estado del quiz desde localStorage
    const progress = JSON.parse(localStorage.getItem('djangoTutorialProgress')) || {};
    if (progress['modulo1'] && progress['modulo1'].completed) {
        // Si el quiz está completado, habilitar el botón de siguiente módulo
        const nextButtons = document.querySelectorAll('#next-module-btn, #next-module-btn-bottom');
        nextButtons.forEach(button => button.classList.remove('disabled'));
        document.querySelector('.module-progress').style.width = '100%';
    }
}

function initModuleCodeEditors() {
    const interactiveExercise = document.querySelector('.interactive-exercise');
    if (interactiveExercise) {
        const textareas = interactiveExercise.querySelectorAll('textarea');
        const verifyBtn = interactiveExercise.querySelector('.run-code-btn');
        const resetBtn = interactiveExercise.querySelector('.reset-code-btn');
        const outputArea = interactiveExercise.querySelector('.output-area');

        const correctAnswers = [
            'python -m venv django_env',
            'django_env\\Scripts\\activate',
            'pip install django'
        ];

        if (verifyBtn) {
            verifyBtn.addEventListener('click', function() {
                let correctCount = 0;
                
                textareas.forEach((textarea, index) => {
                    if (textarea.value.trim() === correctAnswers[index]) {
                        correctCount++;
                        textarea.classList.add('is-valid');
                        textarea.classList.remove('is-invalid');
                    } else {
                        textarea.classList.add('is-invalid');
                        textarea.classList.remove('is-valid');
                    }
                });

                if (correctCount === correctAnswers.length) {
                    outputArea.innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle me-2"></i>¡Correcto! Has configurado correctamente el entorno Django.</div>';
                } else {
                    outputArea.innerHTML = '<div class="alert alert-danger"><i class="fas fa-times-circle me-2"></i>Hay algunos errores. Revisa tus respuestas e intenta de nuevo.</div>';
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                textareas.forEach(textarea => {
                    textarea.value = '';
                    textarea.classList.remove('is-valid', 'is-invalid');
                });
                outputArea.innerHTML = '';
            });
        }
    }
}
