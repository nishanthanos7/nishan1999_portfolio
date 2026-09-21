// // app/page.tsx
// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";

// interface Item {
//   id: string;
//   title: string;
//   sub: string;
// }

// const ITEMS: Item[] = [
//   { id: "01", title: "Spatial Audio", sub: "Dynamic head tracking" },
//   { id: "02", title: "Cover Flow", sub: "3D perspective motion" },
//   { id: "03", title: "San Francisco Pro", sub: "System typography" },
//   { id: "04", title: "Haptic Engine", sub: "Mechanical click snap" },
//   { id: "05", title: "Monochrome UI", sub: "High contrast OLED" },
//   { id: "06", title: "Dynamic Island", sub: "Fluid pill expansion" },
// ];

// const CARD_GAP = 90;
// const SLIDER_WIDTH = 320;
// const KNOB_WIDTH = 58;
// const PADDING = 6;
// const MAX_DRAG = SLIDER_WIDTH - KNOB_WIDTH - PADDING * 2;

// export default function Home() {
//   // States: "locked" -> "unlocking" (zoom out & transition) -> "unlocked"
//   const [stage, setStage] = useState<"locked" | "unlocking" | "unlocked">("locked");
//   const [activeIndex, setActiveIndex] = useState(1);
//   const [dragX, setDragX] = useState(0);

//   const isDragging = useRef(false);
//   const dragStartX = useRef(0);
//   const stageRef = useRef<HTMLDivElement>(null);
//   const isWheeling = useRef(false);
//   const startY = useRef(0);

//   // Web Audio mechanical sound synthesis
//   const playSound = useCallback((type: "unlock" | "tick") => {
//     if (typeof window === "undefined") return;
//     try {
//       const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
//       const ctx = new AudioCtx();
//       const t = ctx.currentTime;

//       if (type === "unlock") {
//         // Dual latch mechanical click
//         [340, 480].forEach((freq, i) => {
//           const osc = ctx.createOscillator();
//           const gain = ctx.createGain();
//           const time = t + i * 0.07;
//           osc.frequency.setValueAtTime(freq, time);
//           osc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
//           gain.gain.setValueAtTime(0.35, time);
//           gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
//           osc.connect(gain);
//           gain.connect(ctx.destination);
//           osc.start(time);
//           osc.stop(time + 0.05);
//         });
//       } else {
//         // Subtle tick on scroll
//         const osc = ctx.createOscillator();
//         const gain = ctx.createGain();
//         osc.frequency.setValueAtTime(1100, t);
//         osc.frequency.exponentialRampToValueAtTime(100, t + 0.015);
//         gain.gain.setValueAtTime(0.1, t);
//         gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
//         osc.connect(gain);
//         gain.connect(ctx.destination);
//         osc.start(t);
//         osc.stop(t + 0.02);
//       }
//     } catch {
//       // Audio autoplay policy fallback
//     }
//   }, []);

//   // Slide pointer handlers
//   const handlePointerDown = (clientX: number) => {
//     if (stage !== "locked") return;
//     isDragging.current = true;
//     dragStartX.current = clientX - dragX;
//   };

//   const handlePointerMove = useCallback((clientX: number) => {
//     if (!isDragging.current) return;
//     const nextX = Math.max(0, Math.min(MAX_DRAG, clientX - dragStartX.current));
//     setDragX(nextX);

//     // Only unlock when dragged right to the end (>= 96%)
//     if (nextX >= MAX_DRAG * 0.96) {
//       isDragging.current = false;
//       setDragX(MAX_DRAG);
//       playSound("unlock");
//       setStage("unlocking");

//       setTimeout(() => {
//         setStage("unlocked");
//       }, 550);
//     }
//   }, [playSound]);

//   const handlePointerUp = useCallback(() => {
//     if (!isDragging.current) return;
//     isDragging.current = false;
//     setDragX(0); // Snap back if released early
//   }, []);

//   useEffect(() => {
//     const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
//     const onMouseUp = () => handlePointerUp();
//     const onTouchMove = (e: TouchEvent) => handlePointerMove(e.touches[0].clientX);
//     const onTouchEnd = () => handlePointerUp();

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//     window.addEventListener("touchmove", onTouchMove);
//     window.addEventListener("touchend", onTouchEnd);

//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//     };
//   }, [handlePointerMove, handlePointerUp]);

//   // Card deck controls
//   const changeIndex = useCallback((delta: number) => {
//     setActiveIndex((prev) => {
//       const next = Math.max(0, Math.min(ITEMS.length - 1, prev + delta));
//       if (next !== prev) playSound("tick");
//       return next;
//     });
//   }, [playSound]);

//   useEffect(() => {
//     const el = stageRef.current;
//     if (!el || stage !== "unlocked") return;

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (isWheeling.current) return;
//       if (Math.abs(e.deltaY) > 15) {
//         isWheeling.current = true;
//         changeIndex(e.deltaY > 0 ? 1 : -1);
//         setTimeout(() => { isWheeling.current = false; }, 180);
//       }
//     };

//     const handleTouchStart = (e: TouchEvent) => {
//       startY.current = e.touches[0].clientY;
//     };

//     const handleTouchEnd = (e: TouchEvent) => {
//       const diff = startY.current - e.changedTouches[0].clientY;
//       if (Math.abs(diff) > 25) changeIndex(diff > 0 ? 1 : -1);
//     };

//     el.addEventListener("wheel", handleWheel, { passive: false });
//     el.addEventListener("touchstart", handleTouchStart, { passive: true });
//     el.addEventListener("touchend", handleTouchEnd, { passive: true });

//     return () => {
//       el.removeEventListener("wheel", handleWheel);
//       el.removeEventListener("touchstart", handleTouchStart);
//       el.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [changeIndex, stage]);

//   return (
//     <main className="relative min-h-screen w-full flex items-center justify-center bg-black text-white selection:bg-white selection:text-black overflow-hidden select-none">
      
//       {/* ─── SLIDE TO UNLOCK SCREEN ─── */}
//       {stage !== "unlocked" && (
//         <div
//           className={`absolute flex flex-col items-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//             stage === "unlocking"
//               ? "scale-75 opacity-0 -translate-y-12 blur-sm pointer-events-none"
//               : "scale-100 opacity-100 translate-y-0"
//           }`}
//         >
//           <span className="text-[76px] font-extralight tracking-tight text-white/95 leading-none">
//             9:41
//           </span>

//           {/* Bigger Slide Track */}
//           <div
//             style={{ width: SLIDER_WIDTH, padding: PADDING }}
//             className="relative h-[68px] rounded-full bg-zinc-900/90 border border-white/15 flex items-center shadow-2xl"
//           >
//             {/* Shimmering Text that fades smoothly on approach to the end */}
//             <div
//               style={{ opacity: Math.max(0, 1 - (dragX / MAX_DRAG) * 1.25) }}
//               className="absolute inset-0 flex items-center justify-center pl-10 pointer-events-none transition-opacity duration-150"
//             >
//               <span className="text-base font-medium tracking-wide bg-[linear-gradient(90deg,#444_0%,#fff_50%,#444_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
//                 slide to unlock
//               </span>
//             </div>

//             {/* Bigger Slider Knob */}
//             <div
//               onMouseDown={(e) => handlePointerDown(e.clientX)}
//               onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
//               style={{
//                 width: KNOB_WIDTH,
//                 height: KNOB_WIDTH,
//                 transform: `translateX(${dragX}px)`,
//                 transition: isDragging.current ? "none" : "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
//               }}
//               className="relative z-10 rounded-full bg-white text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform"
//             >
//               <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
//                 <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── CARD STACK UI (Falling in from top + zoom-out settle) ─── */}
//       <div
//         className={`flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//           stage === "unlocked"
//             ? "opacity-100 scale-100 translate-y-0 filter blur-0"
//             : "opacity-0 scale-125 -translate-y-24 filter blur-md pointer-events-none"
//         }`}
//       >
//         <div
//           ref={stageRef}
//           style={{ perspective: 1000 }}
//           className="relative w-[340px] h-[370px] cursor-grab active:cursor-grabbing"
//         >
//           <div
//             style={{ transformStyle: "preserve-3d" }}
//             className="absolute top-1/2 left-0 w-full h-0"
//           >
//             {ITEMS.map((item, index) => {
//               const offset = index - activeIndex;
//               const isActive = offset === 0;

//               const translateY = offset * CARD_GAP;
//               const rotateX = -offset * 18;
//               const translateZ = -Math.abs(offset) * 44;
//               const scale = isActive ? 1.04 : Math.max(0.9, 1 - Math.abs(offset) * 0.08);
//               const opacity = isActive ? 1 : Math.max(0.2, 0.65 - Math.abs(offset) * 0.22);

//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => {
//                     setActiveIndex(index);
//                     playSound("tick");
//                   }}
//                   style={{
//                     transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
//                     opacity,
//                     // Staggered cascade entrance on initial unlock
//                     transitionDelay: stage === "unlocked" ? `${index * 45}ms` : "0ms",
//                   }}
//                   className={`absolute left-[10px] top-[-42px] w-[320px] h-[84px] px-5 rounded-2xl flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//                     isActive
//                       ? "bg-[#1f1f22] border border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.12)] z-10"
//                       : "bg-[#121214] border border-[#27272a] hover:border-zinc-500"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <span className={`text-xs font-mono font-semibold ${isActive ? "text-white" : "text-zinc-500"}`}>
//                       {item.id}
//                     </span>
//                     <div className="flex flex-col text-left">
//                       <span className={`text-sm font-semibold tracking-tight ${isActive ? "text-white" : "text-zinc-300"}`}>
//                         {item.title}
//                       </span>
//                       <span className="text-xs text-zinc-500">{item.sub}</span>
//                     </div>
//                   </div>
//                   <span className={`text-lg transition-transform ${isActive ? "text-white translate-x-1" : "text-zinc-600"}`}>
//                     ›
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Lock button */}
//         <button
//           onClick={() => {
//             setDragX(0);
//             setStage("locked");
//           }}
//           className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide cursor-pointer"
//         >
//           Lock
//         </button>
//       </div>

//       {/* Shimmer animation keyframes */}
//       <style jsx global>{`
//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }
//         .animate-shimmer {
//           animation: shimmer 2.6s infinite linear;
//         }
//       `}</style>
//     </main>
//   );
// }



// app/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Item {
  id: string;
  title: string;
  sub: string;
}

const ITEMS: Item[] = [
  { id: "01", title: "Spatial Audio", sub: "Dynamic head tracking" },
  { id: "02", title: "Cover Flow", sub: "3D perspective motion" },
  { id: "03", title: "San Francisco Pro", sub: "System typography" },
  { id: "04", title: "Haptic Engine", sub: "Mechanical click snap" },
  { id: "05", title: "Monochrome UI", sub: "High contrast OLED" },
  { id: "06", title: "Dynamic Island", sub: "Fluid pill expansion" },
];

const CARD_GAP = 108;
const SLIDER_WIDTH = 380;
const KNOB_WIDTH = 64;
const PADDING = 6;
const MAX_DRAG = SLIDER_WIDTH - KNOB_WIDTH - PADDING * 2;

export default function Home() {
  const [stage, setStage] = useState<"locked" | "unlocking" | "unlocked">("locked");
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragX, setDragX] = useState(0);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const isWheeling = useRef(false);
  const startY = useRef(0);

  // Web Audio mechanical click synthesis
  const playSound = useCallback((type: "unlock" | "tick") => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const t = ctx.currentTime;

      if (type === "unlock") {
        [340, 480].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const time = t + i * 0.07;
          osc.frequency.setValueAtTime(freq, time);
          osc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
          gain.gain.setValueAtTime(0.35, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.05);
        });
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(1100, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.015);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.02);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Slide to unlock drag handlers
  const handlePointerDown = (clientX: number) => {
    if (stage !== "locked") return;
    isDragging.current = true;
    dragStartX.current = clientX - dragX;
  };

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const nextX = Math.max(0, Math.min(MAX_DRAG, clientX - dragStartX.current));
    setDragX(nextX);

    // Full slide required (>= 96%)
    if (nextX >= MAX_DRAG * 0.96) {
      isDragging.current = false;
      setDragX(MAX_DRAG);
      playSound("unlock");
      setStage("unlocking");

      setTimeout(() => {
        setStage("unlocked");
      }, 550);
    }
  }, [playSound]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragX(0); // Snap back if let go early
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onMouseUp = () => handlePointerUp();
    const onTouchMove = (e: TouchEvent) => handlePointerMove(e.touches[0].clientX);
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Card deck controls
  const changeIndex = useCallback((delta: number) => {
    setActiveIndex((prev) => {
      const next = Math.max(0, Math.min(ITEMS.length - 1, prev + delta));
      if (next !== prev) playSound("tick");
      return next;
    });
  }, [playSound]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || stage !== "unlocked") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isWheeling.current) return;
      if (Math.abs(e.deltaY) > 15) {
        isWheeling.current = true;
        changeIndex(e.deltaY > 0 ? 1 : -1);
        setTimeout(() => { isWheeling.current = false; }, 180);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 25) changeIndex(diff > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [changeIndex, stage]);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#070708] text-white selection:bg-white selection:text-black overflow-hidden select-none px-4">
      
      {/* ─── SLIDE TO UNLOCK SCREEN ─── */}
      {stage !== "unlocked" && (
        <div
          className={`absolute flex flex-col items-center gap-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage === "unlocking"
              ? "scale-90 opacity-0 -translate-y-16 blur-sm pointer-events-none"
              : "scale-100 opacity-100 translate-y-0"
          }`}
        >
          {/* Prominent, crisp 9:41 lock clock */}
          <span className="text-[96px] sm:text-[112px] font-extralight tracking-tight text-white/95 leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]">
            9:41
          </span>

          {/* Large Slider Track */}
          <div
            style={{ width: SLIDER_WIDTH, padding: PADDING }}
            className="relative h-[78px] rounded-full bg-zinc-900/95 border border-white/20 flex items-center shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Shimmering Text */}
            <div
              style={{ opacity: Math.max(0, 1 - (dragX / MAX_DRAG) * 1.3) }}
              className="absolute inset-0 flex items-center justify-center pl-14 pointer-events-none transition-opacity duration-150"
            >
              <span className="text-lg font-medium tracking-wide bg-[linear-gradient(90deg,#555_0%,#fff_50%,#555_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
                slide to unlock
              </span>
            </div>

            {/* Slider Knob */}
            <div
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
              style={{
                width: KNOB_WIDTH,
                height: KNOB_WIDTH,
                transform: `translateX(${dragX}px)`,
                transition: isDragging.current ? "none" : "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              className="relative z-10 rounded-full bg-white text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_24px_rgba(255,255,255,0.3)] active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ─── EXPANDED CARD STACK UI ─── */}
      <div
        className={`w-full max-w-[580px] flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === "unlocked"
            ? "opacity-100 scale-100 translate-y-0 filter blur-0"
            : "opacity-0 scale-110 -translate-y-24 filter blur-md pointer-events-none"
        }`}
      >
        {/* Sized-up 3D Perspective Stage */}
        <div
          ref={stageRef}
          style={{ perspective: 1200 }}
          className="relative w-full h-[460px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        >
          <div
            style={{ transformStyle: "preserve-3d" }}
            className="absolute top-1/2 left-0 w-full h-0"
          >
            {ITEMS.map((item, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;

              const translateY = offset * CARD_GAP;
              const rotateX = -offset * 16;
              const translateZ = -Math.abs(offset) * 55;
              const scale = isActive ? 1.05 : Math.max(0.9, 1 - Math.abs(offset) * 0.07);
              // High baseline visibility so cards don't disappear into pitch black
              const opacity = isActive ? 1 : Math.max(0.38, 0.78 - Math.abs(offset) * 0.18);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(index);
                    playSound("tick");
                  }}
                  style={{
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                    opacity,
                    transitionDelay: stage === "unlocked" ? `${index * 40}ms` : "0ms",
                  }}
                  className={`absolute inset-x-2 top-[-50px] h-[100px] px-7 rounded-2xl flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "bg-[#1f2024] border-2 border-white/90 shadow-[0_0_40px_rgba(255,255,255,0.18),inset_0_1px_2px_rgba(255,255,255,0.4)] z-20"
                      : "bg-[#121316] border border-[#2b2d33] hover:border-zinc-500 z-0"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-base font-mono font-bold transition-colors ${
                        isActive ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {item.id}
                    </span>
                    <div className="flex flex-col text-left">
                      <span
                        className={`text-lg sm:text-xl font-semibold tracking-tight transition-colors ${
                          isActive ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          isActive ? "text-zinc-300" : "text-zinc-500"
                        }`}
                      >
                        {item.sub}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-2xl transition-all ${
                      isActive ? "text-white translate-x-1 font-bold" : "text-zinc-600"
                    }`}
                  >
                    ›
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lock button */}
        <button
          onClick={() => {
            setDragX(0);
            setStage("locked");
          }}
          className="mt-8 text-sm font-medium text-zinc-500 hover:text-white transition-colors tracking-wider uppercase cursor-pointer"
        >
          Lock
        </button>
      </div>

      {/* Shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2.6s infinite linear;
        }
      `}</style>
    </main>
  );
}