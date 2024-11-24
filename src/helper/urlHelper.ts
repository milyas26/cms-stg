const symbolRegex = /[^a-zA-Z0-9\s]/gi;
const generatePostUrl = (postId: string, postTitle: string) => {
  const formattedTitlePost = postTitle
    .replace(symbolRegex, "")
    .replace(/ /g, "-");
  return `/post/${formattedTitlePost}-${postId}`.toLowerCase();
};

const urlHelper = {
  generatePostUrl,
};
export default urlHelper;
