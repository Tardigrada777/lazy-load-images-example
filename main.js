function lazyLoadImages() {
  const images = document.querySelectorAll('.lazy-image');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  const fetchImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  const loadImage = (image) => {
    const { src } = image.dataset;
    fetchImage(src).then(() => {
      image.src = src;
    });
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        loadImage(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  images.forEach((img) => observer.observe(img));
}

lazyLoadImages();