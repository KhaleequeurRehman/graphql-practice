
import "./App.css";
import { gql, useQuery } from "@apollo/client";

function App() {

  const query = gql`
    query GetTodo($getTodoId: ID!) {
      getTodo(id: $getTodoId) {
        id
        title
        completed
        user {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: {
      getTodoId: 1,
    },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
       <div>
        <p>ID: {data?.getTodo?.id}</p>
        <p>Title: {data?.getTodo?.title}</p>
        <p>Completed: {data?.getTodo.completed ? 'Yes' : 'No'}</p>
        <p>User: {data?.getTodo?.user.name}</p>
      </div>
    </>
  );
}

export default App;
