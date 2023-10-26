function asyncCommand() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('GOO!');
    }, 2000);
  });
}
module.exports = asyncCommand;
