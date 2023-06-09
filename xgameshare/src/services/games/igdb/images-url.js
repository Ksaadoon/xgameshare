import backupImage from '../../../assets/background.jpg'

const getCroppedImageUrl = (imageUrl) => {
    if (!imageUrl) return backupImage;

    const segmentToReplaceRegex = /\/t_[a-zA-Z]+(?=\/[^/]+$)/; // Regular expression to match the segment to replace

    const replaceSegment = 't_cover_small_2x'; // Specify the replacement segment

    const modifiedImageUrl = imageUrl.replace(segmentToReplaceRegex, `/${replaceSegment}`);

    console.log(modifiedImageUrl);
    return modifiedImageUrl;

}

export default getCroppedImageUrl;