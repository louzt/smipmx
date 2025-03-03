// Importar como un paquete completo para evitar problemas con CommonJS
import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql } = pkg;

const client = new ApolloClient({
    uri: 'https://smipmx.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        'Content-Type': 'application/json',
    },
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const TEST_QUERY = gql`
    query TestQuery {
        generalSettings {
            title
            description
        }
    }
`;

export const ALL_CONTENT_QUERY = gql`
    query GetAllContent {
        posts {
            nodes {
                title
                content
                date
                slug
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
        pages {
            nodes {
                title
                content
                slug
            }
        }
    }
`;

export const SERVICES_QUERY = gql`
    query GetServices {
        posts(where: {categoryName: "servicios"}) {
            nodes {
                title
                content
                slug
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }
`;

// Function to safely execute GraphQL queries
export async function executeQuery(query: any, variables = {}) {
    try {
        const { data } = await client.query({
            query,
            variables,
        });
        return { data, error: null };
    } catch (error) {
        console.error('GraphQL Error:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'Unknown GraphQL error'
        };
    }
}

export default client;
