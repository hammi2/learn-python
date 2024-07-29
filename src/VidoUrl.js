function extractVideoId(url) {
    let videoId = null;

    // Regular expression to find YouTube video ID
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Extract video ID from URL
    const match = url.match(pattern);
    if (match && match[1]) {
        videoId = match[1];
    }

    return videoId;
}

// Example usage
const youtubeUrl = 'https://www.youtube.com/watch?v=R209hItdu0k&t=127s&pp=ygUdcHl0aG9uIG9wZW4gYWkg2KjYp9mE2LnYsdio2Yo%3D';
const videoId = extractVideoId(youtubeUrl);

if (videoId) {
    console.log(`Video ID: ${videoId}`);
} else {
    console.log('Invalid YouTube URL or video ID not found.');
}
