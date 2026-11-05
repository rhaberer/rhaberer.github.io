export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  category: "Computational" | "Product" | "Material" | "Interactive";
  tags: string[];
  cover: string;
  images: { src: string; alt: string }[];
  introduction: string;
  process: string;
  context: string;
  credits: string;
  award?: string;
  video?: string;
  details?: {
    heading: string;
    body: string;
    source: { label: string; url: string };
  };
};
const sko = (name: string) => `/imgs/sko/ronnyhaberer_${name}.webp`;
const bio = (n: number) =>
  `/imgs/biodesign/ronnyhaberer_biodesign_${String(n).padStart(3, "0")}.webp`;
const workplace = (n: number) =>
  `/imgs/workplace/ronnyhaberer_workplace_${n}.webp`;
export const projects: Project[] = [
  {
    slug: "microphone-clamp",
    number: "01",
    title: "Less material. More possibility.",
    subtitle: "Microphone Clamp",
    year: "2016–17",
    category: "Computational",
    tags: ["Topology optimisation", "Algorithmic design", "3D printing"],
    cover: sko("mic_clamp_2"),
    images: [
      {
        src: sko("mic_clamp_2"),
        alt: "Black branching microphone clamp mounted on a stand",
      },
      {
        src: sko("mic_clamp_1"),
        alt: "Freestanding black microphone clamp with a dense branching lattice",
      },
    ],
    introduction:
      "What happens when a calculation becomes a design partner? Two microphone clamps explore different ways of translating topology optimisation into a physical object.",
    process:
      "One version takes its cues directly from the calculated form. The other grows from a custom algorithm: a 3D-printed tree structure with slender branches and a surprisingly stable result.",
    context: "Nichts Leichter Als Das! · Bauhaus-Universität Weimar",
    credits: "Supervising professor: Prof. Andreas Mühlenberend",
  },
  {
    slug: "programmable-textiles",
    number: "02",
    title: "Form, with a fourth dimension.",
    subtitle: "4D-Printing Simulation",
    year: "2017",
    category: "Computational",
    tags: ["Simulation", "Programmable textiles", "4D printing"],
    cover: "/media/textiles-poster.webp",
    images: [],
    video: "/imgs/ronnyhaberer_4d_printing_simulation.mp4",
    introduction:
      "A simulation study of programmable textiles, exploring the relationship between a printed structure and a changing form.",
    process:
      "The original portfolio documents this work through a moving-image study. Watch the simulation to see the transformation unfold over time.",
    context: "Programmable Textiles · 3D Pioneers Challenge",
    credits: "Ronny Haberer & Patrick Bösch · 2017",
    award: "3D Pioneers Challenge · Winner 2017",
  },
  {
    slug: "hang-it-up",
    number: "03",
    title: "A workspace that makes room.",
    subtitle: "Hang It Up",
    year: "2016",
    category: "Product",
    tags: ["Furniture", "Adaptable systems", "Prototyping"],
    cover: workplace(1),
    images: Array.from({ length: 5 }, (_, i) => ({
      src: workplace(i + 1),
      alt: [
        "Hang It Up desk with suspended storage and crossed pipe legs",
        "Desk disassembled into multiplex panels, tubes and connecting components",
        "Paracord fastening underneath the multiplex desktop",
        "Hand holding the Paracord connection between crossed desk legs",
        "Assembled desk with two-tier storage and an adjustable overhead frame",
      ][i],
    })),
    introduction:
      "A personal desk for people whose working lives keep moving. Two multiplex panels, a few pipes, and Paracord create a workspace that can be adapted and expanded.",
    process:
      "Panel and pipe dimensions follow local material standards to reduce cutting waste. Tensioned Paracord stabilises the crossed legs, while the space between the panels holds A3 sheets. Connection points underneath invite the owner to hang, store, and personalise.",
    context: "Machen Heißt Kultur Schaffen · Bauhaus-Universität Weimar",
    credits:
      "Co-author: Christian Wiegert · Supervising professor: Prof. Gerrit Babtist",
  },
  {
    slug: "chitosan-bioplastics",
    number: "04",
    title: "A different kind of afterlife.",
    subtitle: "Chitosan Bioplastics",
    year: "2017",
    category: "Material",
    tags: ["Biodesign", "Material research", "Prototyping"],
    cover: bio(4),
    images: Array.from({ length: 9 }, (_, i) => ({
      src: bio(i + 1),
      alt: [
        "Translucent chitosan bioplastic sample held up to the light",
        "View through an amber bioplastic housing with a branching printed structure",
        "Collection of translucent and textured bioplastic material samples",
        "Two side views of the clock prototype with its bioplastic skin",
        "Clock components laid out before assembly",
        "Flexible perforated strip used in the bioplastic material study",
        "Amber bioplastic lampshade illuminated from within",
        "Hand bending a translucent bioplastic spoon",
        "Hand holding a flexible rectangular yellow bioplastic sheet",
      ][i],
    })),
    introduction:
      "An exploration of shrimp-shell-derived chitosan as a material for objects. This biodesign project investigates how a discarded resource can become a new surface.",
    process:
      "To explore an electronic housing, we made a clock with a 3D-printed PLA structure and a chitosan bioplastic skin. A calcium additive gives the clock face an opaque, natural appearance; a supporting structure stabilises the sides and back.",
    context: "Biodesign · Pratt Institute, New York",
    credits:
      "Co-author: Paul Eunchan Kim · Supervising professor: Prof. Jeanne Pfordresher",
    details: {
      heading: "Material process & potential uses",
      body: "MILK. Material LAB’s profile describes chitosan formulations made with water and acid, with calcium carbonate, proteins or pigments used as additives. It gives an approximate 48-hour curing period and identifies disposable lids and packaging films as possible applications. The work is listed as a concept in its materials archive.",
      source: {
        label: "Read the material profile at MILK. Material LAB",
        url: "https://www.milk-food.de/insights/materials/chitosan-biopalstics/",
      },
    },
  },
  {
    slug: "lightweight-structures",
    number: "05",
    title: "Finding strength in less.",
    subtitle: "Sledge & Skate Helmet",
    year: "2016–17",
    category: "Product",
    tags: ["Lightweight design", "Topology optimisation", "Product studies"],
    cover: sko("sledge_1"),
    images: [
      ...Array.from({ length: 3 }, (_, i) => ({
        src: sko(`sledge_${i + 1}`),
        alt: `Lightweight sledge design study, view ${i + 1}`,
      })),
      {
        src: sko("helmet_1"),
        alt: "Minimal skate helmet design adapted to common fall scenarios",
      },
    ],
    introduction:
      "Studies in reducing material while keeping purpose and protection at the centre. The project brings a lightweight sledge and a minimal skate helmet into the same design investigation.",
    process:
      "The helmet explores a balance between convenience, lightness, and protection for everyday street skating. Its form responds to common fall scenarios and the practical limits of carrying protective equipment.",
    context: "Nichts Leichter Als Das! · Bauhaus-Universität Weimar",
    credits: "Supervising professor: Prof. Andreas Mühlenberend",
  },
  {
    slug: "3d-studies",
    number: "06",
    title: "Thinking through making.",
    subtitle: "3D Studies",
    year: "2017",
    category: "Product",
    tags: ["3D exploration", "Physical studies", "Form"],
    cover: "/imgs/3D/ronnyhaberer_3d_001.webp",
    images: Array.from({ length: 4 }, (_, i) => ({
      src: `/imgs/3D/ronnyhaberer_3d_${String(i + 1).padStart(3, "0")}.webp`,
      alt: `Physical 3D form study from the 2017 portfolio, image ${i + 1}`,
    })),
    introduction:
      "A collection of physical form studies from the original portfolio. An open-ended look at volume, structure, and the act of making.",
    process:
      "These images present the studies as an archive, preserving the original visual documentation.",
    context: "Portfolio archive · 2017",
    credits: "Ronny Haberer",
  },
];
export const categories = [
  "All",
  "Computational",
  "Product",
  "Material",
] as const;
