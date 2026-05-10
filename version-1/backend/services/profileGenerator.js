const avatars = ["Sophie", "Luna", "Milo", "Aneka", "Felix"]

function generateAvatar() {
    const randomNumber = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    const url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${avatars[randomNumber]}`;
    return url;
}

export default generateAvatar;