
import { useQuery} from '@apollo/client';
import { REPOSITORIES_QUERY } from '../graphql/queries';

const useRepositories = (variables) => {
    const { data,error, loading, refetch } = useQuery(REPOSITORIES_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables,
    })

    return {
        repositories: data ? data.repositories : undefined,
        loading,
        error,
        refetch,
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