// animation.js
export const fadeInAnimation = `
.fadeIn {
  opacity: 0;
  animation: fadeIn ease-in 1s forwards;
}
 @keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;