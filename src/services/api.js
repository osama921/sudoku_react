export const REST = {
  getBoard: function (difficulty) {
    return fetch(`https://vast-chamber-17969.herokuapp.com/generate?difficulty=`+difficulty);
  }
};
