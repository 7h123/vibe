const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES = [
    {
        id: 'K8_An_UfAsI', // Marble table minimal
        name: 'hero',
        width: 2400
    },
    {
        id: 'vM_A5m_0vNo', // Travertine/Stone warm texture
        name: 'bridge-section',
        width: 1920
    }
];

const OUTPUT_DIR = path.join(__dirname, '../client/public/images');

async function downloadAndConvert() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const img of IMAGES) {
        console.log(`Fetching ${img.name}...`);
        const url = `https://unsplash.com/photos/${img.id}/download?force=true`;

        try {
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'arraybuffer'
            });

            const buffer = Buffer.from(response.data);

            // Save main WebP
            await sharp(buffer)
                .resize({ width: img.width })
                .webp({ quality: 85 })
                .toFile(path.join(OUTPUT_DIR, `${img.name}.webp`));

            // Save small version for hero if needed
            if (img.name === 'hero') {
                await sharp(buffer)
                    .resize({ width: 768 })
                    .webp({ quality: 75 })
                    .toFile(path.join(OUTPUT_DIR, `${img.name}-sm.webp`));
            }

            console.log(`Saved ${img.name}.webp`);
        } catch (err) {
            console.error(`Error processing ${img.name}:`, err.message);
        }
    }
}

downloadAndConvert();
