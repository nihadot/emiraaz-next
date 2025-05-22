 export const handleShare = async (title = 'Share this off-plan project') => {
    const shareData = {
      title,
      text : 'Hello, I found this off-plan project on PropertySeller.',
      url: window.location.href, // You can replace this with a specific link
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } else {
        alert('Sharing not supported in this browser');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
