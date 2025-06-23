'use strict';

// Seleccionar los elementos del DOM
const form = document.getElementById('rcd-form');
const financiamientoInput = document.getElementById('financiamiento');
const normativaInput = document.getElementById('normativa');
const clasificacionInput = document.getElementById('clasificacion');
const inspeccionesInput = document.getElementById('inspecciones');
const sancionesInput = document.getElementById('sanciones');

const resultText = document.getElementById('result-text');
const resultBar = document.getElementById('result-bar');
const resetButton = document.getElementById('reset-btn');

// --- EVENT LISTENERS ---

// Escuchar el envío del formulario para calcular
form.addEventListener('submit', function(event) {
  // Prevenir que la página se recargue
  event.preventDefault();
  
  // 1. Obtener y convertir valores de los inputs
  const financiamiento = parseFloat(financiamientoInput.value);
  const normativa = parseFloat(normativaInput.value);
  const clasificacion = parseFloat(clasificacionInput.value);
  const inspecciones = parseFloat(inspeccionesInput.value);
  const sanciones = parseFloat(sancionesInput.value); // El usuario ingresa un %, ej: 30

  // 2. Aplicar la fórmula
  const indice = 0.9698
    - (0.3783 * financiamiento)
    - (0.3073 * normativa)
    - (0.3098 * clasificacion)
    + (0.0132 * inspecciones)
    + (0.0004 * (sanciones / 100)); // Convertir el % a decimal para la fórmula

  // 3. Validar el resultado y actualizar la UI
  if (isNaN(indice)) {
    resultText.textContent = 'Error: Por favor, introduce valores numéricos válidos.';
  } else {
    actualizarVisualizacion(indice);
  }
});

// Escuchar el clic en el botón de restablecer
resetButton.addEventListener('click', function() {
  // Limpiar el formulario
  form.reset();
  
  // Restablecer el texto del resultado
  resultText.textContent = 'El resultado del cálculo aparecerá aquí.';
  
  // Restablecer la barra del gráfico
  resultBar.style.height = '0%';
});


// --- FUNCIONES AUXILIARES ---

/**
 * Actualiza el texto del resultado y la altura de la barra del gráfico.
 * @param {number} indice - El valor calculado del índice.
 */
function actualizarVisualizacion(indice) {
  // Actualizar el texto del resultado, mostrando 4 decimales
  resultText.textContent = `Índice de Mala Gestión: ${indice.toFixed(4)}`;

  // Calcular la altura de la barra como un porcentaje.
  // Se asume que un índice de 1.0 es el 100% de la altura.
  // Usamos Math.max(0, ...) para evitar alturas negativas y Math.min(1, ...) para evitar que supere el 100%
  const alturaPorcentaje = Math.max(0, Math.min(1, indice)) * 100;
  
  // Aplicar la altura a la barra del gráfico
  resultBar.style.height = `${alturaPorcentaje}%`;
}