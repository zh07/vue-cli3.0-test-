import html2canvas from "html2canvas";

const DPR = () => {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }

  return 1;
};

const getBase64 = el => {
  return new Promise((resolve, reject) => {
    const dom = el;
    const box = window.getComputedStyle(dom);
    const width = parseInt(box.width, 10);
    const height = parseInt(box.height, 10);
    const scaleBy = DPR();
    const canvas = document.createElement("canvas");

    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const context = canvas.getContext("2d");
    context.scale(scaleBy, scaleBy);
    html2canvas(dom, {
      canvas,
      x: 0,
      y: 0
    })
      .then(c => {
        resolve(c.toDataURL("image/png", 1) || "");
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getBase64;
