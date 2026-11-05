export const site = {
  name: "Ronny Haberer",
  email: "netze.grasen-0j@icloud.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ronnyhaberer.de").replace(
    /\/$/,
    "",
  ),
  description:
    "Product design, 3D, and interactive studies. Selected work by Ronny Haberer.",
};
