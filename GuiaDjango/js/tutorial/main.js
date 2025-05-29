/**
 * Script principal para la Guía Interactiva de Django 5
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Seguimiento de progreso
    initProgressTracker();

    // Transiciones suaves para navegación interna
    initSmoothScrolling();

    // Animaciones al hacer scroll
    initScrollAnimations();

    // Inicializar el cambio de tema claro/oscuro si existe el botón
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        initThemeToggle(themeToggleBtn);
    }

    // Inicializar editor de código interactivo si existe
    const codeEditors = document.querySelectorAll('.interactive-code-editor');
    if (codeEditors.length > 0) {
        initCodeEditors(codeEditors);
    }

    // Inicializar quizzes interactivos si existen
    const quizContainers = document.querySelectorAll('.quiz-container');
    if (quizContainers.length > 0) {
        initQuizzes(quizContainers);
    }
});

/**
 * Inicializa el rastreador de progreso
 */
function initProgressTracker() {
    const moduleCards = document.querySelectorAll('.module-card');
    const body = document.querySelector('body');
    
    // Verificar si ya existe un rastreador de progreso en localStorage
    let progress = JSON.parse(localStorage.getItem('djangoTutorialProgress')) || {};
    
    // Actualizar las tarjetas de módulos si hay progreso guardado
    moduleCards.forEach(card => {
        const moduleId = card.getAttribute('data-module');
        if (progress[moduleId] && progress[moduleId].completed) {
            card.classList.add('completed');
            const btn = card.querySelector('.btn');
            if (btn) {
                btn.innerHTML = 'Continuar <i class="fas fa-check-circle"></i>';
            }
        }
    });
    
    // Crear el rastreador de progreso flotante
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker';
    
    // Calcular porcentaje de progreso
    const totalModules = moduleCards.length;
    const completedModules = Object.values(progress).filter(m => m.completed).length;
    const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    
    progressTracker.innerHTML = `<span class="progress-percent">${progressPercent}%</span>`;
    body.appendChild(progressTracker);
    
    // Mostrar detalles de progreso al hacer clic
    progressTracker.addEventListener('click', showProgressDetails);
}

/**
 * Muestra los detalles del progreso del usuario
 */
function showProgressDetails() {
    // Crear modal para mostrar detalles
    const modalHTML = `
        <div class="modal fade" id="progressModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tu Progreso</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="progress-details">
                            <!-- Se llenará dinámicamente -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="resetProgress">Reiniciar Progreso</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Añadir modal al DOM si no existe
    if (!document.getElementById('progressModal')) {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        // Inicializar el modal de Bootstrap
        const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
        
        // Añadir evento para reiniciar progreso
        document.getElementById('resetProgress').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas reiniciar todo tu progreso?')) {
                localStorage.removeItem('djangoTutorialProgress');
                window.location.reload();
            }
        });
    }
    
    // Obtener datos de progreso actuales
    const progress = JSON.parse(localStorage.getItem('djangoTutorialProgress')) || {};
    const progressDetailsContainer = document.querySelector('.progress-details');
    progressDetailsContainer.innerHTML = '';
    
    // Generar la lista de módulos y su estado
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        const moduleId = card.getAttribute('data-module');
        const moduleTitle = card.querySelector('.card-title').textContent;
        const moduleStatus = progress[moduleId] && progress[moduleId].completed ? 
            '<span class="text-success"><i class="fas fa-check-circle"></i> Completado</span>' : 
            '<span class="text-secondary"><i class="fas fa-circle"></i> Pendiente</span>';
        
        const moduleLastVisit = progress[moduleId] && progress[moduleId].lastVisit ? 
            `<small class="text-muted d-block">Última visita: ${new Date(progress[moduleId].lastVisit).toLocaleString()}</small>` : '';
        
        progressDetailsContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <strong>Módulo ${moduleId}: ${moduleTitle}</strong>
                    ${moduleLastVisit}
                </div>
                <div>${moduleStatus}</div>
            </div>
        `;
    });
    
    // Mostrar el modal
    const progressModal = bootstrap.Modal.getInstance(document.getElementById('progressModal'));
    if (!progressModal) {
        const newModal = new bootstrap.Modal(document.getElementById('progressModal'));
        newModal.show();
    } else {
        progressModal.show();
    }
}

/**
 * Inicializa el desplazamiento suave para navegación interna
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para la navbar fija
                    behavior: 'smooth'
                });
                
                // Actualiza la URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Inicializa animaciones al hacer scroll
 */
function initScrollAnimations() {
    // Detecta elementos cuando entran en el viewport
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inicializa el cambio de tema claro/oscuro
 */
function initThemeToggle(toggleBtn) {
    // Verificar preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Manejar cambio de tema
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

/**
 * Inicializa editores de código interactivos
 */
function initCodeEditors(editorElements) {
    editorElements.forEach(editor => {
        // Añadir funcionalidad de ejecución si es necesario
        const runButton = editor.querySelector('.run-code-btn');
        if (runButton) {
            runButton.addEventListener('click', function() {
                const codeBlock = editor.querySelector('textarea').value;
                // Aquí simularía la ejecución del código
                // En un caso real, se enviaría a un backend para ejecución
                const outputArea = editor.querySelector('.output-area');
                
                // Simulación de salida de código (para propósitos demostrativos)
                outputArea.innerHTML = '<div class="alert alert-info">Simulando ejecución de código...</div>';
                setTimeout(() => {
                    // Aquí se procesaría la respuesta real del backend
                    if (codeBlock.includes('print') || codeBlock.includes('django')) {
                        outputArea.innerHTML = '<pre class="bg-dark text-light p-3">Output: Hello, Django!</pre>';
                    } else {
                        outputArea.innerHTML = '<div class="alert alert-danger">Error: No se detectó código Django válido</div>';
                    }
                }, 1000);
            });
        }
        
        // Añadir funcionalidad de reseteo del código
        const resetButton = editor.querySelector('.reset-code-btn');
        if (resetButton) {
            const originalCode = editor.querySelector('textarea').value;
            resetButton.addEventListener('click', function() {
                editor.querySelector('textarea').value = originalCode;
                editor.querySelector('.output-area').innerHTML = '';
            });
        }
    });
}

/**
 * Inicializa cuestionarios interactivos
 */
function initQuizzes(quizContainers) {
    quizContainers.forEach(container => {
        const quizId = container.getAttribute('data-quiz-id');
        const submitButton = container.querySelector('.submit-quiz');
        
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                const questions = container.querySelectorAll('.quiz-question');
                let score = 0;
                let totalQuestions = questions.length;
                
                questions.forEach(question => {
                    const selectedOption = question.querySelector('input[type="radio"]:checked');
                    if (selectedOption) {
                        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
                        const resultFeedback = question.querySelector('.question-feedback');
                        
                        if (isCorrect) {
                            score++;
                            resultFeedback.innerHTML = '<div class="alert alert-success mt-2">¡Correcto!</div>';
                        } else {
                            resultFeedback.innerHTML = '<div class="alert alert-danger mt-2">Incorrecto. Inténtalo de nuevo.</div>';
                        }
                    }
                });
                
                // Mostrar resultado final
                const resultContainer = container.querySelector('.quiz-result');
                if (resultContainer) {
                    const percentage = Math.round((score / totalQuestions) * 100);
                    resultContainer.innerHTML = `
                        <div class="alert ${percentage >= 70 ? 'alert-success' : 'alert-warning'} mt-3">
                            <h5>Resultado: ${score}/${totalQuestions} (${percentage}%)</h5>
                            <p>${percentage >= 70 ? '¡Buen trabajo!' : 'Sigue practicando para mejorar.'}</p>
                        </div>
                    `;
                    
                    // Guardar progreso si el resultado es bueno
                    if (percentage >= 70) {
                        const progress = JSON.parse(localStorage.getItem('djangoTutorialProgress')) || {};
                        // Extraer el número de módulo de data-quiz-id (formato: "quiz-modulo-X")
                        const moduleNumber = quizId.split('-').pop();
                        
                        if (!progress[moduleNumber]) {
                            progress[moduleNumber] = {};
                        }
                        
                        progress[moduleNumber].completed = true;
                        progress[moduleNumber].lastVisit = new Date().toISOString();
                        progress[moduleNumber].quizScore = percentage;
                        
                        localStorage.setItem('djangoTutorialProgress', JSON.stringify(progress));
                    }
                }
            });
        }
    });
}