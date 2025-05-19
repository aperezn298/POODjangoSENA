document.addEventListener('DOMContentLoaded', function() {
    // Inicializar highlight.js para resaltar código
    hljs.highlightAll();
    
    // Manejar los botones para ejecutar código
    const runButtons = document.querySelectorAll('.btn-run');
    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlockId = this.getAttribute('data-code-block');
            const codeBlock = document.getElementById(codeBlockId);
            const outputId = this.getAttribute('data-output');
            const outputBlock = document.getElementById(outputId);
            
            if (codeBlock && outputBlock) {
                const code = codeBlock.textContent;
                executeCode(code, outputBlock);
            }
        });
    });
    
    // Simular la ejecución de código Python (solo visual)
    function executeCode(code, outputElement) {
        // Mostrar un indicador de carga
        outputElement.innerHTML = '<span class="text-muted">Ejecutando...</span>';
        
        // Simular un tiempo de procesamiento
        setTimeout(() => {
            // Aquí se procesaría el código real en una aplicación más avanzada
            // Por ahora, solo mostraremos salidas predefinidas según el contenido
            
            // Detectar el tipo de ejemplo para mostrar salida apropiada
            let output = '';
            
            if (code.includes('class') && code.includes('__init__')) {
                if (code.includes('print')) {
                    // Extraer lo que se imprime entre paréntesis del print
                    const printMatch = code.match(/print\((.*?)\)/);
                    if (printMatch && printMatch[1]) {
                        let printContent = printMatch[1];
                        // Si es una variable, inferir su valor según contexto
                        if (printContent.includes('self.')) {
                            // Extraer atributos definidos en __init__
                            const attrMatches = code.match(/self\.(\w+)\s*=\s*(.*)/g);
                            if (attrMatches) {
                                const attrs = {};
                                attrMatches.forEach(match => {
                                    const parts = match.split('=').map(p => p.trim());
                                    const attrName = parts[0].replace('self.', '');
                                    const attrValue = parts[1];
                                    attrs[attrName] = attrValue;
                                });
                                
                                // Reemplazar variables en la salida
                                printContent = printContent.replace(/self\.(\w+)/g, (match, p1) => {
                                    return attrs[p1] || match;
                                });
                            }
                        }
                        output = printContent.replace(/['"]/g, '');
                    } else {
                        output = 'Objeto creado correctamente';
                    }
                } else {
                    output = 'Objeto creado correctamente';
                }
            } else if (code.includes('class') && code.includes('herencia')) {
                output = 'Clase creada con herencia correctamente';
            } else if (code.includes('except')) {
                output = 'Excepción manejada correctamente';
            } else if (code.includes('@')) {
                output = 'Decorador aplicado correctamente';
            } else {
                output = 'Código ejecutado correctamente';
            }
            
            // Mostrar la salida
            outputElement.innerHTML = `<span class="vscode-terminal-prompt">>>> </span>${output}`;
        }, 800);
    }
    
    // Manejo de pestañas para ejemplos
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Volver a resaltar el código al cambiar de pestaña
            setTimeout(() => {
                hljs.highlightAll();
            }, 100);
        });
    });
    
    // Toggle para mostrar/ocultar soluciones de ejercicios
    const solutionToggles = document.querySelectorAll('.toggle-solution');
    solutionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const solutionId = this.getAttribute('data-solution');
            const solutionBlock = document.getElementById(solutionId);
            
            if (solutionBlock) {
                if (solutionBlock.style.display === 'none') {
                    solutionBlock.style.display = 'block';
                    this.textContent = 'Ocultar Solución';
                } else {
                    solutionBlock.style.display = 'none';
                    this.textContent = 'Mostrar Solución';
                }
                // Re-resaltar el código cuando se muestra
                hljs.highlightAll();
            }
        });
    });
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});