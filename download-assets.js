const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
    // Auth
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', dest: 'public/images/auth/login-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1589345236208-8e6ca6f53a47?auto=format&fit=crop&q=80', dest: 'public/images/auth/signup-bg.jpg' },

    // Gallery
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', dest: 'public/images/gallery/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1583939000340-c6947ed0df70?auto=format&fit=crop&q=80', dest: 'public/images/gallery/2.jpg' },
    { url: 'https://images.unsplash.com/photo-1589345236208-8e6ca6f53a47?auto=format&fit=crop&q=80', dest: 'public/images/gallery/3.jpg' },
    { url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80', dest: 'public/images/gallery/4.jpg' },
    { url: 'https://images.unsplash.com/photo-1620888998807-65774d6c40a7?auto=format&fit=crop&q=80', dest: 'public/images/gallery/5.jpg' },
    { url: 'https://images.unsplash.com/photo-1596788062973-19cb9f323c50?auto=format&fit=crop&q=80', dest: 'public/images/gallery/6.jpg' },
    { url: 'https://images.unsplash.com/photo-1601666687002-86ee2bde5d23?auto=format&fit=crop&q=80', dest: 'public/images/gallery/7.jpg' },
    { url: 'https://images.unsplash.com/photo-1584288019313-094762eab87f?auto=format&fit=crop&q=80', dest: 'public/images/gallery/8.jpg' },
    { url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80', dest: 'public/images/gallery/9.jpg' },
    { url: 'https://images.unsplash.com/photo-1558021200-c9772ee89600?auto=format&fit=crop&q=80', dest: 'public/images/gallery/10.jpg' },
    { url: 'https://images.unsplash.com/photo-1592398606412-fef1ffcf7c52?auto=format&fit=crop&q=80', dest: 'public/images/gallery/11.jpg' },
    { url: 'https://images.unsplash.com/photo-1563200782-b6be57f2022b?auto=format&fit=crop&q=80', dest: 'public/images/gallery/12.jpg' },

    // Halls
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', dest: 'public/images/halls/grand-ballroom-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1583939000340-c6947ed0df70?auto=format&fit=crop&q=80', dest: 'public/images/halls/grand-ballroom-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1589345236208-8e6ca6f53a47?auto=format&fit=crop&q=80', dest: 'public/images/halls/grand-ballroom-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80', dest: 'public/images/halls/ivory-lounge-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1620888998807-65774d6c40a7?auto=format&fit=crop&q=80', dest: 'public/images/halls/ivory-lounge-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1596788062973-19cb9f323c50?auto=format&fit=crop&q=80', dest: 'public/images/halls/ivory-lounge-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1601666687002-86ee2bde5d23?auto=format&fit=crop&q=80', dest: 'public/images/halls/royal-terrace-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1584288019313-094762eab87f?auto=format&fit=crop&q=80', dest: 'public/images/halls/royal-terrace-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80', dest: 'public/images/halls/royal-terrace-3.jpg' },

    // 360
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', dest: 'public/images/360/main-hall.jpg' },
    { url: 'https://images.unsplash.com/photo-1589345236208-8e6ca6f53a47?auto=format&fit=crop&q=80', dest: 'public/images/360/stage.jpg' },
    { url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80', dest: 'public/images/360/dining.jpg' },
    { url: 'https://images.unsplash.com/photo-1620888998807-65774d6c40a7?auto=format&fit=crop&q=80', dest: 'public/images/360/garden.jpg' },
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    console.log('Starting parallel downloads of 26 local assets...');
    let i = 0;
    // Doing it sequentially so it does not overwhelm Unsplash CDN and returns 200 properly without blocking
    for (const d of downloads) {
        if (!fs.existsSync(d.dest)) {
            i++;
            console.log(`Downloading [${i}/${downloads.length}]: ` + d.dest);
            await download(d.url, d.dest);
        }
    }
    console.log('All local assets downloaded successfully!');
}

run();
