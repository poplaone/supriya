const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const { exec } = require('child_process');

const VIDEO_DIR = path.join(__dirname, '../public/assets/videos');

// Configuration
const CRF = 23; // Constant Rate Factor (0-51, lower is better quality). 23 is default, 28 is good compressed.
const PRESET = 'slow'; // Encoding speed closer to slow = better compression

console.log('🎬 Starting video compression...');
console.log(`Input Directory: ${VIDEO_DIR}`);

// Get all MP4 files
const files = fs.readdirSync(VIDEO_DIR).filter(file => file.endsWith('.mp4') && !file.includes('_compressed'));

if (files.length === 0) {
    console.log('No uncompressed MP4 files found.');
    process.exit(0);
}

console.log(`Found ${files.length} videos to process.`);

// Process videos sequentially
const processVideo = async (index) => {
    if (index >= files.length) {
        console.log('✅ All videos processed!');
        return;
    }

    const file = files[index];
    const inputPath = path.join(VIDEO_DIR, file);
    const tempPath = path.join(VIDEO_DIR, `${path.parse(file).name}_temp.mp4`);

    const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
    console.log(`\nProcessing ${file} (${originalSize.toFixed(2)} MB)...`);

    // FFmpeg command
    // -c:v libx264 : Video codec
    // -crf : Quality/Size trade-off
    // -preset : Compression efficiency
    // -c:a aac -b:a 128k : Audio settings
    // -movflags +faststart : Web optimization (starts playing faster)
    const command = `"${ffmpeg}" -i "${inputPath}" -c:v libx264 -crf ${CRF} -preset ${PRESET} -c:a aac -b:a 128k -movflags +faststart "${tempPath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error processing ${file}:`, error);
            processVideo(index + 1);
            return;
        }

        const newSize = fs.statSync(tempPath).size / 1024 / 1024;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        if (newSize < originalSize) {
            console.log(`✅ Compressed! New size: ${newSize.toFixed(2)} MB (Saved ${savings}%)`);
            // Replace original with compressed
            fs.unlinkSync(inputPath);
            fs.renameSync(tempPath, inputPath);
        } else {
            console.log(`⚠️  Compressed file was larger. Keeping original.`);
            fs.unlinkSync(tempPath);
        }

        processVideo(index + 1);
    });
};

processVideo(0);
