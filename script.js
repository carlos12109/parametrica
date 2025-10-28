// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

    // === VARIABLES GLOBALES ===
    const fisherSection = document.getElementById('fisher-section');
    const mannWhitneySection = document.getElementById('mann-whitney-section');
    const medianTestSection = document.getElementById('median-test-section'); // Añadido
    const btnFisher = document.getElementById('btn-fisher');
    const btnMann = document.getElementById('btn-mann');
    const btnMedian = document.getElementById('btn-median'); // Añadido
    const menu = document.querySelector('.options-menu');
    const contentDiv = document.querySelector('.content');
    const menuOffsetTop = menu.offsetTop;

    console.log('medianTestSection element found:', medianTestSection);
    console.log('btnMedian element found:', btnMedian);

    // === LÓGICA DEL MENÚ PEGAJOSO (STICKY) ===
    window.onscroll = function () {
        makeMenuSticky();
    };

    function makeMenuSticky() {
        if (window.pageYOffset >= menuOffsetTop) {
            if (!menu.classList.contains('sticky')) {
                // Añadir padding al contenido para evitar el salto
                contentDiv.style.paddingTop = menu.offsetHeight + 'px';
                menu.classList.add('sticky');
            }
        } else {
            if (menu.classList.contains('sticky')) {
                menu.classList.remove('sticky');
                contentDiv.style.paddingTop = '30px'; // Volver al padding original
            }
        }
    }

    // === LÓGICA DE NAVEGACIÓN DE PRUEBAS ===
    // Asignar eventos a los botones del menú
    btnFisher.addEventListener('click', () => showTest('fisher-section'));
    btnMann.addEventListener('click', () => showTest('mann-whitney-section'));
    btnMedian.addEventListener('click', () => showTest('median-test-section')); // Añadido

    function showTest(sectionId) {
        const sections = [
            { id: 'fisher-section', element: fisherSection, button: btnFisher },
            { id: 'mann-whitney-section', element: mannWhitneySection, button: btnMann },
            { id: 'median-test-section', element: medianTestSection, button: btnMedian }
        ];

        // Ocultar todas las secciones y desactivar todos los botones
        sections.forEach(item => {
            if (item.element) { // Asegurarse de que el elemento existe antes de manipularlo
                item.element.classList.add('hidden');
            }
            if (item.button) { // Asegurarse de que el botón existe antes de manipularlo
                item.button.classList.remove('active');
            }
        });

        // Mostrar la sección seleccionada y activar su botón
        const targetSection = sections.find(item => item.id === sectionId);

        if (targetSection && targetSection.element) {
            targetSection.element.classList.remove('hidden');
            if (targetSection.button) {
                targetSection.button.classList.add('active');
            }
        }
    }

    // === FUNCIONES DE INTERACTIVIDAD ===
    // Función para mostrar/ocultar cálculos detallados de Fisher
    function toggleCalculations() {
        const calcDiv = document.getElementById('detailed-calc');
        calcDiv.classList.toggle('hidden');
    }
    // Asignar evento al botón
    const toggleCalcButton = document.querySelector('.toggle-button');
    if (toggleCalcButton) {
        toggleCalcButton.addEventListener('click', toggleCalculations);
    }


    // === GRÁFICAS DE LA PRUEBA DE FISHER ===
    // Gráfica 1: Distribución de resultados
    const ctx1 = document.getElementById('barChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Vacunados', 'Placebo'],
            datasets: [{
                label: 'Enfermaron',
                data: [2, 6],
                backgroundColor: '#ef4444',
                borderColor: '#dc2626',
                borderWidth: 2
            }, {
                label: 'No Enfermaron',
                data: [7, 3],
                backgroundColor: '#10b981',
                borderColor: '#059669',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 14 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: { size: 12 }
                    }
                },
                x: {
                    ticks: {
                        font: { size: 14 }
                    }
                }
            }
        }
    });

    // Gráfica 2: Proporciones
    const ctx2 = document.getElementById('proportionChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Vacunados', 'Placebo'],
            datasets: [{
                label: 'Proporción de Enfermos (%)',
                data: [22.2, 66.7],
                backgroundColor: ['#3b82f6', '#ef4444'],
                borderColor: ['#2563eb', '#dc2626'],
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.x.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        },
                        font: { size: 12 }
                    },
                    title: {
                        display: true,
                        text: 'Porcentaje de Enfermos',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                y: {
                    ticks: {
                        font: { size: 14 }
                    }
                }
            }
        }
    });

    // Gráfica 3: Probabilidades
    const ctx3 = document.getElementById('probabilityChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Tabla Observada\n(a=2)', 'Tabla Extrema 1\n(a=1)', 'Tabla Extrema 2\n(a=0)'],
            datasets: [{
                label: 'Probabilidad',
                data: [0.0693, 0.0118, 0.0021],
                backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
                borderColor: ['#2563eb', '#dc2626', '#059669'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'P = ' + context.parsed.y.toFixed(4);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value.toFixed(4);
                        },
                        font: { size: 12 }
                    },
                    title: {
                        display: true,
                        text: 'Probabilidad',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    ticks: {
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // Información adicional sobre el p-valor
    const pValueInfo = document.createElement('div');
    pValueInfo.style.cssText = 'background: linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%); border: 2px solid #8b5cf6; border-radius: 10px; padding: 20px; margin-top: 20px; text-align: center;';
    pValueInfo.innerHTML = `
        <h4 style="color: #6b21a8; font-size: 1.3em; margin-bottom: 10px;">🧮 Cálculo del p-valor</h4>
        <p style="color: #5b21b6; font-size: 1.1em;">
            <strong>p-valor = </strong>
            <span style="color: #3b82f6;">0.0693</span> + 
            <span style="color: #ef4444;">0.0118</span> + 
            <span style="color: #10b981;">0.0021</span> = 
            <strong style="color: #8b5cf6; font-size: 1.3em;">0.0832</strong>
        </p>
    `;
    document.querySelector('#probabilityChart').parentElement.appendChild(pValueInfo);


    // === GRÁFICA DE LA PRUEBA U DE MANN-WHITNEY ===
    // Gráfica para Mann-Whitney: Boxplot
    const ctxBox = document.getElementById('boxPlotChart').getContext('2d');
    new Chart(ctxBox, {
        type: 'boxplot',
        data: {
            labels: ['Sí Actividad', 'No Actividad'],
            datasets: [{
                label: 'Frecuencia Cardiaca (lpm)',
                data: [
                    [60, 61, 62, 63, 64, 66], // Grupo 1
                    [72, 73, 74, 75, 76, 78]  // Grupo 2
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                itemStyle: 'circle',
                itemRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Latidos por Minuto (lpm)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            }
        }
    });

    // === GRÁFICA DE LA PRUEBA DE MEDIANAS (Añadido) ===
    const medianChartCanvas = document.getElementById('medianTestChart');
    if (medianChartCanvas) {
        const ctxMedian = medianChartCanvas.getContext('2d');
        new Chart(ctxMedian, {
            type: 'boxplot',
            data: {
                labels: ['Dieta Vegetariana', 'Dieta Tradicional'],
                datasets: [{
                    label: 'Pérdida de Peso (kg)',
                    data: [
                        [5.2, 4.8, 6.1, 5.5, 4.9, 6.0, 5.3], // Vegetariana
                        [3.1, 2.8, 3.5, 4.0, 3.3, 3.9, 2.5]  // Tradicional
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2,
                    itemStyle: 'circle',
                    itemRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return ` ${context.dataset.label}: ${context.parsed.y} kg`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Pérdida de Peso (kg)',
                            font: { size: 14, weight: 'bold' }
                        }
                    }
                }
            }
        });
    }

    // Mostrar la sección de Fisher por defecto al cargar la página
    showTest('fisher-section');

});
