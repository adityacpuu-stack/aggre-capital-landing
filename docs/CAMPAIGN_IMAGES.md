# Supporting campaign banners

## Financing

- Source: `C:\Users\AdityaCPU-Zep\Downloads\Image (2).jpg`.
- Style reference: `public/images/hero-agent-banner.png`.
- Final asset: `public/images/financing-banner.png`, 1536 x 1024.
- Mode: built-in imagegen. Installed in the top hero, linking to `/pengajuan`. The agent campaign follows the service cards.
- The RGB image has a white lower fade, composited into the pale green section using CSS multiply and a bottom mask. It is not an alpha-transparent asset.

### Final imagegen prompt

Edit target: Image 1, AGGRE CAPITAL financing poster with the woman holding rupiah banknotes. Style reference only: Image 2, the landscape agent banner with forest green architectural backdrop, mint highlight strips, and a soft pale lower fade. Adapt image 1 into ONE LANDSCAPE 3:2 website banner 1536x1024 matching image 2's professional layout. Preserve the woman from image 1, same face, smile, hairstyle, black AGGRE CAPITAL shirt, banknotes and celebratory raised arm. Keep her full head, both hands, money and arms inside the frame. Preserve the modern house, certificate imagery and complete financing message from the original. Arrange main copy in left 48%, woman and house in right 52%, no overlap on text. Use company logo at upper left. Include exact Indonesian copy: 'Kenapa harus ribet kalau ada akses satu pintu?' as a modest introductory line; large headline 'AGGRE BISA JADI SOLUSI' and 'PEMBIAYAAN YANG MENDESAK'; three benefits 'Jaminan sertifikat', 'Limit s.d. 5M', 'Proses cepat & mudah'; four compact purpose labels 'Renovasi rumah', 'Tambah modal', 'Gaji karyawan', 'Project dadakan'; website 'aggrecapital.com'. Typography bold sans-serif with clear spacing and hierarchy; mint highlight strips on the headline as in image 2, cream text on forest green backgrounds. Use tasteful small simple icons for benefits and purposes, do not overfill the layout. House architecture stays visible behind the woman. Image 2 is only a visual-style reference: do not include the people from image 2, agent recruitment content, earnings text or its CTA. No blur sidebars. The lower 8% fades smoothly to PURE WHITE for compositing into the website section; all text must be above and clear of that fade. Return a finished landscape advertising banner, not a website screenshot.

## Awards

- Source and full-size asset: `public/images/pemred-award-2026.jpg`, an unchanged copy of the user's `Image (3).jpg` (1024 x 825).
- Mode: HTML/CSS layout in `app/page.tsx` and `app/landing.module.css`; no generated event photography.
- Both original photo rows occupy the upper 607 pixels of the source. A proportional CSS viewport displays this montage without cropping the people or certificates further.
- The old lower text panel is replaced with live typography, a forest green backdrop, mint title highlight and a lower fade. The original slogan and paragraph are also present in the section copy.
- The homepage banner and its link open `/penghargaan`. This dedicated page shows the full original poster, event copy and a full-size image link. It is included in the header, footer and both sitemaps.
- Both supporting sections stack on screens up to 760px wide.

Original files in Downloads remain unchanged.
