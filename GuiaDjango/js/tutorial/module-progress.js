/**
 * Script para el seguimiento de progreso de los módulos
 */

function updateProgress(moduleNumber) {
    // Secciones comunes a todos los módulos
    const sections = ['introduccion'];
    
    // Secciones específicas por módulo
    const moduleSections = {
        1: ['instalacion', 'estructura', 'mvc-mvt', 'ejercicio', 'quiz'],
        2: ['definicion', 'campos', 'relaciones', 'migraciones', 'orm', 'ejercicio', 'quiz'],
        3: ['vistas-funcion', 'vistas-clase', 'plantillas', 'contexto', 'herencia', 'url-patterns', 'ejercicio', 'quiz'],
        4: ['formularios-django', 'creacion-forms', 'validacion', 'modelforms', 'rendering', 'ejercicio', 'quiz'],
        5: ['usuarios', 'login-logout', 'registro', 'permisos', 'decoradores', 'ejercicio', 'quiz'],
        6: ['planificacion', 'estructura', 'modelos', 'vistas', 'templates', 'auth', 'despliegue', 'pruebas', 'quiz']
    };
    
    // Combinar secciones comunes con las específicas del módulo
    const allSections = sections.concat(moduleSections[moduleNumber] || []);
    let visibleSections = 0;
    const windowHeight = window.innerHeight;
    
    allSections.forEach(sectionId => {
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
    const progress = Math.min((visibleSections / allSections.length) * 100, 100);    const progressBar = document.querySelector('.module-progress');    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    // Habilitar el botón de siguiente módulo si el progreso es suficiente
    if (progress >= 70) {
        const nextButtons = document.querySelectorAll('#next-module-btn, #next-module-btn-bottom');
        nextButtons.forEach(button => button.classList.remove('disabled'));
    }
}

function checkQuizCompletion(moduleNumber) {
    const progress = JSON.parse(localStorage.getItem('djangoTutorialProgress')) || {};
    if (progress[`modulo${moduleNumber}`] && progress[`modulo${moduleNumber}`].completed) {
        const nextButtons = document.querySelectorAll('#next-module-btn, #next-module-btn-bottom');
        nextButtons.forEach(button => button.classList.remove('disabled'));
        document.querySelector('.module-progress').style.width = '100%';
    }
}

// Inicializar progreso al cargar la página
function initModuleProgress(moduleNumber) {
    // Actualizar progreso mientras se desplaza
    window.addEventListener('scroll', () => updateProgress(moduleNumber));
    
    // Comprobar si se ha completado el quiz previamente
    checkQuizCompletion(moduleNumber);
    
    // Navegación suave para los enlaces de la barra lateral
    document.querySelectorAll('.list-group-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar navegación activa
                document.querySelectorAll('.list-group-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}
