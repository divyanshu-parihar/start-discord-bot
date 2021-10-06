export default (time: number) => {
    var diff = Date.now() - time;
    return (diff / 60000);
};
