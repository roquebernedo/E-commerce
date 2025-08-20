// export const correctStyle = (flash, percent) => {
//   if (flash) {
//     return {
//       width: percent + "%",
//       background:
//         percent < 100
//           ? "linear-gradient(45deg,#35a7ff 0%,#7e54de 20%,#f40259 60%,#fea30d 100%)"
//           : "green",
//       backgroundSize: "400%",
//       animation: "gradientTextAnim 5s infinite",
//     };
//   }

//   return {
//     width: percent + "%",
//     background: percent < 100 ? "white" : "green",
//   };
// };

// export const correctStyle = (flash, percent) => {
//   return {
//     width: `${percent}%`,
//     background: flash ? "linear-gradient(to right, #00f260, #0575e6)" : "gray",
//     transition: "width 0.5s ease"
//   };
// };

// export const correctStyle = (flash, percent) => {
//   if (flash) {
//     return {
//       width: percent + "%",
//       background:
//         percent < 100
//           ? "linear-gradient(45deg,#35a7ff 0%,#7e54de 20%,#f40259 60%,#fea30d 100%)"
//           : "green",
//       backgroundSize: "400%",
//       animation: "gradientTextAnim 5s infinite",
//     };
//   }

//   return {
//     width: percent + "%",
//     background: percent < 100 ? "white" : "green",
//   };
// };

export const correctStyle = (flash, step) => {
  const widthMap = {
    1: "20%",
    2: "40%",
    3: "60%",
    4: "80%",
    5: "100%",
  };

  const width = widthMap[step] || "0%"; // Valor por defecto

  if (flash) {
    return {
      width,
      background:
        step < 5
          ? "linear-gradient(45deg,#35a7ff 0%,#7e54de 20%,#f40259 60%,#fea30d 100%)"
          : "green",
      backgroundSize: "400%",
      animation: "gradientTextAnim 5s infinite",
    };
  }

  return {
    width,
    background: step < 5 ? "white" : "green",
  };
};