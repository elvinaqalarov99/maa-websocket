const checkData = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    throw new Error("Provided data should be a json!");
  }
};

export { checkData };
