import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  // uri: process.env.API_BASE,
  uri: "https://sketch-memory-api.onrender.com/query",
  cache: new InMemoryCache(),
});

const GET_ITEMS = gql`
  query Items {
    items {
      id
      title
      image
      author {
        id
        name
      }
      tags {
        id
        name
      }
      date
    }
  }
`;

const GET_ITEMIDS = gql`
  query Items {
    items {
      id
    }
  }
`;

const GET_AUTHORIDS = gql`
  query Authors {
    authors {
      id
    }
  }
`;

const GET_TAGIDS = gql`
  query Tags {
    tags {
      id
    }
  }
`;

const GET_METAS = gql`
  query Items {
    tags {
      id
      name
    }
    authors {
      id
      name
    }
  }
`;

const getTagByIdQuery = (id: string) => {
  return gql`
  query Tag {
    tag(id: "${id}") {
      id
      name
    }
  }
`;
};

const getAuthorByIdQuery = (id: string) => {
  return gql`
  query Author {
    author(id: "${id}") {
      id
      name
    }
  }
`;
};

const getItemByIdQuery = (id: string) => {
  return gql`
    query Items {
      item(id: "${id}") {
        id
        title
        image
        author {
          id
          name
        }
        tags {
          id
          name
        }
        date
      }
    }
  `;
};

export const CREATE_REVIEW = gql`
mutation Review($comment: String!, $score: Int!, $reviewer: String!, $item: String!) {
  createReview(input: { comment: $comment, score: $score, reviewer: $reviewer, item: $item }) {
    id
  }
}
`;

const getItemByTagQuery = (tag: string) => {
  return gql`
    query Items {
      tagItems(tag: "${tag}") {
        id
        title
        image
        author {
          id
          name
        }
        tags {
          id
          name
        }
        date
      }
    }
  `;
};

const getItemByAuthorQuery = (author: string) => {
  return gql`
    query Items {
      authorItems(author: "${author}") {
        id
        title
        image
        author {
          id
          name
        }
        tags {
          id
          name
        }
        date
      }
    }
  `;
};

const getReviewByItemQuery = (id: string) => {
  return gql`
    query Reviews {
      itemReviews(item: "${id}") {
        id
        comment
        score
        reviewer
      }
    }
  `;
};

export const postReviewMutation = (review: PostReviewData) => {
  return gql`
    mutation Review {
      createReview(input: {
        reviewer: "${review.reviewer}",
        comment: "${review.comment}",
  	    score: review.score,
  	    item: "${review.item}"
      }) {
        id
      }
    }
  `;
};

export const getItems = async (): Promise<ItemListResponse> => {
  console.log(process.env.API_BASE);
  const response: ItemListResponse = await client.query({ query: GET_ITEMS }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getItemIds = async (): Promise<ItemIdsResponse> => {
  const response: ItemIdsResponse = await client.query({ query: GET_ITEMIDS }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getAuthorIds = async (): Promise<AuthorIdsResponse> => {
  const response: AuthorIdsResponse = await client.query({ query: GET_AUTHORIDS }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getTagIds = async (): Promise<TagIdsResponse> => {
  const response: TagIdsResponse = await client.query({ query: GET_TAGIDS }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getMetas = async (): Promise<MetaListResponse> => {
  const response: MetaListResponse = await client.query({ query: GET_METAS }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getItemById = async (id: string): Promise<ItemResponse> => {
  const response: ItemResponse = await client.query({ query: getItemByIdQuery(id) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getReviewByItem = async (item: string): Promise<ReviewListResponse> => {
  const response: ReviewListResponse = await client.query({ query: getReviewByItemQuery(item) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getTagById = async (id: string): Promise<TagItemResponse> => {
  const response: TagItemResponse = await client.query({ query: getTagByIdQuery(id) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getAuthorById = async (id: string): Promise<AuthorItemResponse> => {
  const response: AuthorItemResponse = await client.query({ query: getAuthorByIdQuery(id) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getItemByTag = async (tag: string): Promise<TagItemListResponse> => {
  const response: TagItemListResponse = await client.query({ query: getItemByTagQuery(tag) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const getItemByAuthor = async (author: string): Promise<AuthorItemListResponse> => {
  const response: AuthorItemListResponse = await client.query({ query: getItemByAuthorQuery(author) }).then((result) => {
    console.log(result);
    return result;
  });
  return response;
};

export const PostReview = async (review: PostReviewData): Promise<ReviewItem> => {
  const posted_review: ReviewItem = {
    id: "",
    comment: review.comment,
    score: review.score,
    reviewer: review.reviewer,
    item: review.item
  };
  const response: ReviewPostResponse = await client.query({ query: postReviewMutation(review) }).then((result) => {
    console.log(result);
    return result;
  });
  posted_review.id = response.data.createReview.id;
  return posted_review;
}