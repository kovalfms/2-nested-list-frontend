export const config = (user) => {
    return ({
        headers: {Authorization: `Bearer ${user}`}
    })
};

export const baseStorage = {
    setItem:(key, val) => localStorage.setItem(key, JSON.stringify(val)),
    getItem: (key) => JSON.parse(localStorage.getItem(key))
}