const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Check if ffmpeg is available
exec('ffmpeg -version', (error, stdout, stderr) => {
  if (error) {
    console.log('ffmpeg is not installed on this system. Please install ffmpeg to convert videos.');
    console.log('You can download it from https://ffmpeg.org/download.html');
    process.exit(1);
  }

  const inputPath = path.join(__dirname, 'public', 'assets', 'videos', 'hero video mobile only.mov');
  const outputPath = path.join(__dirname, 'public', 'assets', 'videos', 'hero video mobile only.mp4');

  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.log('Input video file not found:', inputPath);
    process.exit(1);
  }

  console.log('Converting video from MOV to MP4...');
  console.log('Input:', inputPath);
  console.log('Output:', outputPath);

  // Convert MOV to MP4
  const command = `ffmpeg -i "${inputPath}" -vcodec libx264 -crf 23 -preset medium -acodec aac -strict experimental "${outputPath}"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('Error converting video:', error);
      console.log('stderr:', stderr);
      process.exit(1);
    }
    
    console.log('Video conversion completed successfully!');
    console.log('MP4 file created at:', outputPath);
  });
});