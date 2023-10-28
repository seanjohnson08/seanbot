function asyncCommand() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('GOO!');
    }, 2000);
  });
}
asyncCommand.isHidden = true;
module.exports = asyncCommand;
