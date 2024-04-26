// Array of image paths relative to the 'imgs' folder
const images = [
    'imgs//banner/image1.png',
    'imgs//banner/image2.png',
    'imgs//banner/image3.png',
    'imgs//banner/image4.png',
    'imgs//banner/image5.png',
    'imgs//banner/image6.png',
    'imgs//banner/image7.png',
    'imgs//banner/image8.png',
    'imgs//banner/image9.png',
    'imgs//banner/image10.png'
    // Add more paths as needed
];
window.onload = function() {
    // Generate a random index based on the array length
    const index = Math.floor(Math.random() * images.length);
    
    // Create a new Image object
    const img = new Image();
    
    // When the image is loaded, calculate the padding-top
    img.onload = function() {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        const aspectRatio = (height / width) * 100;
        
        // Apply dynamic styles to the banner
        const banner = document.querySelector('.banner');
        banner.style.backgroundImage = `url('${images[index]}')`;
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundPosition = 'center';
        banner.style.color = 'white';
        banner.style.position = 'relative';
        banner.style.width = '100%';

        // Inject CSS for the ::before pseudo-element into the <head>
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .banner::before {
                content: "";
                display: block;
                padding-top: ${aspectRatio}%;
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    
    // Set the src of the Image object to load the image
    img.src = images[index];
};