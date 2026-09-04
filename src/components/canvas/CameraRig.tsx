"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position (Orbit/Space view)
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    const ctx = gsap.context(() => {
      // Transition from Scene 01 (Orbit) to Scene 02 (Detection/Zoom to India)
      // Triggered by scrolling from Chapter 00 to Chapter 01
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-01",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 02 (Trace) - Rotate around
      gsap.to(camera.position, {
        x: 3,
        y: 3,
        z: 6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-02",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 03 (Correlate) - Close up on ocean
      gsap.to(camera.position, {
        x: 1,
        y: 4,
        z: 4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-03",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 04 (Attribute) - Data View
      gsap.to(camera.position, {
        x: -2,
        y: 1,
        z: 5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-04",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 05 (Explain) - Focus on Data Nodes
      gsap.to(camera.position, {
        x: -1,
        y: 0.5,
        z: 3.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-05",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 06 (Assess) - Pull back to show threat zones
      gsap.to(camera.position, {
        x: 0,
        y: 3,
        z: 7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-06",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 07 & 08 (Respond & Simulate) - High altitude view
      gsap.to(camera.position, {
        x: 2,
        y: 5,
        z: 8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-07",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Chapter 09 (Monitor) - Side profile
      gsap.to(camera.position, {
        x: 8,
        y: 1,
        z: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-09",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });

      // Final Hero (Chapter 10) - Back to orbit
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".chapter-10",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}
