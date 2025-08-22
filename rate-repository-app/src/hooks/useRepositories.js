
import { useQuery} from '@apollo/client';
import { REPOSITORIES_QUERY } from '../graphql/queries';

const useRepositories = (variables) => {
    const { data,error, loading, fetchMore, refetch, ...result } = useQuery(REPOSITORIES_QUERY, {
        variables,
        fetchPolicy: 'cache-and-network',
        
    })

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

        if(!canFetchMore){
            return
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        })
    }

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        error,
        refetch,
        ...result,
    }

//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://172.27.14.18:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;