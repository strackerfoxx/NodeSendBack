// create a function to create a random string with numbers?

export function randomString(size) {
    var str = '',
    i = 0,
    chars = '_-.0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    while (i < size) {
      str += chars.substr(Math.floor(Math.random() * 62), 1);
      i++;
    }
    return str;
  }