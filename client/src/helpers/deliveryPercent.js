// export const deliveryPercent = (date, start) => {
//   let total = date - start;
//   let progress = date - Date.now();
//   let percent = Math.floor(100 - (progress * 100) / total);

//   let state = "";
//   if (percent > 20 && percent <= 30) {
//     state = "Listo para enviar";
//   } else if (percent > 30 && percent <= 40) {
//     state = "Despachando";
//   } else if (percent > 40 && percent < 100) {
//     state = "Enviado";
//   } else if (percent >= 100) {
//     state = "¡Entregado!";
//   } else {
//     state = "Preparando tu orden...";
//   }
//   percent > 100 && (percent = 100);

//   return { percent, state };
// };

// export const deliveryPercent = (delivery_date, payment_date) => {
//   const now = new Date().getTime();
//   const total = delivery_date - payment_date;
//   const passed = now - payment_date;
//   const percent = Math.min(100, Math.floor((passed / total) * 100));
//   const state = now < delivery_date ? "En camino..." : "Entregado";
//   return { percent, state };
// };

export const deliveryPercent = (delivery_date, payment_date) => {
  const now = Date.now();
  const totalTime = delivery_date - payment_date;
  const elapsed = now - payment_date;

  const percent = (elapsed / totalTime) * 100;

  let step = 0;
  let state = "";

  if (percent < 25) {
    step = 1;
    state = "Preparando tu orden...";
  } else if (percent < 50) {
    step = 2;
    state = "Listo para enviar";
  } else if (percent < 75) {
    step = 3;
    state = "Despachando";
  } else if (percent < 100) {
    step = 4;
    state = "Enviado";
  } else {
    step = 5;
    state = "¡Entregado!";
  }

  return { step, state };
};