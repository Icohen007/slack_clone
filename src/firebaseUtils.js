export const enhance = (hookResult) => {
  const [value, loading, error] = hookResult;
  const isReady = !loading && !error;
  return [value, isReady, loading, error];
};

export const addToCollection = async (collectionRef, doc) => {
  try {
    await collectionRef.add(doc);
  } catch (serverError) {
    console.log(serverError);
  }
};
