document.addEventListener("DOMContentLoaded", () => {
  const marqueeContainer = document.querySelector(".marquee-content");
  if (marqueeContainer) {
    for (let i = 0; i < 8; i++) {
      const span = document.createElement("span");
      span.className = "flex items-center gap-12";
      span.style.cssText =
        "display:inline-flex;align-items:center;gap:3rem;padding-right:3rem;";
      span.innerHTML = `
                STICK IT. TOSS IT. SCORE IT. <span style="width:.75rem;height:.75rem;background:#000;border-radius:9999px;display:inline-block;flex-shrink:0;"></span>
                100% SILICONE <span style="width:.75rem;height:.75rem;background:#000;border-radius:9999px;display:inline-block;flex-shrink:0;"></span>
                PLAY ANYWHERE <span style="width:.75rem;height:.75rem;background:#000;border-radius:9999px;display:inline-block;flex-shrink:0;"></span>
            `;
      marqueeContainer.appendChild(span);
    }
  }

  const carouselTrack = document.getElementById("product-carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  if (carouselTrack && prevBtn && nextBtn) {
    const products = [
      {
        title: "TOSSIT Pro Aim Set",
        price: "€34,99",
        originalPrice: "€43,99",
        img: "assets/product_1.webp",
        label: "Limited Edition",
      },
      {
        title: "Starter Pack - Blue Yellow",
        price: "€34,99",
        originalPrice: "€43,99",
        img: "assets/product_2.webp",
        label: "New Offer",
      },
      {
        title: "Family Pack - Red Cyan Blue Yellow",
        price: "€43,99",
        originalPrice: "€49,99",
        img: "assets/product_3.webp",
        label: "Best Seller",
      },
      {
        title: "TOSSIT Family Board 2 IN 1 Games",
        price: "€59,99",
        originalPrice: "€79,99",
        img: "assets/product_4.webp",
        label: "New Offer",
      },
      {
        title: "Starter Pack - Red Cyan",
        price: "€43,99",
        originalPrice: "€54,99",
        img: "product_5.webp",
      },
    ];

    function buildCard(p) {
      const card = document.createElement("div");
      card.className = "product-card";

      // Determine badge class
      let badgeClass = "product-card__badge";
      if (p.label === "Limited Edition") badgeClass += " badge--limited";
      else if (p.label === "New Offer") badgeClass += " badge--new";
      else if (p.label === "Best Seller") badgeClass += " badge--selling";

      card.innerHTML = `
        <div class="product-card__img-wrap">
          ${p.label ? `<div class="${badgeClass}">${p.label}</div>` : ""}
          <img src="${p.img}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product-card__body">
          <p class="product-card__title">${p.title}</p>
          <div class="product-card__price-wrapper">
            <span class="product-card__price product-card__price--original">${p.originalPrice}</span>
            <span class="product-card__price product-card__price--discount">${p.price}</span>
          </div>
          <button class="product-card__btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add to Cart
          </button>
        </div>
      `;
      return card;
    }

    // Populate track
    products.forEach((p) => carouselTrack.appendChild(buildCard(p)));

    // For TRUE infinite: Clone items to buffers
    // We clone 4 items at each end to ensure a smooth transition even on wide screens
    const numClones = 4;
    const firstClones = [...carouselTrack.children].slice(0, numClones);
    const lastClones = [...carouselTrack.children].slice(-numClones);

    firstClones.forEach((clone) =>
      carouselTrack.appendChild(clone.cloneNode(true)),
    );
    lastClones
      .reverse()
      .forEach((clone) =>
        carouselTrack.insertBefore(
          clone.cloneNode(true),
          carouselTrack.firstChild,
        ),
      );

    // Logic constants
    const cardWidth = 320;
    const gap = 32; // 2rem
    const stepWidth = cardWidth + gap;

    // Initial position: start at the first "real" item (after the lastClones)
    let currentIndex = numClones;
    let isTransitioning = false;

    function setTrackPosition(index, animate = true) {
      if (!animate) carouselTrack.style.transition = "none";
      else
        carouselTrack.style.transition =
          "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";

      const offset = -(index * stepWidth);
      carouselTrack.style.transform = `translateX(${offset}px)`;

      // Force reflow
      if (!animate) carouselTrack.offsetHeight;
    }

    // Initialize
    setTrackPosition(currentIndex, false);

    function next() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      setTrackPosition(currentIndex);
    }

    function prev() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      setTrackPosition(currentIndex);
    }

    carouselTrack.addEventListener("transitionend", () => {
      isTransitioning = false;

      // Silent reset
      if (currentIndex >= products.length + numClones) {
        currentIndex = numClones;
        setTrackPosition(currentIndex, false);
      } else if (currentIndex < numClones) {
        currentIndex = products.length + numClones - 1;
        setTrackPosition(currentIndex, false);
      }
    });

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
  }

  const testimonialTrack = document.getElementById(
    "testimonials-marquee-track",
  );
  if (testimonialTrack) {
    const testimonials = [
      {
        author: "ALEX G.",
        quote:
          "Best office game ever. We haven't done any work in three days. Highly recommend!",
        avatar: "https://i.pravatar.cc/150?u=alex",
      },
      {
        author: "SARAH M.",
        quote:
          "My kids are obsessed. Finally something that gets them off their iPads and playing together.",
        avatar: "https://i.pravatar.cc/150?u=sarah",
      },
      {
        author: "MIKE R.",
        quote:
          "The suction power is insane. I stuck one to the ceiling and it's still there a week later.",
        avatar: "https://i.pravatar.cc/150?u=mike",
      },
      {
        author: "JESSICA W.",
        quote:
          "Perfect for parties! It's the only game where everyone actually wants to participate.",
        avatar: "https://i.pravatar.cc/150?u=jess",
      },
      {
        author: "DAVID L.",
        quote:
          "So simple, yet so addictive. We play it almost every night after dinner.",
        avatar: "https://i.pravatar.cc/150?u=david",
      },
      {
        author: "EMMA S.",
        quote:
          "I love the neon colors! They look so cool and the quality is top-notch.",
        avatar: "https://i.pravatar.cc/150?u=emma",
      },
      {
        author: "CHRIS B.",
        quote:
          "Tossit is my new favorite stress reliever. There's something so satisfying about the 'thwak' sound.",
        avatar: "https://i.pravatar.cc/150?u=chris",
      },
      {
        author: "LINDA K.",
        quote:
          "Great gift idea! I've bought sets for all my nephews and they all love it.",
        avatar: "https://i.pravatar.cc/150?u=linda",
      },
      {
        author: "RYAN T.",
        quote:
          "Compact and portable. I take my Tossit set everywhere—camping, the beach, even the pub!",
        avatar: "https://i.pravatar.cc/150?u=ryan",
      },
      {
        author: "SOPHIE H.",
        quote:
          "It's rare to find a game that's fun for both adults and kids. Tossit nailed it.",
        avatar: "https://i.pravatar.cc/150?u=sophie",
      },
    ];

    function buildTestimonialCard(t) {
      const card = document.createElement("div");
      card.className = "testimonial-card";
      card.innerHTML = `
        <div class="testimonial-card__stars">
          <i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i>
        </div>
        <blockquote class="testimonial-card__quote">"${t.quote}"</blockquote>
        <div class="testimonial-card__footer">
          <img src="${t.avatar}" alt="${t.author}" class="testimonial-card__avatar">
          <span class="testimonial-card__author">${t.author}</span>
        </div>
      `;
      return card;
    }

    // Populate track and duplicate for seamless loop
    [...testimonials, ...testimonials].forEach((t) => {
      testimonialTrack.appendChild(buildTestimonialCard(t));
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item, index) => {
    const trigger = item.querySelector(".faq-trigger");
    if (!trigger) return;

    // Open the first item by default
    item.setAttribute("data-open", index === 0 ? "true" : "false");

    trigger.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      faqItems.forEach((other) => other.setAttribute("data-open", "false"));
      item.setAttribute("data-open", String(!isOpen));
    });
  });

  const videoTrack = document.getElementById("video-gallery-track");
  const videoPrev = document.getElementById("video-prev");
  const videoNext = document.getElementById("video-next");
  const videoDotsContainer = document.getElementById("video-gallery-dots");

  if (videoTrack && videoPrev && videoNext && videoDotsContainer) {
    const videoCards = Array.from(videoTrack.children);
    let videoIndex = 0;

    // Calculate how many cards are visible
    function getVisibleCards() {
      if (window.innerWidth > 1024) return 4;
      if (window.innerWidth > 768) return 3;
      if (window.innerWidth > 480) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, videoCards.length - getVisibleCards());
    }

    // Generate dots
    function initDots() {
      videoDotsContainer.innerHTML = "";
      const numDots = getMaxIndex() + 1;
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement("div");
        dot.className = `video-dot ${i === 0 ? "active" : ""}`;
        dot.addEventListener("click", () => {
          videoIndex = i;
          updateVideoGallery();
        });
        videoDotsContainer.appendChild(dot);
      }
    }

    function updateVideoGallery() {
      const visible = getVisibleCards();
      const cardWidth = videoCards[0].offsetWidth;
      const gap = 24; // 1.5rem
      const offset = -(videoIndex * (cardWidth + gap));

      videoTrack.style.transform = `translateX(${offset}px)`;

      // Update dots
      const dots = videoDotsContainer.querySelectorAll(".video-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === videoIndex);
      });
    }

    videoNext.addEventListener("click", () => {
      if (videoIndex < getMaxIndex()) {
        videoIndex++;
        updateVideoGallery();
      } else {
        videoIndex = 0; // wrap
        updateVideoGallery();
      }
    });

    videoPrev.addEventListener("click", () => {
      if (videoIndex > 0) {
        videoIndex--;
        updateVideoGallery();
      } else {
        videoIndex = getMaxIndex(); // wrap
        updateVideoGallery();
      }
    });

    // Re-init dots on resize
    window.addEventListener("resize", () => {
      const max = getMaxIndex();
      if (videoIndex > max) videoIndex = max;
      initDots();
      updateVideoGallery();
    });

    initDots();
    updateVideoGallery();
  }
});
