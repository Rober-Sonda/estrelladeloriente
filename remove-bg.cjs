const Jimp = require('jimp');

async function removeBackground() {
  const imagePath = 'C:\\Users\\ROBER\\.gemini\\antigravity\\brain\\56d55058-7780-4e03-ba18-70a698216506\\media__1777185997589.jpg';
  const outPath = 'c:\\src\\estrella-del-oriente\\public\\logo-transparent.png';
  
  try {
    const image = await Jimp.read(imagePath);
    
    // We will make any pixel close to white transparent.
    // To handle anti-aliasing better, we can calculate distance from white
    // and map it to alpha, but for a quick fix, let's just drop high lightness pixels.
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate distance from white (255, 255, 255)
      const distToWhite = Math.sqrt(Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2));
      
      // If it's very close to white, make it transparent
      if (distToWhite < 120) {
        // Map the distance to alpha for smooth edges (anti-aliasing)
        // If dist is 0 (pure white), alpha is 0. If dist is 120, alpha is 255.
        const alpha = Math.max(0, Math.min(255, (distToWhite / 120) * 255));
        this.bitmap.data[idx + 3] = alpha;
      }
    });
    
    await image.writeAsync(outPath);
    console.log('Successfully created logo-transparent.png');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

removeBackground();
