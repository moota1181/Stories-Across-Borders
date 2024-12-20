export const getInitials = (name) => {
    if (!name || typeof name !== 'string') {
        return '';
    }

    const listName = name.split(' ');
    let initial = "";

    for (let i = 0; i < Math.min(listName.length, 2); i++) {
        initial += listName[i].charAt(0);
    }

    return initial.toUpperCase();
};

export const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return newDate.toLocaleDateString('en-US', options);
};
