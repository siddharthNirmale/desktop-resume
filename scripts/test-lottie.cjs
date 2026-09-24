const fs = require('fs');
const path = require('path');

// Helper to generate keyframe objects
function kf(t, s, e, o = { x: 0.16, y: 1 }, i = { x: 0.3, y: 1 }) {
  return {
    t,
    s,
    e,
    o,
    i
  };
}

// 60 fps, 180 frames = 3.0s loop
const duration = 180;

const animation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: duration,
  w: 360,
  h: 360,
  nm: "Offline_Radar_Disconnect",
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Warning slash / disconnect stroke
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Disconnect Slash",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [95], [60]),
            kf(45, [60], [100]),
            kf(90, [100], [60]),
            kf(135, [60], [95]),
            { t: 180, s: [95] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 180, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [100, 100, 100], [103, 103, 100]),
            kf(90, [103, 103, 100], [100, 100, 100]),
            { t: 180, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Slash Line Group",
          items: [
            {
              ty: "sh",
              nm: "Slash Path",
              ks: {
                a: 0,
                k: {
                  c: false,
                  i: [[0, 0], [0, 0]],
                  o: [[0, 0], [0, 0]],
                  v: [[-65, -55], [65, 55]]
                }
              }
            },
            {
              ty: "st",
              nm: "Slash Stroke",
              c: { a: 0, k: [1, 0.27, 0.23, 1] }, // Apple Red #FF453A
              o: { a: 0, k: 95 },
              w: { a: 0, k: 5 },
              lc: 2, // round cap
              lj: 2
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 2: Center Disconnected Hub / Core Node
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Center Hub Node",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [100, 100, 100], [125, 125, 100]),
            kf(45, [125, 125, 100], [95, 95, 100]),
            kf(90, [95, 95, 100], [125, 125, 100]),
            kf(135, [125, 125, 100], [100, 100, 100]),
            { t: 180, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Core Dot",
          items: [
            {
              ty: "el",
              nm: "Circle",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [18, 18] }
            },
            {
              ty: "fl",
              nm: "Core Fill",
              c: { a: 0, k: [0.039, 0.518, 1, 1] }, // Accent #0A84FF
              o: { a: 0, k: 100 }
            },
            {
              ty: "st",
              nm: "Core Halo",
              c: { a: 0, k: [1, 1, 1, 1] },
              o: { a: 0, k: 40 },
              w: { a: 0, k: 2 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 3: Inner Wifi Wave Arc (radius ~42px)
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Wifi Arc 1 (Inner)",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [90], [40]),
            kf(60, [40], [90]),
            kf(120, [90], [50]),
            { t: 180, s: [90] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [100, 100, 100], [104, 104, 100]),
            kf(90, [104, 104, 100], [100, 100, 100]),
            { t: 180, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Arc 1 Group",
          items: [
            {
              ty: "sh",
              nm: "Arc 1 Path",
              ks: {
                a: 0,
                k: {
                  c: false,
                  i: [[0, 0], [-17, -13], [0, 0]],
                  o: [[17, -13], [0, 0], [0, 0]],
                  v: [[-32, -26], [0, -44], [32, -26]]
                }
              }
            },
            {
              ty: "st",
              nm: "Arc 1 Stroke",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 5 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 4: Middle Wifi Wave Arc (radius ~74px)
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Wifi Arc 2 (Middle)",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [50], [85]),
            kf(60, [85], [30]),
            kf(120, [30], [50]),
            { t: 180, s: [50] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [100, 100, 100], [105, 105, 100]),
            kf(90, [105, 105, 100], [100, 100, 100]),
            { t: 180, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Arc 2 Group",
          items: [
            {
              ty: "sh",
              nm: "Arc 2 Path",
              ks: {
                a: 0,
                k: {
                  c: false,
                  i: [[0, 0], [-30, -22], [0, 0]],
                  o: [[30, -22], [0, 0], [0, 0]],
                  v: [[-56, -46], [0, -74], [56, -46]]
                }
              }
            },
            {
              ty: "st",
              nm: "Arc 2 Stroke",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 80 },
              w: { a: 0, k: 5 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 5: Outer Wifi Wave Arc (radius ~104px) - Broken/Dissipating
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: "Wifi Arc 3 (Outer)",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [25], [10]),
            kf(45, [10], [60]),
            kf(90, [60], [15]),
            kf(135, [15], [25]),
            { t: 180, s: [25] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Arc 3 Group",
          items: [
            {
              ty: "sh",
              nm: "Arc 3 Path",
              ks: {
                a: 0,
                k: {
                  c: false,
                  i: [[0, 0], [-42, -30], [0, 0]],
                  o: [[42, -30], [0, 0], [0, 0]],
                  v: [[-78, -66], [0, -104], [78, -66]]
                }
              }
            },
            {
              ty: "st",
              nm: "Arc 3 Stroke",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 60 },
              w: { a: 0, k: 5 },
              lc: 2,
              lj: 2
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 6: Expanding Radar Ring 1
    {
      ddd: 0,
      ind: 6,
      ty: 4,
      nm: "Radar Ring Pulse 1",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [60], [0]),
            kf(90, [0], [60]),
            { t: 180, s: [60] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [25, 25, 100], [130, 130, 100]),
            kf(90, [130, 130, 100], [25, 25, 100]),
            { t: 180, s: [25, 25, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Ring 1 Group",
          items: [
            {
              ty: "el",
              nm: "Ring 1 Ellipse",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [140, 140] }
            },
            {
              ty: "st",
              nm: "Ring 1 Stroke",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 50 },
              w: { a: 0, k: 1.5 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 7: Expanding Radar Ring 2 (Staggered)
    {
      ddd: 0,
      ind: 7,
      ty: 4,
      nm: "Radar Ring Pulse 2",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [20], [60]),
            kf(45, [60], [0]),
            kf(135, [0], [20]),
            { t: 180, s: [20] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [80, 80, 100], [135, 135, 100]),
            kf(45, [135, 135, 100], [25, 25, 100]),
            kf(135, [25, 25, 100], [80, 80, 100]),
            { t: 180, s: [80, 80, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Ring 2 Group",
          items: [
            {
              ty: "el",
              nm: "Ring 2 Ellipse",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [140, 140] }
            },
            {
              ty: "st",
              nm: "Ring 2 Stroke",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 40 },
              w: { a: 0, k: 1.5 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 8: Ambient Halo Glow in Background
    {
      ddd: 0,
      ind: 8,
      ty: 4,
      nm: "Ambient Center Glow",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [30], [55]),
            kf(90, [55], [30]),
            { t: 180, s: [30] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [180, 222, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            kf(0, [90, 90, 100], [115, 115, 100]),
            kf(90, [115, 115, 100], [90, 90, 100]),
            { t: 180, s: [90, 90, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          nm: "Glow Circle",
          items: [
            {
              ty: "el",
              nm: "Glow Ellipse",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] }
            },
            {
              ty: "fl",
              nm: "Glow Fill",
              c: { a: 0, k: [0.039, 0.518, 1, 1] },
              o: { a: 0, k: 20 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 9: Floating Lost Data Particles (Left)
    {
      ddd: 0,
      ind: 9,
      ty: 4,
      nm: "Lost Particle Left",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [0], [80]),
            kf(40, [80], [0]),
            kf(180, [0], [0]),
            { t: 180, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            kf(0, [150, 190, 0], [110, 120, 0]),
            kf(90, [110, 120, 0], [150, 190, 0]),
            { t: 180, s: [150, 190, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          nm: "P1",
          items: [
            {
              ty: "el",
              nm: "Dot",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [6, 6] }
            },
            {
              ty: "fl",
              nm: "Fill",
              c: { a: 0, k: [1, 0.45, 0.2, 1] },
              o: { a: 0, k: 90 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },

    // Layer 10: Floating Lost Data Particles (Right)
    {
      ddd: 0,
      ind: 10,
      ty: 4,
      nm: "Lost Particle Right",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            kf(0, [0], [0]),
            kf(40, [0], [80]),
            kf(110, [80], [0]),
            { t: 180, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            kf(0, [210, 190, 0], [210, 190, 0]),
            kf(40, [210, 190, 0], [250, 110, 0]),
            kf(140, [250, 110, 0], [210, 190, 0]),
            { t: 180, s: [210, 190, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          nm: "P2",
          items: [
            {
              ty: "el",
              nm: "Dot",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [5, 5] }
            },
            {
              ty: "fl",
              nm: "Fill",
              c: { a: 0, k: [1, 0.45, 0.2, 1] },
              o: { a: 0, k: 90 }
            },
            {
              ty: "tr",
              nm: "Transform",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

const outputPath = path.join(__dirname, '../src/assets/lottie/offline.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(animation, null, 2), 'utf-8');
console.log('Successfully wrote Lottie JSON to:', outputPath);
