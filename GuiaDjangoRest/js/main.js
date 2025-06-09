/**
 * Guía Interactiva: API con Django y MySQL
 * Main JavaScript functionality
 */

// Variables globales
const totalSteps = 8;
let currentStep = 0;
const stepTitles = [
    "Conceptos Fundamentales",
    "Configuración Inicial", 
    "Configuración de MySQL", 
    "Creación de Modelos", 
    "Serializers y Views", 
    "Autenticación y Permisos",
    "Pruebas con Postman",
    "Pruebas Automatizadas",
    "Despliegue"
];
const stepDurations = [5, 15, 10, 20, 20, 15, 15, 20, 15]; // Tiempo en minutos

// Funciones principales
function initializeGuide() {
    if (window.hljs) {
        hljs.highlightAll();
    }
    setupCodeCopyButtons();
    setupStepIndicators();
    setupTooltips();
    loadUserProgress();
}

function saveUserProgress() {
    const userProgress = {
        currentStep: currentStep,
        timestamp: new Date().getTime()
    };
    localStorage.setItem('apiGuideProgress', JSON.stringify(userProgress));
}

function loadUserProgress() {
    try {
        const savedProgress = localStorage.getItem('apiGuideProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            const currentTime = new Date().getTime();
            const savedTime = progress.timestamp;
            const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
            
            if (currentTime - savedTime < sevenDaysInMs) {
                const lastStep = progress.currentStep;
                if (lastStep > 0) {
                    const modalHTML = `
                    <div class="modal fade" id="continueModal" tabindex="-1" aria-labelledby="continueModalLabel">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="continueModalLabel">Continuar con la guía</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Parece que ya habías comenzado esta guía. ¿Quieres continuar donde lo dejaste?</p>
                                    <p class="text-muted small">Último paso: ${lastStep === 0 ? 'Conceptos Fundamentales' : 'Paso ' + lastStep + ': ' + stepTitles[lastStep]}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Comenzar desde el principio</button>
                                    <button type="button" id="continueSavedProgress" class="btn btn-primary">Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    
                    document.body.insertAdjacentHTML('beforeend', modalHTML);
                    
                    document.getElementById('continueSavedProgress').addEventListener('click', function() {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('continueModal'));
                        modal.hide();
                        startGuide();
                        loadStep(lastStep);
                    });
                    
                    const modal = new bootstrap.Modal(document.getElementById('continueModal'), {
                        focus: true
                    });
                    modal.show();
                    
                    document.getElementById('continueModal').addEventListener('shown.bs.modal', function() {
                        document.getElementById('continueSavedProgress').focus();
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error al cargar progreso guardado:', error);
    }
}

function setupCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copiar';
        
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent)
                .then(() => {
                    button.textContent = '¡Copiado!';
                    setTimeout(() => {
                        button.textContent = 'Copiar';
                    }, 2000);
                })
                .catch(err => {
                    console.error('No se pudo copiar el texto: ', err);
                });
        });
    });
}

function startGuide() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const recursosSection = document.getElementById('recursos');
    const pasosSection = document.getElementById('pasos');
    const progressSection = document.getElementById('progressSection');
    
    if (introduccionSection) introduccionSection.classList.add('d-none');
    if (comoUsarSection) comoUsarSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.add('d-none');
    if (pasosSection) pasosSection.classList.remove('d-none');
    if (progressSection) progressSection.classList.remove('d-none');
    
    loadStep(0);
}

function showResources() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const pasosSection = document.getElementById('pasos');
    const recursosSection = document.getElementById('recursos');
    const progressSection = document.getElementById('progressSection');
    
    if (introduccionSection) introduccionSection.classList.add('d-none');
    if (comoUsarSection) comoUsarSection.classList.add('d-none');
    if (pasosSection) pasosSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.remove('d-none');
    if (progressSection) progressSection.classList.add('d-none');
}

// --- FUNCIONES PRINCIPALES ---
function initializeGuide() {
    if (window.hljs) hljs.highlightAll();
    setupCodeCopyButtons();
    setupStepIndicators();
    setupTooltips();
    loadUserProgress();
}

function saveUserProgress() {
    const userProgress = { currentStep, timestamp: new Date().getTime() };
    localStorage.setItem('apiGuideProgress', JSON.stringify(userProgress));
}

function loadUserProgress() {
    try {
        const savedProgress = localStorage.getItem('apiGuideProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            const currentTime = new Date().getTime();
            const savedTime = progress.timestamp;
            const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
            if (currentTime - savedTime < sevenDaysInMs) {
                const lastStep = progress.currentStep;
                if (lastStep > 0) {
                    const modalHTML = `
                    <div class="modal fade" id="continueModal" tabindex="-1" aria-labelledby="continueModalLabel">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="continueModalLabel">Continuar con la guía</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Parece que ya habías comenzado esta guía. ¿Quieres continuar donde lo dejaste?</p>
                            <p class="text-muted small">Último paso: ${lastStep === 0 ? 'Conceptos Fundamentales' : `Paso ${lastStep}: ${stepTitles[lastStep]}`}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Comenzar desde el principio</button>
                            <button type="button" id="continueSavedProgress" class="btn btn-primary">Continuar</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    `;
                    document.body.insertAdjacentHTML('beforeend', modalHTML);
                    document.getElementById('continueSavedProgress').addEventListener('click', function() {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('continueModal'));
                        modal.hide();
                        startGuide();
                        loadStep(lastStep);
                    });
                    const modal = new bootstrap.Modal(document.getElementById('continueModal'), { focus: true });
                    modal.show();
                    document.getElementById('continueModal').addEventListener('shown.bs.modal', function() {
                        document.getElementById('continueSavedProgress').focus();
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error al cargar progreso guardado:', error);
    }
}

function setupCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copiar';
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent)
                .then(() => {
                    button.textContent = '¡Copiado!';
                    setTimeout(() => { button.textContent = 'Copiar'; }, 2000);
                })
                .catch(err => { console.error('No se pudo copiar el texto: ', err); });
        });
    });
}

function startGuide() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const recursosSection = document.getElementById('recursos');
    const pasosSection = document.getElementById('pasos');
    const progressSection = document.getElementById('progressSection');
    if (introduccionSection) introduccionSection.classList.add('d-none');
    if (comoUsarSection) comoUsarSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.add('d-none');
    if (pasosSection) pasosSection.classList.remove('d-none');
    if (progressSection) progressSection.classList.remove('d-none');
    loadStep(0);
}

function showResources() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const pasosSection = document.getElementById('pasos');
    const recursosSection = document.getElementById('recursos');
    const progressSection = document.getElementById('progressSection');
    if (introduccionSection) introduccionSection.classList.add('d-none');
    if (comoUsarSection) comoUsarSection.classList.add('d-none');
    if (pasosSection) pasosSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.remove('d-none');
    if (progressSection) progressSection.classList.add('d-none');
}

function loadStep(stepNumber) {
    currentStep = stepNumber;
    const stepTitle = document.getElementById('stepTitle');
    const stepContent = document.getElementById('stepContent');
    const progressBar = document.getElementById('progressBar');
    const currentStepLabel = document.getElementById('currentStep');
    const estimatedTimeLabel = document.getElementById('estimatedTime');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    // Actualizar título
    if (stepTitle) {
            if (stepNumber === 0) {
                stepTitle.textContent = `${stepTitles[stepNumber]}`;
            } else {
                stepTitle.textContent = `Paso ${stepNumber}: ${stepTitles[stepNumber]}`;
            }
        }
    
    // Actualizar progreso
    if (progressBar) {
        // Calculamos el progreso considerando todos los pasos (0-6)
        const totalPasos = totalSteps + 1; // 7 pasos en total (0-6)
        
        // Calculamos el porcentaje de progreso por paso
        const porcentajePorPaso = 100 / totalPasos;
        
        // El progreso base corresponde a los pasos completados
        const pasosCompletados = stepNumber > 0 ? stepNumber - 1 : 0;
        const progresoBase = pasosCompletados * porcentajePorPaso;
        
        // Añadimos un progreso inicial al comenzar un paso (25% del porcentaje de este paso)
        const progresoInicial = stepNumber > 0 ? porcentajePorPaso * 0.25 : 0;
        
        const progress = Math.round(progresoBase + progresoInicial);
        
        // Aplicamos una transición suave con curva de animación mejorada
        progressBar.style.transition = "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        
        // En el paso 0 aseguramos un mínimo de progreso visible
        const visualProgress = stepNumber === 0 ? Math.max(progress, 3) : progress;
        progressBar.style.width = `${visualProgress}%`;
        
        // Actualizar el color de la barra de progreso según el avance
        updateProgressBarColor(visualProgress);
        
        // Si no estamos en el paso inicial ni final, simulamos un avance gradual
        if (stepNumber > 0 && stepNumber < totalSteps) {
            // Calculamos cuánto podemos avanzar en este paso (hasta casi el siguiente paso completo)
            const maxProgressForStep = progresoBase + porcentajePorPaso * 0.9;
            
            // Configuramos un intervalo que incrementa gradualmente el progreso
            // Este efecto visual muestra al usuario que está avanzando al permanecer en el paso
            const progressInterval = setInterval(() => {
                // Detenemos el intervalo si ya no estamos en este paso
                if (currentStep !== stepNumber) {
                    clearInterval(progressInterval);
                    return;
                }
                
                // Obtenemos el ancho actual
                const currentWidth = parseFloat(progressBar.style.width);
                
                // Si ya alcanzamos el máximo para este paso, detenemos
                if (currentWidth >= maxProgressForStep) {
                    clearInterval(progressInterval);
                    return;
                }
                
                // Incrementamos el progreso un poco
                const newProgress = Math.min(currentWidth + 0.2, maxProgressForStep);
                progressBar.style.width = `${newProgress}%`;
            }, 3000); // Intervalo de 3 segundos para un incremento muy gradual
        }
    }
          // Actualizar los indicadores de pasos
    updateStepIndicators(stepNumber);
    
    if (currentStepLabel) {
        currentStepLabel.textContent = stepNumber === 0 ? 
            `Conceptos Fundamentales` : 
            `Paso ${stepNumber}/${totalSteps}`;
    }
    
    // Actualizar tiempo estimado
    if (estimatedTimeLabel) {
        // Incluimos el tiempo del paso actual más los pasos restantes
        let remainingTime = 0;
        for (let i = stepNumber; i <= totalSteps; i++) {
            remainingTime += stepDurations[i];
        }
        
        // Mostrar texto personalizado según el paso
        let tiempoTexto;
        if (stepNumber === 0) {
            tiempoTexto = `Tiempo total: ${remainingTime} min`;
        } else {
            const tiempoActual = stepDurations[stepNumber];
            const tiempoRestante = remainingTime - tiempoActual;
            tiempoTexto = `Paso actual: ${tiempoActual} min • Restante: ${tiempoRestante} min`;
        }
        estimatedTimeLabel.textContent = tiempoTexto;
    }
    
    // Habilitar/deshabilitar botones
    if (prevButton && nextButton) {
                    prevButton.disabled = stepNumber === 0;
        
        // Cambiar texto a "Finalizar" si es el último paso
        if (stepNumber === totalSteps) {
            nextButton.innerHTML = 'Finalizar<i class="fas fa-check-circle ms-1"></i>';
            nextButton.classList.replace('btn-primary', 'btn-success');
            // Habilitar el botón Finalizar en el último paso
            nextButton.disabled = false;
        } else {
            nextButton.innerHTML = 'Siguiente<i class="fas fa-arrow-right ms-1"></i>';
            nextButton.classList.replace('btn-success', 'btn-primary');
            nextButton.disabled = false;
        }
    }
    
    // Mostrar mensaje de carga
    if (stepContent) {
        stepContent.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3">Cargando paso ${stepNumber}...</p>
            </div>
        `;
        
        // Cargar contenido del paso
        fetch(`steps/step${stepNumber}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el contenido del paso');
                }
                return response.text();
            })
            .then(html => {
                stepContent.innerHTML = html;
                // Reinicializar highlight.js después de cargar nuevo contenido
                if (window.hljs) {
                    hljs.highlightAll();
                }
                // Configurar nuevos botones de copiar
                setupCodeCopyButtons();
                // Configurar validadores de ejercicios si hay
                setupExerciseValidators();
                // Animar entrada
                animateContent();
                // Guardar progreso del usuario
                saveUserProgress();
            })
            .catch(error => {
                console.error(error);
                stepContent.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar el contenido. Por favor, intenta nuevamente.
                    </div>
                    <div class="text-center">
                        <button class="btn btn-outline-primary" onclick="loadStep(${stepNumber})">
                            <i class="fas fa-sync-alt me-2"></i>Reintentar
                        </button>
                    </div>
                `;
            });
    }
}

function updateStepIndicators(currentStep) {
    // Seleccionar todos los indicadores de pasos
    const indicators = document.querySelectorAll('.step-indicator');
    
    // Actualizar cada indicador según su posición relativa al paso actual
    indicators.forEach((indicator, index) => {
        // Obtener el punto interior del indicador
        const stepDot = indicator.querySelector('.step-dot');
        
        // Almacenar el estado anterior para animaciones
        const wasActive = indicator.classList.contains('active');
        const wasCompleted = indicator.classList.contains('completed');
        
        // Eliminar todas las clases previas
        indicator.classList.remove('active', 'completed');
        
        // Si es el paso actual, marcar como activo
        if (index === currentStep) {
            indicator.classList.add('active');
            
            // Si no estaba activo antes, añadir efecto de animación
            if (!wasActive && stepDot) {
                // Efecto de pulso
                stepDot.style.animation = 'pulse-animation 2s infinite';
            }
        }
        // Si es un paso anterior, marcar como completado
        else if (index < currentStep) {
            indicator.classList.add('completed');
            
            // Si no estaba completado antes y tiene el punto, mostrar animación de checkmark
            if (!wasCompleted && stepDot) {
                stepDot.innerHTML = '<i class="fas fa-check"></i>';
                stepDot.style.animation = 'fade-in 0.5s ease-in-out';
            }
        } else {
            // Para pasos futuros, quitar cualquier contenido o animación
            if (stepDot) {
                stepDot.innerHTML = '';
                stepDot.style.animation = '';
            }
        }
        
        // Añadir evento click para navegar rápidamente a ese paso
        indicator.onclick = function() {
            loadStep(index);
        };
        
        // Crear tooltip con Bootstrap
        if (window.bootstrap) {
            const title = indicator.getAttribute('title') || stepTitles[index];
            const status = index < currentStep 
                ? '(Completado)' 
                : index === currentStep 
                    ? '(Actual)' 
                    : '(Pendiente)';
                    
            // Configurar tooltip
            indicator.setAttribute('data-bs-toggle', 'tooltip');
            indicator.setAttribute('data-bs-placement', 'top');
            indicator.setAttribute('data-bs-title', `${title} ${status}`);
            
            // Inicializar el tooltip
            new bootstrap.Tooltip(indicator);
        }
    });
}

function setupExerciseValidators() {
    document.querySelectorAll('.exercise-validator').forEach(validator => {
        const exerciseId = validator.getAttribute('data-exercise-id');
        const checkButton = document.getElementById(`check-${exerciseId}`);
        const codeInput = document.getElementById(`code-${exerciseId}`);
        const feedbackEl = document.getElementById(`feedback-${exerciseId}`);
        
        if (checkButton && codeInput && feedbackEl) {
            checkButton.addEventListener('click', () => {
                const userCode = codeInput.value;
                const solution = validator.getAttribute('data-solution');
                
                // Lógica simple de validación
                if (userCode.includes(solution)) {
                    feedbackEl.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i>
                            ¡Correcto! Tu solución funciona.
                        </div>
                    `;
                } else {
                    feedbackEl.innerHTML = `
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-circle me-2"></i>
                            No es correcto. Sigue intentando o revisa la pista.
                        </div>
                    `;
                }
            });
        }
    });
}

function animateContent() {
    if (!stepContent) return;
    
    const elements = stepContent.querySelectorAll('h3, p, pre, .card, .alert, .exercise-box');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}

// Navegar al paso anterior
function previousStep() {
    if (currentStep > 0) {
        loadStep(currentStep - 1);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

// Navegar al siguiente paso
function nextStep() {
    if (currentStep < totalSteps) {
        // Al avanzar al siguiente paso, incrementamos el progreso como si hubiéramos completado
        // el paso actual al 100% antes de cargar el siguiente
        updateProgressOnAdvance(currentStep, currentStep + 1);
        
        loadStep(currentStep + 1);
        window.scrollTo({top: 0, behavior: 'smooth'});
    } else if (currentStep === totalSteps) {
        // Estamos en el último paso y el botón dice "Finalizar"
        // Mostrar un modal de felicitación
        showCompletionModal();
    }
}

// Función para mostrar el modal de felicitación al completar la guía
function showCompletionModal() {
    // Crear el modal de felicitaciones
    const modalId = 'completion-modal';
    const modal = `
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="completionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title" id="completionModalLabel">
                        <i class="fas fa-trophy me-2 trophy-icon"></i>¡Felicidades!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center py-5">
                    <div class="mb-4 completion-content">
                        <div class="confetti-container">
                            <i class="fas fa-check-circle text-success fa-5x mb-4 completion-check"></i>
                        </div>
                        <h3 class="fw-bold mb-3">¡Has completado la guía interactiva!</h3>
                        <p class="lead mb-2">Has aprendido a crear una API profesional con Django y MySQL.</p>
                        <p class="mb-4">Ahora estás listo para aplicar estos conocimientos en tus propios proyectos.</p>
                        
                        <div class="achievement-badges my-4 d-flex justify-content-center gap-4">
                            <div class="badge-item text-center">
                                <div class="badge-icon bg-primary text-white rounded-circle mb-2">
                                    <i class="fas fa-code"></i>
                                </div>
                                <span class="badge-label">Desarrollo API</span>
                            </div>
                            <div class="badge-item text-center">
                                <div class="badge-icon bg-success text-white rounded-circle mb-2">
                                    <i class="fas fa-database"></i>
                                </div>
                                <span class="badge-label">MySQL</span>
                            </div>
                            <div class="badge-item text-center">
                                <div class="badge-icon bg-info text-white rounded-circle mb-2">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <span class="badge-label">Seguridad</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-lg px-4" data-bs-dismiss="modal" id="completion-modal-ok">
                        <i class="fas fa-home me-2"></i>Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Añadir al DOM
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar el modal usando Bootstrap
    if (window.bootstrap) {
        const modalElement = document.getElementById(modalId);
        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();
        
        // Animar elementos del modal cuando se muestre
        modalElement.addEventListener('shown.bs.modal', function() {
            const checkIcon = modalElement.querySelector('.completion-check');
            const badges = modalElement.querySelectorAll('.badge-item');
            
            // Aplicar animación al ícono de verificación
            if (checkIcon) {
                checkIcon.classList.add('animate__animated', 'animate__bounceIn');
            }
            
            // Animar las insignias con un ligero retraso entre cada una
            if (badges.length) {
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.classList.add('animate__animated', 'animate__fadeInUp');
                    }, 200 * (index + 1));
                });
            }
        });
        
        // Evento para cuando el modal se cierre
        modalElement.addEventListener('hidden.bs.modal', function() {
            showHomePage();
            window.scrollTo({top: 0, behavior: 'smooth'});
            // Eliminar el modal del DOM una vez cerrado
            modalElement.remove();
        });
        
        // Botón de OK para volver al inicio
        const okButton = document.getElementById('completion-modal-ok');
        if (okButton) {
            okButton.addEventListener('click', function() {
                bsModal.hide();
            });
        }
    } else {
        // Si Bootstrap no está disponible, mostrar un toast y volver al inicio
        showToast('¡Felicidades! Has completado la guía interactiva.', 'success');
        setTimeout(() => {
            showHomePage();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 1000);
    }
}

function updateProgressOnAdvance(fromStep, toStep) {
    if (!progressBar) return;
    
    // Si estamos avanzando al siguiente paso, mostramos una animación de completado
    if (toStep === fromStep + 1) {
        const porcentajePorPaso = 100 / (totalSteps + 1);
        const progresoCompleto = (fromStep + 1) * porcentajePorPaso; // +1 porque completamos el paso actual
        
        // Animamos al 100% del paso actual antes de cargar el siguiente
        progressBar.style.transition = "width 0.4s ease-out";
        progressBar.style.width = `${progresoCompleto}%`;
    }
}

// Función para ir directamente al paso 1 (práctica)
function skipToStep1() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const recursosSection = document.getElementById('recursos');
    const pasosSection = document.getElementById('pasos');
    const progressSection = document.getElementById('progressSection');
    if (introduccionSection) introduccionSection.classList.add('d-none');
    if (comoUsarSection) comoUsarSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.add('d-none');
    if (pasosSection) pasosSection.classList.remove('d-none');
    if (progressSection) progressSection.classList.remove('d-none');
    
    loadStep(1);
}

// Mostrar la página de inicio completa
function showHomePage() {
    const introduccionSection = document.getElementById('introduccion');
    const comoUsarSection = document.getElementById('como-usar');
    const pasosSection = document.getElementById('pasos');
    const recursosSection = document.getElementById('recursos');
    const progressSection = document.getElementById('progressSection');
    if (introduccionSection) introduccionSection.classList.remove('d-none');
    if (comoUsarSection) comoUsarSection.classList.remove('d-none');
    if (pasosSection) pasosSection.classList.add('d-none');
    if (recursosSection) recursosSection.classList.add('d-none');
    if (progressSection) progressSection.classList.add('d-none');
}

// Función para reiniciar el progreso del usuario
function resetUserProgress() {
    // Mostrar un modal de confirmación antes de borrar el progreso
    const confirmModal = `
    <div class="modal fade" id="resetConfirmModal" tabindex="-1" aria-labelledby="resetConfirmModalLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resetConfirmModalLabel">Reiniciar progreso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que quieres reiniciar todo tu progreso en esta guía?</p>
            <p class="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" id="confirmResetBtn" class="btn btn-danger">Reiniciar</button>
          </div>
        </div>
      </div>
    </div>
    `;
    
    // Añadir el modal al DOM si no existe
    if (!document.getElementById('resetConfirmModal')) {
        document.body.insertAdjacentHTML('beforeend', confirmModal);
        
        // Configurar el botón de confirmación
        document.getElementById('confirmResetBtn').addEventListener('click', function() {
            // Eliminar el progreso guardado
            localStorage.removeItem('apiGuideProgress');
            
            // Ocultar el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('resetConfirmModal'));
            modal.hide();
            
            // Mostrar una notificación toast
            showToast('Progreso reiniciado correctamente', 'success');
            
            // Volver al paso 0
            loadStep(0);
        });
    }
      // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('resetConfirmModal'), {
        focus: true // Asegura que el foco se mueva al modal
    });
    modal.show();

    // Establecer el foco en el botón de confirmación para mejor accesibilidad
    document.getElementById('resetConfirmModal').addEventListener('shown.bs.modal', function() {
        document.getElementById('confirmResetBtn').focus();
    });
}

function updateProgressBarColor(progress) {
    if (!progressBar) return;
    
    // Asignar colores según el porcentaje de progreso
    let color;
    
    if (progress < 20) {
        color = 'var(--bs-primary)'; // Azul Bootstrap para inicio
    } else if (progress < 50) {
        color = 'var(--bs-info)'; // Celeste para progreso intermedio inicial
    } else if (progress < 80) {
        color = 'var(--bs-purple)'; // Morado para progreso intermedio avanzado
    } else {
        color = 'var(--bs-success)'; // Verde para progreso casi completado
    }
    
    // Si existe soporte para animaciones y gradientes, hacemos la barra más atractiva
    if (window.CSS && CSS.supports('background-image', 'linear-gradient(to right, #000, #fff)')) {
        // Calcular colores para gradiente
        let gradientEnd;
        
        // Color más intenso para el final del gradiente
        if (progress < 20) {
            gradientEnd = '#0d6efd'; // Bootstrap primary más intenso
        } else if (progress < 50) {
            gradientEnd = '#0dcaf0'; // Bootstrap info más intenso
        } else if (progress < 80) {
            gradientEnd = '#6f42c1'; // Bootstrap purple más intenso
        } else {
            gradientEnd = '#198754'; // Bootstrap success más intenso
        }
        
        // Aplicar gradiente
        progressBar.style.backgroundImage = `linear-gradient(to right, ${color}, ${gradientEnd})`;
        
        // Añadir un leve brillo en el centro para efecto 3D
        if (progress > 10) {
            progressBar.style.boxShadow = 'inset 0 -2px 5px rgba(255, 255, 255, 0.2)';
        }
    } else {
        // Si no hay soporte para gradientes, solo cambiamos el color
        progressBar.style.backgroundColor = color;
    }
}

// Función para mostrar notificaciones tipo toast
function showToast(message, type = 'info') {
    // Crear el toast
    const toastId = 'notification-toast-' + new Date().getTime();
    const toast = `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="${toastId}" class="toast align-items-center text-white bg-${type}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    `;
    
    // Añadir al DOM
    document.body.insertAdjacentHTML('beforeend', toast);
    
    // Mostrar el toast si Bootstrap está disponible
    if (window.bootstrap) {
        const toastElement = document.getElementById(toastId);
        const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
        bsToast.show();
        
        // Eliminar del DOM después de ocultarse
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }
}

// Configurar indicadores de paso
function setupStepIndicators() {
    const stepIndicators = document.querySelectorAll('.step-indicator');
    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            loadStep(index);
        });
    });
}

// Función para configurar tooltips
function setupTooltips() {
    if (window.bootstrap) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// --- INICIALIZACIÓN Y EVENTOS ---
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const resourcesButton = document.getElementById('resourcesButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const resetButton = document.getElementById('resetProgress');
    const startPracticalButton = document.getElementById('startPracticalButton');
    if (startButton) startButton.addEventListener('click', startGuide);
    if (resourcesButton) resourcesButton.addEventListener('click', showResources);
    if (prevButton) prevButton.addEventListener('click', previousStep);
    if (nextButton) nextButton.addEventListener('click', nextStep);
    if (resetButton) resetButton.addEventListener('click', resetUserProgress);
    if (startPracticalButton) startPracticalButton.addEventListener('click', skipToStep1);
    const homeNavLink = document.querySelector('.navbar-nav .nav-link[href="#inicio"]');
    if (homeNavLink) {
        homeNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            showHomePage();
        });
    }
    initializeGuide();
    window.skipToStep1 = skipToStep1;
    window.loadStep = loadStep;
    window.nextStep = nextStep;
    window.previousStep = previousStep;
    window.showCompletionModal = showCompletionModal;
});
