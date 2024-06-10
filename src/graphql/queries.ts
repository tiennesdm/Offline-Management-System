import { gql } from '@apollo/client';

export const GET_LOTTIES = gql`
  query GetLotties {
    lotties {
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

export const SEARCH_LOTTIES = gql`
  query SearchLotties($query: String!) {
    searchLotties(query: $query) {
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
