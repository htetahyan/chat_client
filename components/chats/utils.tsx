export const formatDate = (tempId: string | number | Date) => {
    return new Date(tempId).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
};

export const imageTypes = ['jpg', 'png', 'jpeg', 'webp'];
