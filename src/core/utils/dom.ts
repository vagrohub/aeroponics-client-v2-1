const pinBody = () => document.body.classList.add('body--overflow');
const unPinBody = () => document.body.classList.remove('body--overflow');
const togglePinBody = () => document.body.classList.toggle('body--overflow');
const getWindowWidth = (): number => document.documentElement.clientWidth;

export {
    pinBody,
    unPinBody,
    togglePinBody,
    getWindowWidth
}