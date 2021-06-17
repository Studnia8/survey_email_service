const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emails = (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((el) => el.trim())
    .filter((el) => regex.test(el) === false);
  if (invalidEmails.length > 0) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};

export default emails;
