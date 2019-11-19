const createConditionals = (property, arr) => {
  let result = '';

  for (let i = 0; i < arr.length; i++) {
    if (i == arr.length - 1) {
      result += `${property}="${arr[i]}"`;
    } else {
      result += `${property}="${arr[i]}" OR `;
    }
  }

  return result;
};

module.exports = {
  createConditionals: createConditionals
};
