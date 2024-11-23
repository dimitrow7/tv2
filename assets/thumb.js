function initializeThumbnailExtractor() {
    const videoFileInput = document.getElementById('videoFile');
    if (videoFileInput) {
        videoFileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);

                video.addEventListener('loadedmetadata', function() {
                    video.currentTime = Math.min(4, video.duration / 2);
                });

                video.addEventListener('seeked', function() {
                    const canvas = document.getElementById('thumbnailCanvas');
                    if (!canvas) {
                        console.error("Елементът 'thumbnailCanvas' липсва.");
                        return;
                    }
                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
                    const thumbnailInput = document.getElementById('thumbnailInput');
                    if (thumbnailInput) {
                        thumbnailInput.value = thumbnailDataUrl;
                    }
                    URL.revokeObjectURL(video.src);
                });

                video.addEventListener('error', function() {
                    console.error('Грешка при зареждането на видеото');
                });
            }
        });
    } else {
        console.error("Елементът с ID 'videoFile' не е намерен.");
    }
}
