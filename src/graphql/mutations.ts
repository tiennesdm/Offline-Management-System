export const UPLOAD_LOTTIE =`
  mutation uploadLottie($file: Upload!, $name: String!, $description: String!) {
    uploadLottie(file: $file, name: $name, description: $description) {
      id
      filename
      mimetype
      encoding
      url
      name
      description
      isValidLottie
    }
  }
`;
